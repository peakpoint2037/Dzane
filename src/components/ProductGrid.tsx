import Image from "next/image";
import Link from "next/link";
import type { PublicProduct } from "@/lib/products";

function ProductCard({ product }: { product: PublicProduct }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block overflow-hidden rounded-md border border-ink/10 bg-white/40 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[3/4] bg-lavender">
        {product.primaryImageUrl ? (
          <Image
            src={product.primaryImageUrl}
            alt={product.name}
            fill
            quality={90}
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full items-center justify-center px-3 text-center text-[11px] text-ink/30">
            No photo yet
          </span>
        )}
        {!product.inStock && (
          <span className="absolute right-2 top-2 rounded-sm bg-ink/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-cream">
            Out of Stock
          </span>
        )}
        {product.imageCount > 1 && (
          <span className="absolute bottom-2 right-2 rounded-sm bg-ink/70 px-2 py-0.5 text-[10px] text-cream">
            +{product.imageCount - 1} photos
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-serif text-sm leading-snug text-ink">
          {product.name}
        </h3>
        {(product.color || product.size) && (
          <p className="mt-0.5 text-xs text-ink/50">
            {[product.color, product.size].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-1 font-serif text-base text-gold">
          ₹{product.sellingPrice}
        </p>
      </div>
    </Link>
  );
}

export default function ProductGrid({
  products,
}: {
  products: PublicProduct[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
