'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';
import { verticals } from '@/data/verticals';

export function Header() {
  const t = useTranslations('nav');
  const tVerticals = useTranslations('homepage.verticals');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectorsDropdownOpen, setSectorsDropdownOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const tCta = useTranslations('cta');

  const isSectorsActive = pathname === '/sectores' || pathname.startsWith('/sectores/');

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Click-outside to close desktop dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSectorsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Escape key closes dropdown
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSectorsDropdownOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setSectorsDropdownOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimeout.current = setTimeout(() => {
      setSectorsDropdownOpen(false);
    }, 150);
  }, []);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('servicios'), href: '/servicios' },
    { name: t('sectores'), href: '/sectores', hasSub: true },
    { name: t('metodologia'), href: '/metodologia' },
    { name: t('nosotros'), href: '/nosotros' },
    { name: t('recursos'), href: '/recursos' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Global">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Dualys"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-x-8">
            {navigation.map((item) => {
              if (item.hasSub) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      className={cn(
                        'flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent-500',
                        isSectorsActive ? 'text-accent-500' : 'text-neutral-600'
                      )}
                      onClick={() => setSectorsDropdownOpen(!sectorsDropdownOpen)}
                      aria-expanded={sectorsDropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200',
                          sectorsDropdownOpen && 'rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Desktop Dropdown Panel */}
                    {sectorsDropdownOpen && (
                      <div
                        className="absolute left-1/2 z-50 mt-4 w-[480px] -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5 animate-fade-in"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {verticals.map((vertical) => {
                            const Icon = vertical.icon;
                            const isCurrentVertical = pathname === `/sectores/${vertical.slug}`;
                            return (
                              <Link
                                key={vertical.slug}
                                href={`/sectores/${vertical.slug}`}
                                className={cn(
                                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                                  isCurrentVertical
                                    ? 'bg-accent-500/10 text-accent-500'
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-950'
                                )}
                                role="menuitem"
                                onClick={() => setSectorsDropdownOpen(false)}
                              >
                                <Icon className="h-4 w-4 shrink-0 text-accent-500/70" aria-hidden="true" />
                                <span>{tVerticals(`${vertical.key}.title`)}</span>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="mt-3 border-t border-neutral-100 pt-3">
                          <Link
                            href="/sectores"
                            className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium text-accent-500 transition-colors hover:bg-accent-500/5"
                            onClick={() => setSectorsDropdownOpen(false)}
                          >
                            {tVerticals('cta')}
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-accent-500',
                    pathname === item.href
                      ? 'text-accent-500'
                      : 'text-neutral-600'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-x-4">
            <LanguageSwitcher />
            <Button asChild size="sm" variant="accent">
              <Link href="/contact" className="flex items-center gap-1">
                {tCta('button')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2.5 text-neutral-600 hover:text-primary-900 min-h-[44px] min-w-[44px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-200 ease-in-out",
            mobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-1 pb-4 pt-2 bg-white">
            {navigation.map((item) => {
              if (item.hasSub) {
                return (
                  <div key={item.name}>
                    {/* Sectors toggle button */}
                    <button
                      type="button"
                      className={cn(
                        'flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium min-h-[48px]',
                        isSectorsActive
                          ? 'bg-accent-500/20 text-accent-500'
                          : 'text-neutral-600 hover:bg-neutral-100'
                      )}
                      onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
                      aria-expanded={mobileSectorsOpen}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          mobileSectorsOpen && 'rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Mobile sub-items */}
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-200 ease-in-out',
                        mobileSectorsOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="ml-3 space-y-0.5 border-l-2 border-accent-500/20 pl-3 py-1">
                        <Link
                          href="/sectores"
                          className={cn(
                            'flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium min-h-[44px]',
                            pathname === '/sectores'
                              ? 'text-accent-500'
                              : 'text-neutral-500 hover:text-accent-500'
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {tCommon('viewAll')}
                        </Link>
                        {verticals.map((vertical) => {
                          const Icon = vertical.icon;
                          const isCurrentVertical = pathname === `/sectores/${vertical.slug}`;
                          return (
                            <Link
                              key={vertical.slug}
                              href={`/sectores/${vertical.slug}`}
                              className={cn(
                                'flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm min-h-[44px]',
                                isCurrentVertical
                                  ? 'bg-accent-500/10 text-accent-500 font-medium'
                                  : 'text-neutral-600 hover:bg-neutral-50'
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Icon className="h-4 w-4 shrink-0 text-accent-500/60" aria-hidden="true" />
                              <span>{tVerticals(`${vertical.key}.title`)}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block rounded-md px-3 py-3 text-base font-medium min-h-[48px] flex items-center',
                    pathname === item.href
                      ? 'bg-accent-500/20 text-accent-500'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            {/* Mobile actions - stacked vertically for better touch UX */}
            <div className="mt-4 space-y-3 px-3 border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">{t('language') || 'Language'}</span>
                <LanguageSwitcher />
              </div>
              <Button asChild variant="accent" className="w-full min-h-[48px]">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-1">
                  {tCta('button')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
