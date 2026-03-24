import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/content/PageHeader';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/lib/i18n/navigation';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import type { Locale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'recursos' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/recursos',
  });
}

const categoryKeys = ['market', 'guides', 'cases', 'opinion'] as const;

export default async function RecursosPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'recursos' });

  const pageSchema = getWebPageSchema({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/recursos',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: t('title'), url: '/recursos' },
  ], locale as Locale);

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Breadcrumbs
        items={[{ label: t('title') }]}
      />

      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        variant="gradient"
      />

      {/* Category Filter Pills */}
      <section className="border-b border-neutral-200 bg-white py-6">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categoryKeys.map((key) => (
              <span
                key={key}
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700"
              >
                {t(`categories.${key}`)}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Empty State */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <BookOpen className="h-8 w-8 text-neutral-400" aria-hidden="true" />
            </div>
            <p className="text-lg text-neutral-500">
              {t('empty')}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {t('subtitle')}
            </p>
            <div className="mt-8">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact" className="inline-flex items-center gap-2">
                  {t('cta')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
