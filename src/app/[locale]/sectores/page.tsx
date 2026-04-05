import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/content/PageHeader';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { SectoresContent, HomepageContent } from '@/lib/keystatic/types';
import type { Locale } from '@/lib/i18n/config';
import { verticals } from '@/data/verticals';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getPageContent<SectoresContent>('sectores', locale as Locale);

  return generatePageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: locale as Locale,
    path: '/sectores',
  });
}

export default async function SectoresPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getPageContent<SectoresContent>('sectores', locale as Locale);
  const homepage = await getPageContent<HomepageContent>('homepage', locale as Locale);

  const verticalsByKey = new Map(homepage.verticals.items.map((v) => [v.key, v]));

  const pageSchema = getWebPageSchema({
    title: content.meta.title,
    description: content.meta.description,
    locale: locale as Locale,
    path: '/sectores',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: content.title, url: '/sectores' },
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

      {/* Intro Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-neutral-600">
              {content.intro}
            </p>
          </div>
        </Container>
      </section>

      {/* Verticals Grid */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((vertical) => {
              const Icon = vertical.icon;
              const item = verticalsByKey.get(vertical.key);

              return (
                <Link
                  key={vertical.key}
                  href={`/sectores/${vertical.slug}`}
                  className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500/10">
                    <Icon className="h-6 w-6 text-accent-500" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-primary-950 group-hover:text-accent-500">
                    {item?.title || vertical.key}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {item?.description || ''}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-500 opacity-0 transition-opacity group-hover:opacity-100">
                    {content.cta}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Origin Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl">
              {content.originSection.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              {content.originSection.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">{content.title}</h2>
            <p className="mt-4 text-lg text-white/80">{content.subtitle}</p>
            <div className="mt-8">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact" className="inline-flex items-center gap-2">
                  {content.cta}
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
