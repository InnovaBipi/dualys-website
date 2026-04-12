'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import type { HomepageContent } from '@/lib/keystatic/types';

interface KeyMessagesSectionProps {
  content: HomepageContent['messages'];
}

export function KeyMessagesSection({ content }: KeyMessagesSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <motion.h2
          className="mb-16 text-center font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {content.title}
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              className="border-l-2 border-accent-500 pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <span className="font-display text-3xl font-bold text-accent-500">
                {index + 1}.
              </span>
              <h3 className="mt-1 font-display text-xl font-semibold text-accent-500 sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-neutral-500">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
