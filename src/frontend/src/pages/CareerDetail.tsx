import type { CareerEntry } from "@/backend";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCareerBySlug, useCareers } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Coins,
  Compass,
  GraduationCap,
  Lightbulb,
  Link2,
  ListChecks,
  Rocket,
  Sparkles,
  TrendingUp,
  Trophy,
  Video,
  Wand2,
} from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function formatSalary(min: bigint, max: bigint, currency: string): string {
  const fmt = (n: bigint) => {
    const num = Number(n);
    if (num >= 10000000)
      return `${(num / 10000000).toFixed(num % 10000000 === 0 ? 0 : 2)} Cr`;
    if (num >= 100000)
      return `${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 1)} L`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)} K`;
    return num.toString();
  };
  const symbol = currency === "INR" ? "₹" : `${currency} `;
  return `${symbol}${fmt(min)} – ${symbol}${fmt(max)}`;
}

interface SectionProps {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  className?: string;
}

function Section({ id, icon: Icon, title, children, className }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden />
        </span>
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function PillList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge
          key={item}
          variant="secondary"
          className="rounded-full bg-primary/8 px-3 py-1 font-medium text-primary"
        >
          {item}
        </Badge>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-sm text-foreground"
        >
          <CheckCircle2
            className="mt-0.5 size-4 shrink-0 text-accent"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading skeleton                                                            */
/* -------------------------------------------------------------------------- */

function CareerDetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-4 w-32" />
      <Skeleton className="mb-3 h-12 w-2/3" />
      <Skeleton className="mb-8 h-6 w-40" />
      <div className="grid gap-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Not-found state                                                             */
/* -------------------------------------------------------------------------- */

function CareerNotFound({ slug }: { slug: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div
        className="glass-card mx-auto flex max-w-xl flex-col items-center gap-4 p-10"
        data-ocid="career_detail.empty_state"
      >
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Compass className="size-7" aria-hidden />
        </span>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Career not found
        </h2>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t find a career for{" "}
          <span className="font-mono text-foreground">/{slug}</span>. It may
          have been moved or renamed.
        </p>
        <Button asChild data-ocid="career_detail.back_button">
          <Link to="/career-library">
            <ArrowLeft className="size-4" aria-hidden /> Back to Career Library
          </Link>
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export function CareerDetailPage() {
  const { slug } = useParams({ from: "/careers/$slug" });
  const { data: career, isLoading } = useCareerBySlug(slug);
  const { data: allCareers } = useCareers(0n, 100n);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow="Career Detail" title="Loading career…" />
        <CareerDetailSkeleton />
      </div>
    );
  }

  if (!career) {
    return <CareerNotFound slug={slug} />;
  }

  const related = (allCareers ?? []).filter((c) =>
    career.relatedCareers.includes(c.slug),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1.5 pt-6 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link
          to="/career-library"
          className="transition-smooth hover:text-primary"
          data-ocid="career_detail.breadcrumb_link"
        >
          Career Library
        </Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-foreground">{career.name}</span>
      </nav>

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-12"
      >
        <div className="hero-mesh" aria-hidden>
          <div className="hero-mesh-orb hero-mesh-orb-blue" />
          <div className="hero-mesh-orb hero-mesh-orb-orange" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <Badge
            variant="secondary"
            className="w-fit gap-1.5 bg-primary/10 px-3 py-1 text-primary"
          >
            <Briefcase className="size-3" aria-hidden /> {career.category}
          </Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {career.name}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            {career.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/12 px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              <Coins className="size-4 text-accent" aria-hidden />
              {formatSalary(
                career.salaryRange.min,
                career.salaryRange.max,
                career.salaryRange.currency || "INR",
              )}
              <span className="text-xs font-normal text-muted-foreground">
                / year
              </span>
            </span>
          </div>
        </div>
      </motion.header>

      {/* Content sections */}
      <div className="mt-12 grid gap-12">
        {/* Introduction */}
        <Section id="introduction" icon={Sparkles} title="Introduction">
          <Prose>{career.introduction}</Prose>
        </Section>

        {/* Eligibility + Subjects side by side */}
        <div className="grid gap-12 lg:grid-cols-2">
          <Section id="eligibility" icon={ListChecks} title="Eligibility">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <BulletList items={career.eligibility} />
              </CardContent>
            </Card>
          </Section>
          <Section id="subjects" icon={GraduationCap} title="Subjects">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <PillList items={career.subjects} />
              </CardContent>
            </Card>
          </Section>
        </div>

        {/* Skills */}
        <Section id="skills" icon={Wand2} title="Skills">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <PillList items={career.skills} />
            </CardContent>
          </Card>
        </Section>

        {/* Salary + Growth side by side */}
        <div className="grid gap-12 lg:grid-cols-2">
          <Section id="salary" icon={Coins} title="Salary Range">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <p className="font-display text-2xl font-bold text-foreground">
                  {formatSalary(
                    career.salaryRange.min,
                    career.salaryRange.max,
                    career.salaryRange.currency || "INR",
                  )}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Annual compensation, entry to senior level.
                </p>
              </CardContent>
            </Card>
          </Section>
          <Section id="growth" icon={TrendingUp} title="Growth">
            <Prose>{career.growth}</Prose>
          </Section>
        </div>

        {/* Future Scope */}
        <Section id="future-scope" icon={Compass} title="Future Scope">
          <Prose>{career.futureScope}</Prose>
        </Section>

        {/* AI Impact — highlighted */}
        <Section id="ai-impact" icon={Lightbulb} title="AI Impact">
          <Card className="glass-card border-accent/30 bg-gradient-highlight">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Lightbulb className="size-4" aria-hidden />
                </span>
                <p className="text-[0.95rem] leading-relaxed text-foreground">
                  {career.aiImpact}
                </p>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Top Colleges + Scholarships + Entrance Exams */}
        <div className="grid gap-12 lg:grid-cols-3">
          <Section id="top-colleges" icon={Building2} title="Top Colleges">
            <Card className="glass-card h-full">
              <CardContent className="pt-6">
                <BulletList items={career.topColleges} />
              </CardContent>
            </Card>
          </Section>
          <Section id="scholarships" icon={Trophy} title="Scholarships">
            <Card className="glass-card h-full">
              <CardContent className="pt-6">
                <BulletList items={career.scholarships} />
              </CardContent>
            </Card>
          </Section>
          <Section
            id="entrance-exams"
            icon={GraduationCap}
            title="Entrance Exams"
          >
            <Card className="glass-card h-full">
              <CardContent className="pt-6">
                <BulletList items={career.entranceExams} />
              </CardContent>
            </Card>
          </Section>
        </div>

        {/* Education Path */}
        {career.educationPath.length > 0 ? (
          <Section
            id="education-path"
            icon={GraduationCap}
            title="Education Path"
          >
            <Card className="glass-card">
              <CardContent className="pt-6">
                <ol className="relative ml-3 border-l border-primary/20 pl-6">
                  {career.educationPath.map((step, i) => (
                    <li
                      key={step}
                      className="mb-5 last:mb-0"
                      data-ocid={`career_detail.education_path.item.${i + 1}`}
                    >
                      <span className="absolute -left-[1.65rem] flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <p className="text-sm font-medium text-foreground">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Section>
        ) : null}

        {/* Business Opportunities */}
        {career.businessOpportunities.length > 0 ? (
          <Section
            id="business-opportunities"
            icon={Rocket}
            title="Business Opportunities"
          >
            <Card className="glass-card">
              <CardContent className="pt-6">
                <BulletList items={career.businessOpportunities} />
              </CardContent>
            </Card>
          </Section>
        ) : null}

        {/* Videos */}
        {career.videos.length > 0 ? (
          <Section id="videos" icon={Video} title="Videos & Resources">
            <div className="grid gap-3 sm:grid-cols-2">
              {career.videos.map((url, i) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card hover-lift-sm flex items-center gap-3 p-4 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid={`career_detail.video.link.${i + 1}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Video className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      Watch on YouTube
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {url}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Section>
        ) : null}

        {/* Related Careers */}
        {related.length > 0 ? (
          <Section id="related-careers" icon={Link2} title="Related Careers">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c: CareerEntry, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <Link
                    to="/careers/$slug"
                    params={{ slug: c.slug }}
                    className="glass-card hover-lift-sm block h-full p-5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    data-ocid={`career_detail.related.link.${i + 1}`}
                  >
                    <Badge variant="secondary" className="mb-2 font-normal">
                      {c.category}
                    </Badge>
                    <p className="font-display font-semibold text-foreground">
                      {c.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {c.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>
        ) : null}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16"
      >
        <Card className="glass-card border-primary/20">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Explore more career paths
              </h3>
              <p className="text-sm text-muted-foreground">
                Browse 3,000+ careers across technology, design, business,
                engineering, healthcare, and finance.
              </p>
            </div>
            <Button asChild size="lg" data-ocid="career_detail.explore_button">
              <Link to="/career-library">
                <ArrowLeft className="size-4" aria-hidden /> Career Library
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
