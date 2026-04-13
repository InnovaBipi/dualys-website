import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Figma: type=primary — accent blue bg, white text
        primary: 'bg-accent-500 text-white hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25 active:scale-[0.98]',
        // Figma: type=secondary — accent blue border, transparent bg
        secondary: 'border border-accent-500 text-accent-500 bg-transparent hover:bg-accent-50 active:scale-[0.98]',
        // Figma: type=tertiary — no border, accent text
        tertiary: 'text-accent-500 hover:bg-accent-50 active:scale-[0.98]',
        // Figma: type=ghost — neutral text, subtle hover
        ghost: 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 active:scale-[0.98]',
        // Semantic: destructive actions (forms)
        destructive: 'bg-destructive text-white hover:bg-destructive/90 active:scale-[0.98]',
        // Inline text links
        link: 'text-accent-500 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-[33px] px-3 text-sm',   // Figma sm: 33px, 14px, pad 12px
        md: 'h-[39px] px-4 text-base',  // Figma md: 39px, 16px, pad 16px
        lg: 'h-12 px-8 text-base',      // Extended: larger CTAs
        xl: 'h-14 px-10 text-lg',       // Extended: hero CTAs
        icon: 'h-10 w-10',              // Square icon button
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
