import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Award,
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Building2,
  CalendarCheck,
  Compass,
  Cpu,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Landmark,
  LineChart,
  type LucideProps,
  Map as MapIcon,
  Medal,
  Megaphone,
  Mic,
  Network,
  Palette,
  Phone,
  Plane,
  Rocket,
  Scale,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";

export type IconType = ComponentType<LucideProps>;

/* === Section 1 — Hero CTAs (4 buttons) === */
export const HERO_CTAS = [
  {
    label: "Free Career Assessment",
    to: "/assessments",
    tone: "primary" as const,
  },
  { label: "Book Demo", to: "/contact", tone: "outline" as const },
  { label: "Become Partner", to: "/partners", tone: "accent" as const },
  { label: "Watch Demo", to: "#", tone: "outline" as const },
];

/* === Section 2 — Statistics band (8 stats) === */
export const STATS: { value: string; label: string }[] = [
  { value: "10,000+", label: "Students Guided" },
  { value: "300+", label: "Career Assessments" },
  { value: "500+", label: "Schools" },
  { value: "100+", label: "Partners" },
  { value: "1,000+", label: "Career Options" },
  { value: "100+", label: "Courses" },
  { value: "50+", label: "AI Tools" },
  { value: "24x7", label: "Support" },
];

/* === Section 3 — Our Ecosystem grid (24 items) === */
export const ECOSYSTEM_ITEMS: {
  label: string;
  to: string;
  icon: IconType;
  featured?: boolean;
}[] = [
  { label: "Career Passport", to: "/products", icon: Award, featured: true },
  {
    label: "Career Passport Pro",
    to: "/career-passport-pro",
    icon: Medal,
    featured: true,
  },
  {
    label: "Psychometric Assessment",
    to: "/psychometric-assessment",
    icon: Brain,
    featured: true,
  },
  { label: "Career Counselling", to: "/contact", icon: HeartHandshake },
  { label: "Career Library", to: "/career-library", icon: FileText },
  {
    label: "AI Career Planner",
    to: "/ai-career-planner",
    icon: Bot,
    featured: true,
  },
  { label: "Coding", to: "/coding-ai", icon: GitBranch },
  { label: "AI", to: "/coding-ai", icon: Bot },
  { label: "Robotics", to: "/robotics-iot", icon: Cpu },
  { label: "IoT", to: "/robotics-iot", icon: Network },
  { label: "Data Science", to: "/coding-ai", icon: Database },
  { label: "Cyber Security", to: "/coding-ai", icon: ShieldCheck },
  { label: "Study Abroad", to: "/study-abroad", icon: Plane, featured: true },
  { label: "Internships", to: "/career-library", icon: Briefcase },
  { label: "Placements", to: "/career-library", icon: Trophy },
  { label: "Scholarships", to: "/career-library", icon: Wallet },
  { label: "Entrepreneurship", to: "/future-skills", icon: Rocket },
  { label: "Government Schemes", to: "/government-csr", icon: Landmark },
  { label: "Corporate Assessments", to: "/corporate-solutions", icon: Gauge },
  { label: "Teacher Training", to: "/school-solutions", icon: GraduationCap },
  { label: "School Career Lab", to: "/school-solutions", icon: School },
  { label: "AI Lab", to: "/school-solutions", icon: Bot },
  { label: "Robotics Lab", to: "/school-solutions", icon: Cpu },
  { label: "Coding Lab", to: "/school-solutions", icon: GitBranch },
];

/* === Section 4 — Why Choose (12 reasons) === */
export const WHY_CHOOSE: { icon: IconType; title: string; body: string }[] = [
  {
    icon: Bot,
    title: "AI Powered Platform",
    body: "AI mentor, career match and roadmap generation built into every step.",
  },
  {
    icon: HeartHandshake,
    title: "Expert Career Guidance",
    body: "Certified counsellors turn assessment results into a clear plan.",
  },
  {
    icon: Database,
    title: "3000+ Career Knowledge Base",
    body: "A curated library spanning every major career path with deep detail.",
  },
  {
    icon: Brain,
    title: "Psychometric Assessment",
    body: "Eleven scientific dimensions for a true picture of aptitude and interest.",
  },
  {
    icon: Sparkles,
    title: "Future Skill Courses",
    body: "Coding, AI, robotics and data science for the next decade of work.",
  },
  {
    icon: Gauge,
    title: "AI Dashboard",
    body: "A single dashboard tracking assessments, roadmap and skill progress.",
  },
  {
    icon: MapIcon,
    title: "Career Roadmap",
    body: "Step-by-step roadmaps from where you are to where you want to be.",
  },
  {
    icon: Wallet,
    title: "Scholarship Guidance",
    body: "Curated scholarships and application support to fund your education.",
  },
  {
    icon: Briefcase,
    title: "Internship Support",
    body: "Real internships that build experience before you graduate.",
  },
  {
    icon: Trophy,
    title: "Placement Support",
    body: "Placement assistance connecting students with hiring partners.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship Guidance",
    body: "From idea to launch — mentorship for student founders.",
  },
  {
    icon: LineChart,
    title: "Personal Dashboard",
    body: "Your assessments, reports, roadmap and progress in one place.",
  },
];

/* === Section 5 — Career Passport (10 components) === */
export const PASSPORT_COMPONENTS: {
  icon: IconType;
  title: string;
  body: string;
}[] = [
  {
    icon: Brain,
    title: "Psychometric Assessment",
    body: "Scientific aptitude, personality and interest testing.",
  },
  {
    icon: FileText,
    title: "Career Report",
    body: "A detailed report mapping strengths to career paths.",
  },
  {
    icon: MapIcon,
    title: "Career Roadmap",
    body: "A step-by-step plan from now to your goal career.",
  },
  {
    icon: HeartHandshake,
    title: "Counselling Session",
    body: "One-on-one guidance with a certified counsellor.",
  },
  {
    icon: Users,
    title: "Parent Guidance",
    body: "Sessions to align parents with the student's path.",
  },
  {
    icon: GraduationCap,
    title: "Subject Selection",
    body: "Data-driven subject and stream selection after Class 10.",
  },
  {
    icon: Target,
    title: "Career Planning",
    body: "Long-term planning across academic milestones.",
  },
  {
    icon: Building2,
    title: "College Suggestions",
    body: "Curated college suggestions matched to your profile.",
  },
  {
    icon: Wallet,
    title: "Scholarship Suggestions",
    body: "Scholarships you qualify for, with application guidance.",
  },
  {
    icon: Gauge,
    title: "Dashboard Access",
    body: "Track everything from a single personal dashboard.",
  },
];

/* === Section 6 — Career Passport Pro (10 additions) === */
export const PASSPORT_PRO_ADDITIONS: {
  icon: IconType;
  title: string;
  body: string;
}[] = [
  {
    icon: Bot,
    title: "AI Career Planner",
    body: "AI-driven planning that adapts as you progress.",
  },
  {
    icon: Activity,
    title: "Skill Gap Analysis",
    body: "Identify the exact skills between you and your goal.",
  },
  {
    icon: MapIcon,
    title: "Learning Roadmap",
    body: "A learning plan with courses, projects and milestones.",
  },
  {
    icon: Bot,
    title: "AI Mentor",
    body: "An AI mentor available 24x7 for guidance and answers.",
  },
  {
    icon: GraduationCap,
    title: "College Predictor",
    body: "Predict admission outcomes based on your profile.",
  },
  {
    icon: LineChart,
    title: "Career Tracker",
    body: "Track progress against your roadmap over time.",
  },
  {
    icon: Briefcase,
    title: "Internship Guidance",
    body: "Curated internships matched to your career path.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    body: "Build a professional resume with AI assistance.",
  },
  {
    icon: Mic,
    title: "Interview Preparation",
    body: "Mock interviews and prep for real opportunities.",
  },
  {
    icon: Gauge,
    title: "Lifetime Dashboard",
    body: "Access your dashboard and roadmap for life.",
  },
];

/* === Section 7 — Psychometric Assessment (11 dimensions) === */
export const PSYCHOMETRIC_DIMENSIONS: {
  icon: IconType;
  title: string;
  body: string;
}[] = [
  {
    icon: HeartHandshake,
    title: "Interest",
    body: "What genuinely engages and motivates you.",
  },
  {
    icon: Users,
    title: "Personality",
    body: "Your traits, preferences and working style.",
  },
  {
    icon: Brain,
    title: "Learning Style",
    body: "How you absorb and retain information best.",
  },
  {
    icon: Target,
    title: "Aptitude",
    body: "Natural strengths across reasoning and ability.",
  },
  {
    icon: HeartHandshake,
    title: "Emotional Intelligence",
    body: "Self-awareness and interpersonal skills.",
  },
  {
    icon: Award,
    title: "Leadership",
    body: "Your capacity to lead and influence others.",
  },
  {
    icon: Zap,
    title: "Motivation",
    body: "What drives you to act and persist.",
  },
  {
    icon: Compass,
    title: "Career Match",
    body: "Careers aligned with your full profile.",
  },
  {
    icon: Sparkles,
    title: "Multiple Intelligence",
    body: "Eight intelligences beyond IQ alone.",
  },
  {
    icon: Mic,
    title: "Communication Style",
    body: "How you express and receive ideas.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship Potential",
    body: "Your readiness to build and lead ventures.",
  },
];

/* === Section 8 — AI Career Planner (10 capabilities) === */
export const AI_PLANNER_CAPABILITIES: {
  icon: IconType;
  title: string;
  body: string;
}[] = [
  {
    icon: Bot,
    title: "AI Mentor",
    body: "Conversational guidance available around the clock.",
  },
  {
    icon: Compass,
    title: "Career Match",
    body: "AI-matched careers from your assessment profile.",
  },
  {
    icon: Activity,
    title: "Skill Gap Analysis",
    body: "Pinpoint the skills you need to develop next.",
  },
  {
    icon: MapIcon,
    title: "Learning Planner",
    body: "A personalised learning plan with milestones.",
  },
  {
    icon: Wallet,
    title: "Scholarship Recommendation",
    body: "Scholarships matched to your profile and goals.",
  },
  {
    icon: Building2,
    title: "College Recommendation",
    body: "Colleges matched to your scores and preferences.",
  },
  {
    icon: Bot,
    title: "AI Chat",
    body: "Ask anything about careers, courses and exams.",
  },
  {
    icon: MapIcon,
    title: "Roadmap Generator",
    body: "Generate a roadmap to any career in seconds.",
  },
  {
    icon: LineChart,
    title: "Future Job Analysis",
    body: "Outlook and demand for any career path.",
  },
  {
    icon: Sparkles,
    title: "Personalised Insights",
    body: "Insights tailored to your unique profile.",
  },
];

/* === Section 9 — Career Library teaser (14 fields) === */
export const CAREER_LIBRARY_FIELDS: string[] = [
  "Introduction",
  "Eligibility",
  "Subjects",
  "Skills",
  "Salary",
  "Growth",
  "Future Scope",
  "Top Colleges",
  "Scholarships",
  "Entrance Exams",
  "AI Impact",
  "Business Opportunities",
  "Related Careers",
  "Videos",
];

/* === Section 10 — Study Abroad (9 countries + 8 services) === */
export const STUDY_ABROAD_COUNTRIES: {
  name: string;
  flag: string;
  universities: string;
  popular: string;
}[] = [
  {
    name: "USA",
    flag: "US",
    universities: "4,000+",
    popular: "STEM, Business",
  },
  {
    name: "Canada",
    flag: "CA",
    universities: "200+",
    popular: "Engineering, CS",
  },
  { name: "UK", flag: "GB", universities: "160+", popular: "Law, Finance" },
  {
    name: "Australia",
    flag: "AU",
    universities: "43",
    popular: "Medicine, Mining",
  },
  { name: "Germany", flag: "DE", universities: "400+", popular: "Engineering" },
  {
    name: "Europe",
    flag: "EU",
    universities: "3,000+",
    popular: "Design, Arts",
  },
  {
    name: "Japan",
    flag: "JP",
    universities: "780+",
    popular: "Robotics, Tech",
  },
  {
    name: "Singapore",
    flag: "SG",
    universities: "34",
    popular: "Business, CS",
  },
  {
    name: "Dubai",
    flag: "AE",
    universities: "60+",
    popular: "Management, Hospitality",
  },
];

export const STUDY_ABROAD_SERVICES: {
  icon: IconType;
  title: string;
  body: string;
}[] = [
  {
    icon: GraduationCap,
    title: "University Selection",
    body: "Find the right fit from thousands of universities.",
  },
  {
    icon: Wallet,
    title: "Scholarships",
    body: "Identify and apply for funding opportunities.",
  },
  { icon: Plane, title: "Visa", body: "End-to-end visa application support." },
  {
    icon: LineChart,
    title: "Admission Predictor",
    body: "Predict admission outcomes by profile.",
  },
  {
    icon: Gauge,
    title: "Profile Evaluation",
    body: "Honest evaluation of your application profile.",
  },
  {
    icon: FileText,
    title: "Application Support",
    body: "SOPs, LORs and application review.",
  },
  {
    icon: Wallet,
    title: "Education Loan",
    body: "Loan guidance and lender connections.",
  },
  {
    icon: Building2,
    title: "Accommodation",
    body: "Housing options near your campus.",
  },
];

/* === Section 11 — Coding & AI (14 topics) === */
export const CODING_AI_TOPICS: {
  icon: IconType;
  title: string;
  level: string;
}[] = [
  { icon: Palette, title: "Scratch", level: "Beginner" },
  { icon: GitBranch, title: "Blockly", level: "Beginner" },
  { icon: GitBranch, title: "Python", level: "Intermediate" },
  { icon: GitBranch, title: "Java", level: "Intermediate" },
  { icon: GitBranch, title: "JavaScript", level: "Intermediate" },
  { icon: Globe2, title: "Web Development", level: "Intermediate" },
  { icon: Globe2, title: "App Development", level: "Advanced" },
  { icon: Bot, title: "Machine Learning", level: "Advanced" },
  { icon: Bot, title: "AI", level: "Advanced" },
  { icon: Sparkles, title: "Prompt Engineering", level: "Advanced" },
  { icon: Sparkles, title: "Generative AI", level: "Advanced" },
  { icon: Database, title: "Data Science", level: "Advanced" },
  { icon: Globe2, title: "Cloud Computing", level: "Advanced" },
  { icon: ShieldCheck, title: "Cyber Security", level: "Advanced" },
];

/* === Section 12 — Robotics & IoT (14 topics) === */
export const ROBOTICS_IOT_TOPICS: {
  icon: IconType;
  title: string;
  level: string;
}[] = [
  { icon: Cpu, title: "Arduino", level: "Beginner" },
  { icon: Cpu, title: "ESP32", level: "Beginner" },
  { icon: Cpu, title: "Raspberry Pi", level: "Intermediate" },
  { icon: Cpu, title: "STM32", level: "Advanced" },
  { icon: Cpu, title: "PIC", level: "Advanced" },
  { icon: Plane, title: "Drone Technology", level: "Advanced" },
  { icon: Cpu, title: "Embedded Systems", level: "Advanced" },
  { icon: Network, title: "IoT Projects", level: "Intermediate" },
  { icon: Activity, title: "Sensors", level: "Beginner" },
  { icon: Cpu, title: "PCB Design", level: "Advanced" },
  { icon: Zap, title: "Electronics", level: "Beginner" },
  { icon: Wrench, title: "Automation", level: "Intermediate" },
  { icon: Cpu, title: "3D Printing", level: "Intermediate" },
  { icon: Cpu, title: "Industrial Robotics", level: "Advanced" },
];

/* === Section 13 — School Solutions (13 offerings) === */
export const SCHOOL_SOLUTIONS: {
  icon: IconType;
  title: string;
  body: string;
}[] = [
  {
    icon: School,
    title: "Career Lab",
    body: "A dedicated space for career exploration in school.",
  },
  {
    icon: Brain,
    title: "Psychometric Lab",
    body: "Assessment infrastructure for every student.",
  },
  {
    icon: GitBranch,
    title: "Coding Lab",
    body: "Structured coding curriculum from Class 6 onward.",
  },
  {
    icon: Bot,
    title: "AI Lab",
    body: "Hands-on AI and machine learning projects.",
  },
  {
    icon: Cpu,
    title: "Robotics Lab",
    body: "Robotics kits and project-based learning.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship Lab",
    body: "Build student ventures from idea to launch.",
  },
  {
    icon: Wallet,
    title: "Financial Literacy Lab",
    body: "Money, banking and personal finance basics.",
  },
  {
    icon: GraduationCap,
    title: "Teacher Training",
    body: "Upskill teachers on career guidance.",
  },
  {
    icon: Gauge,
    title: "Principal Dashboard",
    body: "School-wide visibility into student progress.",
  },
  {
    icon: Users,
    title: "Parent Dashboard",
    body: "Keep parents informed and engaged.",
  },
  {
    icon: LineChart,
    title: "Student Dashboard",
    body: "Each student's roadmap and progress.",
  },
  {
    icon: CalendarCheck,
    title: "Career Day Programs",
    body: "Curated career day events and speakers.",
  },
  {
    icon: Wrench,
    title: "Workshops",
    body: "Skill-building workshops throughout the year.",
  },
];

/* === Section 14 — College Solutions (9 offerings) === */
export const COLLEGE_SOLUTIONS: {
  icon: IconType;
  title: string;
  body: string;
}[] = [
  {
    icon: Briefcase,
    title: "Placement Cell",
    body: "A modern placement cell powered by data.",
  },
  {
    icon: HeartHandshake,
    title: "Career Centre",
    body: "A dedicated career centre for every student.",
  },
  {
    icon: Building2,
    title: "Industry Training",
    body: "Industry-aligned training programs.",
  },
  {
    icon: Sparkles,
    title: "Skill Development",
    body: "Future-skill courses for employability.",
  },
  {
    icon: Trophy,
    title: "Campus Recruitment",
    body: "Connect with hiring partners at scale.",
  },
  {
    icon: Gauge,
    title: "AI Dashboard",
    body: "Placement analytics and student tracking.",
  },
  {
    icon: Rocket,
    title: "Hackathons",
    body: "Host hackathons to surface top talent.",
  },
  {
    icon: Cpu,
    title: "Innovation Lab",
    body: "A lab for student projects and startups.",
  },
  {
    icon: Award,
    title: "Certification Programs",
    body: "Industry-recognised certifications.",
  },
];

/* === Section 15 — Corporate Solutions (8 offerings) === */
export const CORPORATE_SOLUTIONS: {
  icon: IconType;
  title: string;
  body: string;
}[] = [
  {
    icon: Gauge,
    title: "Corporate Assessment",
    body: "Assess talent across the organisation.",
  },
  {
    icon: Briefcase,
    title: "Hiring Assessment",
    body: "Pre-screen candidates with scientific tests.",
  },
  {
    icon: Award,
    title: "Leadership Assessment",
    body: "Identify and develop future leaders.",
  },
  {
    icon: Activity,
    title: "Skill Assessment",
    body: "Map skills across teams and roles.",
  },
  {
    icon: LineChart,
    title: "Employee Development",
    body: "Personalised development plans per employee.",
  },
  {
    icon: GraduationCap,
    title: "Campus Hiring",
    body: "Hire from our network of schools and colleges.",
  },
  {
    icon: Wrench,
    title: "Training",
    body: "Custom training programs for your teams.",
  },
  {
    icon: Rocket,
    title: "L&D",
    body: "Learning and development strategy and execution.",
  },
];

/* === Section 16 — Government & CSR (9 offerings) === */
export const GOVERNMENT_CSR: { icon: IconType; title: string; body: string }[] =
  [
    {
      icon: Wrench,
      title: "Skill India",
      body: "Align with the national skill development mission.",
    },
    {
      icon: Bot,
      title: "Digital India",
      body: "Digital literacy and AI education programs.",
    },
    {
      icon: Sparkles,
      title: "AI Education",
      body: "Bring AI education to government schools.",
    },
    {
      icon: HeartHandshake,
      title: "Career Guidance",
      body: "Career guidance at scale for districts.",
    },
    {
      icon: Briefcase,
      title: "Employment",
      body: "Connect skilled youth to employment.",
    },
    {
      icon: Handshake,
      title: "CSR Projects",
      body: "CSR-funded career and skill projects.",
    },
    {
      icon: HeartHandshake,
      title: "NGO Partnerships",
      body: "Partner with NGOs for reach and impact.",
    },
    {
      icon: MapIcon,
      title: "District Projects",
      body: "District-level career guidance programs.",
    },
    {
      icon: Users,
      title: "Community Development",
      body: "Long-term community skill development.",
    },
  ];

/* === Section 17 — Partner Program (11 types) === */
export const PARTNER_TYPES: { icon: IconType; title: string; body: string }[] =
  [
    {
      icon: School,
      title: "School",
      body: "Bring the platform to your school.",
    },
    {
      icon: GraduationCap,
      title: "College",
      body: "Career cells for colleges and universities.",
    },
    {
      icon: Building2,
      title: "Corporate",
      body: "Hiring, L&D and CSR partnerships.",
    },
    {
      icon: Landmark,
      title: "Government",
      body: "Public-sector skill missions.",
    },
    {
      icon: HeartHandshake,
      title: "NGO",
      body: "Reach underserved communities.",
    },
    {
      icon: HeartHandshake,
      title: "Career Counsellor",
      body: "Tools for independent counsellors.",
    },
    {
      icon: Palette,
      title: "White Label",
      body: "Brand the platform as your own.",
    },
    {
      icon: Palette,
      title: "Blue Label",
      body: "Co-branded partnership tier.",
    },
    {
      icon: Cpu,
      title: "Technology",
      body: "Integrate our tech into your product.",
    },
    {
      icon: Plane,
      title: "Study Abroad",
      body: "Refer students to study abroad programs.",
    },
    {
      icon: Globe2,
      title: "International",
      body: "Bring the platform to new countries.",
    },
  ];

/* === Section 18 — Testimonials (7 audience types) === */
export const TESTIMONIALS: {
  audience: string;
  quote: string;
  name: string;
  role: string;
  icon: IconType;
}[] = [
  {
    audience: "Students",
    icon: GraduationCap,
    quote:
      "The psychometric assessment gave me clarity I never had. I switched streams with confidence and now I'm studying what I actually love.",
    name: "Aarav Sharma",
    role: "Class 12 student, Delhi",
  },
  {
    audience: "Parents",
    icon: Users,
    quote:
      "As a parent I was anxious about my daughter's career choice. The counselling session aligned our family on a clear, evidence-based path.",
    name: "Meera Iyer",
    role: "Parent, Bengaluru",
  },
  {
    audience: "Schools",
    icon: School,
    quote:
      "We rolled out the Career Lab across all grades. Student engagement with future planning has transformed completely.",
    name: "Dr. Rajesh Menon",
    role: "Principal, Mumbai",
  },
  {
    audience: "Colleges",
    icon: Building2,
    quote:
      "The placement cell dashboard gave us real visibility into student readiness. Our placement rate climbed 18% this year.",
    name: "Prof. Anjali Verma",
    role: "Placement Head, Pune",
  },
  {
    audience: "Partners",
    icon: Handshake,
    quote:
      "As a counsellor partner, the AI tools let me serve five times more students without compromising on quality.",
    name: "Karthik Reddy",
    role: "Career Counsellor, Hyderabad",
  },
  {
    audience: "Corporate",
    icon: Briefcase,
    quote:
      "Their hiring assessment cut our screening time in half and improved the quality of shortlisted candidates.",
    name: "Sneha Kapoor",
    role: "Talent Acquisition, Gurgaon",
  },
  {
    audience: "Government",
    icon: Landmark,
    quote:
      "The district career guidance program reached 12,000 students in six months. A model for public-private skill missions.",
    name: "Sanjay Gupta",
    role: "District Officer, Rajasthan",
  },
];

/* === Section 19 — FAQ === */
export const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is the Career Passport?",
    answer:
      "Career Passport is our flagship offering — a psychometric assessment, detailed career report, personalised roadmap, counselling session, parent guidance, subject selection, college and scholarship suggestions, and dashboard access, all in one package.",
  },
  {
    question: "How is Career Passport Pro different?",
    answer:
      "Pro adds an AI Career Planner, skill gap analysis, learning roadmap, AI mentor, college predictor, career tracker, internship guidance, resume builder, interview preparation and lifetime dashboard access — for students who want the full AI-powered experience.",
  },
  {
    question: "What does the psychometric assessment measure?",
    answer:
      "Eleven dimensions: interest, personality, learning style, aptitude, emotional intelligence, leadership, motivation, career match, multiple intelligence, communication style and entrepreneurship potential. Together they build a complete picture of the student.",
  },
  {
    question: "Is the AI Career Planner suitable for Class 10 students?",
    answer:
      "Yes. The AI Career Planner is designed for students from Class 8 onward. It adapts recommendations to the student's grade, subjects and assessment profile, and updates the roadmap as they progress.",
  },
  {
    question: "Which countries do you support for study abroad?",
    answer:
      "Nine destinations: USA, Canada, UK, Australia, Germany, Europe, Japan, Singapore and Dubai. Services include university selection, scholarships, visa, admission predictor, profile evaluation, application support, education loans and accommodation.",
  },
  {
    question: "What coding and robotics topics do you teach?",
    answer:
      "Coding & AI covers Scratch, Blockly, Python, Java, JavaScript, web and app development, machine learning, AI, prompt engineering, generative AI, data science, cloud computing and cyber security. Robotics & IoT covers Arduino, ESP32, Raspberry Pi, STM32, PIC, drones, embedded systems, IoT projects, sensors, PCB design, electronics, automation, 3D printing and industrial robotics.",
  },
  {
    question: "How can my school partner with EduCareersPath?",
    answer:
      "Schools can adopt the Career Lab, Psychometric Lab, Coding Lab, AI Lab, Robotics Lab, Entrepreneurship Lab or Financial Literacy Lab, plus teacher training, dashboards, career day programs and workshops. Reach out via the Partners page to start.",
  },
  {
    question: "Do you offer corporate and government partnerships?",
    answer:
      "Yes. Corporate partnerships cover corporate, hiring, leadership and skill assessments, employee development, campus hiring, training and L&D. Government & CSR partnerships cover Skill India, Digital India, AI education, career guidance, employment, CSR projects, NGO partnerships, district projects and community development.",
  },
];

/* Re-export a couple of icons used directly in Home.tsx for the hero badge. */
export { Sparkles, Compass };
