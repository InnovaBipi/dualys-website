'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Linkedin, MapPin, Mail } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: tNav('sectores'), href: '/sectores' },
    { name: tNav('metodologia'), href: '/metodologia' },
    { name: tNav('nosotros'), href: '/nosotros' },
    { name: tNav('contact'), href: '/contact' },
  ];

  const legalLinks = [
    { name: t('privacy'), href: '/legal/privacy' },
    { name: t('terms'), href: '/legal/terms' },
    { name: t('cookies'), href: '/legal/cookies' },
  ];

  return (
    <footer className="border-t border-neutral-800 bg-neutral-900 text-white">
      <Container className="py-12 md:py-16">
        {/* Logo */}
        <div className="mb-10">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Dualys Strategy"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>
        </div>

        {/* 2 columns: Navigation | Contact */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Column 1: Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('navigation')}
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 transition-colors hover:text-accent-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('contactTitle')}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/company/dualys-strategy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-accent-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t('email')}`}
                  className="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-accent-400"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {t('email')}
                </a>
              </li>
              <li>
                <div className="inline-flex items-start gap-2 text-sm text-neutral-300">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t('address')}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row: legal + copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 md:flex-row">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-neutral-400 transition-colors hover:text-neutral-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-neutral-500">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
