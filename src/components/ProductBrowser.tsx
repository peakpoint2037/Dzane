"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import type { PublicProduct } from "@/lib/products";

type PriceBand = { min: number; max: number; label: string };

function computePriceBands(products: PublicProduct[]): PriceBand[] {
  const prices = products.map((p) => p.sellingPrice).filter((p) => p > 0);
  if (prices.length === 0) return [];

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return [{ min, max, label: `₹${min}` }];

  const range = max - min;
  const step = range > 2000 ? 500 : range > 500 ? 250 : 100;
  const bands: PriceBand[] = [];
  let start = Math.floor(min / step) * step;
  while (start < max) {
    const end = start + step;
    bands.push({ min: start, max: end, label: `₹${start} – ₹${end}` });
    start = end;
  }
  return bands;
}

export default function ProductBrowser({
  products,
  dense = false,
}: {
  products: PublicProduct[];
  dense?: boolean;
}) {
  const [priceBand, setPriceBand] = useState("");
  const [color, setColor] = useState("");

  const priceBands = useMemo(() => computePriceBands(products), [products]);

  const colors = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (p.color) set.add(p.color);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filtered = useMemo(() => {
    const band = priceBand ? priceBands[Number(priceBand)] : null;
    return products.filter((p) => {
      if (band && (p.sellingPrice < band.min || p.sellingPrice > band.max))
        return false;
      if (color && p.color !== color) return false;
      return true;
    });
  }, [products, priceBand, color, priceBands]);

  const hasActiveFilters = priceBand !== "" || color !== "";

  function clearFilters() {
    setPriceBand("");
    setColor("");
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {priceBands.length > 1 && (
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="price-range" className="text-ink/50">
              Price Range
            </label>
            <select
              id="price-range"
              value={priceBand}
              onChange={(e) => setPriceBand(e.target.value)}
              className="rounded-sm border border-ink/15 bg-white px-2 py-1.5 text-ink focus:border-gold focus:outline-none"
            >
              <option value="">All Prices</option>
              {priceBands.map((band, i) => (
                <option key={i} value={i}>
                  {band.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {colors.length > 1 && (
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="filter-by" className="text-ink/50">
              Filter By
            </label>
            <select
              id="filter-by"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="rounded-sm border border-ink/15 bg-white px-2 py-1.5 text-ink focus:border-gold focus:outline-none"
            >
              <option value="">All Colors</option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
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
