import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "Nighties & Loungewear | DZANE",
  description:
    "Choose fabric stitched to your size, or ready-made nighties by Nakshatra.",
};

const options = [
  {
    title: "Nighty Fabrics",
    description:
      "Pick our fabric at one flat rate and we'll stitch it to your size.",
    href: "/shop/nighties-loungewear/fabrics",
    image: "/images/category-nighties-v2.png",
  },
  {
    title: "Ready Made Nighties",
    description:
      "Finished nighties by Nakshatra, ready to wear — no stitching wait.",
    href: "/shop/nighties-loungewear/ready-made",
    gradient: "from-lavender via-cream-dark to-cream",
  },
];

export default function NightiesHubPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-5xl px-6 py-14">
          <h1 className="text-center font-serif text-3xl text-ink sm:text-4xl">
            Nighties &amp; Loungewear
          </h1>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
            Choose how you&apos;d like to shop.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
            {options.map((option) => (
              <Link
                key={option.href}
                href={option.href}
                className="group block overflow-hidden rounded-md border border-ink/10 bg-white/40 transition-shadow hover:shadow-md"
              >
                <div
                  className={
                    option.image
                      ? "relative aspect-[4/5] bg-lavender"
                      : `relative flex aspect-[4/5] items-center justify-center bg-gradient-to-br ${option.gradient}`
                  }
                >
                  {option.image ? (
                    <Image
                      src={option.image}
                      alt={option.title}
                      fill
                      quality={90}
                      sizes="(min-width: 640px) 45vw, 90vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <span className="px-4 text-center text-xs text-ink/30">
                      Photo coming soon
                    </span>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h2 className="font-serif text-xl text-ink">
                    {option.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink/60">
                    {option.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gold transition-transform group-hover:translate-x-0.5">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
