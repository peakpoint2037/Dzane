"use client";

import { useState } from "react";
import Image from "next/image";
import type { PublicProductImage } from "@/lib/products";

export default function ProductGallery({
  images,
  productName,
}: {
  images: PublicProductImage[];
  productName: string;
}) {
  const [selected, setSelected] = useState(0);
  const active = images[selected];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-ink/10 bg-lavender">
        {active ? (
          <Image
            src={active.imageUrl}
            alt={active.altText ?? productName}
            fill
            quality={90}
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            priority
          />
        ) : (
          <span className="flex h-full items-center justify-center text-sm text-ink/30">
            No photo yet
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              className={`relative aspect-square overflow-hidden rounded-md border transition-colors ${
                i === selected
                  ? "border-gold"
                  : "border-ink/10 hover:border-ink/30"
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText ?? `${productName} photo ${i + 1}`}
                fill
                quality={75}
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
