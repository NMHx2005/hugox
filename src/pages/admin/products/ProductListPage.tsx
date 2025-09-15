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
import Pagination from '@mui/material/Pagination';
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
import { get_admin_products, AdminProduct, delete_admin_product, set_admin_product_status } from '../../../api/products';



const ProductListPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<AdminProduct[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'draft'>('all');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [loading, setLoading] = useState(false);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const params: any = { search, page, limit: 12 };
            if (statusFilter !== 'all') {
                params.status = statusFilter;
            }
            const { items, pagination } = await get_admin_products(params);
            setItems(items);
            setPages(pagination?.pages || 1);
        } catch (error) {
            console.error('Error loading products:', error);
            setToast({ open: true, message: 'Không thể tải danh sách sản phẩm', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [search, page, statusFilter]);

    const handleStatusToggle = async (productId: string, currentStatus: 'active' | 'inactive' | 'draft') => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await set_admin_product_status(productId, newStatus);

            // Update local state
            setItems(prev => prev.map(item =>
                item._id === productId
                    ? { ...item, status: newStatus }
                    : item
            ));

            setToast({
                open: true,
                message: `Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} sản phẩm`,
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
        <AdminLayout title="Sản phẩm">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Quản lý sản phẩm</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }} onClick={() => navigate('/admin/products/create')}>
                    Thêm sản phẩm
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
                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Trạng thái"
                        onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive' | 'draft')}
                    >
                        <MenuItem value="all">Tất cả</MenuItem>
                        <MenuItem value="active">Đang bán</MenuItem>
                        <MenuItem value="inactive">Tạm ẩn</MenuItem>
                        <MenuItem value="draft">Nháp</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell align="right">Giá</TableCell>
                            <TableCell align="right">Tồn kho</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row) => (
                            <TableRow key={row._id} hover>
                                <TableCell>
                                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#666' }}>
                                        {row._id.slice(-8)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {row.name}
                                    </Typography>
                                    {row.sku && (
                                        <Typography variant="caption" sx={{ color: '#666' }}>
                                            SKU: {row.sku}
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell align="right">{Number(row.price).toLocaleString('vi-VN')}₫</TableCell>
                                <TableCell align="right">{row.stock}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Chip
                                            label={
                                                row.status === 'active' ? 'Đang bán' :
                                                    row.status === 'inactive' ? 'Tạm ẩn' :
                                                        'Nháp'
                                            }
                                            color={
                                                row.status === 'active' ? 'success' :
                                                    row.status === 'inactive' ? 'default' :
                                                        'warning'
                                            }
                                            size="small"
                                        />
                                        {(row.status === 'active' || row.status === 'inactive') && (
                                            <Switch
                                                checked={row.status === 'active'}
                                                onChange={() => handleStatusToggle(row._id, row.status)}
                                                size="small"
                                                color="success"
                                            />
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/products/${row._id}/edit`)}>Sửa</Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={async () => {
                                            if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                                                try {
                                                    await delete_admin_product(row._id);
                                                    setItems(items.filter(i => i._id !== row._id));
                                                    setToast({ open: true, message: 'Đã xóa sản phẩm', severity: 'success' });
                                                } catch (error: any) {
                                                    setToast({ open: true, message: 'Không thể xóa sản phẩm', severity: 'error' });
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

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Pagination count={pages} page={page} onChange={(_, p) => setPage(p)} color="primary" />
            </Box>

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

export default ProductListPage;
