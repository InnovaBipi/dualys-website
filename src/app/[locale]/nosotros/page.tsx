import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
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

      {/* Hero — left-aligned */}
      <section className="bg-neutral-900 py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl md:text-[48px] md:leading-[1.1]">
              {content.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300">
              {content.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* La Nostra Missió */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="font-display text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl md:text-[48px] md:leading-[1.1]">
            {content.narrative.title}
          </h2>
          <div className="mt-10 max-w-3xl space-y-6">
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
        </Container>
      </section>

      {/* Visió de futur — bg white */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 font-display text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl md:text-[48px] md:leading-[1.1]">
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

      {/* L'equip fundador — staggered layout */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="mb-16 font-display text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl md:text-[48px] md:leading-[1.1]">
            {content.founders.title}
          </h2>
          <div className="flex flex-col gap-16 md:flex-row md:gap-20">
            {/* Left column: founders 0, 1 */}
            <div className="flex flex-1 flex-col gap-12">
              {content.founders.profiles.slice(0, 2).map((founder, index) => (
                <div key={index}>
                  <div className="w-fit">
                    <h3 className="font-display text-2xl font-light text-neutral-900 sm:text-3xl md:text-[36px] md:leading-[1.2]">
                      {founder.title}
                    </h3>
                    <div className="mt-2 h-0.5 bg-accent-500" />
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-neutral-500">
                    {founder.text}
                  </p>
                </div>
              ))}
            </div>
            {/* Right column: founders 2, 3 — vertically centered */}
            <div className="flex flex-1 flex-col justify-center gap-12">
              {content.founders.profiles.slice(2, 4).map((founder, index) => (
                <div key={index + 2}>
                  <div className="w-fit">
                    <h3 className="font-display text-2xl font-light text-neutral-900 sm:text-3xl md:text-[36px] md:leading-[1.2]">
                      {founder.title}
                    </h3>
                    <div className="mt-2 h-0.5 bg-accent-500" />
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-neutral-500">
                    {founder.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ContactCTA light */}
      <ContactCTA variant="light" />
    </>
  );
}
