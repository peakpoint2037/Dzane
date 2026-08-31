import CategoryShop from "@/components/CategoryShop";

// Backend can cold-start slowly on Render's free tier — give it room
// to wake up before Vercel kills the request.
export const maxDuration = 30;

export const metadata = {
  title: "New Arrivals | DZANE",
  description: "The latest pieces from DZANE.",
};

export default function NewArrivalsPage() {
  return (
    <CategoryShop
      title="New Arrivals"
      subtitle="Our latest pieces, freshest first."
      comingSoon={{
        heading: "New Arrivals is coming soon",
        description:
          "We're building this page for our latest pieces. In the meantime, browse our shop categories or message us on WhatsApp for what's new.",
        waMessage: "Hi DZANE! What's new in your collection right now?",
        ctaLabel: "Ask on WhatsApp",
      }}
    />
  );
}
