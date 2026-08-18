import Link from "next/link";
import { ScissorsIcon, LeafIcon, NeedleIcon, ShieldIcon } from "./icons";
import HeroSlideshow from "./HeroSlideshow";

const heroSlides = [
  {
    src: "/images/hero-banner-teal.png",
    alt: "Woman wearing a teal embroidered churidar set from DZANE",
  },
  {
    src: "/images/hero-banner-yellow.png",
    alt: "Woman wearing a pastel yellow embroidered churidar set from DZANE",
  },
  {
    src: "/images/hero-banner-beige.png",
    alt: "Woman wearing a beige embroidered dress from DZANE",
  },
  {
    src: "/images/hero-banner-white-floral.png",
    alt: "Woman wearing a white floral co-ord set from DZANE",
  },
  {
    src: "/images/hero-banner-rust.png",
    alt: "Woman wearing a rust polka dot kurta from DZANE",
  },
  {
    src: "/images/hero-banner-plum-saree.png",
    alt: "Woman wearing a plum saree from DZANE",
  },
  {
    src: "/images/hero-banner-lavender.png",
    alt: "Woman wearing lavender nightwear from DZANE",
  },
  {
    src: "/images/hero-banner-red.png",
    alt: "Woman wearing a red embroidered kurta from DZANE",
  },
];

const features = [
  {
    icon: ScissorsIcon,
    title: "Custom Tailoring",
    subtitle: "Perfect fit, just for you",
  },
  {
    icon: LeafIcon,
    title: "Premium Fabrics",
    subtitle: "Soft, breathable & lasting",
  },
  {
    icon: NeedleIcon,
    title: "Handcrafted",
    subtitle: "Skilled hands, fine finish",
  },
  {
    icon: ShieldIcon,
    title: "Safe & Secure",
    subtitle: "Secure payments",
  },
];

export default function Hero() {
  return (
    <section className="flex min-h-dvh flex-col justify-center bg-cream">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-2">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Tailored for Comfort,
            <br />
            <span className="text-gold">Dzaned</span> for{" "}
            <span className="bg-gradient-to-b from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">
              You.
            </span>
          </h1>
          <p className="mt-3 font-serif text-lg italic text-gold">
            Tailored Grace, Timeless Fit
          </p>
          <div className="my-5 h-px w-16 bg-gold" />
          <p className="max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">
            Premium ladies wear, thoughtfully tailored — from elegant
            churidars, dresses &amp; sarees to cozy nighties and loungewear.
            Custom fits, personal touches, made just for you.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light"
            >
              Shop Collection
            </Link>
            <Link
              href="/custom-stitching"
              className="rounded-sm border border-ink/30 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:border-ink"
            >
              Custom Stitching
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-4 gap-x-2 gap-y-8 sm:gap-x-6">
            {features.map(({ icon: Icon, title, subtitle }) => (
              <div key={title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <dt className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-ink sm:text-xs">
                  {title}
                </dt>
                <dd className="mt-0.5 text-[9px] text-ink/60 sm:text-[11px]">
                  {subtitle}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <HeroSlideshow slides={heroSlides} />
          <div className="absolute -bottom-6 -right-2 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-gold/50 bg-cream text-center shadow-lg sm:h-32 sm:w-32">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-ink">
              Custom
              <br />
              Made With
            </span>
            <span className="font-serif text-lg italic text-gold">Love</span>
          </div>
        </div>
      </div>
    </section>
  );
}
