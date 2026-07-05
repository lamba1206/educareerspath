import { CTAButton } from "@/components/CTAButton";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  AI_PLANNER_CAPABILITIES,
  CAREER_LIBRARY_FIELDS,
  CODING_AI_TOPICS,
  COLLEGE_SOLUTIONS,
  CORPORATE_SOLUTIONS,
  ECOSYSTEM_ITEMS,
  FAQS,
  GOVERNMENT_CSR,
  HERO_CTAS,
  PARTNER_TYPES,
  PASSPORT_COMPONENTS,
  PASSPORT_PRO_ADDITIONS,
  PSYCHOMETRIC_DIMENSIONS,
  ROBOTICS_IOT_TOPICS,
  SCHOOL_SOLUTIONS,
  STATS,
  STUDY_ABROAD_COUNTRIES,
  STUDY_ABROAD_SERVICES,
  TESTIMONIALS,
  WHY_CHOOSE,
} from "./home-data";

/* === Section wrapper — alternating background bands for visual rhythm === */
function Section({
  id,
  tone = "default",
  children,
  className = "",
}: {
  id?: string;
  tone?: "default" | "muted" | "card" | "band";
  children: React.ReactNode;
  className?: string;
}) {
  const bg =
    tone === "muted"
      ? "bg-muted/30"
      : tone === "card"
        ? "bg-card"
        : tone === "band"
          ? "bg-gradient-band"
          : "bg-background";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {children}
      </div>
    </section>
  );
}

/* === Staggered motion wrapper for grid children === */
function StaggerItem({
  index,
  children,
  className = "",
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.6) }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* === Icon card — shared pattern for icon + title + body === */
function IconCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body?: string;
}) {
  return (
    <div className="glass-card hover-lift h-full p-5">
      <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-foreground">
        {title}
      </h3>
      {body ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
      ) : null}
    </div>
  );
}

/* === FAQ accordion item === */
function FaqItem({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="faq-item"
      data-state={open ? "open" : "closed"}
      data-ocid={`home.faq.item.${index + 1}`}
    >
      <button
        type="button"
        className="faq-trigger"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`home-faq-panel-${index + 1}`}
        data-ocid={`home.faq.trigger.${index + 1}`}
      >
        <span>{faq.question}</span>
        <ChevronDown className="faq-chevron size-5" aria-hidden />
      </button>
      {open ? (
        <div id={`home-faq-panel-${index + 1}`} className="faq-content">
          <div className="faq-content-inner">{faq.answer}</div>
        </div>
      ) : null}
    </div>
  );
}

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative">
      {/* ============================================================
          SECTION 1 — Hero with hero-mesh animated background
      ============================================================ */}
      <section id="hero" className="relative overflow-hidden bg-gradient-hero">
        <div className="hero-mesh" aria-hidden>
          <div className="hero-mesh-orb hero-mesh-orb-blue animate-mesh-drift" />
          <div className="hero-mesh-orb hero-mesh-orb-orange animate-mesh-drift" />
          <div className="hero-mesh-orb hero-mesh-orb-cyan animate-mesh-drift" />
          <div className="hero-mesh-grid" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              Your complete educational and career solution
            </span>

            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              India's Integrated{" "}
              <span className="text-gradient-primary">
                Career &amp; Education
              </span>{" "}
              Ecosystem
            </h1>

            <p className="mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
              Helping students make informed academic and career decisions
              through scientific assessments, expert guidance, future skills
              training and admission support.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {HERO_CTAS.map((cta, i) => (
                <CTAButton
                  key={cta.label}
                  asChild
                  tone={cta.tone}
                  size="lg"
                  data-ocid={`home.hero.cta.${i + 1}`}
                >
                  <Link to={cta.to}>
                    {cta.label}
                    {i === 0 ? (
                      <ArrowRight className="size-4" aria-hidden />
                    ) : null}
                  </Link>
                </CTAButton>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — Statistics band with 8 animated counters
      ============================================================ */}
      <Section tone="card" id="stats">
        <SectionHeading
          eyebrow="The scale behind the ecosystem"
          title="Numbers that power informed decisions"
          align="center"
          className="mb-10"
        />
        <div className="stat-band">
          {STATS.map((s, i) => (
            <StaggerItem key={s.label} index={i} className="stat-tile">
              <div className="stat-value">
                {s.value}
                <span className="stat-plus" />
              </div>
              <div className="stat-label">{s.label}</div>
            </StaggerItem>
          ))}
        </div>
      </Section>

      {/* ============================================================
          SECTION 3 — Our Ecosystem grid (24 cards)
      ============================================================ */}
      <Section id="ecosystem">
        <SectionHeading
          eyebrow="Our ecosystem"
          title="One platform, every career and education need"
          description="Twenty-four connected modules spanning assessments, guidance, future skills, admissions and partnerships."
          align="center"
          className="mb-10"
        />
        <div className="ecosystem-grid">
          {ECOSYSTEM_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.label} index={i}>
                <Link
                  to={item.to}
                  data-ocid={`home.ecosystem.item.${i + 1}`}
                  className={`ecosystem-card glass-card hover-lift h-full ${
                    item.featured ? "ecosystem-card-featured" : ""
                  }`}
                >
                  <div className="ecosystem-card-icon">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <span className="font-display text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </div>
      </Section>

      {/* ============================================================
          SECTION 4 — Why Choose (12 reason cards)
      ============================================================ */}
      <Section tone="muted" id="why-choose">
        <SectionHeading
          eyebrow="Why choose us"
          title="Twelve reasons students and institutions trust EduCareersPath"
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WHY_CHOOSE.map((r, i) => (
            <StaggerItem key={r.title} index={i} className="h-full">
              <IconCard icon={r.icon} title={r.title} body={r.body} />
            </StaggerItem>
          ))}
        </div>
      </Section>

      {/* ============================================================
          SECTION 5 — Career Passport (10 components)
      ============================================================ */}
      <Section id="career-passport">
        <SectionHeading
          eyebrow="Career Passport"
          title="Ten components that build a complete career picture"
          description="Our flagship offering — assessment, report, roadmap, counselling and guidance in one package."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PASSPORT_COMPONENTS.map((c, i) => (
            <StaggerItem key={c.title} index={i} className="h-full">
              <IconCard icon={c.icon} title={c.title} body={c.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="primary"
            size="lg"
            data-ocid="home.passport.cta"
          >
            <Link to="/products">
              Explore Career Passport
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 6 — Career Passport Pro (10 additions)
      ============================================================ */}
      <Section tone="band" id="career-passport-pro">
        <SectionHeading
          eyebrow="Career Passport Pro"
          title="Ten AI-powered additions for the full experience"
          description="Pro layers AI planning, mentorship, prediction and lifetime access on top of the Passport."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PASSPORT_PRO_ADDITIONS.map((c, i) => (
            <StaggerItem key={c.title} index={i} className="h-full">
              <IconCard icon={c.icon} title={c.title} body={c.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="accent"
            size="lg"
            data-ocid="home.passport_pro.cta"
          >
            <Link to="/career-passport-pro">
              Discover Passport Pro
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 7 — Psychometric Assessment (11 dimensions)
      ============================================================ */}
      <Section id="psychometric">
        <SectionHeading
          eyebrow="Psychometric Assessment"
          title="Eleven scientific dimensions for a true picture"
          description="A multi-dimensional assessment that captures aptitude, interest, personality and potential."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PSYCHOMETRIC_DIMENSIONS.map((d, i) => (
            <StaggerItem key={d.title} index={i} className="h-full">
              <IconCard icon={d.icon} title={d.title} body={d.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="primary"
            size="lg"
            data-ocid="home.psychometric.cta"
          >
            <Link to="/psychometric-assessment">
              Take the Assessment
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 8 — AI Career Planner (10 capabilities)
      ============================================================ */}
      <Section tone="muted" id="ai-planner">
        <SectionHeading
          eyebrow="AI Career Planner"
          title="Ten AI capabilities that adapt as you grow"
          description="An AI mentor, planner and analyst that turns your profile into a living roadmap."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {AI_PLANNER_CAPABILITIES.map((c, i) => (
            <StaggerItem key={c.title} index={i} className="h-full">
              <IconCard icon={c.icon} title={c.title} body={c.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="primary"
            size="lg"
            data-ocid="home.ai_planner.cta"
          >
            <Link to="/ai-career-planner">
              Try the AI Planner
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 9 — Career Library teaser (14 fields)
      ============================================================ */}
      <Section id="career-library">
        <SectionHeading
          eyebrow="Career Library"
          title="Fourteen fields of depth for every career"
          description="Each career in our library is documented across fourteen structured fields — from eligibility to AI impact."
          align="center"
          className="mb-10"
        />
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-3">
            {CAREER_LIBRARY_FIELDS.map((field, i) => (
              <StaggerItem key={field} index={i}>
                <span className="ladder-skill-pill inline-flex items-center px-4 py-2 text-sm">
                  {field}
                </span>
              </StaggerItem>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="outline"
            size="lg"
            data-ocid="home.career_library.cta"
          >
            <Link to="/career-library">
              Browse the Library
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 10 — Study Abroad (9 countries + 8 services)
      ============================================================ */}
      <Section tone="muted" id="study-abroad">
        <SectionHeading
          eyebrow="Study Abroad"
          title="Nine destinations, eight end-to-end services"
          description="From university selection to accommodation — a complete study abroad program."
          align="center"
          className="mb-10"
        />
        <div className="country-grid mb-12">
          {STUDY_ABROAD_COUNTRIES.map((c, i) => (
            <StaggerItem key={c.name} index={i}>
              <div className="country-card glass-card hover-lift">
                <div className="country-stripe" aria-hidden />
                <div className="flex items-center justify-between pt-2">
                  <span className="country-name">{c.name}</span>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                    {c.flag}
                  </span>
                </div>
                <div className="country-stat">
                  <span className="country-stat-label">Universities</span>
                  <span className="country-stat-value">{c.universities}</span>
                </div>
                <div className="country-stat">
                  <span className="country-stat-label">Popular for</span>
                  <span className="country-stat-value">{c.popular}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STUDY_ABROAD_SERVICES.map((s, i) => (
            <StaggerItem key={s.title} index={i} className="h-full">
              <IconCard icon={s.icon} title={s.title} body={s.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="primary"
            size="lg"
            data-ocid="home.study_abroad.cta"
          >
            <Link to="/study-abroad">
              Plan Study Abroad
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 11 — Coding & AI (14 topics, ladder)
      ============================================================ */}
      <Section id="coding-ai">
        <SectionHeading
          eyebrow="Coding & AI"
          title="Fourteen topics from Scratch to Generative AI"
          description="A structured curriculum that grows with the student — beginner to advanced."
          align="center"
          className="mb-10"
        />
        <div className="mx-auto max-w-3xl">
          <div className="ladder">
            {CODING_AI_TOPICS.map((t, i) => {
              const Icon = t.icon;
              const advanced = t.level === "Advanced";
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                  className={`ladder-rung animate-ladder-reveal ${
                    advanced ? "ladder-rung-advanced" : ""
                  }`}
                >
                  <div className="ladder-node">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-primary" aria-hidden />
                      <span className="ladder-title">{t.title}</span>
                      <span className="ladder-level ml-auto">{t.level}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="outline"
            size="lg"
            data-ocid="home.coding_ai.cta"
          >
            <Link to="/coding-ai">
              Explore Coding & AI
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 12 — Robotics & IoT (14 topics, ladder)
      ============================================================ */}
      <Section tone="muted" id="robotics-iot">
        <SectionHeading
          eyebrow="Robotics & IoT"
          title="Fourteen topics from Arduino to Industrial Robotics"
          description="Hands-on hardware learning that builds real engineering intuition."
          align="center"
          className="mb-10"
        />
        <div className="mx-auto max-w-3xl">
          <div className="ladder">
            {ROBOTICS_IOT_TOPICS.map((t, i) => {
              const Icon = t.icon;
              const advanced = t.level === "Advanced";
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                  className={`ladder-rung animate-ladder-reveal ${
                    advanced ? "ladder-rung-advanced" : ""
                  }`}
                >
                  <div className="ladder-node">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-primary" aria-hidden />
                      <span className="ladder-title">{t.title}</span>
                      <span className="ladder-level ml-auto">{t.level}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="outline"
            size="lg"
            data-ocid="home.robotics_iot.cta"
          >
            <Link to="/robotics-iot">
              Explore Robotics & IoT
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 13 — School Solutions (13 offerings)
      ============================================================ */}
      <Section id="school-solutions">
        <SectionHeading
          eyebrow="School Solutions"
          title="Thirteen offerings for future-ready schools"
          description="Labs, dashboards, training and events — a complete career guidance program for schools."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SCHOOL_SOLUTIONS.map((s, i) => (
            <StaggerItem key={s.title} index={i} className="h-full">
              <IconCard icon={s.icon} title={s.title} body={s.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="primary"
            size="lg"
            data-ocid="home.school_solutions.cta"
          >
            <Link to="/school-solutions">
              School Solutions
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 14 — College Solutions (9 offerings)
      ============================================================ */}
      <Section tone="muted" id="college-solutions">
        <SectionHeading
          eyebrow="College Solutions"
          title="Nine offerings for placement-ready colleges"
          description="Placement cells, career centres, training and analytics for higher education."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COLLEGE_SOLUTIONS.map((s, i) => (
            <StaggerItem key={s.title} index={i} className="h-full">
              <IconCard icon={s.icon} title={s.title} body={s.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="primary"
            size="lg"
            data-ocid="home.college_solutions.cta"
          >
            <Link to="/college-solutions">
              College Solutions
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 15 — Corporate Solutions (8 offerings)
      ============================================================ */}
      <Section id="corporate-solutions">
        <SectionHeading
          eyebrow="Corporate Solutions"
          title="Eight offerings for talent-driven organisations"
          description="Assessments, hiring, development and L&D for the modern enterprise."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORPORATE_SOLUTIONS.map((s, i) => (
            <StaggerItem key={s.title} index={i} className="h-full">
              <IconCard icon={s.icon} title={s.title} body={s.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="primary"
            size="lg"
            data-ocid="home.corporate_solutions.cta"
          >
            <Link to="/corporate-solutions">
              Corporate Solutions
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 16 — Government & CSR (9 offerings)
      ============================================================ */}
      <Section tone="muted" id="government-csr">
        <SectionHeading
          eyebrow="Government & CSR"
          title="Nine offerings for public skill missions"
          description="Scale career guidance and skill development across districts and communities."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GOVERNMENT_CSR.map((s, i) => (
            <StaggerItem key={s.title} index={i} className="h-full">
              <IconCard icon={s.icon} title={s.title} body={s.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="primary"
            size="lg"
            data-ocid="home.government_csr.cta"
          >
            <Link to="/government-csr">
              Government & CSR
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 17 — Partner Program (11 types)
      ============================================================ */}
      <Section id="partners">
        <SectionHeading
          eyebrow="Partner Program"
          title="Eleven ways to partner with EduCareersPath"
          description="Schools, colleges, corporates, government, NGOs and technology partners — there's a path for everyone."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PARTNER_TYPES.map((p, i) => (
            <StaggerItem key={p.title} index={i} className="h-full">
              <IconCard icon={p.icon} title={p.title} body={p.body} />
            </StaggerItem>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CTAButton
            asChild
            tone="accent"
            size="lg"
            data-ocid="home.partners.cta"
          >
            <Link to="/partners">
              Become a Partner
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ============================================================
          SECTION 18 — Testimonials (7 audience types)
      ============================================================ */}
      <Section tone="muted" id="testimonials">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted across seven audiences"
          description="Students, parents, schools, colleges, partners, corporates and government — hear from each."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const Icon = t.icon;
            return (
              <StaggerItem key={t.audience} index={i} className="h-full">
                <figure className="glass-card hover-lift flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      {t.audience}
                    </span>
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-4 border-t border-border pt-3">
                    <div className="font-display text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </div>
      </Section>

      {/* ============================================================
          SECTION 19 — FAQ accordion
      ============================================================ */}
      <Section id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about the ecosystem, assessments and partnerships."
          align="center"
          className="mb-10"
        />
        <div className="mx-auto max-w-3xl">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={i}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </Section>

      {/* ============================================================
          Final CTA
      ============================================================ */}
      <Section tone="card" id="final-cta">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Start your journey through the ecosystem today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Take the first step with a free psychometric assessment, then follow
            the roadmap from student to career growth.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CTAButton
              asChild
              tone="primary"
              size="lg"
              data-ocid="home.final_cta.assessment"
            >
              <Link to="/assessments">
                Take Assessment
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </CTAButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              data-ocid="home.final_cta.ecosystem"
            >
              <Link to="/our-ecosystem">Explore the ecosystem</Link>
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
