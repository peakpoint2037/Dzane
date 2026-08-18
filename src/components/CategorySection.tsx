import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategorySection() {
  return (
    <section className="bg-cream" aria-labelledby="shop-by-category">
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <h2 id="shop-by-category" className="sr-only">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group block overflow-hidden rounded-md border border-ink/10 bg-white/40 transition-shadow hover:shadow-md"
            >
              <div
                className={
                  category.image
                    ? "relative aspect-[4/5] overflow-hidden bg-cream"
                    : `relative flex aspect-[4/5] items-center justify-center bg-gradient-to-br ${category.gradient}`
                }
              >
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 35vw, 70vw"
                    className={`object-cover ${category.imageFocus ?? "object-top"}`}
                    style={
                      category.imageScale
                        ? {
                            transform: `scale(${category.imageScale})`,
                            transformOrigin: "top center",
                          }
                        : undefined
                    }
                  />
                ) : (
                  <span className="px-4 text-center text-xs text-ink/30">
                    Image
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-serif text-base leading-snug text-ink">
                  {category.title}
                </h3>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gold transition-transform group-hover:translate-x-0.5">
                  {category.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
