import api from '../index';
// Get all reviews with pagination and filters
export async function get_reviews(params) {
    const { data } = await api.get('/reviews', { params });
    return data;
}
// Get single review
export async function get_review(id) {
    const { data } = await api.get(`/reviews/${id}`);
    return data;
}
// Get reviews by product
export async function get_reviews_by_product(productId, params) {
    const { data } = await api.get(`/reviews/product/${productId}`, { params });
    return data;
}
// Get review statistics for a product
export async function get_review_stats(productId) {
    const { data } = await api.get(`/reviews/stats/${productId}`);
    return data;
}
// Create a new review
export async function create_review(payload) {
    const { data } = await api.post('/reviews', payload);
    return data;
}
// Update a review
export async function update_review(id, payload) {
    const { data } = await api.put(`/reviews/${id}`, payload);
    return data;
}
// Delete a review
export async function delete_review(id) {
    const { data } = await api.delete(`/reviews/${id}`);
    return data;
}
// Like a review
export async function like_review(id) {
    const { data } = await api.post(`/reviews/${id}/like`);
    return data;
}
// Dislike a review
export async function dislike_review(id) {
    const { data } = await api.post(`/reviews/${id}/dislike`);
    return data;
}
