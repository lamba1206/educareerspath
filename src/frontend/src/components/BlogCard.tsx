import type { BlogPost } from "@/backend";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  onSelect?: (post: BlogPost) => void;
  className?: string;
}

function formatDate(timestamp: bigint | undefined): string {
  if (!timestamp) return "";
  return new Date(Number(timestamp)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Blog post preview card. Used in the Blogs listing and on the Home page
 * latest-insights strip.
 */
export function BlogCard({
  post,
  index = 0,
  onSelect,
  className,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Card
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onClick={onSelect ? () => onSelect(post) : undefined}
        onKeyDown={(e) => {
          if (onSelect && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onSelect(post);
          }
        }}
        data-ocid={`blog.item.${index + 1}`}
        className={`group h-full cursor-pointer transition-smooth hover:-translate-y-0.5 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className ?? ""}`}
      >
        <CardHeader>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="mt-2 font-display text-lg leading-snug">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1" />
        <CardFooter className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <User className="size-3" aria-hidden /> {post.author}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3" aria-hidden />{" "}
              {formatDate(post.publishedAt ?? post.createdAt)}
            </span>
          </div>
          <ArrowRight
            className="size-4 text-primary transition-smooth group-hover:translate-x-0.5"
            aria-hidden
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
