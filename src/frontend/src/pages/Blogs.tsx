import type { BlogPost } from "@/backend";
import { BlogCard } from "@/components/BlogCard";
import { PageHeader } from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/hooks/useQueries";
import { motion } from "motion/react";

const FALLBACK_POSTS: BlogPost[] = [
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
  {
    id: "4",
    title: "Should I take a gap year before college?",
    slug: "should-i-take-gap-year",
    excerpt:
      "The honest answer: it depends. We break down when a gap year helps, when it hurts, and how to use it well.",
    body: "",
    author: "Rohan Kapoor",
    tags: ["Admissions", "Decisions"],
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "5",
    title: "JEE 2025: what changed and what didn't",
    slug: "jee-2025-changes",
    excerpt:
      "A quick summary of syllabus changes, exam pattern updates, and what they mean for your prep strategy.",
    body: "",
    author: "Priya Sharma",
    tags: ["JEE", "India Admissions"],
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "6",
    title: "Studying in Germany with under ₹10 lakh",
    slug: "germany-under-10-lakh",
    excerpt:
      "Public universities are tuition-free, but living costs add up. Here's a realistic budget for Indian students.",
    body: "",
    author: "Arjun Nair",
    tags: ["Abroad", "Germany", "Funding"],
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
];

export function BlogsPage() {
  const { data, isLoading } = useBlogPosts(true);
  const posts = data && data.length > 0 ? data : FALLBACK_POSTS;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Blogs"
        title="Insights from across the ecosystem"
        description="Plain-English explainers on assessments, careers, colleges, exams, and admissions — written by our team of counsellors and researchers to help you make sense of every layer of the EduCareersPath ecosystem."
      />

      <section className="py-8">
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <Skeleton
                key={`skeleton-${k}`}
                className="h-56 w-full rounded-xl"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
