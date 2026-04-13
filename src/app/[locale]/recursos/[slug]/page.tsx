import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/lib/i18n/navigation';
import { generatePageMetadata, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { locales, type Locale } from '@/lib/i18n/config';
import { getRecursoBySlug, getRecursosSlugs } from '@/lib/keystatic/get-recursos';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const allParams: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = await getRecursosSlugs(locale);
    for (const slug of slugs) {
      allParams.push({ locale, slug });
    }
  }

  return allParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getRecursoBySlug(locale as Locale, slug);

  if (!article) {
    return {};
  }

  return generatePageMetadata({
    title: article.title,
    description: article.summary,
    locale: locale as Locale,
    path: `/recursos/${slug}`,
  });
}

export default async function RecursoDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getRecursoBySlug(locale as Locale, slug);
  if (!article || article.draft) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'recursos' });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '' },
    { name: t('title'), url: '/recursos' },
    { name: article.title, url: `/recursos/${slug}` },
  ], locale as Locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    author: {
      '@type': 'Organization',
      name: article.author || 'Dualys',
    },
    ...(article.publishedAt && {
      datePublished: article.publishedAt,
    }),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />

      <Breadcrumbs
        items={[
          { label: t('title'), href: '/recursos' },
          { label: article.title },
        ]}
      />

      <article className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-8">
              <span className="mb-4 inline-block rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700">
                {t(`categories.${article.category}`)}
              </span>
              <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl font-display">
                {article.title}
              </h1>
              <p className="mt-4 text-lg text-neutral-600">
                {article.summary}
              </p>
              <div className="mt-6 flex items-center gap-6 text-sm text-neutral-500">
                {article.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span>{article.author}</span>
                  </div>
                )}
                {article.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <hr className="mb-12 border-neutral-200" />

            {/* Content */}
            <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent-600 hover:prose-a:text-accent-700 prose-img:rounded-xl">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <DocumentRenderer document={article.content as any} />
            </div>

            {/* Back link */}
            <div className="mt-16 border-t border-neutral-200 pt-8">
              <Button variant="secondary" asChild>
                <Link href="/recursos" className="inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {t('backToList')}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </article>

      {/* CTA Section */}
      <section className="bg-primary-500 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {t('subtitle')}
            </p>
            <div className="mt-8">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact" className="inline-flex items-center gap-2">
                  {t('cta')}
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
