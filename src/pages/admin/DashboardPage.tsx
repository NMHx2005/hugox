import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Grid, Typography, Box, Card, CardContent, CircularProgress, Alert, Snackbar } from '@mui/material';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { get_admin_dashboard_stats, get_admin_revenue_data, get_admin_category_data, DashboardStats, RevenueData, CategoryData } from '../../api/dashboard';

const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [revenueData, setRevenueData] = useState<RevenueData['revenueChart']>([]);
    const [categoryData, setCategoryData] = useState<CategoryData['categoryStats']>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            setError('Lỗi tải dữ liệu dashboard');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatNumber = (num: number) => {
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
        return (
            <AdminLayout title="Dashboard">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout title="Dashboard">
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            </AdminLayout>
        );
    }
    return (
        <AdminLayout title="Dashboard">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#111' }}>Tổng quan</Typography>

            {/* KPI Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {kpis.map((kpi) => (
                    <Grid key={kpi.label} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card elevation={0} sx={{
                            p: 3,
                            backgroundColor: kpi.color,
                            borderRadius: 3,
                            border: '1px solid rgba(0,0,0,0.05)',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-2px)' }
                        }}>
                            <CardContent sx={{ p: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography sx={{ fontSize: '2rem' }}>{kpi.icon}</Typography>
                                    <Typography sx={{
                                        color: kpi.change.startsWith('+') ? '#4caf50' : '#f44336',
                                        fontWeight: 600,
                                        fontSize: '0.875rem'
                                    }}>
                                        {kpi.change}
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: '#666', fontWeight: 600, mb: 0.5, fontSize: '0.875rem' }}>
                                    {kpi.label}
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#111' }}>
                                    {kpi.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Charts Row 1 */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#111' }}>
                            Doanh thu & Đơn hàng (7 ngày qua)
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                        formatter={(value, name) => [
                                            name === 'revenue' ? formatCurrency(Number(value)) : value,
                                            name === 'revenue' ? 'Doanh thu' : 'Đơn hàng'
                                        ]}
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stackId="1"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                        name="Doanh thu"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="orders"
                                        stackId="2"
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                        fillOpacity={0.6}
                                        name="Đơn hàng"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#111' }}>
                            Bán hàng theo danh mục
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                        formatter={(value, name) => [formatNumber(Number(value)), 'Sản phẩm']}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts Row 2 */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#111' }}>
                            Xu hướng doanh thu
                        </Typography>
                        <Box sx={{ height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                        formatter={(value) => [formatCurrency(Number(value)), 'Doanh thu']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#8884d8"
                                        strokeWidth={3}
                                        dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                                        activeDot={{ r: 8, stroke: '#8884d8', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#111' }}>
                            Đơn hàng theo ngày
                        </Typography>
                        <Box sx={{ height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                        formatter={(value) => [formatNumber(Number(value)), 'Đơn hàng']}
                                    />
                                    <Bar
                                        dataKey="orders"
                                        fill="#82ca9d"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default DashboardPage;
