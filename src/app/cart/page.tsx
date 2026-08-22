import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Coming Soon | DZANE",
  description: "Online cart & checkout are coming soon to DZANE.",
};

export default function CartPage() {
  return (
    <ComingSoon
      heading="Online cart isn't live yet"
      description="We're still building online checkout. For now, message us on WhatsApp to place your order and we'll take care of the rest."
      waMessage="Hi DZANE! I'd like to place an order."
      ctaLabel="Order via WhatsApp"
    />
  );
}
