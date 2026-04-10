import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Factory, Cpu, Building2, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/content/PageHeader';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/lib/i18n/navigation';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { ServiciosContent, HomepageContent } from '@/lib/keystatic/types';
import type { Locale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getPageContent<ServiciosContent>('servicios', locale as Locale);

  return generatePageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: locale as Locale,
    path: '/servicios',
  });
}

const audienceIcons = [
  { key: 'industrial', icon: Factory },
  { key: 'tech', icon: Cpu },
  { key: 'empreses', icon: Building2 },
] as const;

export default async function ServiciosPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getPageContent<ServiciosContent>('servicios', locale as Locale);
  const homepage = await getPageContent<HomepageContent>('homepage', locale as Locale);

  const pageSchema = getWebPageSchema({
    title: content.meta.title,
    description: content.meta.description,
    locale: locale as Locale,
    path: '/servicios',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: content.title, url: '/servicios' },
  ], locale as Locale);

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Breadcrumbs items={[{ label: content.title }]} />

      <PageHeader
        title={content.title}
        subtitle={content.subtitle}
        variant="gradient"
      />

      {/* Program FFD — Enigmatic Presentation */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8">
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-neutral-500">
                {content.program.fullName}
              </span>
              <h2 className="mt-3 text-5xl font-bold tracking-tight text-accent-500 sm:text-6xl md:text-7xl">
                {content.program.name}
              </h2>
            </div>
            <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-accent-500" />
            <p className="text-lg leading-relaxed text-neutral-700 sm:text-xl">
              {content.program.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Audience Cards */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <Container>
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl">
            {homepage.audience.title}
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {homepage.audience.cards.map((card) => {
              const iconConfig = audienceIcons.find((a) => a.key === card.key);
              const Icon = iconConfig?.icon || Factory;
              return (
                <div
                  key={card.key}
                  className="rounded-xl border border-neutral-200 bg-white p-8 transition-colors duration-300 hover:border-accent-500"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/10">
                    <Icon className="h-6 w-6 text-accent-500" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-primary-950">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {card.description}
                  </p>
                  <Link
                    href="/sectores"
                    className="mt-5 inline-flex items-center text-sm font-medium text-accent-500 transition-colors hover:text-accent-600"
                  >
                    {card.cta}
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
              {content.program.name}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {content.program.description}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-lg bg-accent-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-600"
            >
              {content.cta}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
