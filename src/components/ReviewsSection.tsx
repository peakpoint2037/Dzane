import Image from "next/image";
import { reviews } from "@/data/reviews";
import { StarIcon } from "./icons";
import type { Review } from "@/data/reviews";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-80 shrink-0 flex-col gap-3 rounded-md border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        {review.photo ? (
          <span className="relative h-[150px] w-[150px] shrink-0 overflow-hidden rounded-md bg-lavender">
            <Image
              src={review.photo}
              alt={`${review.name} wearing DZANE`}
              fill
              quality={90}
              sizes="150px"
              className="object-cover"
            />
          </span>
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender font-serif text-sm font-semibold text-gold">
            {initials(review.name)}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-ink">{review.name}</p>
          <p className="text-xs text-ink/50">{review.location}</p>
          <div className="mt-2 flex items-center gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-3.5 w-3.5 ${i < review.rating ? "text-gold" : "text-ink/15"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-ink/70">
        &ldquo;{review.comment}&rdquo;
      </p>
      <p className="text-[11px] font-medium uppercase tracking-wide text-ink/40">
        Verified Purchase &middot; {review.product}
      </p>
    </div>
  );
}

export default function ReviewsSection() {
  const track = [...reviews, ...reviews];

  return (
    <section
      className="border-t border-ink/10 bg-lavender/40 py-14"
      aria-labelledby="customer-reviews"
    >
      <h2
        id="customer-reviews"
        className="px-6 text-center font-serif text-3xl text-ink"
      >
        Loved by Our Customers
      </h2>
      <p className="mx-auto mt-2 max-w-md px-6 text-center text-sm text-ink/60">
        Real reviews from women who&apos;ve worn DZANE.
      </p>

      <div className="mt-10 overflow-hidden">
        <div className="animate-marquee flex w-max gap-5 px-6">
          {track.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
