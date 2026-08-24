import Image from "next/image";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { NeedleIcon, ScissorsIcon, TagIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappContacts } from "@/data/contacts";
import { fetchProducts } from "@/lib/products";

export const metadata = {
  title: "Nighties & Loungewear | DZANE",
  description:
    "Shop nighty fabric stitched to your size, or ready-made nighties by Nakshatra.",
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

const readyMadeGallery = [
  { caption: "Nakshatra Nighties", gradient: "from-rose-100 via-cream-dark to-cream" },
  { caption: "Nakshatra Nighties", gradient: "from-amber-100 via-cream-dark to-cream" },
  { caption: "Nakshatra Nighties", gradient: "from-lavender via-cream-dark to-cream" },
];

const stitchingContact = whatsappContacts.find(
  (c) => c.role === "Stitching & Tailoring",
);

export default async function NightiesPage() {
  const [fabricProducts, readyMadeProducts] = await Promise.all([
    fetchProducts({ category: "nighty-fabric", limit: 12 }),
    fetchProducts({ category: "ready-made-nighty", limit: 12 }),
  ]);

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
                Fabric stitched to your size, or ready-made nighties by
                Nakshatra.
              </p>
            </div>
          </div>
        </section>

        {/* ---- Nighty Fabrics ---- */}
        <section className="mx-auto max-w-5xl px-6 py-14">
          <div className="flex items-center justify-center gap-2">
            <TagIcon className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-2xl text-ink">Nighty Fabrics</h2>
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

          {fabricProducts.items.length > 0 ? (
            <div className="mt-8">
              <ProductGrid products={fabricProducts.items} dense />
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

        {/* ---- Ready Made Nighties (Nakshatra) ---- */}
        <section className="border-t border-ink/10 bg-lavender/20 py-14">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center font-serif text-2xl text-ink">
              Ready Made Nighties
            </h2>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
              Finished nighties by Nakshatra, ready to wear — no stitching
              wait.
            </p>

            {readyMadeProducts.items.length > 0 ? (
              <div className="mt-8">
                <ProductGrid products={readyMadeProducts.items} />
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
                {readyMadeGallery.map((photo, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-md border border-ink/10 bg-white/40"
                  >
                    <div
                      className={`relative flex aspect-[3/4] items-center justify-center bg-gradient-to-br ${photo.gradient}`}
                    >
                      <span className="px-3 text-center text-[11px] text-ink/30">
                        Photo coming soon
                      </span>
                    </div>
                    <p className="p-2 text-center text-[11px] leading-snug text-ink/60 sm:p-3 sm:text-xs">
                      {photo.caption}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {stitchingContact && (
              <div className="mt-8 text-center">
                <a
                  href={`https://wa.me/${stitchingContact.phone}?text=${encodeURIComponent(
                    "Hi DZANE! I'd like to know more about your ready made Nakshatra nighties.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Ask About Ready Made Nighties
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
