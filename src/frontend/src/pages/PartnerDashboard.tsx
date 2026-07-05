import { DashboardOverview } from "@/components/DashboardOverview";
import {
  BarChart3,
  BookOpen,
  DollarSign,
  GraduationCap,
  LifeBuoy,
  Palette,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";

const NAV = [
  { icon: <Share2 className="size-4" />, label: "Referrals", active: true },
  { icon: <DollarSign className="size-4" />, label: "Commissions" },
  { icon: <Users className="size-4" />, label: "Enrollments" },
  { icon: <BarChart3 className="size-4" />, label: "Analytics" },
  { icon: <LifeBuoy className="size-4" />, label: "Support" },
];

const STATS = [
  { label: "Active referrals", value: "64", delta: "+9 this month" },
  { label: "Enrollments", value: "38", delta: "+6 new" },
  { label: "Commission earned", value: "₹1.2L", delta: "+₹18k" },
  { label: "Conversion rate", value: "59%", delta: "+3 pts" },
];

const FEATURES = [
  {
    icon: <Share2 className="size-5" />,
    title: "Referral tracking",
    body: "Track every referral from lead to enrollment with real-time status and attribution.",
  },
  {
    icon: <DollarSign className="size-5" />,
    title: "Commission management",
    body: "Transparent commission calculations, payouts and statements — all in one panel.",
  },
  {
    icon: <GraduationCap className="size-5" />,
    title: "Student enrollment stats",
    body: "See enrollment counts, course mix and trends across your referral pipeline.",
  },
  {
    icon: <BookOpen className="size-5" />,
    title: "Marketing resources",
    body: "Ready-to-use brochures, social posts, posters and campaign kits to drive referrals.",
  },
  {
    icon: <Palette className="size-5" />,
    title: "Training materials",
    body: "Onboarding guides, product walkthroughs and counsellor training resources.",
  },
  {
    icon: <TrendingUp className="size-5" />,
    title: "Performance analytics",
    body: "Dashboards for referral velocity, conversion and revenue across time periods.",
  },
  {
    icon: <LifeBuoy className="size-5" />,
    title: "Support ticket system",
    body: "Raise and track support requests with the EduCareersPath partner success team.",
  },
  {
    icon: <Palette className="size-5" />,
    title: "White-label branding",
    body: "Customise the portal with your brand colours, logo and domain for a seamless experience.",
  },
];

export function PartnerDashboardPage() {
  return (
    <DashboardOverview
      eyebrow="For partners"
      title="Partner Dashboard"
      description="Grow your education business — track referrals, manage commissions and access the resources you need to succeed."
      navItems={NAV}
      stats={STATS}
      features={FEATURES}
      portalUrl="/partner-dashboard/"
      ocidPrefix="partner_dashboard"
    />
  );
}
