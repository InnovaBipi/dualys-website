'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import {
  Truck,
  Ship,
  Plane,
  Rocket,
  Radio,
  Shield,
  Bot,
  Gamepad2,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Vertical {
  key: string;
  icon: LucideIcon;
}

const verticals: Vertical[] = [
  { key: 'terrestrial', icon: Truck },
  { key: 'naval', icon: Ship },
  { key: 'aeronautics', icon: Plane },
  { key: 'aerospace', icon: Rocket },
  { key: 'c4isr', icon: Radio },
  { key: 'cyber', icon: Shield },
  { key: 'uav', icon: Bot },
  { key: 'simulation', icon: Gamepad2 },
  { key: 'auxiliary', icon: Wrench },
];

export function VerticalsSection() {
  const t = useTranslations('homepage');

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
            {t('verticals.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            {t('verticals.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
          {verticals.map((vertical, index) => {
            const Icon = vertical.icon;

            return (
              <motion.div
                key={vertical.key}
                className="group rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500/10">
                  <Icon className="h-6 w-6 text-accent-500" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-primary-950 sm:text-lg">
                  {t(`verticals.${vertical.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-500">
                  {t(`verticals.${vertical.key}.description`)}
                </p>
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
            {t('verticals.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
