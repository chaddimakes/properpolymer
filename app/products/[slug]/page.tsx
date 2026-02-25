import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug } from "@/lib/products";
import ProductDetailClient from "@/app/components/product-detail-client";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Proper Polymer`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="transition-colors hover:text-accent">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <ProductDetailClient product={product} />
    </div>
  );
}
