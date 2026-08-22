import CategoryShop from "@/components/CategoryShop";

export const metadata = {
  title: "Kids Wear | DZANE",
  description: "Comfy, playful & festive picks for kids from DZANE.",
};

export default function KidsPage() {
  return (
    <CategoryShop
      categorySlug="kids-wear"
      title="Kids Wear"
      subtitle="Comfy, playful & festive picks."
      comingSoon={{
        heading: "Kids Wear is coming soon",
        description:
          "We're putting together our kids wear collection. Message us on WhatsApp and we'll help you find what you're looking for.",
        waMessage: "Hi DZANE! I'm interested in your kids wear collection.",
        ctaLabel: "Ask on WhatsApp",
      }}
    />
  );
}
