import api from '../index';
// Get all products with pagination and filters
export async function get_products(params) {
    const { data } = await api.get('/products', { params });
    return data;
}
// Get product by ID or slug
export async function get_product(idOrSlug) {
    const { data } = await api.get(`/products/${idOrSlug}`);
    return data;
}
// Get products by category slug
export async function get_products_by_category(categorySlug, params) {
    const { data } = await api.get(`/products/category/${categorySlug}`, { params });
    return data;
}
// Get featured products
export async function get_featured_products(limit) {
    const { data } = await api.get('/products/featured', { params: { limit } });
    return data;
}
// Search products
export async function search_products(query, params) {
    const { data } = await api.get('/products/search', {
        params: {
            q: query,
            ...params
        }
    });
    return data;
}
// Get related products
export async function get_related_products(productId, limit) {
    const { data } = await api.get(`/products/${productId}/related`, { params: { limit } });
    return data;
}
