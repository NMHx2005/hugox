import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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

// Mock data for charts
const revenueData = [
    { name: 'T2', revenue: 4000, orders: 24 },
    { name: 'T3', revenue: 3000, orders: 13 },
    { name: 'T4', revenue: 2000, orders: 98 },
    { name: 'T5', revenue: 2780, orders: 39 },
    { name: 'T6', revenue: 1890, orders: 48 },
    { name: 'T7', revenue: 2390, orders: 38 },
    { name: 'CN', revenue: 3490, orders: 43 },
];

const categoryData = [
    { name: 'Điện thoại', value: 400, color: '#8884d8' },
    { name: 'Laptop', value: 300, color: '#82ca9d' },
    { name: 'Phụ kiện', value: 200, color: '#ffc658' },
    { name: 'Khác', value: 100, color: '#ff7300' },
];

const kpis = [
    {
        label: 'Doanh thu hôm nay',
        value: '12.5M',
        change: '+12.5%',
        color: '#e3f2fd',
        icon: '💰'
    },
    {
        label: 'Đơn hàng mới',
        value: '128',
        change: '+8.2%',
        color: '#e8f5e9',
        icon: '📦'
    },
    {
        label: 'Khách hàng mới',
        value: '34',
        change: '+15.3%',
        color: '#fff3e0',
        icon: '👥'
    },
    {
        label: 'Tồn kho thấp',
        value: '7',
        change: '-2.1%',
        color: '#ffebee',
        icon: '⚠️'
    },
];

const DashboardPage: React.FC = () => {
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
                                <AreaChart data={revenueData}>
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
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stackId="1"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                        name="Doanh thu (₫)"
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
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
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
                                <LineChart data={revenueData}>
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
                                <BarChart data={revenueData}>
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
