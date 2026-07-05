import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";

interface LockedOverlayProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  /** When provided, the CTA renders as a link-style button. */
  href?: string;
  children?: React.ReactNode;
}

/**
 * Overlay used to gate Career Library and Student Dashboard behind the
 * Career Passport purchase. Renders a translucent scrim over its parent
 * (which should be `relative` positioned) with a clear recovery CTA.
 */
export function LockedOverlay({
  title = "Career Passport required",
  description = "Unlock the full Career Library, your Student Dashboard, and auto-generated reports with a one-time Career Passport purchase.",
  ctaLabel = "Get the Career Passport",
  onCta,
  href,
  children,
}: LockedOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm"
      data-ocid="locked.overlay"
    >
      <div className="mx-4 flex max-w-md flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center shadow-elevated">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock className="size-6" aria-hidden />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {children}
        {href ? (
          <Button asChild data-ocid="locked.cta_link">
            <Link to={href}>{ctaLabel}</Link>
          </Button>
        ) : onCta ? (
          <Button onClick={onCta} data-ocid="locked.cta_button">
            {ctaLabel}
          </Button>
        ) : null}
      </div>
    </motion.div>
  );
}
