import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { NeedleIcon, ScissorsIcon, TagIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappContacts } from "@/data/contacts";
import { fetchProducts } from "@/lib/products";

// Backend can cold-start slowly on Render's free tier — give it room
// to wake up before Vercel kills the request.
export const maxDuration = 30;

export const metadata = {
  title: "Nighty Fabrics | DZANE",
  description: "Shop nighty fabric at one flat rate, stitched to your size.",
};

const gallery: { src?: string; alt: string }[] = [
  {
    src: "/images/category-nighties-v2.png",
    alt: "Woman wearing lilac nightwear from DZANE",
  },
  {
    src: "/images/hero-banner-lavender.png",
    alt: "Woman wearing lavender nightwear from DZANE",
  },
  {
    alt: "More fabric options",
  },
];

const stitchingContact = whatsappContacts.find(
  (c) => c.role === "Stitching & Tailoring",
);

export default async function NightyFabricsPage() {
  const { items } = await fetchProducts({
    category: "nighty-fabric",
    limit: 100,
  });

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-5xl px-6 pt-10">
          <Link
            href="/shop/nighties-loungewear"
            className="inline-flex items-center gap-1 text-xs font-medium text-ink/50 hover:text-gold"
          >
            ← Nighties &amp; Loungewear
          </Link>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex items-center justify-center gap-2">
            <TagIcon className="h-5 w-5 text-gold" />
            <h1 className="font-serif text-2xl text-ink sm:text-3xl">
              Nighty Fabrics
            </h1>
          </div>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
            One flat rate on all nighty fabric.
          </p>

          <div className="mx-auto mt-8 max-w-xs">
            <div className="rounded-md border border-ink/10 bg-white p-6 text-center">
              <p className="font-serif text-xl text-ink">Nighty Fabric</p>
              <p className="mt-1 text-xs text-ink/60">
                Soft cotton, stitched to your size
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-2">
                <span className="text-sm text-ink/40 line-through">₹250</span>
                <span className="font-serif text-2xl text-gold">₹350</span>
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-ink/40">
                Fabric only &rarr; With stitching
              </p>
            </div>
          </div>

          {items.length > 0 ? (
            <div className="mt-8">
              <ProductGrid products={items} dense />
            </div>
          ) : (
            <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-2 sm:gap-4">
              {gallery.map((photo, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-md border border-ink/10 bg-white/40"
                >
                  <div className="relative flex aspect-[3/4] items-center justify-center bg-lavender">
                    {photo.src ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        quality={90}
                        sizes="(min-width: 640px) 15vw, 33vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <span className="px-3 text-center text-[11px] text-ink/30">
                        Photo coming soon
                      </span>
                    )}
                  </div>
                  <p className="p-2 text-center text-[11px] leading-snug text-ink/60 sm:p-3 sm:text-xs">
                    Nighty Fabric
                  </p>
                </div>
              ))}
            </div>
          )}

          {stitchingContact && (
            <div className="mt-6 text-center">
              <a
                href={`https://wa.me/${stitchingContact.phone}?text=${encodeURIComponent(
                  "Hi DZANE! I'd like to order a nighty fabric with stitching.",
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
      </main>
    </>
  );
}
