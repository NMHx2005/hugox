import api from '../index';

export interface NewsArticle {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    category: string;
    author: {
        _id: string;
        name: string;
    };
    featuredImage?: string;
    images?: string[];
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
    tags?: string[];
    seoTitle?: string;
    seoDescription?: string;
    views: number;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface NewsResponse {
    success: boolean;
    data: {
        news: NewsArticle[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    };
}

export interface NewsArticleResponse {
    success: boolean;
    data: {
        article: NewsArticle;
    };
}

export interface NewsCategoriesResponse {
    success: boolean;
    data: {
        categories: string[];
    };
}

// Get all news with pagination and filters
export async function get_news(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
}): Promise<NewsResponse> {
    const { data } = await api.get('/news', { params });
    return data;
}

// Get single news article
export async function get_news_article(id: string): Promise<NewsArticleResponse> {
    const { data } = await api.get(`/news/${id}`);
    return data;
}

// Get featured news
export async function get_featured_news(limit?: number): Promise<NewsArticle[]> {
    const { data } = await api.get('/news/featured', {
        params: limit ? { limit } : {}
    });
    return Array.isArray(data.data?.news) ? data.data.news : [];
}

// Get news by category
export async function get_news_by_category(category: string, params?: {
    page?: number;
    limit?: number;
}): Promise<NewsResponse> {
    const { data } = await api.get(`/news/category/${category}`, { params });
    return data;
}

// Get news categories
export async function get_news_categories(): Promise<string[]> {
    const { data } = await api.get('/news/categories');
    return data.data?.categories || [];
}