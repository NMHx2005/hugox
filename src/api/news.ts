import api from './index';

export type AdminNews = {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    category: 'Công nghệ' | 'Sản phẩm' | 'Khuyến mãi' | 'Tin tức' | 'Khác';
    status: 'draft' | 'published';
    featuredImage?: string;
    images?: string[];
    tags?: string[];
};

export type AdminPagination = {
    page: number;
    limit: number;
    total: number;
    pages: number;
};

export async function get_admin_news(params?: { page?: number; limit?: number; search?: string; status?: string }) {
    const { data } = await api.get('/admin/news', { params });
    const items = (data?.data?.news || data?.news || []) as AdminNews[];
    const pagination = (data?.data?.pagination || data?.pagination) as AdminPagination | undefined;
    return { items, pagination };
}

export async function get_admin_news_article(id: string) {
    const { data } = await api.get(`/admin/news/${id}`);
    return (data?.data?.article || data?.article || data) as AdminNews;
}

export async function create_admin_news(payload: Partial<AdminNews> & { title: string; content: string; category: AdminNews['category']; status: AdminNews['status'] }) {
    const { data } = await api.post('/admin/news', payload);
    return (data?.data?.news || data?.news || data) as AdminNews;
}

export async function update_admin_news(id: string, payload: Partial<AdminNews>) {
    const { data } = await api.put(`/admin/news/${id}`, payload);
    return (data?.data?.news || data?.news || data) as AdminNews;
}

export async function delete_admin_news(id: string) {
    const { data } = await api.delete(`/admin/news/${id}`);
    return data as { deleted?: boolean };
}

export async function change_admin_news_status(id: string, status: AdminNews['status']) {
    const { data } = await api.put(`/admin/news/${id}/status`, { status });
    return (data?.data?.news || data?.news || data) as AdminNews;
}


