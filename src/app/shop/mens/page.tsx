import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Men's Wear | DZANE",
  description: "Shirts, kurtas & ethnic sets — coming soon to DZANE.",
};

export default function MensPage() {
  return (
    <ComingSoon
      heading="Men's Wear is coming soon"
      description="We're putting together our shirts, kurtas & ethnic sets collection. Message us on WhatsApp and we'll help you find what you're looking for."
      waMessage="Hi DZANE! I'm interested in your men's wear collection."
      ctaLabel="Ask on WhatsApp"
    />
  );
}
