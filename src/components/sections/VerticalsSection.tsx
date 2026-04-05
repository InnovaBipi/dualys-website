'use client';

import { motion } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { ArrowRight } from 'lucide-react';
import { verticals } from '@/data/verticals';
import type { HomepageContent } from '@/lib/keystatic/types';

interface VerticalsSectionProps {
  content: HomepageContent['verticals'];
}

export function VerticalsSection({ content }: VerticalsSectionProps) {
  // Map CMS items by key for lookup
  const itemsByKey = new Map(content.items.map((item) => [item.key, item]));

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
          {verticals.map((vertical, index) => {
            const Icon = vertical.icon;
            const item = itemsByKey.get(vertical.key);

            return (
              <motion.div
                key={vertical.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/sectores/${vertical.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500/10">
                    <Icon className="h-6 w-6 text-accent-500" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-display text-base font-semibold text-primary-950 group-hover:text-accent-500 sm:text-lg">
                    {item?.title || vertical.key}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {item?.description || ''}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/sectores"
            className="inline-flex items-center gap-2 font-medium text-accent-500 transition-colors hover:text-accent-600"
          >
            {content.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
