'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import type { HomepageContent } from '@/lib/keystatic/types';

interface HeroSectionProps {
  content: HomepageContent['hero'];
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] overflow-hidden md:min-h-[700px]">
      {/* Background image */}
      <Image
        src="/images/hero-homepage.jpg"
        alt=""
        role="presentation"
        fill
        className="object-cover object-top"
        priority
        sizes="100vw"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 via-neutral-900/40 to-neutral-900/75" />

      {/* Content */}
      <Container className="relative z-10 flex min-h-[600px] flex-col justify-end pb-16 pt-32 md:min-h-[700px] md:pb-24">
        {/* Context note */}
        <motion.p
          className="max-w-2xl text-sm text-neutral-300 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content.contextNote}
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {content.title}
        </motion.h1>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild size="lg" variant="primary">
            <Link href="/contact">
              {content.cta}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="border-white/30 text-white hover:bg-white/10">
            <Link href="/metodologia">
              {content.ctaSecondary}
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
