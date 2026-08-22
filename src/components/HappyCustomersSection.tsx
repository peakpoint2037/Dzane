import Image from "next/image";
import { reviews } from "@/data/reviews";

export default function HappyCustomersSection() {
  const photos = reviews.filter((review) => review.photo);

  return (
    <section
      className="border-t border-ink/10 bg-cream py-12"
      aria-labelledby="happy-customers"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 id="happy-customers" className="font-serif text-xl text-ink">
            Happy Customers
          </h2>
          <p className="text-xs text-ink/50">Real women, real DZANE pieces</p>
        </div>

        {photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4">
            {photos.map((review) => (
              <div
                key={review.name}
                className="overflow-hidden rounded-md border border-ink/10 bg-white/40"
              >
                <div className="relative aspect-[3/4] bg-lavender">
                  <Image
                    src={review.photo as string}
                    alt={`${review.name} wearing DZANE`}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 15vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="p-2 text-center text-[11px] leading-snug text-ink/60 sm:p-3 sm:text-xs">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-md border border-dashed border-ink/15 bg-white/40 px-6 py-10 text-center text-sm text-ink/50">
            Customer photos coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
