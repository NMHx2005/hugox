import api from './index';
export async function get_admin_news(params) {
    const { data } = await api.get('/admin/news', { params });
    const items = (data?.data?.news || data?.news || []);
    const pagination = (data?.data?.pagination || data?.pagination);
    return { items, pagination };
}
export async function get_admin_news_article(id) {
    const { data } = await api.get(`/admin/news/${id}`);
    return (data?.data?.article || data?.article || data);
}
export async function create_admin_news(payload) {
    const { data } = await api.post('/admin/news', payload);
    return (data?.data?.news || data?.news || data);
}
export async function update_admin_news(id, payload) {
    const { data } = await api.put(`/admin/news/${id}`, payload);
    return (data?.data?.news || data?.news || data);
}
export async function delete_admin_news(id) {
    const { data } = await api.delete(`/admin/news/${id}`);
    return data;
}
export async function change_admin_news_status(id, status) {
    const { data } = await api.put(`/admin/news/${id}/status`, { status });
    return (data?.data?.news || data?.news || data);
}
