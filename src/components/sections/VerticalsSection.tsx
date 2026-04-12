'use client';

import { motion } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { verticals } from '@/data/verticals';
import type { HomepageContent } from '@/lib/keystatic/types';

interface VerticalsSectionProps {
  content: HomepageContent['verticals'];
}

export function VerticalsSection({ content }: VerticalsSectionProps) {
  const itemsByKey = new Map(content.items.map((item) => [item.key, item]));

  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.h2
          className="mb-12 text-center font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {content.title}
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5">
          {verticals.map((vertical, index) => {
            const item = itemsByKey.get(vertical.key);

            return (
              <motion.div
                key={vertical.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <Link
                  href={`/sectores/${vertical.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-900"
                >
                  {/* TODO: Add actual vertical images when available */}
                  {/* <Image src={`/images/verticals/${vertical.slug}.jpg`} alt="" fill className="object-cover transition-transform group-hover:scale-105" /> */}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />

                  {/* Content at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-sm font-semibold text-white md:text-base">
                      {item?.title || vertical.key}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
