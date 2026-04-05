'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import type { HomepageContent } from '@/lib/keystatic/types';

interface ContextSectionProps {
  content: HomepageContent['context'];
}

export function ContextSection({ content }: ContextSectionProps) {
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
          {content.title}
        </motion.h2>

        {/* Stats grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {content.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <p className="font-display text-3xl font-bold text-accent-500 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                {stat.label}
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
            {content.paragraph1}
          </motion.p>

          <motion.p
            className="text-lg leading-relaxed text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {content.paragraph2}
          </motion.p>

          <motion.p
            className="text-lg leading-relaxed text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {content.paragraph3}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
