'use client';

import { motion } from 'framer-motion';
import { Factory, Cpu, Building2, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import type { HomepageContent } from '@/lib/keystatic/types';
import type { LucideIcon } from 'lucide-react';

const audienceIcons: Record<string, { icon: LucideIcon; href: string }> = {
  industrial: { icon: Factory, href: '/sectores' },
  tech: { icon: Cpu, href: '/sectores' },
  empreses: { icon: Building2, href: '/contact' },
};

interface AudienceSectionProps {
  content: HomepageContent['audience'];
}

export function AudienceSection({ content }: AudienceSectionProps) {
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
          {content.title}
        </motion.h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {content.cards.map((card, index) => {
            const config = audienceIcons[card.key] || { icon: Factory, href: '/contact' };
            const Icon = config.icon;
            return (
              <motion.div
                key={card.key}
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
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {card.description}
                </p>
                <Link
                  href={config.href as '/sectores' | '/contact'}
                  className="mt-5 inline-flex items-center text-sm font-medium text-accent-500 transition-colors hover:text-accent-600"
                >
                  {card.cta}
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
