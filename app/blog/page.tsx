import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, guides, and material breakdowns for 3D printing Toyota Tacoma accessories. Learn about filament selection, print settings, and part design.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          From the Shop
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Tips, material guides, and build insights for 3D printing truck
          accessories.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hover"
          >
            <p className="mb-2 text-xs text-muted">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="mb-2 text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
