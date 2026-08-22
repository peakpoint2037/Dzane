import Header from "./Header";
import ProductGrid from "./ProductGrid";
import ComingSoon from "./ComingSoon";
import { fetchProducts } from "@/lib/products";

export default async function CategoryShop({
  categorySlug,
  title,
  subtitle,
  comingSoon,
}: {
  categorySlug?: string;
  title: string;
  subtitle: string;
  comingSoon: {
    heading: string;
    description: string;
    waMessage: string;
    ctaLabel: string;
  };
}) {
  const { items } = await fetchProducts({
    category: categorySlug,
    sortBy: "createdAt",
    sortDir: "desc",
    limit: 24,
  });

  if (items.length === 0) {
    return <ComingSoon {...comingSoon} />;
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-5xl px-6 py-14">
          <h1 className="text-center font-serif text-3xl text-ink">
            {title}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60">
            {subtitle}
          </p>
          <div className="mt-8">
            <ProductGrid products={items} />
          </div>
        </section>
      </main>
    </>
  );
}
