import { offers } from "@/data/offers";
import { GiftIcon, TagIcon, HeartIcon, StarIcon } from "./icons";

const iconMap = {
  gift: GiftIcon,
  tag: TagIcon,
  heart: HeartIcon,
  star: StarIcon,
};

export default function OffersSection() {
  return (
    <section
      className="border-y border-ink/10 bg-cream py-12"
      aria-labelledby="offers-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 text-center">
          <p className="font-serif text-sm italic text-gold">
            For Our Valuable Customers
          </p>
          <h2 id="offers-heading" className="mt-1 font-serif text-2xl text-ink">
            Offers &amp; Rewards
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => {
            const Icon = iconMap[offer.icon];
            return (
              <div
                key={offer.title}
                className="rounded-md border border-gold/15 bg-lavender/40 p-5 text-center"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-serif text-base text-ink">
                  {offer.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink/60">
                  {offer.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
