import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappContacts } from "@/data/contacts";
import { fetchProduct } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);
  if (!product) return { title: "Product Not Found | DZANE" };
  return {
    title: `${product.name} | DZANE`,
    description: product.description ?? `${product.name} from DZANE.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) notFound();

  const orderContact = whatsappContacts[0];
  const waHref = `https://wa.me/${orderContact.phone}?text=${encodeURIComponent(
    `Hi DZANE! I'd like to order ${product.name} (${product.sku}).`
  )}`;

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-4xl px-6 py-10">
          <div className="grid gap-10 sm:grid-cols-2">
            <ProductGallery images={product.images} productName={product.name} />

            <div>
              {product.categoryName && (
                <p className="text-xs uppercase tracking-wide text-ink/40">
                  {product.categoryName}
                </p>
              )}
              <h1 className="mt-1 font-serif text-2xl text-ink sm:text-3xl">
                {product.name}
              </h1>

              {(product.color || product.size) && (
                <p className="mt-2 text-sm text-ink/60">
                  {[product.color, product.size].filter(Boolean).join(" · ")}
                </p>
              )}

              <p className="mt-4 font-serif text-3xl text-gold">
                ₹{product.sellingPrice}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wide text-ink/40">
                {product.inStock
                  ? product.stockStatus === "LOW"
                    ? "Low Stock"
                    : "In Stock"
                  : "Out of Stock"}
              </p>

              {product.description && (
                <p className="mt-6 text-sm leading-relaxed text-ink/70">
                  {product.description}
                </p>
              )}

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order via WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
