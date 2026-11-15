import { Fragment, type ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export interface KeystoneContent {
  title: string;
  missionLabel: string;
  mission: string;
  text: string;
}

interface KeystoneSectionProps {
  content?: Partial<KeystoneContent> | null;
  className?: string;
}

const BRAND = 'KEYSTONE';

/**
 * Wraps every occurrence of the KEYSTONE brand name in <strong>, whatever the
 * case editors typed it in, and normalises it to the brand spelling.
 * Plain string split: no HTML is ever injected from content.
 */
export function highlightKeystone(text: string): ReactNode[] {
  return text.split(/(keystone)/i).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-primary-950">
        {BRAND}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

/**
 * Keeps "Tier 1-2-3" on one line and stops a " / " from starting a line, so
 * narrow viewports never split the title as "Tier 1-" / "2-3".
 */
export function formatKeystoneTitle(title: string): ReactNode[] {
  return title
    .replace(/ \//g, '\u00A0/')
    .split(/(Tier \d(?:-\d)*)/)
    .map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="whitespace-nowrap">
          {part}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
}

/**
 * KEYSTONE section for the audience landings: h2 title, mission block and a
 * highlighted card describing Dualys' Business Intelligence platform.
 * Renders nothing when the title or the KEYSTONE text are missing.
 */
export function KeystoneSection({ content, className }: KeystoneSectionProps) {
  const title = content?.title?.trim();
  const text = content?.text?.trim();
  if (!title || !text) return null;

  const missionLabel = content?.missionLabel?.trim();
  const mission = content?.mission?.trim();

  return (
    <section
      aria-labelledby="keystone-heading"
      className={cn('bg-neutral-50 py-16 md:py-24', className)}
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2
            id="keystone-heading"
            className="text-2xl font-bold tracking-tight text-primary-950 sm:text-3xl"
          >
            {formatKeystoneTitle(title)}
          </h2>

          {mission && (
            <div className="mt-8">
              {missionLabel && (
                <p className="text-sm font-semibold uppercase tracking-widest text-accent-700">
                  {missionLabel}
                </p>
              )}
              <p className="mt-3 text-lg leading-relaxed text-neutral-700">{mission}</p>
            </div>
          )}

          <div className="mt-10 rounded-xl border border-neutral-200 border-l-4 border-l-accent-500 bg-white p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="inline-flex items-center rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-700"
            >
              {BRAND}
            </span>
            <p className="mt-4 text-base leading-relaxed text-neutral-700 sm:text-lg">
              {highlightKeystone(text)}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
