import Image from "next/image";
import Header from "@/components/Header";
import ProductBrowser from "@/components/ProductBrowser";
import { TagIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappContacts } from "@/data/contacts";
import { fetchProducts } from "@/lib/products";

// Backend can cold-start slowly on Render's free tier — give it room
// to wake up before Vercel kills the request.
export const maxDuration = 30;

export const metadata = {
  title: "Readymade Wear | DZANE",
  description:
    "Shop ready-made ladies wear from ₹500 to ₹3,000 — no stitching wait, ready to ship.",
};

const gallery = [
  {
    src: "/images/category-premium-wear-v3.png",
    alt: "Woman wearing a readymade pink kurta set from DZANE",
  },
  {
    src: "/images/hero-banner-white-floral.png",
    alt: "Woman wearing a readymade white floral co-ord set from DZANE",
  },
];

const priceBands = [
  { range: "₹500 – ₹1,000", note: "Everyday & casual wear" },
  { range: "₹1,000 – ₹1,500", note: "Soft fabrics & light detailing" },
  { range: "₹1,500 – ₹2,000", note: "Embroidered & festive pieces" },
  { range: "₹2,000 – ₹3,000", note: "Premium & special-occasion wear" },
];

const ordersContact = whatsappContacts.find(
  (c) => c.role === "Orders, Payments & Support",
);

export default async function ReadymadeWearPage() {
  const { items } = await fetchProducts({
    category: "readymade-wear",
    limit: 100,
  });

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="relative aspect-[16/7] w-full overflow-hidden bg-lavender">
          <Image
            src="/images/category-premium-wear-v3.png"
            alt="Readymade Wear from DZANE"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-cream/90 via-cream/40 to-transparent">
            <div className="mx-auto w-full max-w-7xl px-6">
              <h1 className="max-w-md font-serif text-3xl text-ink sm:text-4xl">
                Readymade Wear
              </h1>
              <p className="mt-2 max-w-sm text-sm text-ink/70 sm:text-base">
                Finished pieces, ready to wear — no stitching wait.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14">
          <div className="flex items-center justify-center gap-2">
            <TagIcon className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-2xl text-ink">Price Range</h2>
          </div>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
            Our readymade wear ranges from ₹500 to ₹3,000. Message us for
            current stock and photos in your price range.
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
                  "Hi DZANE! I'd like to see readymade wear options and prices.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Browse &amp; Order
              </a>
            </div>
          )}
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="text-center font-serif text-2xl text-ink">
            Our Readymade Collection
          </h2>
          {items.length > 0 ? (
            <div className="mt-8">
              <ProductBrowser products={items} />
            </div>
          ) : (
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
          )}
        </section>
      </main>
    </>
  );
}
