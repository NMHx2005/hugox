import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Grid, Typography, Box, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { get_admin_dashboard_stats, get_admin_revenue_data, get_admin_category_data } from '../../api/dashboard';
const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [revenueData, setRevenueData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadDashboardData();
    }, []);
    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [statsData, revenueData, categoryData] = await Promise.all([
                get_admin_dashboard_stats(),
                get_admin_revenue_data('7d'),
                get_admin_category_data()
            ]);
            setStats(statsData);
            setRevenueData(revenueData.revenueChart);
            setCategoryData(categoryData.categoryStats);
        }
        catch (error) {
            console.error('Error loading dashboard data:', error);
            setError('Lỗi tải dữ liệu dashboard');
        }
        finally {
            setLoading(false);
        }
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };
    const formatNumber = (num) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };
    // Prepare KPI data from API
    const kpis = stats ? [
        {
            label: 'Tổng doanh thu',
            value: formatCurrency(stats.totalRevenue),
            change: '+12.5%',
            color: '#e3f2fd',
            icon: '💰'
        },
        {
            label: 'Tổng đơn hàng',
            value: formatNumber(stats.totalOrders),
            change: '+8.2%',
            color: '#e8f5e9',
            icon: '📦'
        },
        {
            label: 'Tổng khách hàng',
            value: formatNumber(stats.totalUsers),
            change: '+15.3%',
            color: '#fff3e0',
            icon: '👥'
        },
        {
            label: 'Tổng sản phẩm',
            value: formatNumber(stats.totalProducts),
            change: '-2.1%',
            color: '#ffebee',
            icon: '⚠️'
        },
    ] : [];
    // Prepare chart data
    const chartData = revenueData.map(item => ({
        name: new Date(item.date).toLocaleDateString('vi-VN', { weekday: 'short' }),
        revenue: item.revenue,
        orders: item.orders
    }));
    const pieData = categoryData.map((item, index) => ({
        name: item.category,
        value: item.count,
        color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00bcd4'][index % 5]
    }));
    if (loading) {
        return (_jsx(AdminLayout, { title: "Dashboard", children: _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }, children: _jsx(CircularProgress, {}) }) }));
    }
    if (error) {
        return (_jsx(AdminLayout, { title: "Dashboard", children: _jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error }) }));
    }
    return (_jsxs(AdminLayout, { title: "Dashboard", children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700, mb: 3, color: '#111' }, children: "T\u1ED5ng quan" }), _jsx(Grid, { container: true, spacing: 3, sx: { mb: 4 }, children: kpis.map((kpi) => (_jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: _jsx(Card, { elevation: 0, sx: {
                            p: 3,
                            backgroundColor: kpi.color,
                            borderRadius: 3,
                            border: '1px solid rgba(0,0,0,0.05)',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-2px)' }
                        }, children: _jsxs(CardContent, { sx: { p: 0 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsx(Typography, { sx: { fontSize: '2rem' }, children: kpi.icon }), _jsx(Typography, { sx: {
                                                color: kpi.change.startsWith('+') ? '#4caf50' : '#f44336',
                                                fontWeight: 600,
                                                fontSize: '0.875rem'
                                            }, children: kpi.change })] }), _jsx(Typography, { sx: { color: '#666', fontWeight: 600, mb: 0.5, fontSize: '0.875rem' }, children: kpi.label }), _jsx(Typography, { variant: "h4", sx: { fontWeight: 800, color: '#111' }, children: kpi.value })] }) }) }, kpi.label))) }), _jsxs(Grid, { container: true, spacing: 3, sx: { mb: 3 }, children: [_jsx(Grid, { size: { xs: 12, lg: 8 }, children: _jsxs(Card, { elevation: 0, sx: { p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 3, color: '#111' }, children: "Doanh thu & \u0110\u01A1n h\u00E0ng (7 ng\u00E0y qua)" }), _jsx(Box, { sx: { height: 300 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }), _jsx(XAxis, { dataKey: "name", stroke: "#666" }), _jsx(YAxis, { stroke: "#666" }), _jsx(Tooltip, { contentStyle: {
                                                        backgroundColor: '#fff',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                    }, formatter: (value, name) => [
                                                        name === 'revenue' ? formatCurrency(Number(value)) : value,
                                                        name === 'revenue' ? 'Doanh thu' : 'Đơn hàng'
                                                    ] }), _jsx(Legend, {}), _jsx(Area, { type: "monotone", dataKey: "revenue", stackId: "1", stroke: "#8884d8", fill: "#8884d8", fillOpacity: 0.6, name: "Doanh thu" }), _jsx(Area, { type: "monotone", dataKey: "orders", stackId: "2", stroke: "#82ca9d", fill: "#82ca9d", fillOpacity: 0.6, name: "\u0110\u01A1n h\u00E0ng" })] }) }) })] }) }), _jsx(Grid, { size: { xs: 12, lg: 4 }, children: _jsxs(Card, { elevation: 0, sx: { p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 3, color: '#111' }, children: "B\u00E1n h\u00E0ng theo danh m\u1EE5c" }), _jsx(Box, { sx: { height: 300 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: pieData, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 100, paddingAngle: 5, dataKey: "value", children: pieData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: {
                                                        backgroundColor: '#fff',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                    }, formatter: (value, name) => [formatNumber(Number(value)), 'Sản phẩm'] }), _jsx(Legend, {})] }) }) })] }) })] }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Card, { elevation: 0, sx: { p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 3, color: '#111' }, children: "Xu h\u01B0\u1EDBng doanh thu" }), _jsx(Box, { sx: { height: 250 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }), _jsx(XAxis, { dataKey: "name", stroke: "#666" }), _jsx(YAxis, { stroke: "#666" }), _jsx(Tooltip, { contentStyle: {
                                                        backgroundColor: '#fff',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                    }, formatter: (value) => [formatCurrency(Number(value)), 'Doanh thu'] }), _jsx(Line, { type: "monotone", dataKey: "revenue", stroke: "#8884d8", strokeWidth: 3, dot: { fill: '#8884d8', strokeWidth: 2, r: 6 }, activeDot: { r: 8, stroke: '#8884d8', strokeWidth: 2 } })] }) }) })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Card, { elevation: 0, sx: { p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 3, color: '#111' }, children: "\u0110\u01A1n h\u00E0ng theo ng\u00E0y" }), _jsx(Box, { sx: { height: 250 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }), _jsx(XAxis, { dataKey: "name", stroke: "#666" }), _jsx(YAxis, { stroke: "#666" }), _jsx(Tooltip, { contentStyle: {
                                                        backgroundColor: '#fff',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                    }, formatter: (value) => [formatNumber(Number(value)), 'Đơn hàng'] }), _jsx(Bar, { dataKey: "orders", fill: "#82ca9d", radius: [4, 4, 0, 0] })] }) }) })] }) })] })] }));
};
export default DashboardPage;
