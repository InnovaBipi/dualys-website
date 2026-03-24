'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Factory, Cpu, Building2, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';

const audiences = [
  {
    key: 'industrial' as const,
    icon: Factory,
    href: '/sectores' as const,
  },
  {
    key: 'tech' as const,
    icon: Cpu,
    href: '/sectores' as const,
  },
  {
    key: 'primes' as const,
    icon: Building2,
    href: '/contact' as const,
  },
];

export function AudienceSection() {
  const t = useTranslations('homepage');

  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <Container>
        <motion.h2
          className="text-center text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('audience.title')}
        </motion.h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={audience.key}
                className="rounded-xl border border-neutral-200 bg-white p-8 transition-colors duration-300 hover:border-accent-500"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/10">
                  <Icon className="h-6 w-6 text-accent-500" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-primary-950">
                  {t(`audience.${audience.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {t(`audience.${audience.key}.description`)}
                </p>
                <Link
                  href={audience.href}
                  className="mt-5 inline-flex items-center text-sm font-medium text-accent-500 transition-colors hover:text-accent-600"
                >
                  {t(`audience.${audience.key}.cta`)}
                  <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
