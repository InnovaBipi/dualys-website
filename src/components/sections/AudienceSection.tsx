'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import type { HomepageContent } from '@/lib/keystatic/types';

const audienceImages: Record<string, string> = {
  industrial: '/images/audience/industrial.jpg',
  tech: '/images/audience/tech.jpg',
  empreses: '/images/audience/empreses.jpg',
};

interface AudienceSectionProps {
  content: HomepageContent['audience'];
}

export function AudienceSection({ content }: AudienceSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.h2
          className="text-center font-display text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl md:text-[48px] md:leading-[1.1]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {content.title}
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.cards.map((card, index) => {
            const imageSrc = audienceImages[card.key];
            return (
              <motion.div
                key={card.key}
                className="group relative min-h-[280px] overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/30 to-transparent" />

                <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-6">
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
