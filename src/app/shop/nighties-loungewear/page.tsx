import Image from "next/image";
import Header from "@/components/Header";
import { NeedleIcon, ScissorsIcon, TagIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappContacts } from "@/data/contacts";

export const metadata = {
  title: "Nighties & Loungewear | DZANE",
  description:
    "Shop nighty fabric in Regular or Premium, stitched to your size, or bring your own fabric to us.",
};

const gallery = [
  {
    src: "/images/category-nighties-v2.png",
    alt: "Woman wearing lilac nightwear from DZANE",
  },
  {
    src: "/images/hero-banner-lavender.png",
    alt: "Woman wearing lavender nightwear from DZANE",
  },
];

const variants = [
  {
    name: "Regular",
    fabric: "₹240",
    stitched: "₹340",
    note: "Everyday soft cotton nighties",
  },
  {
    name: "Premium",
    fabric: "₹300",
    stitched: "₹400",
    note: "Finer prints & softer fabric",
  },
];

const stitchingContact = whatsappContacts.find(
  (c) => c.role === "Stitching & Tailoring",
);

export default function NightiesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="relative aspect-[16/7] w-full overflow-hidden bg-lavender">
          <Image
            src="/images/hero-banner-lavender.png"
            alt="Nighties & Loungewear from DZANE"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[75%_center]"
          />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-cream/90 via-cream/40 to-transparent">
            <div className="mx-auto w-full max-w-7xl px-6">
              <h1 className="max-w-md font-serif text-3xl text-ink sm:text-4xl">
                Nighties &amp; Loungewear
              </h1>
              <p className="mt-2 max-w-sm text-sm text-ink/70 sm:text-base">
                Choose Regular or Premium fabric and we&apos;ll stitch it to
                your size, or bring your own fabric to us.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14">
          <div className="flex items-center justify-center gap-2">
            <TagIcon className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-2xl text-ink">
              Nighty Fabric &amp; Stitching Prices
            </h2>
          </div>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
            Prices include stitching. Pick your fabric type below.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
            {variants.map((variant) => (
              <div
                key={variant.name}
                className="rounded-md border border-ink/10 bg-white p-6 text-center"
              >
                <p className="font-serif text-xl text-ink">{variant.name}</p>
                <p className="mt-1 text-xs text-ink/60">{variant.note}</p>
                <div className="mt-4 flex items-baseline justify-center gap-2">
                  <span className="text-sm text-ink/40 line-through">
                    {variant.fabric}
                  </span>
                  <span className="font-serif text-2xl text-gold">
                    {variant.stitched}
                  </span>
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-ink/40">
                  Fabric only &rarr; With stitching
                </p>
              </div>
            ))}
          </div>

          {stitchingContact && (
            <div className="mt-6 text-center">
              <a
                href={`https://wa.me/${stitchingContact.phone}?text=${encodeURIComponent(
                  "Hi DZANE! I'd like to order a nighty — please share fabric options.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light"
              >
                <ScissorsIcon className="h-4 w-4" />
                Order a Nighty
              </a>
            </div>
          )}
        </section>

        <section className="border-t border-ink/10 bg-lavender/30 py-14">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
              <NeedleIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-serif text-2xl text-ink">
              Already Have Fabric?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
              Bring or send us your own fabric and we&apos;ll stitch it to
              your measurements for a stitching charge alone.
            </p>
            {stitchingContact && (
              <a
                href={`https://wa.me/${stitchingContact.phone}?text=${encodeURIComponent(
                  "Hi DZANE! I have my own fabric and would like it stitched into a nighty.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-sm border border-ink/30 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:border-ink"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                Chat With Our Tailors
              </a>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="text-center font-serif text-2xl text-ink">
            Our Nightwear Collection
          </h2>
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
            {gallery.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/5] overflow-hidden rounded-md bg-lavender"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 640px) 40vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
