import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { SubcategoryCard } from '@/components/content/SubcategoryCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/lib/i18n/navigation';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { SectoresContent, SectoresVerticalsContent } from '@/lib/keystatic/types';
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
  const t = await getTranslations({ locale, namespace: 'sectores' });

  const data = vContent[vertical.key as keyof SectoresVerticalsContent];

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

      {/* Hero with background image */}
      <section className="relative overflow-hidden bg-neutral-900 py-16 md:py-24">
        <Image
          src={`/images/verticals/${vertical.slug}.jpg`}
          alt=""
          role="presentation"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/50 to-neutral-900/80" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {data.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">
              {data.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Subcategories */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Més verticals */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="mb-10 text-center font-display text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl md:text-[48px] md:leading-[1.1]">
            {t('moreVerticals')}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {relatedVerticals.map((related) => {
              const relData = vContent[related.key as keyof SectoresVerticalsContent];
              return (
                <Link
                  key={related.slug}
                  href={`/sectores/${related.slug}`}
                  className="group relative block aspect-[16/9] overflow-hidden rounded-xl"
                >
                  <Image
                    src={`/images/verticals/${related.slug}.jpg`}
                    alt={relData.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="flex items-center gap-1 text-base font-semibold text-white">
                      {relData.title}
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-white/70">
                      {relData.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <ContactCTA variant="light" />
    </>
  );
}
