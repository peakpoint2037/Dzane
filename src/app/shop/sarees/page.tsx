import Image from "next/image";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { NeedleIcon, TagIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappContacts } from "@/data/contacts";
import { fetchProducts } from "@/lib/products";

export const metadata = {
  title: "Sarees | DZANE",
  description:
    "Shop ready-made sarees from ₹500 to ₹3,000, with matching blouse stitching available.",
};

const gallery = [
  {
    src: "/images/category-sarees-v3.png",
    alt: "Woman wearing a plum saree from DZANE",
  },
];

const priceBands = [
  { range: "₹500 – ₹1,000", note: "Everyday & casual sarees" },
  { range: "₹1,000 – ₹1,500", note: "Soft silks & light work" },
  { range: "₹1,500 – ₹2,000", note: "Detailed embroidery & borders" },
  { range: "₹2,000 – ₹3,000", note: "Festive & special-occasion sarees" },
];

const stitchingContact = whatsappContacts.find(
  (c) => c.role === "Stitching & Tailoring",
);
const ordersContact = whatsappContacts.find(
  (c) => c.role === "Orders, Payments & Support",
);

export default async function SareesPage() {
  const { items } = await fetchProducts({ category: "sarees", limit: 100 });

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="relative aspect-[16/7] w-full overflow-hidden bg-lavender">
          <Image
            src="/images/hero-banner-plum-saree.png"
            alt="Sarees from DZANE"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[75%_center]"
          />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-cream/90 via-cream/40 to-transparent">
            <div className="mx-auto w-full max-w-7xl px-6">
              <h1 className="max-w-md font-serif text-3xl text-ink sm:text-4xl">
                Sarees
              </h1>
              <p className="mt-2 max-w-sm text-sm text-ink/70 sm:text-base">
                Ready-made sarees, with the blouse stitched to match your
                size.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14">
          <div className="flex items-center justify-center gap-2">
            <TagIcon className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-2xl text-ink">
              Ready-Made Saree Price Range
            </h2>
          </div>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
            Our sarees range from ₹500 to ₹3,000. Message us for current
            stock and photos in your price range.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {priceBands.map((band) => (
              <div
                key={band.range}
                className="rounded-md border border-ink/10 bg-white p-5 text-center"
              >
                <p className="font-serif text-lg text-gold">{band.range}</p>
                <p className="mt-1 text-xs text-ink/60">{band.note}</p>
              </div>
            ))}
          </div>

          {ordersContact && (
            <div className="mt-6 text-center">
              <a
                href={`https://wa.me/${ordersContact.phone}?text=${encodeURIComponent(
                  "Hi DZANE! I'd like to see saree options and prices.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Browse Sarees &amp; Order
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
              Blouse Stitching Available
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
              Every saree can be paired with a blouse stitched to your
              measurements &mdash; bring your own blouse fabric or ask us
              about matching options.
            </p>
            {stitchingContact && (
              <a
                href={`https://wa.me/${stitchingContact.phone}?text=${encodeURIComponent(
                  "Hi DZANE! I'd like my saree blouse stitched to my measurements.",
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
            Our Saree Collection
          </h2>
          {items.length > 0 ? (
            <div className="mt-8">
              <ProductGrid products={items} />
            </div>
          ) : (
            <div className="mx-auto mt-8 grid max-w-xs grid-cols-1 gap-4">
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
                    sizes="(min-width: 640px) 320px, 90vw"
                    className="object-cover object-top"
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
