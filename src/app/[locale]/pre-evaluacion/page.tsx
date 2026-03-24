import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Shield, Clock, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata, getWebPageSchema } from '@/lib/seo/metadata';
import type { Locale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'landings.preEvaluacion' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/pre-evaluacion',
  });
}

export default async function PreEvaluacionPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'landings.preEvaluacion' });
  const tContext = await getTranslations({ locale, namespace: 'homepage.context' });

  const pageSchema = getWebPageSchema({
    title: t('meta.title'),
    description: t('meta.description'),
    locale: locale as Locale,
    path: '/pre-evaluacion',
  });

  return (
    <>
      <JsonLd data={pageSchema} />

      <div className="min-h-screen bg-white">
        {/* Logo */}
        <div className="px-6 pt-8">
          <Image
            src="/logo.png"
            alt="Dualys"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </div>

        {/* Hero + Form Section */}
        <section className="py-12 md:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left: Copy */}
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl md:text-5xl">
                  {t('title')}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                  {t('subtitle')}
                </p>

                {/* Trust elements */}
                <div className="mt-10 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-full bg-accent-500/10 p-2">
                      <Clock className="h-5 w-5 text-accent-500" aria-hidden="true" />
                    </div>
                    <p className="text-sm text-neutral-700">
                      {tContext('stat1')} &mdash; {tContext('stat1Label')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-full bg-accent-500/10 p-2">
                      <Shield className="h-5 w-5 text-accent-500" aria-hidden="true" />
                    </div>
                    <p className="text-sm text-neutral-700">
                      {tContext('stat2')} &mdash; {tContext('stat2Label')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-full bg-accent-500/10 p-2">
                      <CheckCircle className="h-5 w-5 text-accent-500" aria-hidden="true" />
                    </div>
                    <p className="text-sm text-neutral-700">
                      {tContext('stat3')} &mdash; {tContext('stat3Label')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8">
                  <h2 className="mb-6 text-xl font-semibold text-primary-950">
                    {t('cta')}
                  </h2>
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
