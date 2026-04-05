import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/content/PageHeader';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { Link } from '@/lib/i18n/navigation';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { NosotrosContent } from '@/lib/keystatic/types';
import type { Locale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getPageContent<NosotrosContent>('nosotros', locale as Locale);

  return generatePageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: locale as Locale,
    path: '/nosotros',
  });
}

export default async function NosotrosPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getPageContent<NosotrosContent>('nosotros', locale as Locale);

  const pageSchema = getWebPageSchema({
    title: content.meta.title,
    description: content.meta.description,
    locale: locale as Locale,
    path: '/nosotros',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: content.title, url: '/nosotros' },
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

      {/* Company narrative */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed text-neutral-700">
              {content.narrative.paragraph1}
            </p>
            <p className="text-lg leading-relaxed text-neutral-700">
              {content.narrative.paragraph2}
            </p>
            <blockquote className="border-l-4 border-accent-500 pl-6 italic text-neutral-800">
              <p className="text-lg leading-relaxed">
                {content.narrative.vision}
              </p>
            </blockquote>
          </div>
        </Container>
      </section>

      {/* Founders section */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900">
              {content.founders.title}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {content.founders.profiles.map((founder) => (
                <div
                  key={founder.title}
                  className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
                >
                  <h3 className="mb-4 text-lg font-bold text-accent-500">
                    {founder.title}
                  </h3>
                  <p className="leading-relaxed text-neutral-700">
                    {founder.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Vision timeline */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900">
              {content.vision.title}
            </h2>
            <div className="relative">
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-accent-200 md:block" aria-hidden="true" />

              <div className="grid gap-8 md:grid-cols-3">
                {content.vision.phases.map((phase, index) => (
                  <div key={phase.title} className="relative">
                    <div className="mb-6 flex items-center gap-3 md:justify-center">
                      <div className="relative z-10 h-3 w-3 rounded-full bg-accent-500" aria-hidden="true" />
                      {index < content.vision.phases.length - 1 && (
                        <div className="h-px flex-1 bg-accent-200 md:hidden" aria-hidden="true" />
                      )}
                    </div>
                    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                      <h3 className="mb-3 text-lg font-bold text-neutral-900">
                        {phase.title}
                      </h3>
                      <p className="leading-relaxed text-neutral-700">
                        {phase.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
              {content.cta}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
