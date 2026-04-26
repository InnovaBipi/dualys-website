'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import type { HomepageContent } from '@/lib/keystatic/types';

interface ContextSectionProps {
  content: HomepageContent['context'];
}

export function ContextSection({ content }: ContextSectionProps) {
  return (
    <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
      <Container>
        {/* Stats row */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {content.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <p className="font-display text-3xl font-light text-accent-500 sm:text-4xl md:text-[48px]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        {content.paragraph1 && (
          <motion.p
            className="mx-auto mt-10 max-w-5xl text-center text-base leading-relaxed text-neutral-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {content.paragraph1}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
