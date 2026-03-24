import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Factory, Cpu, Building2, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/content/PageHeader';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/lib/i18n/navigation';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import type { Locale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicios' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/servicios',
  });
}

const audiences = [
  { key: 'industrial' as const, icon: Factory },
  { key: 'tech' as const, icon: Cpu },
  { key: 'primes' as const, icon: Building2 },
] as const;

export default async function ServiciosPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'servicios' });
  const tAudience = await getTranslations({ locale, namespace: 'homepage' });

  const pageSchema = getWebPageSchema({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/servicios',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: t('title'), url: '/servicios' },
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

      {/* Program FFD — Enigmatic Presentation */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            {/* Program Name — Visually Prominent */}
            <div className="mb-8">
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-neutral-500">
                {t('program.fullName')}
              </span>
              <h2 className="mt-3 text-5xl font-bold tracking-tight text-accent-500 sm:text-6xl md:text-7xl">
                {t('program.name')}
              </h2>
            </div>

            {/* Divider accent line */}
            <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-accent-500" />

            {/* Enigmatic program description */}
            <p className="text-lg leading-relaxed text-neutral-700 sm:text-xl">
              {t('program.description')}
            </p>
          </div>
        </Container>
      </section>

      {/* Audience Cards — Who is this for */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <Container>
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl">
            {tAudience('audience.title')}
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <div
                  key={audience.key}
                  className="rounded-xl border border-neutral-200 bg-white p-8 transition-colors duration-300 hover:border-accent-500"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/10">
                    <Icon className="h-6 w-6 text-accent-500" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-primary-950">
                    {tAudience(`audience.${audience.key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {tAudience(`audience.${audience.key}.description`)}
                  </p>
                  <Link
                    href="/sectores"
                    className="mt-5 inline-flex items-center text-sm font-medium text-accent-500 transition-colors hover:text-accent-600"
                  >
                    {tAudience(`audience.${audience.key}.cta`)}
                    <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('program.name')}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {t('program.description')}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-lg bg-accent-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-600"
            >
              {t('cta')}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
