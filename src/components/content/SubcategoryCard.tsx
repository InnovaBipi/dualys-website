import { cn } from '@/lib/utils';

interface SubcategoryCardProps {
  title: string;
  description: string;
  className?: string;
}

export function SubcategoryCard({
  title,
  description,
  className,
}: SubcategoryCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="mb-2 h-1 w-8 rounded-full bg-accent-500" aria-hidden="true" />
      <h3 className="font-display text-base font-semibold text-primary-950">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
    </div>
  );
}
