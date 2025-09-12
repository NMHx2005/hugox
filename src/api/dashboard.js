import api from './index';
// Get dashboard statistics
export async function get_admin_dashboard_stats() {
    const { data } = await api.get('/admin/dashboard/stats');
    return (data?.data?.stats || data?.stats || data);
}
// Get revenue data for charts
export async function get_admin_revenue_data(period = '30d') {
    const { data } = await api.get('/admin/dashboard/revenue', { params: { period } });
    return (data?.data || data);
}
// Get orders data for charts
export async function get_admin_orders_data(period = '30d') {
    const { data } = await api.get('/admin/dashboard/orders', { params: { period } });
    return (data?.data || data);
}
// Get category sales data
export async function get_admin_category_data() {
    const { data } = await api.get('/admin/dashboard/categories');
    return (data?.data || data);
}
// Get trends data
export async function get_admin_trends_data(period = '30d') {
    const { data } = await api.get('/admin/dashboard/trends', { params: { period } });
    return (data?.data || data);
}
