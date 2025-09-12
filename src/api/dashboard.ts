import api from './index';

export type DashboardStats = {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
    totalContacts: number;
    recentOrders: Array<{
        id: string;
        customer: string;
        total: number;
        status: string;
        date: string;
    }>;
    topProducts: Array<{
        _id: string;
        name: string;
        reviewsCount: number;
        averageRating: number;
    }>;
    revenueChart: Array<{
        date: string;
        revenue: number;
        orders: number;
    }>;
    categoryStats: Array<{
        category: string;
        count: number;
        revenue: number;
    }>;
};

export type RevenueData = {
    revenueChart: Array<{
        date: string;
        revenue: number;
        orders: number;
    }>;
};

export type OrdersData = {
    ordersChart: Array<{
        date: string;
        orders: number;
        revenue: number;
    }>;
};

export type CategoryData = {
    categoryStats: Array<{
        category: string;
        count: number;
        revenue: number;
        averagePrice: number;
    }>;
};

export type TrendsData = {
    trends: Array<{
        period: string;
        revenue: number;
        orders: number;
        users: number;
    }>;
};

// Get dashboard statistics
export async function get_admin_dashboard_stats() {
    const { data } = await api.get('/admin/dashboard/stats');
    return (data?.data?.stats || data?.stats || data) as DashboardStats;
}

// Get revenue data for charts
export async function get_admin_revenue_data(period: '7d' | '30d' | '90d' | '1y' = '30d') {
    const { data } = await api.get('/admin/dashboard/revenue', { params: { period } });
    return (data?.data || data) as RevenueData;
}

// Get orders data for charts
export async function get_admin_orders_data(period: '7d' | '30d' | '90d' | '1y' = '30d') {
    const { data } = await api.get('/admin/dashboard/orders', { params: { period } });
    return (data?.data || data) as OrdersData;
}

// Get category sales data
export async function get_admin_category_data() {
    const { data } = await api.get('/admin/dashboard/categories');
    return (data?.data || data) as CategoryData;
}

// Get trends data
export async function get_admin_trends_data(period: '7d' | '30d' | '90d' | '1y' = '30d') {
    const { data } = await api.get('/admin/dashboard/trends', { params: { period } });
    return (data?.data || data) as TrendsData;
}
