'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import type { HomepageContent } from '@/lib/keystatic/types';

const audienceImages: Record<string, string> = {
  industrial: 'from-neutral-800 to-neutral-600',
  tech: 'from-accent-900 to-neutral-700',
  empreses: 'from-neutral-700 to-neutral-500',
};

interface AudienceSectionProps {
  content: HomepageContent['audience'];
}

export function AudienceSection({ content }: AudienceSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.h2
          className="text-center font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {content.title}
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.cards.map((card, index) => {
            const gradientClass = audienceImages[card.key] || 'from-neutral-700 to-neutral-500';
            return (
              <motion.div
                key={card.key}
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradientClass} p-8 pb-10 min-h-[280px] flex flex-col justify-end`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* TODO: Replace gradient with actual images when available */}
                {/* <Image src={`/images/audience-${card.key}.jpg`} alt="" fill className="object-cover" /> */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /> */}

                <div className="relative z-10">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
