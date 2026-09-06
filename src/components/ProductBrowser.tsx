"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import type { PublicProduct } from "@/lib/products";

export default function ProductBrowser({
  products,
  dense = false,
}: {
  products: PublicProduct[];
  dense?: boolean;
}) {
  const [color, setColor] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const colors = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (p.color) set.add(p.color);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filtered = useMemo(() => {
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;
    return products.filter((p) => {
      if (color && p.color !== color) return false;
      if (min !== null && p.sellingPrice < min) return false;
      if (max !== null && p.sellingPrice > max) return false;
      return true;
    });
  }, [products, color, minPrice, maxPrice]);

  const hasActiveFilters = color !== null || minPrice !== "" || maxPrice !== "";

  function clearFilters() {
    setColor(null);
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-xs">
          <label htmlFor="min-price" className="text-ink/50">
            ₹
          </label>
          <input
            id="min-price"
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20 rounded-sm border border-ink/15 px-2 py-1.5 text-ink focus:border-gold focus:outline-none"
          />
          <span className="text-ink/30">–</span>
          <label htmlFor="max-price" className="sr-only">
            Max price
          </label>
          <input
            id="max-price"
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20 rounded-sm border border-ink/15 px-2 py-1.5 text-ink focus:border-gold focus:outline-none"
          />
        </div>

        {colors.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(color === c ? null : c)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  color === c
                    ? "border-gold bg-gold text-cream"
                    : "border-ink/15 text-ink/70 hover:border-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-ink/50 underline underline-offset-2 hover:text-gold"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} dense={dense} />
      ) : (
        <p className="rounded-md border border-dashed border-ink/15 bg-white/40 px-6 py-10 text-center text-sm text-ink/50">
          No products match these filters.
        </p>
      )}
    </div>
  );
}
