'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import type { HomepageContent } from '@/lib/keystatic/types';

interface KeyMessagesSectionProps {
  content: HomepageContent['messages'];
}

function MessageCard({ item, index }: { item: { title: string; text: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="w-fit">
        <h3 className="font-display text-2xl font-light text-neutral-900 sm:text-3xl md:text-[36px] md:leading-[1.2]">
          {item.title}
        </h3>
        <div className="mt-2 h-0.5 bg-accent-500" />
      </div>
      <p className="mt-4 text-base leading-relaxed text-neutral-500">
        {item.text}
      </p>
    </motion.div>
  );
}

export function KeyMessagesSection({ content }: KeyMessagesSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <motion.h2
          className="mb-16 text-center font-display text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl md:text-[48px] md:leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {content.title}
        </motion.h2>

        <div className="flex flex-col gap-16 md:flex-row md:gap-20">
          {/* Left column: items 0, 1, 2 */}
          <div className="flex flex-1 flex-col gap-12">
            {content.items.slice(0, 3).map((item, index) => (
              <MessageCard key={index} item={item} index={index} />
            ))}
          </div>
          {/* Right column: items 3, 4 — vertically centered */}
          <div className="flex flex-1 flex-col justify-center gap-12">
            {content.items.slice(3, 5).map((item, index) => (
              <MessageCard key={index + 3} item={item} index={index + 3} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
