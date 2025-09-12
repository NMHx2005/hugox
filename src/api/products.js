import api from './index';
export async function get_admin_products(params) {
    const { data } = await api.get('/admin/products', { params });
    const list = (data?.data?.products ?? data?.products ?? []);
    const pagination = (data?.data?.pagination ?? data?.pagination);
    return { items: Array.isArray(list) ? list : [], pagination };
}
export async function get_admin_product(id) {
    const { data } = await api.get(`/admin/products/${id}`);
    const prod = (data?.data?.product ?? data?.product ?? data);
    return prod;
}
export async function create_admin_product(payload) {
    const { data } = await api.post('/admin/products', payload);
    return data;
}
export async function update_admin_product(id, payload) {
    const { data } = await api.put(`/admin/products/${id}`, payload);
    return data;
}
export async function delete_admin_product(id) {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
}
export async function set_admin_product_status(id, status) {
    const { data } = await api.put(`/admin/products/${id}/status`, { status });
    return data;
}
