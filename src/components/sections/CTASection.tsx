'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-20 md:py-28 bg-primary-950">
      <Container>
        <motion.div
          className="relative px-6 py-16 text-center sm:px-12 md:py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background decoration with accent color */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-500/10" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-500/10" />

          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              {t('subtitle')}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="xl" variant="accent">
                <Link href="/contact">
                  {t('button')}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/contact">
                  {t('buttonSecondary')}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
