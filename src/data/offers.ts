export type Offer = {
  icon: "gift" | "tag" | "heart" | "star";
  title: string;
  description: string;
};

export const offers: Offer[] = [
  {
    icon: "gift",
    title: "Points & Rewards",
    description:
      "Earn 5 points for every ₹100 you spend. 1 point = ₹1 — redeem your points as cash on your next order once you reach 100 points.",
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
