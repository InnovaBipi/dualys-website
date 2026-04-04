'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, localeNames, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'inline';
  onLanguageChange?: () => void;
}

export function LanguageSwitcher({ variant = 'dropdown', onLanguageChange }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === 'inline') return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [variant]);

  const handleLanguageChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
    onLanguageChange?.();
  };

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2" role="radiogroup" aria-label="Language">
        {locales.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => handleLanguageChange(loc)}
            className={cn(
              'inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium min-h-[44px] min-w-[44px] transition-colors',
              locale === loc
                ? 'bg-accent-500 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
            role="radio"
            aria-checked={locale === loc}
            aria-label={localeNames[loc]}
          >
            <span className="uppercase">{loc}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-md px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-primary-950 min-h-[44px] min-w-[44px]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="uppercase">{locale}</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            "left-0 sm:left-auto sm:right-0",
            "origin-top-left sm:origin-top-right"
          )}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLanguageChange(loc)}
                className={cn(
                  'block w-full px-4 py-3 text-left text-sm min-h-[44px]',
                  locale === loc
                    ? 'bg-primary-50 text-primary-500'
                    : 'text-neutral-700 hover:bg-neutral-50'
                )}
                role="menuitem"
              >
                {localeNames[loc]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
