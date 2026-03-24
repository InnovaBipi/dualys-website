'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';

const stats = [
  { value: 'context.stat1', label: 'context.stat1Label' },
  { value: 'context.stat2', label: 'context.stat2Label' },
  { value: 'context.stat3', label: 'context.stat3Label' },
] as const;

export function ContextSection() {
  const t = useTranslations('homepage');

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Section title */}
        <motion.h2
          className="font-display text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          {t('context.title')}
        </motion.h2>

        {/* Stats grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.value}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <p className="font-display text-3xl font-bold text-accent-500 sm:text-4xl">
                {t(stat.value)}
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                {t(stat.label)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Narrative paragraphs */}
        <div className="mt-12 max-w-3xl space-y-6">
          <motion.p
            className="text-lg leading-relaxed text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('context.paragraph1')}
          </motion.p>

          <motion.p
            className="text-lg leading-relaxed text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('context.paragraph2')}
          </motion.p>

          <motion.p
            className="text-lg leading-relaxed text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('context.paragraph3')}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
