import Image from "next/image";
import Header from "@/components/Header";
import { HeartIcon, NeedleIcon, ShieldIcon } from "@/components/icons";

export const metadata = {
  title: "About Us | DZANE",
  description:
    "The story behind DZANE — a family tailoring studio turned premium ladies wear brand.",
};

const values = [
  {
    icon: NeedleIcon,
    title: "Hand-Finished Craft",
    text: "Every custom piece is still cut and stitched by hand in our tailoring studio — nothing rushed, nothing machine-templated.",
  },
  {
    icon: HeartIcon,
    title: "Made Personally",
    text: "We started by fitting our neighbours. That personal attention to your measurements and taste hasn't changed.",
  },
  {
    icon: ShieldIcon,
    title: "Family You Can Trust",
    text: "A mother-and-son business — one hand on the needle, one hand on getting your order to you safely.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="text-center font-serif text-sm italic text-gold">
            Our Story
          </p>
          <h1 className="mt-2 text-center font-serif text-3xl text-ink sm:text-4xl">
            Where DZANE Began
          </h1>

          <div className="mt-12 grid items-center gap-10 sm:grid-cols-2">
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/about-founder.jpg"
                alt="Founder stitching a custom order at the DZANE tailoring studio"
                fill
                quality={90}
                sizes="(min-width: 640px) 500px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-ink/70 sm:text-base">
              <p>
                DZANE began at a sewing machine, long before it was ever a
                brand. For years, our mother has been the quiet hands behind
                hundreds of perfectly fitted churidars, sarees and blouses in
                her own tailoring studio. Neighbours would bring in fabric,
                and she&apos;d send them home with something that fit like it
                was made only for them &mdash; because it was.
              </p>
              <p>
                DZANE is that same care, grown into something bigger. While
                she continues to stitch every custom order by hand, we&apos;ve
                built a home online for her work &mdash; bringing premium
                ladies wear and honest tailoring to more women, without
                losing what made her shop special in the first place.
              </p>
              <p className="font-serif text-lg italic text-gold">
                Every DZANE piece still carries that same promise: elegance
                in every stitch.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-lavender/30 py-14">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-8 sm:grid-cols-3">
              {values.map(({ icon: Icon, title, text }) => (
                <div key={title} className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-ink">{title}</h3>
                  <p className="mt-2 text-sm text-ink/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="text-center font-serif text-2xl text-ink">
            Meet the Makers
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-md border border-ink/10 bg-white p-6 text-center">
              <p className="font-serif text-lg text-ink">Stitching &amp; Tailoring</p>
              <p className="mt-1 text-sm text-ink/60">
                Every custom fit, every hand-finished detail &mdash; her
                craft, decades in the making.
              </p>
            </div>
            <div className="rounded-md border border-ink/10 bg-white p-6 text-center">
              <p className="font-serif text-lg text-ink">
                Orders, Payments &amp; Support
              </p>
              <p className="mt-1 text-sm text-ink/60">
                Making sure every order, payment and question is taken care
                of, start to finish.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
