import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "Women's Jewellery",
    subtitle: "Earrings, bangles & necklace sets",
    href: "/shop/jewellery",
    gradient: "from-rose-100 via-cream-dark to-cream",
    image: "/images/family-jewellery-v3.png",
  },
  {
    title: "Kids Wear",
    subtitle: "Comfy, playful & festive picks",
    href: "/shop/kids",
    gradient: "from-amber-100 via-cream-dark to-cream",
    image: "/images/family-kids-wear-v2.png",
  },
  {
    title: "Men's Wear",
    subtitle: "Shirts, kurtas & ethnic sets",
    href: "/shop/mens",
    gradient: "from-stone-200 via-cream-dark to-cream",
    image: "/images/family-mens-wear-v2.png",
  },
];

export default function FamilyWearSection() {
  return (
    <section
      className="border-t border-ink/10 bg-cream py-12"
      aria-labelledby="family-wear"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 id="family-wear" className="font-serif text-xl text-ink">
            More From DZANE
          </h2>
          <p className="text-xs text-ink/50">
            Jewellery, Kids &amp; Men&apos;s collections
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block overflow-hidden rounded-md border border-ink/10 bg-white/40 transition-shadow hover:shadow-md"
            >
              <div
                className={
                  item.image
                    ? "relative aspect-[3/4] bg-cream"
                    : `relative flex aspect-[3/4] items-center justify-center bg-gradient-to-br ${item.gradient}`
                }
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 15vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="px-4 text-center text-xs text-ink/30">
                    Image
                  </span>
                )}
              </div>
              <div className="p-2 sm:p-4">
                <h3 className="font-serif text-xs leading-snug text-ink sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-0.5 hidden text-xs text-ink/50 sm:block">
                  {item.subtitle}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-gold transition-transform group-hover:translate-x-0.5 sm:text-xs">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
