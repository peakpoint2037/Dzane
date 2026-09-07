import ComingSoon from "@/components/ComingSoon";
import Header from "@/components/Header";
import ProductBrowser from "@/components/ProductBrowser";
import { fetchProducts } from "@/lib/products";
import { saleSkus } from "@/data/saleSkus";

// Backend can cold-start slowly on Render's free tier — give it room
// to wake up before Vercel kills the request.
export const maxDuration = 30;

export const metadata = {
  title: "Sale | DZANE",
  description: "Discounted DZANE pieces, while stocks last.",
};

export default async function SalePage() {
  if (saleSkus.length === 0) {
    return (
      <ComingSoon
        heading="No sale items right now"
        description="We don't have any discounted pieces up at the moment — check back soon, or message us on WhatsApp and we'll let you know when a sale starts."
        waMessage="Hi DZANE! Do you have any sale or discounted items right now?"
        ctaLabel="Ask on WhatsApp"
      />
    );
  }

  const { items } = await fetchProducts({ limit: 100 });
  const saleItems = items.filter((p) => saleSkus.includes(p.sku));

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-7xl px-6 py-14">
          <h1 className="text-center font-serif text-3xl text-ink sm:text-4xl">
            Sale
          </h1>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
            Discounted DZANE pieces, while stocks last.
          </p>
          <div className="mt-10">
            <ProductBrowser products={saleItems} dense />
          </div>
        </section>
      </main>
    </>
  );
}
