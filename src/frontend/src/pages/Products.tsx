import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bot,
  Brain,
  Check,
  Code2,
  Cog,
  Cpu,
  FileText,
  GraduationCap,
  HardDrive,
  LayoutDashboard,
  Map as MapIcon,
  Plane,
  Rocket,
  Sparkles,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";

interface Audience {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

interface IncludedService {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  pro?: boolean;
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  featured?: boolean;
  audiences: Audience[];
  services: IncludedService[];
  cta: { label: string; to: string; ocid: string };
  secondaryCta: { label: string; to: string; ocid: string };
}

const AUDIENCES: Audience[] = [
  {
    icon: GraduationCap,
    label: "School & College Students",
    description:
      "Class 10–12 and undergraduates choosing a stream, course, or first career direction.",
  },
  {
    icon: FileText,
    label: "Graduates",
    description:
      "Recent graduates deciding between higher study, job hunting, or a career switch.",
  },
  {
    icon: BarChart3,
    label: "Working Professionals",
    description:
      "Early- and mid-career professionals planning a pivot, upskilling, or specialisation.",
  },
];

const PASSPORT_SERVICES: IncludedService[] = [
  { icon: Brain, label: "Psychometric Assessment" },
  { icon: FileText, label: "Career Report" },
  { icon: Users, label: "Career Counselling" },
  { icon: GraduationCap, label: "Admission Support" },
  { icon: Plane, label: "Study Abroad Support" },
  { icon: Sparkles, label: "Skill Development" },
];

const PRO_EXTRA_SERVICES: IncludedService[] = [
  { icon: Bot, label: "AI Learning", pro: true },
  { icon: Code2, label: "Coding", pro: true },
  { icon: Cpu, label: "Robotics", pro: true },
  { icon: Wrench, label: "STEM Kits", pro: true },
  { icon: HardDrive, label: "Computer Hardware", pro: true },
  { icon: Cog, label: "Educational Equipment", pro: true },
  { icon: Zap, label: "Priority Mentorship", pro: true },
  { icon: Sparkles, label: "Future Skills", pro: true },
  { icon: LayoutDashboard, label: "Premium Dashboard", pro: true },
];

const PRODUCTS: Product[] = [
  {
    id: "career-passport",
    name: "Career Passport",
    tagline:
      "Everything a student needs to move from confusion to a clear, evidence-backed career direction.",
    price: "₹3,999",
    priceNote: "One-time · lifetime access · no renewals",
    audiences: AUDIENCES,
    services: PASSPORT_SERVICES,
    cta: {
      label: "Buy the Career Passport",
      to: "/checkout",
      ocid: "products.passport.buy_button",
    },
    secondaryCta: {
      label: "Talk to our team",
      to: "/contact",
      ocid: "products.passport.contact_button",
    },
  },
  {
    id: "career-passport-pro",
    name: "Career Passport Pro",
    tagline:
      "The complete EduCareersPath experience — every Passport service plus hands-on future-skills tracks, hardware, and priority mentorship.",
    price: "₹12,999",
    priceNote: "One-time · lifetime access · priority support",
    featured: true,
    audiences: AUDIENCES,
    services: [...PASSPORT_SERVICES, ...PRO_EXTRA_SERVICES],
    cta: {
      label: "Buy Career Passport Pro",
      to: "/checkout",
      ocid: "products.pro.buy_button",
    },
    secondaryCta: {
      label: "Contact for groups",
      to: "/contact",
      ocid: "products.pro.contact_button",
    },
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const featured = product.featured;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={cn(
        "glass-card hover-lift relative flex h-full flex-col p-7 md:p-8",
        featured && "ring-2 ring-accent/40",
      )}
    >
      {featured ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <StatusBadge tone="warning" className="shadow-sm">
            <Sparkles className="size-3" aria-hidden /> Most complete
          </StatusBadge>
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-xl",
            featured
              ? "bg-gradient-accent text-accent-foreground"
              : "bg-primary/10 text-primary",
          )}
        >
          {featured ? (
            <Rocket className="size-6" aria-hidden />
          ) : (
            <FileText className="size-6" aria-hidden />
          )}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            {product.name}
          </h3>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.priceNote}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {product.tagline}
      </p>

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold text-foreground">
          {product.price}
        </span>
      </div>

      {/* Audiences */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
          Who it's for
        </p>
        <ul className="mt-3 space-y-2.5">
          {product.audiences.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    {a.label}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {a.description}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Included services */}
      <div className="mt-6 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
          What's included
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {product.services.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.label}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-md",
                    s.pro
                      ? "bg-accent/15 text-accent"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {s.pro ? (
                    <Check className="size-3.5" aria-hidden />
                  ) : (
                    <Icon className="size-3.5" aria-hidden />
                  )}
                </span>
                <span className={s.pro ? "font-medium" : ""}>{s.label}</span>
                {s.pro ? (
                  <StatusBadge tone="warning" className="ml-auto text-[10px]">
                    Pro
                  </StatusBadge>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-3">
        <CTAButton
          asChild
          tone={featured ? "accent" : "primary"}
          size="lg"
          className="w-full"
          data-ocid={product.cta.ocid}
        >
          <Link to={product.cta.to}>{product.cta.label}</Link>
        </CTAButton>
        <CTAButton
          asChild
          tone="outline"
          className="w-full"
          data-ocid={product.secondaryCta.ocid}
        >
          <Link to={product.secondaryCta.to}>{product.secondaryCta.label}</Link>
        </CTAButton>
      </div>
    </motion.div>
  );
}

const COMPARISON_NOTES = [
  {
    icon: MapIcon,
    title: "One connected path",
    body: "Every Passport service feeds the next — your assessment shapes your report, your report shapes your counselling, your counselling shapes your roadmap.",
  },
  {
    icon: GraduationCap,
    title: "Built for every stage",
    body: "From a Class 10 student choosing a stream to a working professional planning a pivot, both Passports scale to where you are.",
  },
  {
    icon: Sparkles,
    title: "Pro adds the future",
    body: "Career Passport Pro layers AI, coding, robotics, STEM kits, and priority mentorship on top of the core Passport — for students who want hands-on future-skills practice.",
  },
];

export function ProductsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div
          className="absolute inset-0 -z-10 bg-gradient-primary opacity-[0.04]"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            eyebrow="The EduCareersPath products"
            title="Two Passports. One connected journey."
            description="Career Passport gives every student the assessments, reports, and counselling they need to choose a direction. Career Passport Pro adds the future-skills tracks, hardware, and priority mentorship that turn a direction into a working career."
            align="center"
          />
        </div>
      </section>

      {/* Product cards */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison notes */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why two Passports"
            title="Choose the depth that fits"
            description="Both Passports share the same core — assessments, reports, counselling, and admissions. Pro extends that core with hands-on future-skills practice and priority support."
            align="center"
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {COMPARISON_NOTES.map((n, i) => {
              const Icon = n.icon;
              return (
                <motion.div
                  key={n.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="glass-card hover-lift-sm h-full p-6">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                      {n.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {n.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="glass-tinted flex flex-col items-center gap-6 rounded-2xl p-10 text-center md:p-14">
            <h2 className="max-w-2xl font-display text-2xl font-bold text-foreground md:text-3xl">
              Not sure which Passport is right?
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Our team can walk you through the difference and help you choose
              based on the student's stage, goals, and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <CTAButton
                asChild
                tone="primary"
                size="lg"
                data-ocid="products.cta_contact"
              >
                <Link to="/contact">Talk to our team</Link>
              </CTAButton>
              <CTAButton
                asChild
                tone="outline"
                size="lg"
                data-ocid="products.cta_assessments"
              >
                <Link to="/assessments">Start with an assessment</Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
