import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type * as React from "react";

type Tone = "default" | "success" | "warning" | "danger" | "info" | "muted";

const toneStyles: Record<Tone, string> = {
  default: "border-primary/30 bg-primary/10 text-primary",
  success: "border-blue-600/30 bg-blue-600/10 text-blue-600 dark:text-blue-400",
  warning:
    "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  danger: "border-destructive/30 bg-destructive/10 text-destructive",
  info: "border-chart-3/30 bg-chart-3/10 text-chart-3",
  muted: "border-border bg-muted text-muted-foreground",
};

interface StatusBadgeProps
  extends Omit<React.ComponentProps<"span">, "variant"> {
  tone?: Tone;
  children: React.ReactNode;
}

/**
 * Semantic status pill. Use `tone` instead of raw color classes so status
 * treatments stay consistent across the app.
 */
export function StatusBadge({
  tone = "default",
  className,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(toneStyles[tone], className)}
      {...props}
    >
      {children}
    </Badge>
  );
}
