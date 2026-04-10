'use client';

import { motion } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { ArrowRight } from 'lucide-react';
import type { HomepageContent } from '@/lib/keystatic/types';

interface TeamTrustSectionProps {
  content: HomepageContent['team'];
}

export function TeamTrustSection({ content }: TeamTrustSectionProps) {
  if (!content || (!content.title && !content.text && !content.cta)) {
    return null;
  }

  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {content.title && (
            <motion.h2
              className="font-display text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {content.title}
            </motion.h2>
          )}

          {content.text && (
            <motion.div
              className="mt-8 border-l-4 border-accent-500 pl-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-lg leading-relaxed text-neutral-700">
                {content.text}
              </p>
            </motion.div>
          )}

          {content.cta && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 font-medium text-accent-500 transition-colors hover:text-accent-600"
              >
                {content.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
