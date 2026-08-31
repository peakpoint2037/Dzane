import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { categories } from "@/data/categories";

export const metadata = {
  title: "Shop All Collections | DZANE",
  description:
    "Browse every DZANE collection — churidar fabrics, nighty fabrics, sarees, readymade wear, custom stitching, jewellery, kids and men's wear.",
};

const moreCollections = [
  {
    title: "Women's Jewellery",
    href: "/shop/jewellery",
    cta: "Shop Now",
    gradient: "from-rose-100 via-cream-dark to-cream",
  },
  {
    title: "Kids Wear",
    href: "/shop/kids",
    cta: "Shop Now",
    gradient: "from-amber-100 via-cream-dark to-cream",
  },
  {
    title: "Men's Wear",
    href: "/shop/mens",
    cta: "Shop Now",
    gradient: "from-stone-200 via-cream-dark to-cream",
  },
  {
    title: "New Arrivals",
    href: "/shop/new-arrivals",
    cta: "Shop Now",
    gradient: "from-lavender via-cream-dark to-cream",
  },
];

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-7xl px-6 py-14">
          <h1 className="text-center font-serif text-3xl text-ink sm:text-4xl">
            Shop All Collections
          </h1>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
            Everything DZANE offers, in one place.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
                      sizes="(min-width: 1024px) 20vw, 45vw"
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
        </section>

        <section className="border-t border-ink/10 bg-lavender/20 py-14">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center font-serif text-2xl text-ink">
              More From DZANE
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {moreCollections.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block overflow-hidden rounded-md border border-ink/10 bg-white/40 transition-shadow hover:shadow-md"
                >
                  <div
                    className={`relative flex aspect-[4/5] items-center justify-center bg-gradient-to-br ${item.gradient}`}
                  >
                    <span className="px-4 text-center text-xs text-ink/30">
                      Image
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base leading-snug text-ink">
                      {item.title}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gold transition-transform group-hover:translate-x-0.5">
                      {item.cta} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
