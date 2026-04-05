import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/content/PageHeader';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo/metadata';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { LegalContent } from '@/lib/keystatic/types';
import type { Locale } from '@/lib/i18n/config';

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getPageContent<LegalContent>('legal_cookies', locale as Locale);
  return generatePageMetadata({ title: content.meta.title, description: content.meta.description, locale: locale as Locale, path: '/legal/cookies' });
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getPageContent<LegalContent>('legal_cookies', locale as Locale);

  const pageSchema = getWebPageSchema({ title: content.meta.title, description: content.meta.description, locale: locale as Locale, path: '/legal/cookies' });
  const breadcrumbSchema = getBreadcrumbSchema([{ name: 'Home', url: '' }, { name: content.title, url: '/legal/cookies' }], locale as Locale);

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: content.title }]} />
      <PageHeader title={content.title} subtitle={content.lastUpdated} />
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-neutral max-w-none">
              {content.sections.map((section) => (
                <div key={section.key} className="mb-8">
                  <h2 className="text-xl font-semibold text-neutral-900">{section.title}</h2>
                  <p className="mt-4 text-neutral-600 whitespace-pre-line">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
