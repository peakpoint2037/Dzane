import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "New Arrivals | DZANE",
  description: "New DZANE arrivals — coming soon.",
};

export default function NewArrivalsPage() {
  return (
    <ComingSoon
      heading="New Arrivals is coming soon"
      description="We're building a page for our latest pieces. In the meantime, browse our shop categories or message us on WhatsApp for what's new."
      waMessage="Hi DZANE! What's new in your collection right now?"
      ctaLabel="Ask on WhatsApp"
    />
  );
}
