import CategoryShop from "@/components/CategoryShop";

// Backend can cold-start slowly on Render's free tier — give it room
// to wake up before Vercel kills the request.
export const maxDuration = 30;

export const metadata = {
  title: "Men's Wear | DZANE",
  description: "Shirts, kurtas & ethnic sets from DZANE.",
};

export default function MensPage() {
  return (
    <CategoryShop
      categorySlug="mens-wear"
      title="Men's Wear"
      subtitle="Shirts, kurtas & ethnic sets."
      comingSoon={{
        heading: "Men's Wear is coming soon",
        description:
          "We're putting together our shirts, kurtas & ethnic sets collection. Message us on WhatsApp and we'll help you find what you're looking for.",
        waMessage: "Hi DZANE! I'm interested in your men's wear collection.",
        ctaLabel: "Ask on WhatsApp",
      }}
    />
  );
}
