import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Building2, ArrowRight, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
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
  const t = await getTranslations({ locale, namespace: 'landings.primes' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/para-primes',
  });
}

export default async function ParaPrimesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'landings.primes' });
  const tAudience = await getTranslations({ locale, namespace: 'homepage.audience' });

  const pageSchema = getWebPageSchema({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/para-primes',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: t('title'), url: '/para-primes' },
  ], locale as Locale);

  const valueProps = [
    { key: 'prop1', icon: CheckCircle },
    { key: 'prop2', icon: CheckCircle },
    { key: 'prop3', icon: CheckCircle },
  ] as const;

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Breadcrumbs
        items={[{ label: t('title') }]}
      />

      {/* Hero Section */}
      <section className="bg-primary-500 bg-gradient-to-br from-primary-500 to-primary-500/95 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/20">
              <Building2 className="h-7 w-7 text-accent-400" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
              {t('subtitle')}
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

      {/* Value Propositions */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {valueProps.map((prop) => {
              const Icon = prop.icon;
              return (
                <div
                  key={prop.key}
                  className="rounded-xl border border-neutral-200 bg-white p-8 transition-colors duration-300 hover:border-accent-500"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/10">
                    <Icon className="h-6 w-6 text-accent-500" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-neutral-700">
                    {t(`valueProps.${prop.key}`)}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Audience-specific content */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-primary-950 sm:text-3xl">
              {tAudience('primes.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              {tAudience('primes.description')}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('cta')}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {t('subtitle')}
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
