"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./lightbox";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  // Controlled mode — pass both to sync with external state
  selectedIndex?: number;
  onSelectIndex?: (i: number) => void;
  // Show a different image in the main slot (e.g. a variant preview not in the array)
  mainImageSrc?: string;
}

export default function ImageGallery({
  images,
  alt,
  selectedIndex,
  onSelectIndex,
  mainImageSrc,
}: ImageGalleryProps) {
  const [internalSelected, setInternalSelected] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const activeIndex = selectedIndex ?? internalSelected;
  const displaySrc = mainImageSrc ?? images[activeIndex];

  function handleThumbnailClick(i: number) {
    if (onSelectIndex) {
      onSelectIndex(i);
    } else {
      setInternalSelected(i);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-[#141414]"
          style={{ cursor: "zoom-in" }}
          onClick={() => setLightboxSrc(displaySrc)}
        >
          <Image
            src={displaySrc}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => handleThumbnailClick(i)}
                className={`relative aspect-[4/3] w-1/4 overflow-hidden rounded border transition-colors ${
                  i === activeIndex && mainImageSrc === undefined
                    ? "border-accent"
                    : "border-border opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt={alt} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}
