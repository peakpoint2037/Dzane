export type Offer = {
  icon: "gift" | "tag" | "heart" | "star";
  title: string;
  description: string;
};

export const offers: Offer[] = [
  {
    icon: "gift",
    title: "Loyalty Reward",
    description:
      "Cross ₹5,000 in total purchases and get 50% off your next order — our thank-you for staying with DZANE.",
  },
  {
    icon: "star",
    title: "Welcome Offer",
    description: "First-time customers get 10% off their first order.",
  },
  {
    icon: "heart",
    title: "Refer & Earn",
    description:
      "Refer a friend to DZANE — you both get 10% off your next order.",
  },
  {
    icon: "tag",
    title: "Free Shipping",
    description: "Free delivery on all orders above ₹999, every day.",
  },
];
