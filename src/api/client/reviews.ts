import api from '../index';

export interface Review {
    _id: string;
    product?: {
        _id: string;
        name: string;
        slug: string;
        images?: string[];
    };
    user?: {
        _id: string;
        name: string;
        email: string;
    };
    rating: number;
    title?: string;
    comment: string;
    images?: string[];
    likes: number;
    dislikes: number;
    verified: boolean;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

export interface ReviewsResponse {
    success: boolean;
    data: {
        reviews: Review[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    };
}

export interface ReviewResponse {
    success: boolean;
    data: {
        review: Review;
    };
}

export interface ReviewStatsResponse {
    success: boolean;
    data: {
        stats: {
            averageRating: number;
            totalReviews: number;
            ratingDistribution: {
                5: number;
                4: number;
                3: number;
                2: number;
                1: number;
            };
        };
    };
}

// Get all reviews with pagination and filters
export async function get_reviews(params?: {
    page?: number;
    limit?: number;
    product?: string;
    rating?: number;
    status?: string;
    sort?: string;
}): Promise<ReviewsResponse> {
    const { data } = await api.get('/reviews', { params });
    return data;
}

// Get single review
export async function get_review(id: string): Promise<ReviewResponse> {
    const { data } = await api.get(`/reviews/${id}`);
    return data;
}

// Get reviews by product
export async function get_reviews_by_product(productId: string, params?: {
    page?: number;
    limit?: number;
    rating?: number;
    sort?: string;
}): Promise<ReviewsResponse> {
    const { data } = await api.get(`/reviews/product/${productId}`, { params });
    return data;
}

// Get review statistics for a product
export async function get_review_stats(productId: string): Promise<ReviewStatsResponse> {
    const { data } = await api.get(`/reviews/stats/${productId}`);
    return data;
}

// Create a new review
export async function create_review(payload: {
    product: string;
    rating: number;
    title?: string;
    comment: string;
    images?: string[];
}): Promise<ReviewResponse> {
    const { data } = await api.post('/reviews', payload);
    return data;
}

// Update a review
export async function update_review(id: string, payload: {
    rating?: number;
    title?: string;
    comment?: string;
    images?: string[];
}): Promise<ReviewResponse> {
    const { data } = await api.put(`/reviews/${id}`, payload);
    return data;
}

// Delete a review
export async function delete_review(id: string): Promise<{ success: boolean }> {
    const { data } = await api.delete(`/reviews/${id}`);
    return data;
}

// Like a review
export async function like_review(id: string): Promise<{ success: boolean }> {
    const { data } = await api.post(`/reviews/${id}/like`);
    return data;
}

// Dislike a review
export async function dislike_review(id: string): Promise<{ success: boolean }> {
    const { data } = await api.post(`/reviews/${id}/dislike`);
    return data;
}
