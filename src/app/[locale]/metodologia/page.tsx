import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Lock, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/content/PageHeader';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metodologia' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/metodologia',
  });
}

export default async function MetodologiaPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'metodologia' });

  const pageSchema = getWebPageSchema({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/metodologia',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: t('title'), url: '/metodologia' },
  ], locale as Locale);

  const phases = [
    {
      number: '01',
      title: t('phases.phase1.title'),
      description: t('phases.phase1.description'),
    },
    {
      number: '02',
      title: t('phases.phase2.title'),
      description: t('phases.phase2.description'),
    },
    {
      number: '03',
      title: t('phases.phase3.title'),
      description: t('phases.phase3.description'),
    },
  ];

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

      {/* Hero intro */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-neutral-700">
              {t('description')}
            </p>
          </div>
        </Container>
      </section>

      {/* Phases timeline */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-8 top-0 hidden h-full w-px bg-accent-200 md:block" aria-hidden="true" />

              <div className="space-y-12 md:space-y-16">
                {phases.map((phase, index) => (
                  <div key={phase.number} className="relative flex gap-6 md:gap-10">
                    {/* Phase number */}
                    <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg">
                      <span className="text-xl font-bold">{phase.number}</span>
                    </div>

                    {/* Phase content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl font-bold text-neutral-900">
                        {phase.title}
                      </h3>
                      <p className="mt-3 text-lg leading-relaxed text-neutral-600">
                        {phase.description}
                      </p>
                      {index < phases.length - 1 && (
                        <div className="mt-6 h-px w-full bg-neutral-200 md:hidden" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* NDA confidentiality note */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4 rounded-lg border-l-4 border-accent-500 bg-neutral-50 p-6">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500" />
              <p className="text-neutral-700">
                {t('nda')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-600"
            >
              {t('cta')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
