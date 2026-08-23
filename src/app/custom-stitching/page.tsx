import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import {
  TagIcon,
  ShieldIcon,
  ScissorsIcon,
  NeedleIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { whatsappContacts } from "@/data/contacts";

export const metadata = {
  title: "Custom Stitching | DZANE",
  description:
    "Hand-finished custom stitching from DZANE — choose our fabric by price tier, or bring your own and we'll stitch it to your measurements.",
};

const steps = [
  {
    icon: TagIcon,
    title: "Pick a Fabric or Bring Your Own",
    description:
      "Choose fabric by price tier for Churidars & Nighties, or bring your own fabric — we'll stitch either.",
  },
  {
    icon: ShieldIcon,
    title: "Share Your Measurements",
    description:
      "Send your measurements over WhatsApp, or visit our studio and we'll take them for you.",
  },
  {
    icon: ScissorsIcon,
    title: "We Cut & Stitch by Hand",
    description:
      "Every piece is cut and stitched by hand in our studio — nothing rushed, nothing machine-templated.",
  },
];

const stitchingPrices = [
  { item: "Churidar", price: "₹500 onwards" },
  { item: "Normal Blouse", price: "₹350 onwards" },
  { item: "Lining Blouse", price: "₹550 onwards" },
  { item: "Nighty", price: "₹100 onwards" },
];

const stitchedCategories = [
  {
    title: "Churidars",
    href: "/shop/churidars",
    description: "Fabric by price tier, stitched to your size.",
  },
  {
    title: "Nighties & Loungewear",
    href: "/shop/nighties-loungewear",
    description: "Fabric by price tier, stitched to your size.",
  },
  {
    title: "Sarees",
    href: "/shop/sarees",
    description: "Ready-made saree, blouse stitched to match.",
  },
];

export default function CustomStitchingPage() {
  const stitchingContact = whatsappContacts.find(
    (c) => c.role === "Stitching & Tailoring"
  );

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="relative aspect-[16/7] w-full overflow-hidden bg-lavender">
          <Image
            src="/images/hero-banner-beige.png"
            alt="Custom stitching at DZANE"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[75%_center]"
          />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-cream/90 via-cream/40 to-transparent">
            <div className="mx-auto w-full max-w-7xl px-6">
              <h1 className="max-w-md font-serif text-3xl text-ink sm:text-4xl">
                Custom Stitching
              </h1>
              <p className="mt-2 max-w-sm text-sm text-ink/70 sm:text-base">
                Twenty years of hand-finished tailoring — stitched to your
                measurements, not off a rack.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="text-center font-serif text-2xl text-ink">
            How It Works
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-md border border-ink/10 bg-white p-6 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg text-ink">{title}</h3>
                <p className="mt-2 text-sm text-ink/60">{description}</p>
              </div>
            ))}
          </div>

          {stitchingContact && (
            <div className="mt-8 text-center">
              <a
                href={`https://wa.me/${stitchingContact.phone}?text=${encodeURIComponent(
                  "Hi DZANE! I have my own fabric and would like it custom stitched."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Bring Your Own Fabric — Chat With Our Tailors
              </a>
            </div>
          )}
        </section>

        <section className="border-t border-ink/10 bg-lavender/30 py-14">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center justify-center gap-2">
              <TagIcon className="h-5 w-5 text-gold" />
              <h2 className="font-serif text-2xl text-ink">
                Stitching Charges
              </h2>
            </div>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
              Stitching only &mdash; fabric is priced separately. Message us
              for an exact quote.
            </p>

            <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stitchingPrices.map((item) => (
                <div
                  key={item.item}
                  className="rounded-md border border-ink/10 bg-white p-5 text-center"
                >
                  <p className="font-serif text-lg text-ink">{item.item}</p>
                  <p className="mt-1 font-serif text-xl text-gold">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>

            {stitchingContact && (
              <div className="mt-6 text-center">
                <a
                  href={`https://wa.me/${stitchingContact.phone}?text=${encodeURIComponent(
                    "Hi DZANE! I'd like more details on stitching charges."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Ask Our Stitching &amp; Tailoring Team
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream py-14">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center justify-center gap-2">
              <NeedleIcon className="h-5 w-5 text-gold" />
              <h2 className="font-serif text-2xl text-ink">
                Where We Stitch
              </h2>
            </div>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
              Fabric + stitching is available on these categories today.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stitchedCategories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group block rounded-md border border-ink/10 bg-white p-6 text-center transition-shadow hover:shadow-md"
                >
                  <h3 className="font-serif text-lg text-ink">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink/60">
                    {category.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gold transition-transform group-hover:translate-x-0.5">
                    Shop Now →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
