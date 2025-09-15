import api from './index';

export type AdminProduct = {
    _id: string;
    name: string;
    price: number;
    originalPrice?: number;
    stock: number;
    status: 'active' | 'inactive' | 'draft';
    description?: string;
    category?: string | { _id: string; name: string };
    sku?: string;
    brand?: string;
    images?: string[];
    tags?: string[];
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
    specifications?: Array<{
        title: string;
        content: string;
        order?: number;
    }>;
    // Rating and Review Information
    rating?: number;
    reviewsCount?: number;
    sold?: number;
    // Quality Metrics
    qualityRating?: number;
    deliveryRating?: number;
    warrantyRating?: number;
};

export type AdminPagination = {
    page: number;
    limit: number;
    total: number;
    pages: number;
};

export async function get_admin_products(params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<{ items: AdminProduct[]; pagination?: AdminPagination }> {
    const { data } = await api.get('/admin/products', { params });
    const list = (data?.data?.products ?? data?.products ?? []) as AdminProduct[];
    const pagination = (data?.data?.pagination ?? data?.pagination) as AdminPagination | undefined;
    return { items: Array.isArray(list) ? list : [], pagination };
}

export async function get_admin_product(id: string) {
    const { data } = await api.get(`/admin/products/${id}`);
    const prod = (data?.data?.product ?? data?.product ?? data) as unknown;
    return prod as AdminProduct;
}

export async function create_admin_product(payload: {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    stock: number;
    sku?: string;
    brand?: string;
    status?: 'active' | 'inactive' | 'draft';
    images?: string[];
    tags?: string[];
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
    specifications?: Array<{
        title: string;
        content: string;
        order?: number;
    }>;
    // Rating and Review Information
    rating?: number;
    reviewsCount?: number;
    sold?: number;
    // Quality Metrics
    qualityRating?: number;
    deliveryRating?: number;
    warrantyRating?: number;
}) {
    const { data } = await api.post('/admin/products', payload);
    return data as AdminProduct;
}

export async function update_admin_product(id: string, payload: {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    stock: number;
    sku?: string;
    brand?: string;
    status?: 'active' | 'inactive' | 'draft';
    images?: string[];
    tags?: string[];
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
    specifications?: Array<{
        title: string;
        content: string;
        order?: number;
    }>;
    // Rating and Review Information
    rating?: number;
    reviewsCount?: number;
    sold?: number;
    // Quality Metrics
    qualityRating?: number;
    deliveryRating?: number;
    warrantyRating?: number;
}) {
    const { data } = await api.put(`/admin/products/${id}`, payload);
    return data as AdminProduct;
}

export async function delete_admin_product(id: string) {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data as { deleted: boolean };
}

export async function set_admin_product_status(id: string, status: 'active' | 'inactive') {
    const { data } = await api.put(`/admin/products/${id}/status`, { status });
    return data as AdminProduct;
}


