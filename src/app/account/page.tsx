import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Coming Soon | DZANE",
  description: "Customer accounts are coming soon to DZANE.",
};

export default function AccountPage() {
  return (
    <ComingSoon
      heading="Accounts aren't live yet"
      description="We're still building online accounts. For now, message us on WhatsApp for orders, payments or any questions."
      waMessage="Hi DZANE! I have a question about an order/payment."
      ctaLabel="Message Us on WhatsApp"
    />
  );
}
