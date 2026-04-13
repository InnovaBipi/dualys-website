import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { Link } from '@/lib/i18n/navigation';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { NosotrosContent, HomepageContent } from '@/lib/keystatic/types';
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
  const homepage = await getPageContent<HomepageContent>('homepage', locale as Locale);

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

      {/* Dark hero */}
      <section className="bg-neutral-900 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {content.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300">
              {content.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Missio - narrative */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              {content.narrative.paragraph1 ? content.title : ''}
            </h2>
            <div className="mt-6 space-y-6">
              <p className="text-lg leading-relaxed text-neutral-600">
                {content.narrative.paragraph1}
              </p>
              {content.narrative.paragraph2 && (
                <p className="text-lg leading-relaxed text-neutral-600">
                  {content.narrative.paragraph2}
                </p>
              )}
              {content.narrative.vision && (
                <blockquote className="border-l-4 border-accent-500 pl-6">
                  <p className="text-lg leading-relaxed italic text-neutral-700">
                    {content.narrative.vision}
                  </p>
                </blockquote>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Visio - timeline */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              {content.vision.title}
            </h2>
            <div className="relative">
              {/* Desktop connecting line */}
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-neutral-300 md:block" aria-hidden="true" />

              <div className="grid gap-8 md:grid-cols-3">
                {content.vision.phases.map((phase, index) => (
                  <div key={phase.title} className="relative">
                    {/* Dot */}
                    <div className="mb-6 flex items-center gap-3 md:justify-center">
                      <div className="relative z-10 h-3 w-3 rounded-full bg-neutral-900" aria-hidden="true" />
                      {index < content.vision.phases.length - 1 && (
                        <div className="h-px flex-1 bg-neutral-300 md:hidden" aria-hidden="true" />
                      )}
                    </div>
                    {/* Card */}
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      {phase.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* L'equip fundador */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              {content.founders.title}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {content.founders.profiles.map((founder) => (
                <div key={founder.title}>
                  <h3 className="text-lg font-semibold text-accent-500">
                    {founder.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-neutral-600">
                    {founder.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              {homepage.cta.title}
            </h2>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/contact">
                  {content.cta}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
