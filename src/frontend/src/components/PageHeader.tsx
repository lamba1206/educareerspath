import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type * as React from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
}

/**
 * Page-level hero header. Used at the top of every interior page to anchor
 * the page topic with a consistent eyebrow → title → description rhythm.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  children,
  className,
}: PageHeaderProps) {
  const centered = align === "center";
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "flex flex-col gap-4 py-10 md:py-14",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
            centered && "mx-auto",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base text-muted-foreground md:text-lg",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
      {children ? (
        <div
          className={cn(
            "mt-2 flex flex-wrap gap-3",
            centered && "justify-center",
          )}
        >
          {children}
        </div>
      ) : null}
    </motion.header>
  );
}
