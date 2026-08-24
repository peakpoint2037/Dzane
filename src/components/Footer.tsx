import { whatsappContacts } from "@/data/contacts";

export default function Footer() {
  const contact = whatsappContacts[0];
  const waHref = `https://wa.me/${contact.phone}?text=${encodeURIComponent(
    "Hi DZANE! I'd like to know more about the fabric type and quality before ordering."
  )}`;

  return (
    <footer className="border-t border-ink/10 bg-olive py-4 text-cream/80">
      <div className="mx-auto max-w-7xl px-6 text-center text-[11px] leading-relaxed">
        <p>
          Model images on this website are AI-generated for illustration
          purposes only.{" "}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-light underline underline-offset-2 hover:text-cream"
          >
            Chat with us on WhatsApp
          </a>{" "}
          to know the exact fabric type &amp; quality before you order.
        </p>
      </div>
    </footer>
  );
}
