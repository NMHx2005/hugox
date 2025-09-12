import api from '../index';
// Get all news with pagination and filters
export async function get_news(params) {
    const { data } = await api.get('/news', { params });
    return data;
}
// Get single news article
export async function get_news_article(id) {
    const { data } = await api.get(`/news/${id}`);
    return data;
}
// Get featured news
export async function get_featured_news(limit) {
    const { data } = await api.get('/news/featured', {
        params: limit ? { limit } : {}
    });
    return Array.isArray(data.data?.news) ? data.data.news : [];
}
// Get news by category
export async function get_news_by_category(category, params) {
    const { data } = await api.get(`/news/category/${category}`, { params });
    return data;
}
// Get news categories
export async function get_news_categories() {
    const { data } = await api.get('/news/categories');
    return data.data?.categories || [];
}
