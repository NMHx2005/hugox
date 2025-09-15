import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { get_admin_products, delete_admin_product, set_admin_product_status } from '../../../api/products';
const ProductListPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(false);
    const loadProducts = async () => {
        try {
            setLoading(true);
            const params = { search, page, limit: 12 };
            if (statusFilter !== 'all') {
                params.status = statusFilter;
            }
            const { items, pagination } = await get_admin_products(params);
            setItems(items);
            setPages(pagination?.pages || 1);
        }
        catch (error) {
            console.error('Error loading products:', error);
            setToast({ open: true, message: 'Không thể tải danh sách sản phẩm', severity: 'error' });
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadProducts();
    }, [search, page, statusFilter]);
    const handleStatusToggle = async (productId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await set_admin_product_status(productId, newStatus);
            // Update local state
            setItems(prev => prev.map(item => item._id === productId
                ? { ...item, status: newStatus }
                : item));
            setToast({
                open: true,
                message: `Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} sản phẩm`,
                severity: 'success'
            });
        }
        catch (error) {
            console.error('Error changing status:', error);
            setToast({
                open: true,
                message: error?.response?.data?.message || 'Không thể thay đổi trạng thái',
                severity: 'error'
            });
        }
    };
    return (_jsxs(AdminLayout, { title: "S\u1EA3n ph\u1EA9m", children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700 }, children: "Qu\u1EA3n l\u00FD s\u1EA3n ph\u1EA9m" }), _jsx(Button, { variant: "contained", sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, onClick: () => navigate('/admin/products/create'), children: "Th\u00EAm s\u1EA3n ph\u1EA9m" })] }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 2 }, children: [_jsx(TextField, { placeholder: "T\u00ECm theo t\u00EAn...", size: "small", sx: { width: 360 }, value: search, onChange: (e) => setSearch(e.target.value) }), _jsxs(FormControl, { size: "small", sx: { minWidth: 140 }, children: [_jsx(InputLabel, { children: "Tr\u1EA1ng th\u00E1i" }), _jsxs(Select, { value: statusFilter, label: "Tr\u1EA1ng th\u00E1i", onChange: (e) => setStatusFilter(e.target.value), children: [_jsx(MenuItem, { value: "all", children: "T\u1EA5t c\u1EA3" }), _jsx(MenuItem, { value: "active", children: "\u0110ang b\u00E1n" }), _jsx(MenuItem, { value: "inactive", children: "T\u1EA1m \u1EA9n" }), _jsx(MenuItem, { value: "draft", children: "Nh\u00E1p" })] })] })] }), _jsx(TableContainer, { component: Paper, elevation: 0, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "ID" }), _jsx(TableCell, { children: "T\u00EAn" }), _jsx(TableCell, { align: "right", children: "Gi\u00E1" }), _jsx(TableCell, { align: "right", children: "T\u1ED3n kho" }), _jsx(TableCell, { children: "Tr\u1EA1ng th\u00E1i" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: items.map((row) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsx(Typography, { variant: "caption", sx: { fontFamily: 'monospace', color: '#666' }, children: row._id.slice(-8) }) }), _jsxs(TableCell, { children: [_jsx(Typography, { variant: "body2", sx: { fontWeight: 500 }, children: row.name }), row.sku && (_jsxs(Typography, { variant: "caption", sx: { color: '#666' }, children: ["SKU: ", row.sku] }))] }), _jsxs(TableCell, { align: "right", children: [Number(row.price).toLocaleString('vi-VN'), "\u20AB"] }), _jsx(TableCell, { align: "right", children: row.stock }), _jsx(TableCell, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Chip, { label: row.status === 'active' ? 'Đang bán' :
                                                        row.status === 'inactive' ? 'Tạm ẩn' :
                                                            'Nháp', color: row.status === 'active' ? 'success' :
                                                        row.status === 'inactive' ? 'default' :
                                                            'warning', size: "small" }), (row.status === 'active' || row.status === 'inactive') && (_jsx(Switch, { checked: row.status === 'active', onChange: () => handleStatusToggle(row._id, row.status), size: "small", color: "success" }))] }) }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => navigate(`/admin/products/${row._id}/edit`), children: "S\u1EEDa" }), _jsx(Button, { size: "small", color: "error", onClick: async () => {
                                                    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                                                        try {
                                                            await delete_admin_product(row._id);
                                                            setItems(items.filter(i => i._id !== row._id));
                                                            setToast({ open: true, message: 'Đã xóa sản phẩm', severity: 'success' });
                                                        }
                                                        catch (error) {
                                                            setToast({ open: true, message: 'Không thể xóa sản phẩm', severity: 'error' });
                                                        }
                                                    }
                                                }, children: "Xo\u00E1" })] })] }, row._id))) })] }) }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'flex-end', mt: 2 }, children: _jsx(Pagination, { count: pages, page: page, onChange: (_, p) => setPage(p), color: "primary" }) }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 6000, onClose: () => setToast({ ...toast, open: false }), children: _jsx(Alert, { onClose: () => setToast({ ...toast, open: false }), severity: toast.severity, sx: { width: '100%' }, children: toast.message }) })] }));
};
export default ProductListPage;
