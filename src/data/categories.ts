export type Category = {
  title: string;
  href: string;
  cta: string;
  gradient: string;
  image?: string;
  imageFocus?: string;
  imageScale?: number;
};

export const categories: Category[] = [
  {
    title: "Custom Stitching",
    href: "/custom-stitching",
    cta: "Learn More",
    gradient: "from-stone-300/70 via-cream-dark to-cream",
    image: "/images/category-custom-stitching-v2.png",
  },
  {
    title: "Readymade Wear",
    href: "/shop/readymade-wear",
    cta: "Shop Now",
    gradient: "from-fuchsia-200/60 via-cream-dark to-cream",
    image: "/images/category-premium-wear-v3.png",
    imageScale: 1.12,
  },
  {
    title: "Churidars",
    href: "/shop/churidars",
    cta: "Shop Now",
    gradient: "from-emerald-200/60 via-cream-dark to-cream",
    image: "/images/category-churidars-v2.png",
    imageScale: 1.12,
  },
  {
    title: "Nighties & Loungewear",
    href: "/shop/nighties-loungewear",
    cta: "Shop Now",
    gradient: "from-rose-200/70 via-cream-dark to-cream",
    image: "/images/category-nighties-v2.png",
    imageScale: 1.12,
  },
  {
    title: "Sarees",
    href: "/shop/sarees",
    cta: "Shop Now",
    gradient: "from-amber-200/70 via-cream-dark to-cream",
    image: "/images/category-sarees-v3.png",
  },
];
