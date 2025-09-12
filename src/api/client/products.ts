import api from '../index';

export type Product = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: {
        _id: string;
        name: string;
        slug: string;
    };
    brand: string;
    sku: string;
    stock: number;
    status: string;
    featured: boolean;
    tags: string[];
    ratingAvg?: number;
    reviewsCount?: number;
    sold?: number;
    discountPercentage?: number;
    isAvailable?: boolean;
    purchaseLinks?: {
        shopee?: string;
        tiktok?: string;
        facebook?: string;
        custom?: Array<{
            platform: string;
            url: string;
        }>;
    };
    additionalInfo?: Array<{
        title: string;
        content: string;
        order?: number;
    }>;
    createdAt: string;
    updatedAt: string;
};

export type ProductsResponse = {
    success: boolean;
    data: {
        products: Product[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    };
};

export type ProductResponse = {
    success: boolean;
    data: {
        product: Product;
        ratingAvg?: number;
        reviewsCount?: number;
        related?: Product[];
    };
};

// Get all products with pagination and filters
export async function get_products(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
    featured?: boolean;
}): Promise<ProductsResponse> {
    const { data } = await api.get('/products', { params });
    return data;
}

// Get product by ID or slug
export async function get_product(idOrSlug: string): Promise<ProductResponse> {
    const { data } = await api.get(`/products/${idOrSlug}`);
    return data;
}

// Get products by category slug
export async function get_products_by_category(
    categorySlug: string,
    params?: {
        page?: number;
        limit?: number;
        sort?: string;
        minPrice?: number;
        maxPrice?: number;
    }
): Promise<ProductsResponse> {
    const { data } = await api.get(`/products/category/${categorySlug}`, { params });
    return data;
}

// Get featured products
export async function get_featured_products(limit?: number): Promise<ProductsResponse> {
    const { data } = await api.get('/products/featured', { params: { limit } });
    return data;
}

// Search products
export async function search_products(
    query: string,
    params?: {
        page?: number;
        limit?: number;
        category?: string;
        sort?: string;
    }
): Promise<ProductsResponse> {
    const { data } = await api.get('/products/search', {
        params: {
            q: query,
            ...params
        }
    });
    return data;
}

// Get related products
export async function get_related_products(productId: string, limit?: number): Promise<ProductsResponse> {
    const { data } = await api.get(`/products/${productId}/related`, { params: { limit } });
    return data;
}