import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "motion/react";
import type * as React from "react";

/** A single feature row in a dashboard overview feature list. */
export interface DashboardFeature {
  icon: React.ReactNode;
  title: string;
  body: string;
}

/** A sidebar nav preview item shown in the dash-shell layout. */
export interface DashboardNavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface DashboardOverviewProps {
  /** Short eyebrow label above the title (e.g. "For parents"). */
  eyebrow: string;
  /** Dashboard display name (e.g. "Parent Dashboard"). */
  title: string;
  /** One-line summary of what the dashboard offers. */
  description: string;
  /** Sidebar nav preview items — visual only, not clickable. */
  navItems: DashboardNavItem[];
  /** Quick-stat tiles shown at the top of the dash main column. */
  stats: { label: string; value: string; delta?: string }[];
  /** Feature list rendered as glassmorphism cards. */
  features: DashboardFeature[];
  /** CTA label (defaults to "Open the live dashboard"). */
  ctaLabel?: string;
  /** Portal URL the CTA links to. */
  portalUrl: string;
  /** data-ocid prefix for the page (e.g. "parent_dashboard"). */
  ocidPrefix: string;
}

const PORTAL_BASE = "https://portal.educareerspath.com";

/**
 * Shared marketing/overview layout for the 5 role dashboards. Renders a
 * dash-shell preview (sidebar + main) using the index.css dash-* utilities,
 * a glassmorphism feature list, and a prominent CTA to the live portal.
 *
 * These are overview pages only — the live, functional dashboards live on
 * portal.educareerspath.com.
 */
export function DashboardOverview({
  eyebrow,
  title,
  description,
  navItems,
  stats,
  features,
  ctaLabel = "Open the live dashboard",
  portalUrl,
  ocidPrefix,
}: DashboardOverviewProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />

      {/* === Dash preview shell === */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border bg-gradient-subtle p-3 md:p-4"
        aria-label={`${title} preview`}
      >
        <div className="dash-shell">
          {/* Sidebar preview */}
          <aside className="dash-sidebar glass-card rounded-xl">
            <div className="mb-3 flex items-center gap-2 px-2 pt-1">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <span className="font-display text-sm font-bold">E</span>
              </span>
              <span className="font-display text-sm font-semibold text-foreground">
                {title.replace(" Dashboard", "")}
              </span>
            </div>
            {navItems.map((item, i) => (
              <div
                key={item.label}
                className={`dash-nav-item ${item.active ? "dash-nav-item-active" : ""}`}
                data-ocid={`${ocidPrefix}.nav_item.${i + 1}`}
              >
                <span className="flex size-4 items-center justify-center text-primary">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </aside>

          {/* Main column */}
          <div className="dash-main">
            {/* Stat tiles */}
            <div className="dash-tile-grid">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="dash-tile glass-card rounded-xl"
                  data-ocid={`${ocidPrefix}.stat_tile.${i + 1}`}
                >
                  <span className="dash-tile-label">{s.label}</span>
                  <span className="dash-tile-value">{s.value}</span>
                  {s.delta ? (
                    <span className="dash-tile-delta">{s.delta}</span>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Preview placeholder panel */}
            <div
              className="glass-card flex min-h-[14rem] flex-col items-center justify-center gap-2 rounded-xl p-6 text-center"
              data-ocid={`${ocidPrefix}.preview_panel`}
            >
              <span className="font-display text-base font-semibold text-foreground">
                Live data lives on the portal
              </span>
              <p className="max-w-md text-sm text-muted-foreground">
                This is a preview of the {title.toLowerCase()} layout. Sign in
                on the portal to see real progress, reports and recommendations.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* === Feature list === */}
      <section className="py-12">
        <SectionHeading
          eyebrow="What this dashboard offers"
          title="Everything you need in one place"
          description="A focused set of tools designed for your role — all available on the live portal."
          align="center"
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className="glass-card hover-lift flex h-full flex-col gap-3 rounded-xl p-5"
                data-ocid={`${ocidPrefix}.feature_card.${i + 1}`}
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {f.icon}
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === CTA to portal === */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="pb-16"
      >
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-primary p-8 text-center md:p-12">
          <div className="hero-mesh">
            <div className="hero-mesh-orb hero-mesh-orb-orange" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl">
              The live dashboard is available on our portal
            </h2>
            <p className="max-w-xl text-sm text-primary-foreground/85 md:text-base">
              Sign in to portal.educareerspath.com to access the full{" "}
              {title.toLowerCase()} with real-time data, reports and tools.
            </p>
            <CTAButton
              asChild
              tone="accent"
              size="lg"
              data-ocid={`${ocidPrefix}.portal_cta_button`}
            >
              <a
                href={
                  portalUrl.startsWith("http")
                    ? portalUrl
                    : `${PORTAL_BASE}${portalUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctaLabel}
              </a>
            </CTAButton>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
