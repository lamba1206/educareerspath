import { Layout } from "@/components/Layout";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

import { AboutPage } from "@/pages/About";
import { AdminPage } from "@/pages/Admin";
import { AdminDashboardPage } from "@/pages/AdminDashboard";
import { AssessmentTakingPage } from "@/pages/AssessmentTaking";
import { AssessmentsPage } from "@/pages/Assessments";
import { BlogsPage } from "@/pages/Blogs";
import { CareerDetailPage } from "@/pages/CareerDetail";
import { CareerLibraryPage } from "@/pages/CareerLibrary";
import { CheckoutPage } from "@/pages/Checkout";
import { ContactPage } from "@/pages/Contact";
import { CounsellorDashboardPage } from "@/pages/CounsellorDashboard";
import { DashboardPage } from "@/pages/Dashboard";
import { EventsPage } from "@/pages/Events";
import { FutureSkillsPage } from "@/pages/FutureSkills";
import { HomePage } from "@/pages/Home";
import { HowItWorksPage } from "@/pages/HowItWorks";
import { OurEcosystemPage } from "@/pages/OurEcosystem";
import { ParentDashboardPage } from "@/pages/ParentDashboard";
import { PartnerDashboardPage } from "@/pages/PartnerDashboard";
import { PartnersPage } from "@/pages/Partners";
import { ProductsPage } from "@/pages/Products";
import { ProfilePage } from "@/pages/Profile";
import { ProofPage } from "@/pages/Proof";
import { ReportViewPage } from "@/pages/ReportView";
import { ResourcesPage } from "@/pages/Resources";
import { SchoolDashboardPage } from "@/pages/SchoolDashboard";
import { SchoolSolutionsPage } from "@/pages/SchoolSolutions";
import { TestimonialsPage } from "@/pages/Testimonials";
import { WhyChooseUsPage } from "@/pages/WhyChooseUs";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

/* === Ecosystem pages === */
const ourEcosystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/our-ecosystem",
  component: OurEcosystemPage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsPage,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/how-it-works",
  component: HowItWorksPage,
});

const schoolSolutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/school-solutions",
  component: SchoolSolutionsPage,
});

const futureSkillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/future-skills",
  component: FutureSkillsPage,
});

const whyChooseUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/why-choose-us",
  component: WhyChooseUsPage,
});

const proofRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/proof",
  component: ProofPage,
});

const testimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/testimonials",
  component: TestimonialsPage,
});

const partnersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partners",
  component: PartnersPage,
});

/* === Redirects for retired routes === */
const careerPassportRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career-passport",
  beforeLoad: () => {
    throw redirect({ to: "/products" });
  },
});

const indiaAdmissionsRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/india-admissions",
  beforeLoad: () => {
    throw redirect({ to: "/our-ecosystem" });
  },
});

const abroadAdmissionsRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/abroad-admissions",
  beforeLoad: () => {
    throw redirect({ to: "/our-ecosystem" });
  },
});

const scholarshipsRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/scholarships",
  beforeLoad: () => {
    throw redirect({ to: "/career-library" });
  },
});

const associatePartnerRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/associate-partner",
  beforeLoad: () => {
    throw redirect({ to: "/partners" });
  },
});

const certificationRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/certification",
  beforeLoad: () => {
    throw redirect({ to: "/our-ecosystem" });
  },
});

/* === External portal redirects (portal.educareerspath.com) ===
   TanStack redirect() only supports internal to: targets, so external
   redirects use window.location.replace() inside beforeLoad. */
const studentDashboardRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student-dashboard",
  beforeLoad: ({ location }) => {
    const target = new URL(
      "https://portal.educareerspath.com/student-dashboard/",
    );
    target.search = location.search.toString();
    window.location.replace(target.toString());
  },
});

const globalCareerLibraryRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/global-career-library",
  beforeLoad: () => {
    window.location.replace(
      "https://portal.educareerspath.com/global-career-library/",
    );
  },
});

const signinGlobalAdmissionsRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin/global-admissions",
  beforeLoad: () => {
    window.location.replace(
      "https://portal.educareerspath.com/signin/global-admissions",
    );
  },
});

const signinCareerLabRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin/career-lab",
  beforeLoad: () => {
    window.location.replace(
      "https://portal.educareerspath.com/signin/career-lab",
    );
  },
});

/* === Resources + remaining routes === */
const careerLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career-library",
  component: CareerLibraryPage,
});

const assessmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assessments",
  component: AssessmentsPage,
});

const assessmentTakingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assessments/$type",
  component: AssessmentTakingPage,
});

const reportViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports/$type",
  component: ReportViewPage,
});

const blogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blogs",
  component: BlogsPage,
});

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events",
  component: EventsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  beforeLoad: ({ location }) => {
    const target = new URL("https://portal.educareerspath.com/signin/");
    target.search = location.search.toString();
    window.location.replace(target.toString());
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

/* === Ecosystem expansion routes (Wave 5 placeholders) ===
 * These routes use PlaceholderPage so the router has no dead routes.
 * Real page implementations will replace these in Wave 5. */
const careerPassportProRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career-passport-pro",
  component: () => (
    <PlaceholderPage
      eyebrow="Premium plan"
      title="Career Passport Pro"
      description="The advanced tier of Career Passport — AI mentor, skill gap analysis, college predictor, resume builder, interview prep and a lifetime dashboard."
      cta={{ label: "Start free assessment", to: "/assessments" }}
    />
  ),
});

const psychometricAssessmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/psychometric-assessment",
  component: () => (
    <PlaceholderPage
      eyebrow="Scientific testing"
      title="Psychometric Assessment"
      description="Eleven dimensions — interest, personality, learning style, aptitude, emotional intelligence, leadership, motivation, career match, multiple intelligence, communication style and entrepreneurship potential."
      cta={{ label: "Take the assessment", to: "/assessments" }}
    />
  ),
});

const aiCareerPlannerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-career-planner",
  component: () => (
    <PlaceholderPage
      eyebrow="AI powered"
      title="AI Career Planner"
      description="AI mentor, career match, skill gap analysis, learning planner, scholarship and college recommendations, AI chat, roadmap generator and future job analysis."
      cta={{ label: "Try the planner", to: "/contact" }}
    />
  ),
});

const studyAbroadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/study-abroad",
  component: () => (
    <PlaceholderPage
      eyebrow="Global admissions"
      title="Study Abroad"
      description="University selection, scholarships, visa support, admission predictor, profile evaluation, application support, education loans and accommodation across nine countries."
      cta={{ label: "Book a consultation", to: "/contact" }}
    />
  ),
});

const codingAiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/coding-ai",
  component: () => (
    <PlaceholderPage
      eyebrow="Future skills"
      title="Coding & AI"
      description="Scratch, Blockly, Python, Java, JavaScript, web and app development, machine learning, AI, prompt engineering, generative AI, data science, cloud computing and cyber security."
      cta={{ label: "Explore future skills", to: "/future-skills" }}
    />
  ),
});

const roboticsIotRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/robotics-iot",
  component: () => (
    <PlaceholderPage
      eyebrow="Future skills"
      title="Robotics & IoT"
      description="Arduino, ESP32, Raspberry Pi, STM32, PIC, drone technology, embedded systems, IoT projects, sensors, PCB design, electronics, automation, 3D printing and industrial robotics."
      cta={{ label: "Explore future skills", to: "/future-skills" }}
    />
  ),
});

const collegeSolutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/college-solutions",
  component: () => (
    <PlaceholderPage
      eyebrow="For colleges"
      title="College Solutions"
      description="Placement cell, career centre, industry training, skill development, campus recruitment, AI dashboard, hackathons, innovation lab and certification programs."
      cta={{ label: "Talk to us", to: "/contact" }}
    />
  ),
});

const corporateSolutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/corporate-solutions",
  component: () => (
    <PlaceholderPage
      eyebrow="For business"
      title="Corporate Solutions"
      description="Corporate assessment, hiring assessment, leadership assessment, skill assessment, employee development, campus hiring, training and L&D."
      cta={{ label: "Partner with us", to: "/partners" }}
    />
  ),
});

const governmentCsrRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/government-csr",
  component: () => (
    <PlaceholderPage
      eyebrow="Public sector"
      title="Government & CSR"
      description="Skill India, Digital India, AI education, career guidance, employment, CSR projects, NGO partnerships, district projects and community development."
      cta={{ label: "Partner with us", to: "/partners" }}
    />
  ),
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: () => (
    <PlaceholderPage
      eyebrow="Help center"
      title="Frequently Asked Questions"
      description="Answers to the most common questions about assessments, Career Passport, counselling, study abroad, partnerships and the platform."
      cta={{ label: "Contact support", to: "/contact" }}
    />
  ),
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: ResourcesPage,
});

const careerDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/careers/$slug",
  component: CareerDetailPage,
});

/* === Role dashboards (marketing overview pages only — not functional dashboards) === */
const parentDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/parent-dashboard",
  component: ParentDashboardPage,
});

const schoolDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/school-dashboard",
  component: SchoolDashboardPage,
});

const partnerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partner-dashboard",
  component: PartnerDashboardPage,
});

const counsellorDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counsellor-dashboard",
  component: CounsellorDashboardPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-dashboard",
  component: AdminDashboardPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  ourEcosystemRoute,
  productsRoute,
  howItWorksRoute,
  schoolSolutionsRoute,
  futureSkillsRoute,
  whyChooseUsRoute,
  proofRoute,
  testimonialsRoute,
  partnersRoute,
  careerPassportRedirect,
  indiaAdmissionsRedirect,
  abroadAdmissionsRedirect,
  scholarshipsRedirect,
  associatePartnerRedirect,
  certificationRedirect,
  studentDashboardRedirect,
  globalCareerLibraryRedirect,
  signinGlobalAdmissionsRedirect,
  signinCareerLabRedirect,
  careerLibraryRoute,
  assessmentsRoute,
  assessmentTakingRoute,
  reportViewRoute,
  blogsRoute,
  eventsRoute,
  contactRoute,
  signInRoute,
  dashboardRoute,
  adminRoute,
  checkoutRoute,
  profileRoute,
  careerPassportProRoute,
  psychometricAssessmentRoute,
  aiCareerPlannerRoute,
  studyAbroadRoute,
  codingAiRoute,
  roboticsIotRoute,
  collegeSolutionsRoute,
  corporateSolutionsRoute,
  governmentCsrRoute,
  faqRoute,
  resourcesRoute,
  careerDetailRoute,
  parentDashboardRoute,
  schoolDashboardRoute,
  partnerDashboardRoute,
  counsellorDashboardRoute,
  adminDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
