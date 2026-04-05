import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { SubcategoryCard } from '@/components/content/SubcategoryCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { SectoresContent, SectoresVerticalsContent, HomepageContent } from '@/lib/keystatic/types';
import type { Locale } from '@/lib/i18n/config';
import { verticals, getVerticalBySlug, getAllVerticalSlugs } from '@/data/verticals';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllVerticalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const vertical = getVerticalBySlug(slug);
  if (!vertical) return {};

  const vContent = await getPageContent<SectoresVerticalsContent>('sectores_verticals', locale as Locale);
  const data = vContent[vertical.key as keyof SectoresVerticalsContent];

  return generatePageMetadata({
    title: data.meta.title,
    description: data.meta.description,
    locale: locale as Locale,
    path: `/sectores/${slug}`,
  });
}

export default async function VerticalDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const vertical = getVerticalBySlug(slug);
  if (!vertical) notFound();

  const vContent = await getPageContent<SectoresVerticalsContent>('sectores_verticals', locale as Locale);
  const sectoresContent = await getPageContent<SectoresContent>('sectores', locale as Locale);
  const homepage = await getPageContent<HomepageContent>('homepage', locale as Locale);

  const data = vContent[vertical.key as keyof SectoresVerticalsContent];
  const Icon = vertical.icon;

  const pageSchema = getWebPageSchema({
    title: data.meta.title,
    description: data.meta.description,
    locale: locale as Locale,
    path: `/sectores/${slug}`,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: sectoresContent.title, url: '/sectores' },
    { name: data.title, url: `/sectores/${slug}` },
  ], locale as Locale);

  // Get 3 related verticals (next in array, wrapping around)
  const currentIndex = verticals.findIndex((v) => v.slug === slug);
  const relatedVerticals = [1, 2, 3].map((offset) => {
    const idx = (currentIndex + offset) % verticals.length;
    return verticals[idx];
  });

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Breadcrumbs
        items={[
          { label: sectoresContent.title, href: '/sectores' },
          { label: data.title },
        ]}
      />

      {/* Hero section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/10">
              <Icon className="h-8 w-8 text-accent-500" aria-hidden="true" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl lg:text-5xl">
              {data.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              {data.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Subcategories grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.subcategories.map((subcat) => (
              <SubcategoryCard
                key={subcat.key}
                title={subcat.title}
                description={subcat.description}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Related verticals */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <Container>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-primary-950">
            {sectoresContent.originSection.title}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {relatedVerticals.map((related) => {
              const RelatedIcon = related.icon;
              const relData = vContent[related.key as keyof SectoresVerticalsContent];
              return (
                <Link
                  key={related.slug}
                  href={`/sectores/${related.slug}`}
                  className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/10">
                    <RelatedIcon className="h-5 w-5 text-accent-500" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-primary-950 group-hover:text-accent-500">
                    {relData.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                    {relData.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA section */}
      <section className="bg-primary-950 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">{homepage.cta.title}</h2>
            <p className="mt-4 text-lg text-white/80">{homepage.cta.subtitle}</p>
            <div className="mt-8">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact" className="inline-flex items-center gap-2">
                  {homepage.cta.button}
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
