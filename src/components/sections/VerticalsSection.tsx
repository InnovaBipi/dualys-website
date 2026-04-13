'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { verticals } from '@/data/verticals';
import type { HomepageContent } from '@/lib/keystatic/types';

const verticalImages: Record<string, string> = {
  'vehicles-terrestres': '/images/verticals/vehicles-terrestres.jpg',
  'sector-naval': '/images/verticals/sector-naval.jpg',
  'aeronautica': '/images/verticals/aeronautica.jpg',
  'aeroespacial': '/images/verticals/aeroespacial.jpg',
  'comunicacions-c4isr': '/images/verticals/comunicacions-c4isr.jpg',
  'ciberdefensa': '/images/verticals/ciberdefensa.jpg',
  'uav-robotica': '/images/verticals/uav-robotica.jpg',
  'armament-municio': '/images/verticals/armament-municio.jpg',
  'simulacio-gaming': '/images/verticals/simulacio-gaming.jpg',
  'sector-auxiliar': '/images/verticals/sector-auxiliar.jpg',
};

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
            const imageSrc = verticalImages[vertical.slug];

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
                  className="group relative block aspect-[4/3] overflow-hidden rounded-xl"
                >
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={item?.title || vertical.key}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    />
                  )}

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
