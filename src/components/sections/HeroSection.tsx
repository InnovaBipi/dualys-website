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
    <section className="relative -mt-[68px] min-h-screen overflow-hidden">
      {/* Background image — cropped, no letterbox bars */}
      <Image
        src="/images/hero-homepage.jpg"
        alt=""
        role="presentation"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-neutral-900/10 via-neutral-900/30 to-neutral-900/75" />

      {/* Content */}
      <Container className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-32 md:pb-24">
        {/* H1 — Slogan: Outfit, 60px, extralight */}
        <motion.h1
          className="max-w-3xl font-display text-4xl font-extralight tracking-tight text-white sm:text-5xl md:text-[60px] md:leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content.contextNote}
        </motion.h1>

        {/* Subtitle — Description: Inter, 36px, light, line-height 140% */}
        <motion.p
          className="mt-6 max-w-2xl font-sans text-lg font-light text-white/90 sm:text-xl md:text-[36px] md:leading-[1.4]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {content.title}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild size="lg" variant="secondary" className="border-white/30 text-white hover:bg-white/10">
            <Link href="/metodologia">
              {content.ctaSecondary}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
