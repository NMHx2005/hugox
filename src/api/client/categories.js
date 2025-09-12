import api from '../index';
// Get all categories
export async function get_categories() {
    const { data } = await api.get('/categories');
    return (data?.data?.categories || data?.categories || data);
}
// Get category by ID
export async function get_category(id) {
    const { data } = await api.get(`/categories/${id}`);
    return (data?.data?.category || data?.category || data);
}
// Get products by category
export async function get_category_products(id, params) {
    const { data } = await api.get(`/categories/${id}/products`, { params });
    return (data?.data?.products || data?.products || data);
}
