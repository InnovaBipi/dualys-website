import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Shield, Clock, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata, getWebPageSchema } from '@/lib/seo/metadata';
import { getPageContent } from '@/lib/keystatic/get-page-content';
import type { LandingContent, HomepageContent } from '@/lib/keystatic/types';
import type { Locale } from '@/lib/i18n/config';

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getPageContent<LandingContent>('landing_pre_evaluacion', locale as Locale);
  return generatePageMetadata({ title: content.meta.title, description: content.meta.description, locale: locale as Locale, path: '/pre-evaluacion' });
}

export default async function PreEvaluacionPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getPageContent<LandingContent>('landing_pre_evaluacion', locale as Locale);
  const homepage = await getPageContent<HomepageContent>('homepage', locale as Locale);

  const pageSchema = getWebPageSchema({ title: content.meta.title, description: content.meta.description, locale: locale as Locale, path: '/pre-evaluacion' });
  const stats = homepage.context.stats;
  const icons = [Clock, Shield, CheckCircle];

  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="min-h-screen bg-white">
        <div className="px-6 pt-8">
          <Image src="/logo.png" alt="Dualys" width={120} height={40} className="h-8 w-auto" priority />
        </div>
        <section className="py-12 md:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl md:text-5xl">{content.title}</h1>
                <p className="mt-6 text-lg leading-relaxed text-neutral-600">{content.subtitle}</p>
                <div className="mt-10 space-y-4">
                  {stats.map((stat, i) => {
                    const Icon = icons[i] || CheckCircle;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 rounded-full bg-accent-500/10 p-2">
                          <Icon className="h-5 w-5 text-accent-500" aria-hidden="true" />
                        </div>
                        <p className="text-sm text-neutral-700">{stat.value} &mdash; {stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8">
                  <h2 className="mb-6 text-xl font-semibold text-primary-950">{content.cta}</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
