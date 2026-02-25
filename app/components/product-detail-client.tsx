"use client";

import { useState } from "react";
import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import ImageGallery from "./image-gallery";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(
      (product.toggleOptions ?? []).map((opt) => [opt.key, opt.default]),
    ),
  );

  const inCart = items.some((i) => i.slug === product.slug);

  // Resolve active toggle combination
  const currentCombination = product.toggleCombinations?.find((combo) =>
    Object.entries(combo.when).every(([key, val]) => toggles[key] === val),
  );

  // Resolve variant (non-toggle products)
  const selectedVariantData = product.variants?.find(
    (v) => v.name === selectedVariant,
  );

  // Build gallery image list
  const images = product.images ?? [product.image];

  // Determine gallery display — variant sync or manual override
  const variantPreviewImage =
    currentCombination?.previewImage ?? selectedVariantData?.previewImage;

  let galleryIndex: number;
  let galleryMainSrc: string | undefined;

  if (manualIndex !== null) {
    galleryIndex = manualIndex;
    galleryMainSrc = undefined;
  } else if (variantPreviewImage) {
    const idx = images.indexOf(variantPreviewImage);
    if (idx >= 0) {
      galleryIndex = idx;
      galleryMainSrc = undefined;
    } else {
      // Preview image not in the thumbnails array — show it as an override
      galleryIndex = 0;
      galleryMainSrc = variantPreviewImage;
    }
  } else {
    galleryIndex = 0;
    galleryMainSrc = undefined;
  }

  // For toggle products, build "With X, No Y" description for cart
  const toggleVariantName = product.toggleOptions
    ? product.toggleOptions
        .map((opt) => (toggles[opt.key] ? `With ${opt.label}` : `No ${opt.label}`))
        .join(", ")
    : undefined;

  const effectiveVariantName = toggleVariantName ?? selectedVariant;
  const selectedFiles = currentCombination?.stlFiles;

  function handleToggle(key: string, value: boolean) {
    setToggles((prev) => ({ ...prev, [key]: value }));
    setManualIndex(null);
  }

  function handleVariantSelect(name: string) {
    setSelectedVariant(name);
    setManualIndex(null);
  }

  function handleAddToCart() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      variantName: effectiveVariantName,
      selectedFiles,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      variantName: effectiveVariantName,
      selectedFiles,
    });
    router.push("/checkout");
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Image Gallery — thumbnails always visible, syncs with variant */}
      <ImageGallery
        images={images}
        alt={product.name}
        selectedIndex={galleryIndex}
        onSelectIndex={setManualIndex}
        mainImageSrc={galleryMainSrc}
      />

      {/* Details */}
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
          {product.category}
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>
        <p className="mb-6 text-2xl font-bold text-foreground">
          ${product.price.toFixed(2)}
        </p>

        {/* Variant selector + cart buttons */}
        <div className="mb-8 flex flex-col gap-3">
          {/* Toggle options (independent boolean selectors) */}
          {product.toggleOptions && product.toggleOptions.length > 0 && (
            <div className="mb-1 flex flex-col gap-4">
              {product.toggleOptions.map((opt) => (
                <div key={opt.key} className="flex flex-col gap-2">
                  <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    {opt.label}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggle(opt.key, false)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        !toggles[opt.key]
                          ? "border-accent bg-accent text-white"
                          : "border-border text-muted hover:border-accent hover:text-accent"
                      }`}
                    >
                      Without {opt.label}
                    </button>
                    <button
                      onClick={() => handleToggle(opt.key, true)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        toggles[opt.key]
                          ? "border-accent bg-accent text-white"
                          : "border-border text-muted hover:border-accent hover:text-accent"
                      }`}
                    >
                      With {opt.label}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Named variant selector (non-toggle products) */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-1 flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Variant
              </p>
              <div className="flex gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => handleVariantSelect(variant.name)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      selectedVariant === variant.name
                        ? "border-accent bg-accent text-white"
                        : "border-border text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleBuyNow}
            className="w-full rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="w-full rounded-lg border border-accent px-7 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
          >
            {added ? "Added to Cart ✓" : inCart ? "In Cart — Add Another" : "Add to Cart"}
          </button>
        </div>

        {/* Description */}
        <p className="mb-8 leading-relaxed text-muted">{product.longDescription}</p>

        {/* Features */}
        <div className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Features
          </h2>
          <ul className="space-y-2">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-muted"
              >
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* File Info */}
        <div className="rounded-lg border border-border bg-surface p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
            File Details
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted">Format</p>
              <p className="font-medium text-foreground">STL</p>
            </div>
            <div>
              <p className="text-muted">Print Method</p>
              <p className="font-medium text-foreground">FDM Optimized</p>
            </div>
            <div>
              <p className="text-muted">Supports</p>
              <p className="font-medium text-foreground">Minimal / None</p>
            </div>
            {product.material && (
              <div>
                <p className="text-muted">Recommended Material</p>
                <p className="font-medium text-foreground">{product.material}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
