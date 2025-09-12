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
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get_admin_products, delete_admin_product } from '../../../api/products';
const ProductListPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    useEffect(() => {
        get_admin_products({ search, page, limit: 12 }).then(({ items, pagination }) => {
            setItems(items);
            setPages(pagination?.pages || 1);
        }).catch(() => { setItems([]); setPages(1); });
    }, [search, page]);
    return (_jsxs(AdminLayout, { title: "S\u1EA3n ph\u1EA9m", children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700 }, children: "Qu\u1EA3n l\u00FD s\u1EA3n ph\u1EA9m" }), _jsx(Button, { variant: "contained", sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, onClick: () => navigate('/admin/products/create'), children: "Th\u00EAm s\u1EA3n ph\u1EA9m" })] }), _jsx(Box, { sx: { display: 'flex', gap: 2, mb: 2 }, children: _jsx(TextField, { placeholder: "T\u00ECm theo t\u00EAn...", size: "small", sx: { width: 360 }, value: search, onChange: (e) => setSearch(e.target.value) }) }), _jsx(TableContainer, { component: Paper, elevation: 0, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "ID" }), _jsx(TableCell, { children: "T\u00EAn" }), _jsx(TableCell, { align: "right", children: "Gi\u00E1" }), _jsx(TableCell, { align: "right", children: "T\u1ED3n kho" }), _jsx(TableCell, { children: "Tr\u1EA1ng th\u00E1i" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: items.map((row) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: row._id }), _jsx(TableCell, { children: row.name }), _jsxs(TableCell, { align: "right", children: [Number(row.price).toLocaleString('vi-VN'), "\u20AB"] }), _jsx(TableCell, { align: "right", children: row.stock }), _jsx(TableCell, { children: row.status }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => navigate(`/admin/products/${row._id}/edit`), children: "S\u1EEDa" }), _jsx(Button, { size: "small", color: "error", onClick: async () => { await delete_admin_product(row._id); setItems(items.filter(i => i._id !== row._id)); }, children: "Xo\u00E1" })] })] }, row._id))) })] }) }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'flex-end', mt: 2 }, children: _jsx(Pagination, { count: pages, page: page, onChange: (_, p) => setPage(p), color: "primary" }) })] }));
};
export default ProductListPage;
