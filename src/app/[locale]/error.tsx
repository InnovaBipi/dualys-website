'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('pages.error');

  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container className="text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-primary-950">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          {t('description')}
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
        >
          {t('button')}
        </button>
      </Container>
    </div>
  );
}
