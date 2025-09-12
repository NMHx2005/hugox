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
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get_admin_categories, delete_admin_category } from '../../../api/categories';
const categoriesMock = [];
const CategoryListPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        get_admin_categories({ search }).then((list) => {
            setItems(Array.isArray(list) ? list : []);
        }).catch(() => setItems([]));
    }, [search]);
    return (_jsxs(AdminLayout, { title: "Danh m\u1EE5c", children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700 }, children: "Qu\u1EA3n l\u00FD danh m\u1EE5c" }), _jsx(Button, { variant: "contained", sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, onClick: () => navigate('/admin/categories/create'), children: "Th\u00EAm danh m\u1EE5c" })] }), _jsx(Box, { sx: { display: 'flex', gap: 2, mb: 2 }, children: _jsx(TextField, { placeholder: "T\u00ECm theo t\u00EAn...", size: "small", sx: { width: 360 }, value: search, onChange: (e) => setSearch(e.target.value) }) }), _jsx(TableContainer, { component: Paper, elevation: 0, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "\u1EA2nh" }), _jsx(TableCell, { children: "T\u00EAn danh m\u1EE5c" }), _jsx(TableCell, { children: "Slug" }), _jsx(TableCell, { align: "right", children: "Tr\u1EA1ng th\u00E1i" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: items.map((c) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsx(Avatar, { src: c.image, sx: { width: 50, height: 50 }, variant: "rounded", children: c.name.charAt(0) }) }), _jsx(TableCell, { children: c.name }), _jsx(TableCell, { children: c.slug }), _jsx(TableCell, { align: "right", children: c.status }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => navigate(`/admin/categories/${c._id}/edit`), children: "S\u1EEDa" }), _jsx(Button, { size: "small", color: "error", onClick: async () => { await delete_admin_category(c._id); setItems(items.filter(i => i._id !== c._id)); }, children: "Xo\u00E1" })] })] }, c._id))) })] }) })] }));
};
export default CategoryListPage;
