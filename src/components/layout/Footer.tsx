'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Linkedin, MapPin, Mail } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: tNav('servicios'), href: '/servicios' },
    { name: tNav('sectores'), href: '/sectores' },
    { name: tNav('metodologia'), href: '/metodologia' },
    { name: tNav('nosotros'), href: '/nosotros' },
    { name: tNav('recursos'), href: '/recursos' },
    { name: tNav('contact'), href: '/contact' },
  ];

  const legalLinks = [
    { name: t('privacy'), href: '/legal/privacy' },
    { name: t('terms'), href: '/legal/terms' },
    { name: t('cookies'), href: '/legal/cookies' },
  ];

  return (
    <footer className="bg-primary-950 text-white">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Contact Info */}
          <div className="md:col-span-5">
            <Link href="/" className="text-xl font-bold text-white">
              Dualys
            </Link>
            <p className="mt-4 max-w-md text-sm text-neutral-300">
              {t('description')}
            </p>

            {/* Address */}
            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
              <span className="text-sm text-neutral-300">
                {t('address')}
              </span>
            </div>

            {/* Email */}
            <div className="mt-3 flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
              <a
                href={`mailto:${t('email')}`}
                className="text-sm text-neutral-300 transition-colors hover:text-accent-400"
              >
                {t('email')}
              </a>
            </div>

            {/* Social */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-neutral-200">{t('followUs')}</p>
              <div className="mt-3 flex gap-4">
                <a
                  href="https://www.linkedin.com/company/dualys-strategy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors hover:text-accent-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-sm font-semibold text-neutral-200">{t('quickLinks')}</h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-accent-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-neutral-200">{t('legal')}</h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-accent-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-center text-sm text-neutral-500">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
