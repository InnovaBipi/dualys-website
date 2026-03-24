'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Please enter a valid email address'),
  sector: z.string().min(1, 'Please select a sector'),
  challenge: z.string().min(20, 'Challenge must be at least 20 characters'),
  privacy: z.literal(true, {
    message: 'You must accept the privacy policy',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  className?: string;
}

const SECTOR_OPTIONS = ['industrial', 'tech', 'defense', 'other'] as const;

/**
 * Renders privacy label text with a link wrapping the privacy policy phrase.
 * Matches known privacy policy phrases across all supported languages.
 */
function PrivacyLabel({ text }: { text: string }) {
  const privacyPhrases = [
    'política de privacidad',
    'política de privadesa',
    'privacy policy',
    'politique de confidentialité',
  ];

  for (const phrase of privacyPhrases) {
    const lowerText = text.toLowerCase();
    const idx = lowerText.indexOf(phrase);
    if (idx !== -1) {
      const before = text.slice(0, idx);
      const match = text.slice(idx, idx + phrase.length);
      const after = text.slice(idx + phrase.length);
      return (
        <>
          {before}
          <Link href="/legal/privacy" className="text-accent-600 underline hover:text-accent-700">
            {match}
          </Link>
          {after}
        </>
      );
    }
  }

  // Fallback: render text as-is with a separate link
  return (
    <>
      {text}{' '}
      <Link href="/legal/privacy" className="text-accent-600 underline hover:text-accent-700">
        Privacy Policy
      </Link>
    </>
  );
}

export function ContactForm({ className }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      privacy: false as unknown as true,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate form submission - in production, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={cn('rounded-xl border border-success/30 bg-success/10 p-8 text-center', className)}>
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-success" />
        <h3 className="mb-2 text-xl font-semibold text-neutral-900">{t('submit')}</h3>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setSubmitStatus('idle')}
        >
          {t('submit')}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
    >
      {submitStatus === 'error' && (
        <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>Something went wrong. Please try again.</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-700">
            {t('name')} *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className={cn(
              'w-full rounded-lg border px-4 py-3 text-neutral-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
              errors.name ? 'border-destructive/50' : 'border-neutral-200'
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Company field */}
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-neutral-700">
            {t('company')} *
          </label>
          <input
            {...register('company')}
            type="text"
            id="company"
            className={cn(
              'w-full rounded-lg border px-4 py-3 text-neutral-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
              errors.company ? 'border-destructive/50' : 'border-neutral-200'
            )}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-destructive">{errors.company.message}</p>
          )}
        </div>
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-700">
          {t('email')} *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={cn(
            'w-full rounded-lg border px-4 py-3 text-neutral-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
            errors.email ? 'border-destructive/50' : 'border-neutral-200'
          )}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Sector dropdown */}
      <div>
        <label htmlFor="sector" className="mb-2 block text-sm font-medium text-neutral-700">
          {t('sector')} *
        </label>
        <select
          {...register('sector')}
          id="sector"
          defaultValue=""
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-3 text-neutral-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
            errors.sector ? 'border-destructive/50' : 'border-neutral-200'
          )}
        >
          <option value="" disabled>
            —
          </option>
          {SECTOR_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {t(`sectorOptions.${option}`)}
            </option>
          ))}
        </select>
        {errors.sector && (
          <p className="mt-1 text-sm text-destructive">{errors.sector.message}</p>
        )}
      </div>

      {/* Challenge textarea */}
      <div>
        <label htmlFor="challenge" className="mb-2 block text-sm font-medium text-neutral-700">
          {t('challenge')} *
        </label>
        <textarea
          {...register('challenge')}
          id="challenge"
          rows={5}
          className={cn(
            'w-full resize-none rounded-lg border px-4 py-3 text-neutral-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
            errors.challenge ? 'border-destructive/50' : 'border-neutral-200'
          )}
        />
        {errors.challenge && (
          <p className="mt-1 text-sm text-destructive">{errors.challenge.message}</p>
        )}
      </div>

      {/* RGPD consent checkbox */}
      <div>
        <div className="flex items-start gap-3">
          <input
            {...register('privacy')}
            type="checkbox"
            id="privacy"
            className="mt-1 h-4 w-4 rounded border-neutral-300 text-accent-600 focus:ring-accent-500"
          />
          <label htmlFor="privacy" className="text-sm text-neutral-700">
            <PrivacyLabel text={t('privacy')} /> *
          </label>
        </div>
        {errors.privacy && (
          <p className="mt-1 pl-7 text-sm text-destructive">{errors.privacy.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            {t('submit')}
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
