import Image from "next/image";
import { TruckIcon, RefreshIcon, HeadsetIcon, DiamondIcon } from "./icons";

const items = [
  {
    icon: TruckIcon,
    title: "Free Shipping",
    subtitle: "on orders above ₹999",
  },
  {
    icon: RefreshIcon,
    title: "Easy Returns",
    subtitle: "7 days return policy",
  },
  {
    icon: HeadsetIcon,
    title: "Customer Support",
    subtitle: "+91 6238189483",
  },
  {
    icon: DiamondIcon,
    title: "Made in India",
    subtitle: "Proudly supporting local artisans",
  },
];

export default function TrustBar() {
  return (
    <section id="trust-bar" className="border-t border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {items.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon className="h-6 w-6 shrink-0 text-gold" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink">
                {title}
              </p>
              <p className="text-[11px] text-ink/60">{subtitle}</p>
            </div>
          </div>
        ))}

        <a
          href="/images/gpay-qr-v3.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-sm border border-gold/40">
            <Image
              src="/images/gpay-qr-v3.jpg"
              alt="Scan to pay DZANE via Google Pay / UPI"
              fill
              quality={90}
              sizes="88px"
              className="object-cover"
            />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink">
              Pay via GPay / UPI
            </p>
            <p className="text-[11px] text-ink/60">
              dzanestitchingstudio@okicici &middot; tap to view
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}
