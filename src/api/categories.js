import api from './index';
export async function get_admin_categories(params) {
    const { data } = await api.get('/admin/categories', { params });
    const list = (data?.data?.categories ?? data?.categories ?? data);
    return Array.isArray(list) ? list : [];
}
export async function get_admin_category(id) {
    const { data } = await api.get(`/admin/categories/${id}`);
    const cat = (data?.data?.category ?? data?.category ?? data);
    return cat;
}
export async function create_admin_category(payload) {
    const { data } = await api.post('/admin/categories', payload);
    return data;
}
export async function update_admin_category(id, payload) {
    const { data } = await api.put(`/admin/categories/${id}`, payload);
    return data;
}
export async function delete_admin_category(id) {
    const { data } = await api.delete(`/admin/categories/${id}`);
    return data;
}
