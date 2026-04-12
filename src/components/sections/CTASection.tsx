'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import type { HomepageContent } from '@/lib/keystatic/types';

interface CTASectionProps {
  content: HomepageContent['cta'];
}

export function CTASection({ content }: CTASectionProps) {
  return (
    <section className="bg-neutral-950 py-20 md:py-28">
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 md:text-xl">
            {content.subtitle}
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="secondary" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/contact">
                {content.button}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
