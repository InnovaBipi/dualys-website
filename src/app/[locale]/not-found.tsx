import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import Link from 'next/link';

export default async function NotFound() {
  const t = await getTranslations('pages.notFound');

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container className="text-center">
        <h1 className="font-display text-6xl font-bold tracking-tight text-primary-950">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          {t('description')}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
        >
          {t('button')}
        </Link>
      </Container>
    </div>
  );
}
