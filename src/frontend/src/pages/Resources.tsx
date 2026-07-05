import type { BlogPost, CareerEntry } from "@/backend";
import { BlogCard } from "@/components/BlogCard";
import { CareerCard } from "@/components/CareerCard";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBlogPosts, useCareers } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  Clock,
  Download,
  FileText,
  FileVideo,
  GraduationCap,
  LayoutTemplate,
  Newspaper,
  PlayCircle,
  Rocket,
  ScrollText,
  TrendingUp,
  Trophy,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/*  Sample content                                                            */
/* -------------------------------------------------------------------------- */

const SAMPLE_CAREERS: CareerEntry[] = [
  {
    id: "data-scientist",
    slug: "data-scientist",
    name: "Data Scientist",
    category: "Technology",
    description:
      "Build models that turn raw data into business decisions. Strong fit for analytical, inquisitive minds.",
    introduction: "",
    skills: ["Python", "Statistics", "Machine Learning", "SQL"],
    subjects: ["Mathematics", "Computer Science"],
    salaryRange: { min: 800000n, max: 2500000n, currency: "INR" },
    educationPath: ["B.Tech / B.Sc", "M.Sc in Data Science"],
    eligibility: ["Class 12 with Mathematics"],
    entranceExams: ["JEE Main", "GATE"],
    topColleges: ["IIT Bombay", "IISc Bangalore"],
    scholarships: ["AICTE Pragati"],
    businessOpportunities: ["Analytics consulting"],
    relatedCareers: ["ml-engineer", "data-analyst"],
    videos: [],
    growth: "35% projected growth by 2032.",
    futureScope: "AI and automation will expand the role.",
    aiImpact: "AI tooling accelerates model building.",
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "ux-researcher",
    slug: "ux-researcher",
    name: "UX Researcher",
    category: "Design",
    description:
      "Understand users through interviews, surveys, and usability tests to shape product decisions.",
    introduction: "",
    skills: ["Interviewing", "Synthesis", "Figma", "Psychology"],
    subjects: ["Psychology", "Design"],
    salaryRange: { min: 600000n, max: 1800000n, currency: "INR" },
    educationPath: ["Bachelor's in any field", "UX certification"],
    eligibility: ["Class 12 in any stream"],
    entranceExams: ["UCEED", "CEED"],
    topColleges: ["NID Ahmedabad", "IIT Bombay IDC"],
    scholarships: ["NID Scholarship"],
    businessOpportunities: ["UX consultancy"],
    relatedCareers: ["product-designer", "ui-designer"],
    videos: [],
    growth: "Steady growth as product-led companies expand.",
    futureScope: "Research operations will define senior roles.",
    aiImpact: "AI assists synthesis; researchers focus on interpretation.",
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "product-manager",
    slug: "product-manager",
    name: "Product Manager",
    category: "Business",
    description:
      "Own the what and why of a product. Bridge business, design, and engineering to ship the right thing.",
    introduction: "",
    skills: ["Strategy", "Communication", "Analytics", "Roadmapping"],
    subjects: ["Business", "Engineering"],
    salaryRange: { min: 1200000n, max: 4000000n, currency: "INR" },
    educationPath: ["B.Tech / BBA", "MBA (optional)"],
    eligibility: ["Class 12 in any stream"],
    entranceExams: ["CAT", "GMAT"],
    topColleges: ["IIM Ahmedabad", "ISB Hyderabad"],
    scholarships: ["IIM Need-based Scholarship"],
    businessOpportunities: ["Startup founder"],
    relatedCareers: ["program-manager", "founder"],
    videos: [],
    growth: "Among the fastest-growing roles in Indian tech.",
    futureScope: "AI-native product management will dominate.",
    aiImpact: "AI copilots accelerate specs; PMs focus on judgement.",
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
];

const FALLBACK_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "How to read your aptitude report",
    slug: "how-to-read-aptitude-report",
    excerpt:
      "A 5-minute guide to interpreting the score breakdowns in your aptitude report — and what each dimension actually measures.",
    body: "",
    author: "Dr. Anjali Mehta",
    tags: ["Aptitude", "Reports"],
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "2",
    title: "Big Five vs MBTI: what's the difference?",
    slug: "big-five-vs-mbti",
    excerpt:
      "Both are personality frameworks, but only one is taken seriously by modern psychology. Here's why we use Big Five.",
    body: "",
    author: "Rohan Kapoor",
    tags: ["Personality", "Science"],
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "3",
    title: "Holland Code explained for Indian students",
    slug: "holland-code-explained",
    excerpt:
      "RIASEC, six types, and why 'investigative' doesn't mean what you think it means. A plain-English explainer.",
    body: "",
    author: "Dr. Anjali Mehta",
    tags: ["Interest", "Careers"],
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
];

interface ResearchPaper {
  title: string;
  author: string;
  abstract: string;
  href: string;
}

const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title:
      "Career Maturity in Indian Adolescents: A Longitudinal Study of Stream Selection",
    author: "Dr. Anjali Mehta, NIMHANS",
    abstract:
      "Tracking 1,200 students from Class 9 through Class 12, this study examines how psychometric feedback and structured counselling shift career decision-making self-efficacy over four years.",
    href: "#",
  },
  {
    title:
      "The Holland Code in Non-Western Contexts: Validity Across Six Indian States",
    author: "Rohan Kapoor, IIT Bombay",
    abstract:
      "A cross-cultural validation of RIASEC interest profiles across urban and rural Indian cohorts, with recommendations for adapting the framework to regional language and labour contexts.",
    href: "#",
  },
  {
    title:
      "AI and the Future of Work: Skill Demand Forecasts for India 2025–2035",
    author: "EduCareersPath Research Unit",
    abstract:
      "A synthesis of 40 labour-market datasets projecting which roles will grow, shrink, and transform under AI adoption — with skill-cluster implications for K-12 guidance.",
    href: "#",
  },
  {
    title:
      "Parental Involvement and Adolescent Career Certainty: A Mediation Model",
    author: "Dr. Priya Sharma, Christ University",
    abstract:
      "This paper models how parental autonomy support, pressure, and information-sharing each mediate the relationship between assessment feedback and student career certainty.",
    href: "#",
  },
];

interface VideoResource {
  title: string;
  duration: string;
  href: string;
}

const VIDEO_RESOURCES: VideoResource[] = [
  {
    title: "Decoding your aptitude report in 12 minutes",
    duration: "12:04",
    href: "#",
  },
  {
    title: "Stream selection after Class 10: a decision framework",
    duration: "18:32",
    href: "#",
  },
  {
    title: "How AI is reshaping 12 careers by 2030",
    duration: "24:50",
    href: "#",
  },
  {
    title: "SOP writing: from blank page to submission",
    duration: "31:18",
    href: "#",
  },
];

interface DownloadResource {
  title: string;
  format: string;
  size: string;
  href: string;
}

const DOWNLOAD_RESOURCES: DownloadResource[] = [
  {
    title: "Career Passport Workbook (Class 9–12)",
    format: "PDF",
    size: "4.2 MB",
    href: "#",
  },
  {
    title: "Stream Selection Decision Worksheet",
    format: "PDF",
    size: "1.1 MB",
    href: "#",
  },
  {
    title: "SOP & LOR Template Pack (Abroad Admissions)",
    format: "DOCX",
    size: "2.8 MB",
    href: "#",
  },
  {
    title: "Scholarship Tracker Spreadsheet (India + Abroad)",
    format: "XLSX",
    size: "640 KB",
    href: "#",
  },
];

interface TemplateResource {
  title: string;
  type: string;
  href: string;
}

const TEMPLATE_RESOURCES: TemplateResource[] = [
  {
    title: "Career Roadmap Template (5-year)",
    type: "Roadmap",
    href: "#",
  },
  {
    title: "College Shortlist Comparison Matrix",
    type: "Spreadsheet",
    href: "#",
  },
  {
    title: "Parent–Student Career Conversation Guide",
    type: "Guide",
    href: "#",
  },
  {
    title: "Resume for First-Year Students",
    type: "Resume",
    href: "#",
  },
];

interface NewsItem {
  date: string;
  headline: string;
  source: string;
  href: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    date: "Jun 28, 2026",
    headline:
      "CUET 2026 pattern revised: section weighting shifts toward comprehension",
    source: "The Hindu",
    href: "#",
  },
  {
    date: "Jun 21, 2026",
    headline: "Germany expands Studienkolleg seats for Indian STEM applicants",
    source: "DAAD India",
    href: "#",
  },
  {
    date: "Jun 14, 2026",
    headline:
      "AICTE adds three new AI specialisations at the undergraduate level",
    source: "AICTE",
    href: "#",
  },
  {
    date: "Jun 06, 2026",
    headline:
      "NIRF 2026 rankings released: IIT Madras tops engineering for the eighth year",
    source: "MHRD",
    href: "#",
  },
];

interface FutureJob {
  title: string;
  growth: string;
  description: string;
}

const FUTURE_JOBS: FutureJob[] = [
  {
    title: "AI Prompt Engineer",
    growth: "+58%",
    description:
      "Designs and refines the prompts that steer large language models across products and workflows.",
  },
  {
    title: "Sustainability Analyst",
    growth: "+42%",
    description:
      "Measures and reports ESG impact for companies navigating climate disclosure mandates.",
  },
  {
    title: "Robotics Process Automator",
    growth: "+37%",
    description:
      "Builds software bots that automate repetitive enterprise workflows across finance and ops.",
  },
  {
    title: "Genomic Data Scientist",
    growth: "+31%",
    description:
      "Applies machine learning to genome datasets for diagnostics, drug discovery, and personalised medicine.",
  },
];

interface Scholarship {
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
}

const SCHOLARSHIPS: Scholarship[] = [
  {
    name: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    amount: "Up to ₹84,000 / year",
    eligibility: "Class 11–12 with Science; aptitude for research",
    deadline: "Aug 31, 2026",
  },
  {
    name: "AICTE Pragati Scholarship (Girls)",
    amount: "₹50,000 / year",
    eligibility: "Girl students in first-year technical degree",
    deadline: "Oct 15, 2026",
  },
  {
    name: "DAAD Study Scholarship (Germany)",
    amount: "€934 / month + travel",
    eligibility: "Graduate applicants to German universities",
    deadline: "Dec 01, 2026",
  },
  {
    name: "Commonwealth Master's Scholarship (UK)",
    amount: "Full tuition + £1,236 / month",
    eligibility: "Indian nationals applying to UK master's",
    deadline: "Oct 18, 2026",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section shell                                                             */
/* -------------------------------------------------------------------------- */

interface SectionShellProps {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
  children: React.ReactNode;
}

function SectionShell({
  id,
  icon: Icon,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaTo,
  children,
}: SectionShellProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="scroll-mt-24 py-10 md:py-14"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="size-4" aria-hidden />
            </span>
            {eyebrow}
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
        {ctaLabel && ctaTo ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            data-ocid={`resources.${id}.link`}
            className="group self-start md:self-auto"
          >
            <Link to={ctaTo}>
              {ctaLabel}
              <ArrowRight
                className="ml-1.5 size-4 transition-smooth group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Generic glass card                                                        */
/* -------------------------------------------------------------------------- */

interface GlassCardProps {
  index: number;
  marker: string;
  children: React.ReactNode;
}

function GlassCard({ index, marker, children }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Card
        data-ocid={marker}
        className="glass-card hover-lift h-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {children}
      </Card>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export function ResourcesPage() {
  const { data: careersData } = useCareers(0n, 50n);
  const { data: blogData } = useBlogPosts(true);

  const careers =
    careersData && careersData.length > 0
      ? careersData.slice(0, 3)
      : SAMPLE_CAREERS;
  const blogs =
    blogData && blogData.length > 0 ? blogData.slice(0, 3) : FALLBACK_BLOGS;

  const handleDownload = (item: DownloadResource) => {
    toast.success(`Downloading "${item.title}" (${item.format}, ${item.size})`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Resources"
        title="Everything you need, in one place"
        description="A unified knowledge hub spanning the entire EduCareersPath ecosystem — career library, blogs, research, videos, downloads, templates, news, future jobs, and scholarships. Browse any section below."
      />

      {/* (1) Career Library */}
      <SectionShell
        id="career-library"
        icon={Briefcase}
        eyebrow="Career Library"
        title="3,000+ careers, mapped and connected"
        description="Explore a sample of the careers in our library — each with skills, salary bands, education paths, and related roles. The full library is part of the Career Passport."
        ctaLabel="Browse all careers"
        ctaTo="/career-library"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career, i) => (
            <CareerCard key={career.id} career={career} index={i} />
          ))}
        </div>
      </SectionShell>

      {/* (2) Blogs */}
      <SectionShell
        id="blogs"
        icon={BookOpen}
        eyebrow="Blogs"
        title="Insights from across the ecosystem"
        description="Plain-English explainers on assessments, careers, colleges, exams, and admissions — written by our team of counsellors and researchers."
        ctaLabel="Read the blog"
        ctaTo="/blogs"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </SectionShell>

      {/* (3) Research */}
      <SectionShell
        id="research"
        icon={ScrollText}
        eyebrow="Research"
        title="Evidence behind the guidance"
        description="Peer-reviewed and in-house research that grounds every recommendation we make — from psychometric validity to labour-market forecasting."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {RESEARCH_PAPERS.map((paper, i) => (
            <GlassCard
              key={paper.title}
              index={i}
              marker={`resources.research.item.${i + 1}`}
            >
              <CardHeader>
                <Badge variant="secondary" className="w-fit font-normal">
                  <ScrollText className="size-3" aria-hidden /> Research paper
                </Badge>
                <CardTitle className="mt-2 font-display text-lg leading-snug">
                  {paper.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 text-xs">
                  <User className="size-3" aria-hidden /> {paper.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {paper.abstract}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <a
                  href={paper.href}
                  data-ocid={`resources.research.read_more.${i + 1}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-smooth hover:gap-2.5"
                >
                  Read more
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </CardFooter>
            </GlassCard>
          ))}
        </div>
      </SectionShell>

      {/* (4) Videos */}
      <SectionShell
        id="videos"
        icon={FileVideo}
        eyebrow="Videos"
        title="Watch and learn"
        description="Short, practical walkthroughs of assessments, decisions, and admissions — most under 30 minutes, all recorded for on-demand viewing."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VIDEO_RESOURCES.map((video, i) => (
            <GlassCard
              key={video.title}
              index={i}
              marker={`resources.videos.item.${i + 1}`}
            >
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-t-xl bg-gradient-primary">
                <PlayCircle
                  className="size-10 text-primary-foreground/90"
                  aria-hidden
                />
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-xs font-semibold text-foreground backdrop-blur">
                  <Clock className="size-3" aria-hidden /> {video.duration}
                </span>
              </div>
              <CardHeader className="pt-4">
                <CardTitle className="font-display text-base leading-snug">
                  {video.title}
                </CardTitle>
              </CardHeader>
              <CardFooter className="border-t pt-4">
                <a
                  href={video.href}
                  data-ocid={`resources.videos.watch.${i + 1}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-smooth hover:gap-2.5"
                >
                  Watch
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </CardFooter>
            </GlassCard>
          ))}
        </div>
      </SectionShell>

      {/* (5) Downloads */}
      <SectionShell
        id="downloads"
        icon={Download}
        eyebrow="Downloads"
        title="Take it offline"
        description="Workbooks, worksheets, and templates you can print or fill in — built to extend the platform into the classroom and the kitchen table."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOWNLOAD_RESOURCES.map((item, i) => (
            <GlassCard
              key={item.title}
              index={i}
              marker={`resources.downloads.item.${i + 1}`}
            >
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
                  <FileText className="size-5" aria-hidden />
                </div>
                <CardTitle className="mt-3 font-display text-base leading-snug">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {item.format} · {item.size}
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  data-ocid={`resources.downloads.download.${i + 1}`}
                  onClick={() => handleDownload(item)}
                >
                  <Download className="mr-1.5 size-4" aria-hidden />
                  Download
                </Button>
              </CardFooter>
            </GlassCard>
          ))}
        </div>
      </SectionShell>

      {/* (6) Templates */}
      <SectionShell
        id="templates"
        icon={LayoutTemplate}
        eyebrow="Templates"
        title="Start from a proven structure"
        description="Roadmaps, matrices, guides, and resumes — pre-built so you spend your time thinking, not formatting."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATE_RESOURCES.map((item, i) => (
            <GlassCard
              key={item.title}
              index={i}
              marker={`resources.templates.item.${i + 1}`}
            >
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LayoutTemplate className="size-5" aria-hidden />
                </div>
                <CardTitle className="mt-3 font-display text-base leading-snug">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {item.type}
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-t pt-4">
                <a
                  href={item.href}
                  data-ocid={`resources.templates.use.${i + 1}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-smooth hover:gap-2.5"
                >
                  Use template
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </CardFooter>
            </GlassCard>
          ))}
        </div>
      </SectionShell>

      {/* (7) Career News */}
      <SectionShell
        id="career-news"
        icon={Newspaper}
        eyebrow="Career News"
        title="What changed this month"
        description="Exam patterns, admissions, scholarships, and rankings — the policy and labour-market shifts that matter for your decisions."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {NEWS_ITEMS.map((item, i) => (
            <GlassCard
              key={item.headline}
              index={i}
              marker={`resources.news.item.${i + 1}`}
            >
              <CardHeader>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="size-3" aria-hidden />
                  <time>{item.date}</time>
                  <span aria-hidden>·</span>
                  <span className="font-semibold text-foreground">
                    {item.source}
                  </span>
                </div>
                <CardTitle className="mt-2 font-display text-base leading-snug">
                  {item.headline}
                </CardTitle>
              </CardHeader>
              <CardFooter className="border-t pt-4">
                <a
                  href={item.href}
                  data-ocid={`resources.news.read_more.${i + 1}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-smooth hover:gap-2.5"
                >
                  Read more
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </CardFooter>
            </GlassCard>
          ))}
        </div>
      </SectionShell>

      {/* (8) Future Jobs */}
      <SectionShell
        id="future-jobs"
        icon={Rocket}
        eyebrow="Future Jobs"
        title="Where the next decade is heading"
        description="Emerging roles and their projected growth — so you can plan a path toward work that will exist, and grow, by the time you graduate."
        ctaLabel="Explore careers"
        ctaTo="/career-library"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FUTURE_JOBS.map((job, i) => (
            <GlassCard
              key={job.title}
              index={i}
              marker={`resources.future_jobs.item.${i + 1}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="font-normal">
                    <Rocket className="size-3" aria-hidden /> Emerging
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-accent-foreground">
                    <TrendingUp className="size-4" aria-hidden />
                    {job.growth}
                  </span>
                </div>
                <CardTitle className="mt-2 font-display text-base leading-snug">
                  {job.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {job.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-t pt-4">
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-primary"
                  data-ocid={`resources.future_jobs.explore.${i + 1}`}
                >
                  <Link to="/career-library">
                    Explore related careers
                    <ArrowUpRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
              </CardFooter>
            </GlassCard>
          ))}
        </div>
      </SectionShell>

      {/* (9) Scholarships */}
      <SectionShell
        id="scholarships"
        icon={Trophy}
        eyebrow="Scholarships"
        title="Funding for every path"
        description="A sample of the scholarships in our library — Indian and abroad, merit and need-based. The full list is connected to your career and college shortlists."
        ctaLabel="See in Career Library"
        ctaTo="/career-library"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCHOLARSHIPS.map((item, i) => (
            <GlassCard
              key={item.name}
              index={i}
              marker={`resources.scholarships.item.${i + 1}`}
            >
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
                  <GraduationCap className="size-5" aria-hidden />
                </div>
                <CardTitle className="mt-3 font-display text-base leading-snug">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-sm font-semibold text-foreground">
                  {item.amount}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 text-xs text-muted-foreground">
                <p className="leading-relaxed">{item.eligibility}</p>
                <p className="mt-2 inline-flex items-center gap-1">
                  <CalendarDays className="size-3" aria-hidden />
                  Deadline: {item.deadline}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-primary"
                  data-ocid={`resources.scholarships.explore.${i + 1}`}
                >
                  <Link to="/career-library">
                    Find in Career Library
                    <ArrowUpRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
              </CardFooter>
            </GlassCard>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
