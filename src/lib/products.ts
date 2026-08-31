const API_BASE =
  process.env.PRODUCTS_API_URL ??
  "https://textile-admin-backend-1tre.onrender.com";

export type PublicProduct = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  categoryId: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  size: string | null;
  color: string | null;
  sellingPrice: number;
  stockStatus: "IN_STOCK" | "LOW" | "OUT_OF_STOCK";
  inStock: boolean;
  primaryImageUrl: string | null;
  imageCount: number;
};

export type PublicProductImage = {
  id: string;
  imageUrl: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
};

export type PublicProductDetail = PublicProduct & {
  images: PublicProductImage[];
};

export type ProductQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  size?: string;
  color?: string;
  sortBy?: "name" | "sellingPrice" | "createdAt";
  sortDir?: "asc" | "desc";
};

export type ProductPage = {
  items: PublicProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const EMPTY_PAGE: ProductPage = {
  items: [],
  pagination: { page: 1, limit: 0, total: 0, totalPages: 0 },
};

// Backend is on Render's free tier and can cold-start slowly, so this is
// generous, and failures degrade to an empty page rather than breaking the
// page render — callers should have a fallback UI for the empty case.
export async function fetchProducts(
  query: ProductQuery = {}
): Promise<ProductPage> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/public/products?${params.toString()}`,
      {
        signal: AbortSignal.timeout(28000),
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return EMPTY_PAGE;
    const json = await res.json();
    if (!json?.success) return EMPTY_PAGE;
    return json.data as ProductPage;
  } catch {
    return EMPTY_PAGE;
  }
}

// Returns null for a missing/inactive product (404) or any fetch failure —
// callers should render a not-found style fallback in that case.
export async function fetchProduct(
  id: string
): Promise<PublicProductDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/api/public/products/${id}`, {
      signal: AbortSignal.timeout(28000),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.success) return null;
    return json.data as PublicProductDetail;
  } catch {
    return null;
  }
}
