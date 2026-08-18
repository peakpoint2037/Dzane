export type WhatsAppContact = {
  role: string;
  description: string;
  phone: string;
  message: string;
};

export const whatsappContacts: WhatsAppContact[] = [
  {
    role: "Orders, Payments & Support",
    description: "Management & administration",
    phone: "916238189483",
    message: "Hi DZANE! I have a question about an order/payment.",
  },
  {
    role: "Stitching & Tailoring",
    description: "Custom fitting & fabric queries",
    phone: "919074434078",
    message: "Hi DZANE! I have a question about stitching/custom tailoring.",
  },
];
