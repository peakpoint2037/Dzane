import Link from "next/link";
import Header from "@/components/Header";
import { whatsappContacts } from "@/data/contacts";

export default function ComingSoon({
  heading,
  description,
  waMessage,
  ctaLabel,
}: {
  heading: string;
  description: string;
  waMessage: string;
  ctaLabel: string;
}) {
  const contact = whatsappContacts[0];
  const waHref = `https://wa.me/${contact.phone}?text=${encodeURIComponent(
    waMessage
  )}`;

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <section className="mx-auto max-w-md px-6 py-24 text-center">
          <p className="font-serif text-sm italic text-gold">Coming Soon</p>
          <h1 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
            {heading}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gold px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-gold-dark"
            >
              {ctaLabel}
            </a>
            <Link
              href="/"
              className="rounded-md border border-ink/15 px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
