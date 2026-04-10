import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { ContextSection } from '@/components/sections/ContextSection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { KeyMessagesSection } from '@/components/sections/KeyMessagesSection';
import { VerticalsSection } from '@/components/sections/VerticalsSection';
import { TeamTrustSection } from '@/components/sections/TeamTrustSection';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata, getOrganizationSchema, getWebSiteSchema } from '@/lib/seo/metadata';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { HomepageContent } from '@/lib/keystatic/types';
import type { Locale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getPageContent<HomepageContent>('homepage', locale as Locale);

  return generatePageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: locale as Locale,
    path: '',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = await getPageContent<HomepageContent>('homepage', locale as Locale);
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema(locale as Locale);

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <HeroSection content={content.hero} />
      <ContextSection content={content.context} />
      <AudienceSection content={content.audience} />
      <KeyMessagesSection content={content.messages} />
      <VerticalsSection content={content.verticals} />
      {content.team && (content.team.title || content.team.text || content.team.cta) && (
        <TeamTrustSection content={content.team} />
      )}
      <CTASection content={content.cta} />
    </>
  );
}
