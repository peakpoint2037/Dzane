import CategoryShop from "@/components/CategoryShop";

export const metadata = {
  title: "Women's Jewellery | DZANE",
  description: "Earrings, bangles & necklace sets from DZANE.",
};

export default function JewelleryPage() {
  return (
    <CategoryShop
      categorySlug="jewellery"
      title="Women's Jewellery"
      subtitle="Earrings, bangles & necklace sets."
      comingSoon={{
        heading: "Jewellery is coming soon",
        description:
          "We're putting together our earrings, bangles & necklace sets collection. Message us on WhatsApp and we'll help you find what you're looking for.",
        waMessage: "Hi DZANE! I'm interested in your jewellery collection.",
        ctaLabel: "Ask on WhatsApp",
      }}
    />
  );
}
