import Link from "next/link";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappContacts } from "@/data/contacts";
import { fetchProducts } from "@/lib/products";

// Backend can cold-start slowly on Render's free tier — give it room
// to wake up before Vercel kills the request.
export const maxDuration = 30;

export const metadata = {
  title: "Ready Made Nighties | DZANE",
  description: "Finished nighties by Nakshatra, ready to wear — no stitching wait.",
};

const readyMadeGallery = [
  { caption: "Nakshatra Nighties", gradient: "from-rose-100 via-cream-dark to-cream" },
  { caption: "Nakshatra Nighties", gradient: "from-amber-100 via-cream-dark to-cream" },
  { caption: "Nakshatra Nighties", gradient: "from-lavender via-cream-dark to-cream" },
];

const stitchingContact = whatsappContacts.find(
  (c) => c.role === "Stitching & Tailoring",
);

export default async function ReadyMadeNightiesPage() {
  const { items } = await fetchProducts({
    category: "ready-made-nighty",
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

        <section className="py-8">
          <div className="mx-auto max-w-5xl px-6">
            <h1 className="text-center font-serif text-2xl text-ink sm:text-3xl">
              Ready Made Nighties
            </h1>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
              Finished nighties by Nakshatra, ready to wear — no stitching
              wait.
            </p>

            {items.length > 0 ? (
              <div className="mt-8">
                <ProductGrid products={items} dense />
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
