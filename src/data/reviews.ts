export type Review = {
  name: string;
  location: string;
  rating: number;
  product: string;
  comment: string;
  photo?: string;
};

export const reviews: Review[] = [
  {
    name: "Anju Sivan",
    location: "Idukki",
    rating: 5,
    product: "Custom Stitched Churidar",
    comment:
      "Got my churidar custom stitched here and the fit was perfect on the first try. Loved the finishing on the dupatta.",
  },
  {
    name: "Ruia Prasanth",
    location: "Alappuzha",
    rating: 5,
    product: "Custom Stitched Dress",
    comment:
      "Came in for custom dress stitching for a family function. The tailoring team nailed the fit and the detailing was beautiful.",
  },
  {
    name: "Priya Rachel",
    location: "Ernakulam",
    rating: 4,
    product: "Churidar Set",
    comment:
      "Bought a ready-made churidar set and it's so soft and comfortable, perfect for Kerala weather. Delivery was quick too.",
  },
  {
    name: "Jilna James",
    location: "Kannur",
    rating: 5,
    product: "Ladies Wear Set",
    comment:
      "Ordered a few ladies wear pieces from DZANE and the fabric quality is amazing. Will be ordering again.",
  },
  {
    name: "Anette Jose",
    location: "Aluva, Ernakulam",
    rating: 5,
    product: "Custom Stitched Churidar",
    comment:
      "Got my churidar custom stitched and the fit is perfect, premium fabric, and the packaging was so pretty. DZANE never disappoints.",
  },
  {
    name: "Neethu Sunny",
    location: "Ernakulam",
    rating: 4,
    product: "Ladies Wear Set",
    comment:
      "Purchased a churidar and a couple of other ladies wear pieces. Customer support helped me pick the right size and the quality is excellent.",
  },
];
