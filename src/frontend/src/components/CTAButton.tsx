import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";

const ctaVariants = cva(
  "relative overflow-hidden font-semibold transition-smooth",
  {
    variants: {
      tone: {
        primary:
          "bg-gradient-primary text-primary-foreground shadow-elevated hover:shadow-lg",
        accent:
          "bg-gradient-accent text-accent-foreground shadow-elevated hover:shadow-lg",
        outline:
          "border border-primary/40 bg-primary/5 text-primary hover:bg-primary/10",
      },
      size: {
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: { tone: "primary", size: "default" },
  },
);

type CTAProps = Omit<React.ComponentProps<"button">, "variant"> &
  VariantProps<typeof ctaVariants> & {
    /** Subtle shimmer sweep on hover for primary CTAs. */
    shimmer?: boolean;
    /** Render as the child element (e.g. an anchor) instead of a button. */
    asChild?: boolean;
  };

/**
 * Call-to-action button used for hero, section, and gating surfaces.
 * Wraps shadcn Button so all standard button props (asChild, disabled, etc.)
 * still work — only the visual treatment is customised.
 */
export const CTAButton = React.forwardRef<HTMLButtonElement, CTAProps>(
  function CTAButton(
    { tone, size, shimmer = true, asChild, className, ...props },
    ref,
  ) {
    return (
      <Button
        ref={ref}
        variant="default"
        asChild={asChild}
        className={cn(
          ctaVariants({ tone, size }),
          shimmer &&
            "after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent hover:after:translate-x-full after:transition-transform after:duration-700",
          className,
        )}
        {...props}
      />
    );
  },
);
