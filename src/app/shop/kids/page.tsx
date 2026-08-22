import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Kids Wear | DZANE",
  description: "Comfy, playful & festive picks for kids — coming soon to DZANE.",
};

export default function KidsPage() {
  return (
    <ComingSoon
      heading="Kids Wear is coming soon"
      description="We're putting together our kids wear collection. Message us on WhatsApp and we'll help you find what you're looking for."
      waMessage="Hi DZANE! I'm interested in your kids wear collection."
      ctaLabel="Ask on WhatsApp"
    />
  );
}
