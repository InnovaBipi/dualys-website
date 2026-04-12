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
        'border-l-2 border-accent-500 pl-5 py-2',
        className
      )}
    >
      <h3 className="font-display text-base font-semibold text-neutral-900">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
    </div>
  );
}
