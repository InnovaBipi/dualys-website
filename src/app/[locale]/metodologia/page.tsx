import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Lock, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { Link } from '@/lib/i18n/navigation';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { MetodologiaContent } from '@/lib/keystatic/types';
import type { Locale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getPageContent<MetodologiaContent>('metodologia', locale as Locale);

  return generatePageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: locale as Locale,
    path: '/metodologia',
  });
}

export default async function MetodologiaPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getPageContent<MetodologiaContent>('metodologia', locale as Locale);

  const pageSchema = getWebPageSchema({
    title: content.meta.title,
    description: content.meta.description,
    locale: locale as Locale,
    path: '/metodologia',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: content.title, url: '/metodologia' },
  ], locale as Locale);

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Breadcrumbs items={[{ label: content.title }]} />

      {/* Dark hero */}
      <section className="bg-neutral-900 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {content.subtitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300">
              {content.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Horizontal timeline */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            {/* Desktop: horizontal timeline with dots + line */}
            <div className="hidden md:block">
              {/* Connecting line + dots */}
              <div className="relative mb-12 flex items-center justify-between px-8">
                <div className="absolute inset-x-8 top-1/2 h-px bg-neutral-200" aria-hidden="true" />
                {content.phases.map((_, index) => (
                  <div
                    key={index}
                    className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Step cards */}
              <div className="grid grid-cols-4 gap-8">
                {content.phases.map((phase, index) => (
                  <div key={index}>
                    <h3 className="font-display text-lg font-semibold text-neutral-900">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden">
              <div className="relative space-y-8 pl-8">
                <div className="absolute bottom-0 left-[7px] top-0 w-px bg-neutral-200" aria-hidden="true" />
                {content.phases.map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900" aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold text-neutral-900">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* NDA note */}
      <section className="py-8">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4 rounded-lg border-l-4 border-accent-500 bg-neutral-50 p-6">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500" aria-hidden="true" />
              <p className="text-neutral-600">{content.nda}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Button asChild size="lg" variant="primary">
              <Link href="/contact">
                {content.cta}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
