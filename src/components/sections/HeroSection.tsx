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
      {/* Background image */}
      <Image
        src="/images/hero-homepage.jpg"
        alt=""
        role="presentation"
        fill
        className="object-cover object-[center_8%]"
        priority
        sizes="100vw"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-neutral-900/10 via-neutral-900/30 to-neutral-900/75" />

      {/* White blend at top to mask letterbox and blend with header */}
      <div className="absolute inset-x-0 top-0 z-[2] h-24 bg-gradient-to-b from-white to-transparent" />

      {/* Content */}
      <Container className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-32 md:pb-24">
        {/* Context note with highlighted monetary amount */}
        <motion.p
          className="max-w-2xl text-base text-white md:text-[20px] md:leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content.contextNote.split(/(Dualys)/).map((part, i) =>
            part === 'Dualys'
              ? <span key={i} className="font-semibold text-accent-400">{part}</span>
              : <span key={i}>{part}</span>
          )}
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
