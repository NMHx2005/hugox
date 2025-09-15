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
import { get_admin_categories, delete_admin_category, change_category_status } from '../../../api/categories';
const categoriesMock = [];
const CategoryListPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(false);
    const loadCategories = async () => {
        try {
            setLoading(true);
            const params = { search };
            if (statusFilter !== 'all') {
                params.status = statusFilter;
            }
            const list = await get_admin_categories(params);
            setItems(Array.isArray(list) ? list : []);
        }
        catch (error) {
            console.error('Error loading categories:', error);
            setToast({ open: true, message: 'Không thể tải danh sách danh mục', severity: 'error' });
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadCategories();
    }, [search, statusFilter]);
    const handleStatusToggle = async (categoryId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            const response = await change_category_status(categoryId, newStatus);
            // Update local state
            setItems(prev => prev.map(item => item._id === categoryId
                ? { ...item, status: newStatus }
                : item));
            setToast({
                open: true,
                message: `Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} danh mục`,
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
    return (_jsxs(AdminLayout, { title: "Danh m\u1EE5c", children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700 }, children: "Qu\u1EA3n l\u00FD danh m\u1EE5c" }), _jsx(Button, { variant: "contained", sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, onClick: () => navigate('/admin/categories/create'), children: "Th\u00EAm danh m\u1EE5c" })] }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 2 }, children: [_jsx(TextField, { placeholder: "T\u00ECm theo t\u00EAn...", size: "small", sx: { width: 360 }, value: search, onChange: (e) => setSearch(e.target.value) }), _jsxs(FormControl, { size: "small", sx: { minWidth: 120 }, children: [_jsx(InputLabel, { children: "Tr\u1EA1ng th\u00E1i" }), _jsxs(Select, { value: statusFilter, label: "Tr\u1EA1ng th\u00E1i", onChange: (e) => setStatusFilter(e.target.value), children: [_jsx(MenuItem, { value: "all", children: "T\u1EA5t c\u1EA3" }), _jsx(MenuItem, { value: "active", children: "Ho\u1EA1t \u0111\u1ED9ng" }), _jsx(MenuItem, { value: "inactive", children: "V\u00F4 hi\u1EC7u" })] })] })] }), _jsx(TableContainer, { component: Paper, elevation: 0, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "\u1EA2nh" }), _jsx(TableCell, { children: "T\u00EAn danh m\u1EE5c" }), _jsx(TableCell, { children: "Slug" }), _jsx(TableCell, { align: "right", children: "Tr\u1EA1ng th\u00E1i" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: items.map((c) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsx(Avatar, { src: c.image, sx: { width: 50, height: 50 }, variant: "rounded", children: c.name.charAt(0) }) }), _jsx(TableCell, { children: _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", sx: { fontWeight: 500 }, children: c.name }), typeof c.parent === 'object' && c.parent?.name && (_jsxs(Typography, { variant: "caption", sx: { color: '#666' }, children: ["Con c\u1EE7a: ", c.parent.name] }))] }) }), _jsx(TableCell, { children: c.slug }), _jsx(TableCell, { align: "right", children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }, children: [_jsx(Chip, { label: c.status === 'active' ? 'Hoạt động' : 'Vô hiệu', color: c.status === 'active' ? 'success' : 'default', size: "small" }), _jsx(Switch, { checked: c.status === 'active', onChange: () => handleStatusToggle(c._id, c.status), size: "small", color: "success" })] }) }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => navigate(`/admin/categories/${c._id}/edit`), children: "S\u1EEDa" }), _jsx(Button, { size: "small", color: "error", onClick: async () => {
                                                    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
                                                        try {
                                                            await delete_admin_category(c._id);
                                                            setItems(items.filter(i => i._id !== c._id));
                                                            setToast({ open: true, message: 'Đã xóa danh mục', severity: 'success' });
                                                        }
                                                        catch (error) {
                                                            setToast({ open: true, message: 'Không thể xóa danh mục', severity: 'error' });
                                                        }
                                                    }
                                                }, children: "Xo\u00E1" })] })] }, c._id))) })] }) }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 6000, onClose: () => setToast({ ...toast, open: false }), children: _jsx(Alert, { onClose: () => setToast({ ...toast, open: false }), severity: toast.severity, sx: { width: '100%' }, children: toast.message }) })] }));
};
export default CategoryListPage;
