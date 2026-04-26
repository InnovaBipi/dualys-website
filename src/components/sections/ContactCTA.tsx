'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface ContactCTAProps {
  variant?: 'dark' | 'light';
}

export function ContactCTA({ variant = 'light' }: ContactCTAProps) {
  const t = useTranslations('cta');
  const isDark = variant === 'dark';

  return (
    <section className={isDark ? 'bg-neutral-900 py-20 md:py-28' : 'bg-white py-20 md:py-28'}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className={`font-display text-3xl font-light tracking-tight sm:text-4xl md:text-[48px] md:leading-[1.1] ${isDark ? 'text-white' : 'text-primary-950'}`}
          >
            {t('title')}
          </h2>
          <p
            className={`mt-5 max-w-2xl text-lg md:text-xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}
          >
            {t('subtitle')}
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant={isDark ? 'secondary' : 'primary'}>
              <Link href="/contact">
                {t('buttonSecondary')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
