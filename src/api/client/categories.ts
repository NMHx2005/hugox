import api from '../index';

export type Category = {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parent?: string;
    status: 'active' | 'inactive';
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
};

export type CategoryProducts = {
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
    brand?: string;
    sku?: string;
    stock: number;
    status: 'active' | 'inactive';
    featured: boolean;
    tags: string[];
    ratingAvg?: number;
    reviewsCount?: number;
    createdAt: string;
    updatedAt: string;
};

// Get all categories
export async function get_categories() {
    const { data } = await api.get('/categories');
    return (data?.data?.categories || data?.categories || data) as Category[];
}

// Get category by ID
export async function get_category(id: string) {
    const { data } = await api.get(`/categories/${id}`);
    return (data?.data?.category || data?.category || data) as Category;
}

// Get products by category
export async function get_category_products(id: string, params?: { page?: number; limit?: number }) {
    const { data } = await api.get(`/categories/${id}/products`, { params });
    return (data?.data?.products || data?.products || data) as CategoryProducts[];
}
