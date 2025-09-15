import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get_admin_categories, AdminCategory, delete_admin_category, change_category_status } from '../../../api/categories';

const categoriesMock: never[] = [];

const CategoryListPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<AdminCategory[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [loading, setLoading] = useState(false);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const params: any = { search };
            if (statusFilter !== 'all') {
                params.status = statusFilter;
            }
            const list = await get_admin_categories(params);
            setItems(Array.isArray(list) ? list : []);
        } catch (error) {
            console.error('Error loading categories:', error);
            setToast({ open: true, message: 'Không thể tải danh sách danh mục', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, [search, statusFilter]);

    const handleStatusToggle = async (categoryId: string, currentStatus: 'active' | 'inactive') => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            const response = await change_category_status(categoryId, newStatus);

            // Update local state
            setItems(prev => prev.map(item =>
                item._id === categoryId
                    ? { ...item, status: newStatus }
                    : item
            ));

            setToast({
                open: true,
                message: `Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} danh mục`,
                severity: 'success'
            });
        } catch (error: any) {
            console.error('Error changing status:', error);
            setToast({
                open: true,
                message: error?.response?.data?.message || 'Không thể thay đổi trạng thái',
                severity: 'error'
            });
        }
    };

    return (
        <AdminLayout title="Danh mục">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Quản lý danh mục</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }} onClick={() => navigate('/admin/categories/create')}>
                    Thêm danh mục
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    placeholder="Tìm theo tên..."
                    size="small"
                    sx={{ width: 360 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Trạng thái"
                        onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                    >
                        <MenuItem value="all">Tất cả</MenuItem>
                        <MenuItem value="active">Hoạt động</MenuItem>
                        <MenuItem value="inactive">Vô hiệu</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ảnh</TableCell>
                            <TableCell>Tên danh mục</TableCell>
                            <TableCell>Slug</TableCell>
                            <TableCell align="right">Trạng thái</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((c) => (
                            <TableRow key={c._id} hover>
                                <TableCell>
                                    <Avatar
                                        src={c.image}
                                        sx={{ width: 50, height: 50 }}
                                        variant="rounded"
                                    >
                                        {c.name.charAt(0)}
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {c.name}
                                        </Typography>
                                        {typeof c.parent === 'object' && c.parent?.name && (
                                            <Typography variant="caption" sx={{ color: '#666' }}>
                                                Con của: {c.parent.name}
                                            </Typography>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell>{c.slug}</TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                                        <Chip
                                            label={c.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
                                            color={c.status === 'active' ? 'success' : 'default'}
                                            size="small"
                                        />
                                        <Switch
                                            checked={c.status === 'active'}
                                            onChange={() => handleStatusToggle(c._id, c.status)}
                                            size="small"
                                            color="success"
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/categories/${c._id}/edit`)}>Sửa</Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={async () => {
                                            if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
                                                try {
                                                    await delete_admin_category(c._id);
                                                    setItems(items.filter(i => i._id !== c._id));
                                                    setToast({ open: true, message: 'Đã xóa danh mục', severity: 'success' });
                                                } catch (error: any) {
                                                    setToast({ open: true, message: 'Không thể xóa danh mục', severity: 'error' });
                                                }
                                            }
                                        }}
                                    >
                                        Xoá
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Toast notifications */}
            <Snackbar
                open={toast.open}
                autoHideDuration={6000}
                onClose={() => setToast({ ...toast, open: false })}
            >
                <Alert
                    onClose={() => setToast({ ...toast, open: false })}
                    severity={toast.severity}
                    sx={{ width: '100%' }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </AdminLayout>
    );
};

export default CategoryListPage;
