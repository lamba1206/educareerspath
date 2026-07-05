import type { CareerEntry } from "@/backend";
import { CTAButton } from "@/components/CTAButton";
import { CareerCard } from "@/components/CareerCard";
import { LockedOverlay } from "@/components/LockedOverlay";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useRequirePassport } from "@/hooks/useAuth";
import { useCareers } from "@/hooks/useQueries";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  Building2,
  Compass,
  GraduationCap,
  PlayCircle,
  Search,
  Trophy,
  University,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";

const FALLBACK_CAREERS: CareerEntry[] = [
  {
    id: "data-scientist",
    slug: "data-scientist",
    name: "Data Scientist",
    category: "Technology",
    description:
      "Build models that turn raw data into business decisions. Strong fit for analytical, inquisitive minds.",
    introduction:
      "Data Scientists translate raw data into actionable insight, blending statistics, programming, and domain knowledge to shape product and business strategy.",
    skills: [
      "Python",
      "Statistics",
      "Machine Learning",
      "SQL",
      "Communication",
    ],
    subjects: ["Mathematics", "Computer Science", "Statistics"],
    salaryRange: { min: 800000n, max: 2500000n, currency: "INR" },
    educationPath: [
      "B.Tech / B.Sc",
      "M.Sc / M.Tech in Data Science",
      "Portfolio projects",
    ],
    eligibility: ["Class 12 with Mathematics", "Strong analytical aptitude"],
    entranceExams: ["JEE Main", "GATE"],
    topColleges: ["IIT Bombay", "IISc Bangalore", "ISI Kolkata"],
    scholarships: ["AICTE Pragati", "Kishore Vaigyanik Protsahan Yojana"],
    businessOpportunities: ["Analytics consulting", "ML product startup"],
    relatedCareers: ["ml-engineer", "data-analyst", "ai-researcher"],
    videos: ["https://www.youtube.com/results?search_query=data+scientist"],
    growth: "High demand across every industry; 35% projected growth by 2032.",
    futureScope:
      "AI and automation will expand the role into decision-intelligence and MLOps specialisations.",
    aiImpact:
      "AI tooling accelerates model building; data scientists shift toward strategy and validation.",
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
    introduction:
      "UX Researchers uncover human behaviour and translate it into design insight, ensuring products serve real needs rather than assumptions.",
    skills: ["Interviewing", "Synthesis", "Prototyping", "Figma", "Psychology"],
    subjects: ["Psychology", "Design", "Sociology"],
    salaryRange: { min: 600000n, max: 1800000n, currency: "INR" },
    educationPath: ["Bachelor's in any field", "UX certification", "Portfolio"],
    eligibility: ["Class 12 in any stream", "Strong empathy and observation"],
    entranceExams: ["UCEED", "CEED"],
    topColleges: ["NID Ahmedabad", "IIT Bombay IDC", "Srishti Manipal"],
    scholarships: ["NID Scholarship", "Design India Fellowship"],
    businessOpportunities: ["UX consultancy", "Product design studio"],
    relatedCareers: ["product-designer", "ui-designer", "service-designer"],
    videos: ["https://www.youtube.com/results?search_query=ux+research"],
    growth: "Steady growth as product-led companies expand research teams.",
    futureScope:
      "Research operations and mixed-methods specialisation will define senior roles.",
    aiImpact:
      "AI assists synthesis and transcription; researchers focus on interpretation and ethics.",
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
    introduction:
      "Product Managers sit at the intersection of business, design, and engineering, defining what to build and why it matters to customers.",
    skills: [
      "Strategy",
      "Communication",
      "Analytics",
      "Prioritisation",
      "Roadmapping",
    ],
    subjects: ["Business", "Engineering", "Economics"],
    salaryRange: { min: 1200000n, max: 4000000n, currency: "INR" },
    educationPath: ["B.Tech / BBA", "MBA (optional)", "PM certifications"],
    eligibility: ["Class 12 in any stream", "Strong leadership and analytics"],
    entranceExams: ["CAT", "GMAT"],
    topColleges: ["IIM Ahmedabad", "ISB Hyderabad", "IIT Delhi"],
    scholarships: ["IIM Need-based Scholarship", "ISB Scholarship"],
    businessOpportunities: ["Startup founder", "Product consultancy"],
    relatedCareers: ["program-manager", "founder", "business-analyst"],
    videos: ["https://www.youtube.com/results?search_query=product+manager"],
    growth:
      "Among the fastest-growing roles in Indian tech and consumer brands.",
    futureScope:
      "AI-native product management and platform roles will dominate senior tracks.",
    aiImpact:
      "AI copilots accelerate specs and analytics; PMs focus on judgement and stakeholder alignment.",
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "civil-engineer",
    slug: "civil-engineer",
    name: "Civil Engineer",
    category: "Engineering",
    description:
      "Design and build the infrastructure that surrounds us — roads, bridges, buildings, and water systems.",
    introduction:
      "Civil Engineers design, construct, and maintain the physical infrastructure that society depends on, from bridges to water systems.",
    skills: [
      "AutoCAD",
      "Structural Analysis",
      "Project Management",
      "Surveying",
    ],
    subjects: ["Physics", "Mathematics", "Materials Science"],
    salaryRange: { min: 400000n, max: 1500000n, currency: "INR" },
    educationPath: [
      "B.Tech in Civil Engineering",
      "GATE / M.Tech (optional)",
      "PE licence",
    ],
    eligibility: ["Class 12 with Physics and Mathematics", "Strong physics"],
    entranceExams: ["JEE Main", "JEE Advanced", "GATE"],
    topColleges: ["IIT Madras", "IIT Delhi", "BITS Pilani"],
    scholarships: ["AICTE Scholarship", "Prime Minister's Research Fellowship"],
    businessOpportunities: ["Construction firm", "Infrastructure consultancy"],
    relatedCareers: ["structural-engineer", "architect", "project-engineer"],
    videos: ["https://www.youtube.com/results?search_query=civil+engineer"],
    growth: "Stable demand driven by infrastructure and urban development.",
    futureScope:
      "Sustainable materials and smart-city tech will reshape the discipline.",
    aiImpact:
      "AI aids structural optimisation and project scheduling; engineers remain on-site decision-makers.",
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "clinical-psychologist",
    slug: "clinical-psychologist",
    name: "Clinical Psychologist",
    category: "Healthcare",
    description:
      "Assess and treat mental health conditions through evidence-based therapy and assessment.",
    introduction:
      "Clinical Psychologists assess and treat mental health conditions using evidence-based therapy, supporting individuals across the lifespan.",
    skills: ["Assessment", "CBT", "Empathy", "Research", "Ethics"],
    subjects: ["Psychology", "Biology", "Statistics"],
    salaryRange: { min: 500000n, max: 2000000n, currency: "INR" },
    educationPath: [
      "BA / B.Sc Psychology",
      "MA / M.Sc Clinical Psychology",
      "M.Phil / RCI licence",
    ],
    eligibility: ["Class 12 in any stream", "Strong interpersonal skills"],
    entranceExams: ["CUET", "University entrance tests"],
    topColleges: ["NIMHANS Bangalore", "Tata IISc Mumbai", "Christ University"],
    scholarships: ["ICSSR Doctoral Fellowship", "NIMHANS Fellowship"],
    businessOpportunities: [
      "Private practice",
      "Corporate wellness consulting",
    ],
    relatedCareers: ["counsellor", "psychiatrist", "therapist"],
    videos: [
      "https://www.youtube.com/results?search_query=clinical+psychologist",
    ],
    growth: "Rising demand as mental health awareness expands in India.",
    futureScope:
      "Teletherapy and digital therapeutics will broaden access and reach.",
    aiImpact:
      "AI supports screening and triage; clinicians retain diagnosis and therapy.",
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "chartered-accountant",
    slug: "chartered-accountant",
    name: "Chartered Accountant",
    category: "Finance",
    description:
      "Audit, tax, and advisory work for businesses and individuals. ICAI-qualified finance professional.",
    introduction:
      "Chartered Accountants handle audit, taxation, and advisory work, ensuring financial integrity for businesses and individuals.",
    skills: ["Accounting", "Taxation", "Audit", "IFRS", "Analytical"],
    subjects: ["Accountancy", "Economics", "Business Studies"],
    salaryRange: { min: 700000n, max: 3000000n, currency: "INR" },
    educationPath: [
      "CA Foundation",
      "CA Intermediate",
      "Articleship",
      "CA Final",
    ],
    eligibility: ["Class 12 in any stream", "Strong numerical aptitude"],
    entranceExams: ["CA Foundation", "CA Intermediate", "CA Final"],
    topColleges: ["ICAI", "Symbiosis Pune", "Christ University"],
    scholarships: ["ICAI Scholarship", "Institute Merit Scholarship"],
    businessOpportunities: ["Audit firm partner", "Independent tax practice"],
    relatedCareers: ["cost-accountant", "financial-analyst", "auditor"],
    videos: [
      "https://www.youtube.com/results?search_query=chartered+accountant",
    ],
    growth: "Consistent demand across corporate, audit, and advisory sectors.",
    futureScope:
      "Specialisation in GST, forensic audit, and ESG reporting will grow.",
    aiImpact:
      "AI automates routine audit tasks; CAs focus on judgement, advisory, and ethics.",
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
];

const ECOSYSTEM_STATS = [
  { icon: Compass, value: "3,000+", label: "Career options mapped" },
  { icon: Building2, value: "10,000+", label: "Indian colleges" },
  { icon: University, value: "8,000+", label: "Universities worldwide" },
  { icon: GraduationCap, value: "1,400+", label: "Entrance exams tracked" },
  { icon: Trophy, value: "500+", label: "Scholarships listed" },
  { icon: PlayCircle, value: "1,200+", label: "Career videos" },
];

interface CareerLibrarySearch {
  q?: string;
  category?: string;
}

export function CareerLibraryPage() {
  const auth = useRequirePassport();
  const { data, isLoading } = useCareers(0n, 50n);
  const search = useSearch({ strict: false }) as CareerLibrarySearch;
  const navigate = useNavigate({ from: "/career-library" });

  const urlSearch = search.q ?? "";
  const urlCategory = search.category ?? "all";

  // Sync URL whenever filters change (debounced via navigate).
  const updateFilters = (next: { q?: string; category?: string }) => {
    navigate({
      to: "/career-library",
      search: (prev) => ({
        ...(prev as CareerLibrarySearch),
        ...next,
      }),
      replace: true,
    });
  };

  // Keep URL clean: drop default values.
  useEffect(() => {
    const trimmed = urlSearch.trim();
    const isDefault = trimmed === "" && (urlCategory === "all" || !urlCategory);
    if (
      isDefault &&
      (search.q !== undefined || search.category !== undefined)
    ) {
      navigate({ to: "/career-library", search: {}, replace: true });
    }
  }, [urlSearch, urlCategory, search.q, search.category, navigate]);

  const careers = data && data.length > 0 ? data : FALLBACK_CAREERS;
  const categories = useMemo(() => {
    const set = new Set(careers.map((c) => c.category));
    return ["all", ...Array.from(set).sort()];
  }, [careers]);

  const filtered = useMemo(() => {
    const term = urlSearch.toLowerCase();
    return careers.filter((c) => {
      const matchesSearch =
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.skills.some((s) => s.toLowerCase().includes(term));
      const matchesCategory =
        urlCategory === "all" || c.category === urlCategory;
      return matchesSearch && matchesCategory;
    });
  }, [careers, urlSearch, urlCategory]);

  const locked = auth.locked;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Career Library"
        title="Career Library"
        description="Explore 3,000+ career options across technology, design, business, engineering, healthcare, and finance — each with subjects, skills, salary bands, colleges, scholarships, exams, and AI impact."
      />

      {/* Ecosystem stats */}
      <section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {ECOSYSTEM_STATS.map((s) => (
            <Card key={s.label} className="glass-card text-center">
              <CardContent className="pt-5">
                <div className="mx-auto flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="size-4" aria-hidden />
                </div>
                <p className="mt-3 font-display text-xl font-bold text-foreground">
                  {s.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {s.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* Filters */}
      <section className="py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              placeholder="Search careers, skills..."
              value={urlSearch}
              onChange={(e) => updateFilters({ q: e.target.value })}
              className="pl-9"
              data-ocid="career_library.search_input"
            />
          </div>
          <Select
            value={urlCategory}
            onValueChange={(v) => updateFilters({ category: v })}
          >
            <SelectTrigger
              className="w-full sm:w-56"
              data-ocid="career_library.category_select"
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Grid */}
      <section className="relative py-8">
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <Skeleton
                key={`skeleton-${k}`}
                className="h-56 w-full rounded-xl"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card
            className="border-dashed"
            data-ocid="career_library.empty_state"
          >
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <Search className="size-8 text-muted-foreground" aria-hidden />
              <h3 className="font-display text-lg font-semibold text-foreground">
                No careers match your search
              </h3>
              <p className="text-sm text-muted-foreground">
                Try a different keyword or category.
              </p>
              <Button
                variant="outline"
                onClick={() => updateFilters({ q: "", category: "all" })}
                data-ocid="career_library.clear_button"
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <CareerCard key={c.id} career={c} index={i} />
            ))}
          </div>
        )}

        {locked ? (
          <LockedOverlay
            title="Career Passport required"
            description="The Career Library is part of the Career Passport. Purchase once for lifetime access to 3,000+ careers, colleges, exams, and scholarships."
            ctaLabel="Get the Career Passport"
            href="/products"
          />
        ) : null}
      </section>

      {/* CTA */}
      {!auth.isAuthenticated ? (
        <section className="py-12">
          <Card className="glass-card overflow-hidden border-primary/30">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Sign in to unlock the full ecosystem
                </h3>
                <p className="text-sm text-muted-foreground">
                  Career Passport holders get 3,000+ careers, 10,000+ colleges,
                  1,400+ exams, and scholarships — all connected to their
                  assessment results.
                </p>
              </div>
              <CTAButton
                asChild
                tone="primary"
                size="lg"
                data-ocid="career_library.signin_button"
              >
                <Link to="/sign-in">Sign in</Link>
              </CTAButton>
            </CardContent>
          </Card>
        </section>
      ) : null}
    </div>
  );
}
