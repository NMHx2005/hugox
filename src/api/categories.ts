import api from './index';

export type AdminCategory = {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parent?: string | { _id: string; name: string; slug: string };
    status: 'active' | 'inactive';
    sortOrder?: number;
    createdAt: string;
    updatedAt: string;
};

export async function get_admin_categories(params?: { page?: number; limit?: number; search?: string; status?: 'active' | 'inactive' }) {
    const { data } = await api.get('/admin/categories', { params });
    const list = (data?.data?.categories ?? data?.categories ?? data) as unknown;
    return Array.isArray(list) ? (list as AdminCategory[]) : [];
}

export async function get_admin_category(id: string) {
    const { data } = await api.get(`/admin/categories/${id}`);
    const cat = (data?.data?.category ?? data?.category ?? data) as unknown;
    return cat as AdminCategory;
}

export async function create_admin_category(payload: { name: string; slug: string; description?: string; parent?: string | null; status?: 'active' | 'inactive'; image?: string }) {
    const { data } = await api.post('/admin/categories', payload);
    return data as AdminCategory;
}

export async function update_admin_category(id: string, payload: { name: string; slug: string; description?: string; parent?: string | null; status?: 'active' | 'inactive'; image?: string }) {
    const { data } = await api.put(`/admin/categories/${id}`, payload);
    return data as AdminCategory;
}

export async function delete_admin_category(id: string) {
    const { data } = await api.delete(`/admin/categories/${id}`);
    return data as { deleted: boolean };
}

export async function change_category_status(id: string, status: 'active' | 'inactive') {
    const { data } = await api.patch(`/admin/categories/${id}/status`, { status });
    return data as { success: boolean; message: string; data: { category: AdminCategory } };
}


