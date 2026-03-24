'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';

const messageKeys = [
  'message1',
  'message2',
  'message3',
  'message4',
  'message5',
] as const;

export function KeyMessagesSection() {
  const t = useTranslations('homepage');

  return (
    <section className="bg-primary-950 py-16 md:py-24">
      <Container>
        <motion.h2
          className="mb-16 text-center font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('messages.title')}
        </motion.h2>

        <div className="space-y-12 md:space-y-16">
          {messageKeys.map((key, index) => {
            const isEven = index % 2 === 0;
            const number = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={key}
                className={`flex flex-col gap-6 md:flex-row md:items-start md:gap-12 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Number badge */}
                <div className="flex shrink-0 items-center gap-4 md:w-48 md:justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 font-display text-lg font-bold text-white">
                    {number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="mb-3 font-display text-xl font-semibold text-accent-300 sm:text-2xl">
                    {t(`messages.${key}.title`)}
                  </h3>
                  <p className="max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                    {t(`messages.${key}.text`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
