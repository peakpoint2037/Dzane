import { BagIcon, ScissorsIcon, NeedleIcon } from "./icons";

const ways = [
  {
    icon: BagIcon,
    title: "Shop Ready-Made",
    description:
      "Browse Readymade Wear and buy finished pieces, ready to wear.",
  },
  {
    icon: ScissorsIcon,
    title: "Choose Our Fabric + Stitching",
    description:
      "Churidars & Nighties — pick a fabric by price tier and we stitch it to your size. Sarees come ready-made, with the blouse stitched to match.",
  },
  {
    icon: NeedleIcon,
    title: "Bring Your Own Fabric",
    description:
      "Already have fabric? We'll stitch it to your measurements for a stitching charge.",
  },
];

export default function HowWeWorkSection() {
  return (
    <section
      className="border-t border-ink/10 bg-lavender/30 py-12"
      aria-labelledby="how-we-work"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2
          id="how-we-work"
          className="text-center font-serif text-2xl text-ink"
        >
          3 Ways to Shop With Us
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {ways.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-md border border-ink/10 bg-white p-6 text-center"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm text-ink/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
