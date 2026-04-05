'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('cookieConsent');

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    window.dispatchEvent(
      new CustomEvent('cookie-consent-changed', { detail: 'accepted' })
    );
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    window.dispatchEvent(
      new CustomEvent('cookie-consent-changed', { detail: 'rejected' })
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-grow">
            <h3 className="mb-2 text-lg font-semibold text-primary-950">
              {t('title')}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              {t('description')}{' '}
              <Link
                href="/legal/cookies"
                className="text-accent-500 underline hover:text-accent-600"
              >
                {t('cookiePolicy')}
              </Link>
            </p>
          </div>

          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <Button variant="outline" size="sm" onClick={handleReject}>
              {t('reject')}
            </Button>
            <Button variant="accent" size="sm" onClick={handleAccept}>
              {t('accept')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
