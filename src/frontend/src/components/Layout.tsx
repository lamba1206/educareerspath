import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  HelpCircle,
  Instagram,
  LayoutDashboard,
  LifeBuoy,
  Linkedin,
  LogOut,
  Mail,
  Map as MapIcon,
  Menu,
  Network,
  Phone,
  Plane,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Twitter,
  User as UserIcon,
  Users,
  Wrench,
  Youtube,
} from "lucide-react";
import type * as React from "react";
import { useState } from "react";

interface NavItem {
  label: string;
  to: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface NavGroup {
  label: string;
  to?: string;
  items?: NavItem[];
}

/* === Mega-menu structure — expanded top-level sections ===
 * Home, About, Ecosystem (dropdown), Solutions (dropdown),
 * Resources (dropdown), Partners, Contact, plus account menu.
 */
const PRIMARY_NAV: NavGroup[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Ecosystem",
    items: [
      {
        label: "Our Ecosystem",
        to: "/our-ecosystem",
        icon: Network,
        description: "The full EduCareersPath platform",
      },
      {
        label: "Products",
        to: "/products",
        icon: Rocket,
        description: "Career Passport, assessments & more",
      },
      {
        label: "How It Works",
        to: "/how-it-works",
        icon: Wrench,
        description: "From assessment to career clarity",
      },
      {
        label: "School Solutions",
        to: "/school-solutions",
        icon: GraduationCap,
        description: "Whole-school guidance programmes",
      },
      {
        label: "Future Skills",
        to: "/future-skills",
        icon: Sparkles,
        description: "Skills for the next decade of work",
      },
      {
        label: "Career Library",
        to: "/career-library",
        icon: BookOpen,
        description: "Explore 3,000+ career paths",
      },
      {
        label: "Assessments",
        to: "/assessments",
        icon: Sparkles,
        description: "Psychometric aptitude & interest tests",
      },
    ],
  },
  {
    label: "Solutions",
    items: [
      {
        label: "School Solutions",
        to: "/school-solutions",
        icon: School,
        description: "Guidance programmes for schools",
      },
      {
        label: "College Solutions",
        to: "/college-solutions",
        icon: GraduationCap,
        description: "Career cells for colleges & universities",
      },
      {
        label: "Corporate Solutions",
        to: "/corporate-solutions",
        icon: Building2,
        description: "L&D, CSR, and talent partnerships",
      },
      {
        label: "Government & CSR",
        to: "/government-csr",
        icon: ShieldCheck,
        description: "Public-sector skill & career missions",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Career Library",
        to: "/career-library",
        icon: BookOpen,
        description: "Explore 3,000+ career paths",
      },
      {
        label: "Blogs",
        to: "/blogs",
        icon: BookOpen,
        description: "Insights on careers & education",
      },
      {
        label: "Events",
        to: "/events",
        icon: CalendarDays,
        description: "Webinars, fairs & sessions",
      },
      {
        label: "Resources",
        to: "/resources",
        icon: Network,
        description: "All resources in one place",
      },
      {
        label: "FAQ",
        to: "/faq",
        icon: HelpCircle,
        description: "Answers to common questions",
      },
    ],
  },
  { label: "Partners", to: "/partners" },
  { label: "Contact", to: "/contact" },
];

/* === Footer navigation — 6 link groups + legal === */
const FOOTER_LINKS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Quick Links",
    items: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Our Ecosystem", to: "/our-ecosystem" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "Why Choose Us", to: "/why-choose-us" },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "Career Passport", to: "/career-passport" },
      { label: "Career Passport Pro", to: "/career-passport-pro" },
      { label: "Psychometric Assessment", to: "/psychometric-assessment" },
      { label: "AI Career Planner", to: "/ai-career-planner" },
      { label: "Study Abroad", to: "/study-abroad" },
      { label: "Coding & AI", to: "/coding-ai" },
      { label: "Robotics & IoT", to: "/robotics-iot" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Career Library", to: "/career-library" },
      { label: "Blogs", to: "/blogs" },
      { label: "Events", to: "/events" },
      { label: "Resources", to: "/resources" },
      { label: "FAQ", to: "/faq" },
      { label: "Assessments", to: "/assessments" },
    ],
  },
  {
    heading: "Partners",
    items: [
      { label: "Become a Partner", to: "/partners" },
      { label: "School Solutions", to: "/school-solutions" },
      { label: "College Solutions", to: "/college-solutions" },
      { label: "Corporate Solutions", to: "/corporate-solutions" },
      { label: "Government & CSR", to: "/government-csr" },
    ],
  },
  {
    heading: "Solutions",
    items: [
      { label: "School Solutions", to: "/school-solutions" },
      { label: "College Solutions", to: "/college-solutions" },
      { label: "Corporate Solutions", to: "/corporate-solutions" },
      { label: "Government & CSR", to: "/government-csr" },
      { label: "Future Skills", to: "/future-skills" },
    ],
  },
  {
    heading: "Contact",
    items: [
      { label: "Contact Us", to: "/contact" },
      { label: "Book a Demo", to: "/contact" },
      { label: "Testimonials", to: "/testimonials" },
      { label: "Proof of Implementation", to: "/proof" },
    ],
  },
];

/* === Social media links — used in the footer social row === */
const SOCIAL_LINKS: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/", icon: Twitter },
  { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/", icon: Youtube },
];

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5"
      data-ocid="nav.logo_link"
    >
      <img
        src="/assets/logo.png"
        alt="EduCareersPath — Discover your path"
        className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
        width={80}
        height={80}
      />
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Discover your path
        </span>
      </span>
    </Link>
  );
}

function isPathActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const router = useRouterState();
  const active = isPathActive(router.location.pathname, item.to);
  return (
    <Link
      to={item.to}
      onClick={onClick}
      data-ocid={`nav.link.${item.to.replace(/\//g, "").trim()}`}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-smooth",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {item.label}
    </Link>
  );
}

/** Desktop mega-menu dropdown trigger + panel for a nav group. */
function MegaMenu({ group }: { group: NavGroup }) {
  const router = useRouterState();
  const groupActive =
    group.items?.some((i) => isPathActive(router.location.pathname, i.to)) ??
    false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-ocid={`nav.dropdown.${group.label.toLowerCase()}`}
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            groupActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {group.label}
          <ChevronDown className="size-4" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 p-2" sideOffset={8}>
        {group.items?.map((item) => {
          const Icon = item.icon;
          const active = isPathActive(router.location.pathname, item.to);
          return (
            <DropdownMenuItem key={item.to} asChild>
              <Link
                to={item.to}
                data-ocid={`nav.link.${item.to.replace(/\//g, "").trim()}`}
                className={cn(
                  "flex items-start gap-3 rounded-md px-2 py-2 transition-smooth",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {Icon ? (
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                ) : null}
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.description ? (
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  ) : null}
                </span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AccountMenu() {
  const { profile, logout } = useAuth();
  const initials = (profile?.displayName ?? "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          data-ocid="nav.account_menu"
        >
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:inline">
            {profile?.displayName ?? "Account"}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-semibold">
            {profile?.displayName ?? "Signed in"}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {profile?.email ?? ""}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to="/dashboard"
            data-ocid="nav.dashboard_link"
            className="cursor-pointer"
          >
            <LayoutDashboard className="size-4" aria-hidden /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/profile"
            data-ocid="nav.profile_link"
            className="cursor-pointer"
          >
            <UserIcon className="size-4" aria-hidden /> Profile
          </Link>
        </DropdownMenuItem>
        {profile?.role === "admin" ? (
          <DropdownMenuItem asChild>
            <Link
              to="/admin"
              data-ocid="nav.admin_link"
              className="cursor-pointer"
            >
              <ShieldCheck className="size-4" aria-hidden /> Admin panel
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          data-ocid="nav.signout_button"
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="size-4" aria-hidden /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Render a top-level nav entry — link or mega-menu dropdown. */
function NavEntry({ group }: { group: NavGroup }) {
  if (group.items && group.items.length > 0) {
    return <MegaMenu group={group} />;
  }
  if (group.to) {
    return <NavLink item={{ label: group.label, to: group.to }} />;
  }
  return null;
}

function Header() {
  const { isAuthenticated, isInitializing } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 shadow-subtle backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {PRIMARY_NAV.map((group) => (
            <NavEntry key={group.label} group={group} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <AccountMenu />
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.location.href =
                    "https://portal.educareerspath.com/student-dashboard/?channel_id=NDQ1OQ==";
                }}
                disabled={isInitializing}
                data-ocid="nav.login_button"
              >
                {isInitializing ? "Loading…" : "Log in"}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  window.location.href =
                    "https://portal.educareerspath.com/signin/";
                }}
                disabled={isInitializing}
                data-ocid="nav.signin_button"
              >
                {isInitializing ? "Loading…" : "Sign in"}
              </Button>
            </>
          )}

          {/* Mobile drawer */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
                data-ocid="nav.open_drawer"
              >
                <Menu className="size-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <div className="flex items-center justify-between px-2 pt-2">
                <Logo />
              </div>
              <Accordion
                type="multiple"
                className="mt-6 px-2"
                aria-label="Mobile navigation"
              >
                {PRIMARY_NAV.map((group) =>
                  group.items && group.items.length > 0 ? (
                    <AccordionItem
                      key={group.label}
                      value={group.label}
                      className="border-b-0"
                    >
                      <AccordionTrigger
                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:no-underline hover:text-foreground"
                        data-ocid={`nav.mobile_dropdown.${group.label.toLowerCase()}`}
                      >
                        {group.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-1 pl-3">
                        <ul className="flex flex-col gap-0.5">
                          {group.items.map((item) => (
                            <li key={item.to}>
                              <Link
                                to={item.to}
                                onClick={() => setMobileOpen(false)}
                                data-ocid={`nav.link.${item.to.replace(/\//g, "").trim()}`}
                                className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : group.to ? (
                    <div key={group.label} className="px-1 py-0.5">
                      <NavLink
                        item={{ label: group.label, to: group.to }}
                        onClick={() => setMobileOpen(false)}
                      />
                    </div>
                  ) : null,
                )}
              </Accordion>
              <div className="mt-auto px-2 pb-6">
                {isAuthenticated ? (
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.mobile_dashboard"
                    >
                      <LayoutDashboard className="size-4" aria-hidden /> Go to
                      dashboard
                    </Link>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setMobileOpen(false);
                        window.location.href =
                          "https://portal.educareerspath.com/student-dashboard/?channel_id=NDQ1OQ==";
                      }}
                      disabled={isInitializing}
                      data-ocid="nav.mobile_login"
                    >
                      {isInitializing ? "Loading…" : "Log in"}
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setMobileOpen(false);
                        window.location.href =
                          "https://portal.educareerspath.com/signin/";
                      }}
                      disabled={isInitializing}
                      data-ocid="nav.mobile_signin"
                    >
                      {isInitializing ? "Loading…" : "Sign in"}
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <div className="lg:col-span-1 xl:col-span-1">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              AI-powered career counselling for Indian students. Aptitude,
              personality, and interest assessments with auto-generated reports
              and a curated Career Library.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a
                href="mailto:admin@educareerspath.com"
                className="inline-flex items-center gap-2 text-muted-foreground transition-smooth hover:text-primary"
                data-ocid="footer.email_link"
              >
                <Mail className="size-4" aria-hidden /> admin@educareerspath.com
              </a>
              <a
                href="tel:+919310262206"
                className="inline-flex items-center gap-2 text-muted-foreground transition-smooth hover:text-primary"
                data-ocid="footer.phone_link"
              >
                <Phone className="size-4" aria-hidden /> +91 93102 62206
              </a>
            </div>
          </div>
          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                {group.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item, idx) => (
                  <li key={`${item.to}-${idx}`}>
                    <Link
                      to={item.to}
                      data-ocid={`footer.link.${item.to.replace(/\//g, "").trim()}`}
                      className="text-sm text-muted-foreground transition-smooth hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social media row */}
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
              Follow us
            </span>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    data-ocid={`footer.social.${s.label.toLowerCase()}`}
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-smooth hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <Link
              to="/contact"
              data-ocid="footer.privacy_link"
              className="transition-smooth hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              data-ocid="footer.terms_link"
              className="transition-smooth hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} EduCareersPath. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined"
                  ? window.location.hostname
                  : "educareerspath.com",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
              data-ocid="footer.caffeine_link"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Persistent app shell: sticky header (logo, mega-menu primary nav,
 * account menu, mobile drawer with accordion dropdowns) + main content
 * region + footer with contact details, ecosystem-mirrored quick links,
 * and branding.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

/** Re-export icons used elsewhere for convenience. */
export { BookOpen, CalendarDays, LifeBuoy, Sparkles };
