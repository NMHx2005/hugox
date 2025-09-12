import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { get_admin_news, delete_admin_news } from '../../../api/news';
const NewsListPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    useEffect(() => {
        get_admin_news({ page, limit: 12, search }).then(({ items, pagination }) => {
            setItems(items);
            setPages(pagination?.pages || 1);
        });
    }, [page, search]);
    return (_jsxs(AdminLayout, { title: "Tin t\u1EE9c", children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700 }, children: "Qu\u1EA3n l\u00FD tin t\u1EE9c" }), _jsx(Button, { variant: "contained", sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, onClick: () => navigate('/admin/news/create'), children: "Th\u00EAm b\u00E0i vi\u1EBFt" })] }), _jsx(Box, { sx: { display: 'flex', gap: 2, mb: 2 }, children: _jsx(TextField, { placeholder: "T\u00ECm theo ti\u00EAu \u0111\u1EC1...", size: "small", sx: { width: 360 }, value: search, onChange: (e) => setSearch(e.target.value) }) }), _jsx(Paper, { elevation: 0, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Ti\u00EAu \u0111\u1EC1" }), _jsx(TableCell, { children: "Danh m\u1EE5c" }), _jsx(TableCell, { children: "Tr\u1EA1ng th\u00E1i" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: items.map((n) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: n.title }), _jsx(TableCell, { children: n.category }), _jsx(TableCell, { children: n.status }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => navigate(`/admin/news/${n._id}/edit`), children: "S\u1EEDa" }), _jsx(Button, { size: "small", color: "error", onClick: async () => { await delete_admin_news(n._id); setItems(items.filter(i => i._id !== n._id)); }, children: "Xo\u00E1" })] })] }, n._id))) })] }) }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'flex-end', mt: 2 }, children: _jsx(Pagination, { count: pages, page: page, onChange: (_, p) => setPage(p) }) })] }));
};
export default NewsListPage;
