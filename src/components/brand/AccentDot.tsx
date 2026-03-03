import { cn } from '@/lib/utils';

interface AccentDotProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Brand signature element - blue accent dot
 * Used after taglines, section headers, and key phrases
 *
 * @example
 * <h2>Our Capabilities<AccentDot /></h2>
 * <span>Dual-Use Technologies<AccentDot size="sm" /></span>
 */
export function AccentDot({ size = 'md', className }: AccentDotProps) {
  const sizes = {
    sm: 'h-1 w-1',     // 4px
    md: 'h-1.5 w-1.5', // 6px
    lg: 'h-2 w-2',     // 8px
  };

  return (
    <span
      className={cn(
        'inline-block rounded-full bg-accent-500 ml-1',
        sizes[size],
        className
      )}
      aria-hidden="true"
    />
  );
}
