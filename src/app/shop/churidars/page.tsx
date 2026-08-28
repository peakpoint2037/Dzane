import Image from "next/image";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { NeedleIcon, ScissorsIcon, TagIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappContacts } from "@/data/contacts";
import { fetchProducts } from "@/lib/products";

export const metadata = {
  title: "Churidar Fabrics | DZANE",
  description:
    "Shop churidar fabric by price tier and get it stitched to your size, or bring your own fabric to us.",
};

const gallery = [
  {
    src: "/images/hero-banner-yellow.png",
    alt: "Woman wearing a pastel yellow embroidered churidar set from DZANE",
  },
  {
    src: "/images/hero-banner-rust.png",
    alt: "Woman wearing a rust polka dot kurta from DZANE",
  },
  {
    src: "/images/hero-banner-red.png",
    alt: "Woman wearing a red embroidered kurta from DZANE",
  },
];

const tiers = [
  { range: "Below ₹500", note: "Everyday cotton & simple prints" },
  { range: "₹500 – ₹1,000", note: "Soft cottons & light embroidery" },
  { range: "₹1,000 – ₹1,500", note: "Premium fabrics & detailed work" },
  { range: "₹1,500 – ₹2,500", note: "Festive & special-occasion pieces" },
];

const stitchingContact = whatsappContacts.find(
  (c) => c.role === "Stitching & Tailoring",
);

export default async function ChuridarsPage() {
  const { items } = await fetchProducts({
    category: "churidar-fabric",
    limit: 100,
  });

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="relative aspect-[16/7] w-full overflow-hidden bg-lavender">
          <Image
            src="/images/hero-banner-yellow.png"
            alt="Churidars from DZANE"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[75%_center]"
          />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-cream/90 via-cream/40 to-transparent">
            <div className="mx-auto w-full max-w-7xl px-6">
              <h1 className="max-w-md font-serif text-3xl text-ink sm:text-4xl">
                Churidar Fabrics
              </h1>
              <p className="mt-2 max-w-sm text-sm text-ink/70 sm:text-base">
                Pick a fabric by price tier and we&apos;ll stitch it to your
                size, or bring your own fabric to us.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14">
          <div className="flex items-center justify-center gap-2">
            <TagIcon className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-2xl text-ink">
              Fabric Price Tiers
            </h2>
          </div>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
            Prices below are for fabric only. Stitching is charged
            separately based on design &mdash; message us for an exact
            quote.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.range}
                className="rounded-md border border-ink/10 bg-white p-5 text-center"
              >
                <p className="font-serif text-lg text-gold">{tier.range}</p>
                <p className="mt-1 text-xs text-ink/60">{tier.note}</p>
              </div>
            ))}
          </div>

          {stitchingContact && (
            <div className="mt-6 text-center">
              <a
                href={`https://wa.me/${stitchingContact.phone}?text=${encodeURIComponent(
                  "Hi DZANE! I'd like to order a churidar — please share fabric options and stitching charges.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light"
              >
                <ScissorsIcon className="h-4 w-4" />
                Choose Fabric &amp; Get Stitching Quote
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
                  "Hi DZANE! I have my own fabric and would like it stitched into a churidar.",
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
            Our Churidar Fabric Collection
          </h2>
          {items.length > 0 ? (
            <div className="mt-8">
              <ProductGrid products={items} />
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                    sizes="(min-width: 640px) 33vw, 90vw"
                    className="object-cover object-[75%_center]"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
