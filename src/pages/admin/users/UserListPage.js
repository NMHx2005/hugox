import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const users = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
    status: i % 2 === 0 ? 'Hoạt động' : 'Tạm khóa',
    lastLogin: '2025-09-10 10:00'
}));
const UserListPage = () => {
    const navigate = useNavigate();
    return (_jsxs(AdminLayout, { title: "Ng\u01B0\u1EDDi d\u00F9ng", children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700 }, children: "Qu\u1EA3n l\u00FD ng\u01B0\u1EDDi d\u00F9ng" }), _jsx(Button, { variant: "contained", sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, onClick: () => navigate('/admin/users/create'), children: "Th\u00EAm ng\u01B0\u1EDDi d\u00F9ng" })] }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 2 }, children: [_jsx(TextField, { placeholder: "T\u00ECm theo t\u00EAn, email...", size: "small", sx: { width: 360 } }), _jsx(TextField, { placeholder: "Vai tr\u00F2", size: "small", sx: { width: 200 } })] }), _jsx(TableContainer, { component: Paper, elevation: 0, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "ID" }), _jsx(TableCell, { children: "T\u00EAn" }), _jsx(TableCell, { children: "Email" }), _jsx(TableCell, { children: "Vai tr\u00F2" }), _jsx(TableCell, { children: "Tr\u1EA1ng th\u00E1i" }), _jsx(TableCell, { children: "L\u1EA7n cu\u1ED1i" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: users.map((user) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: user.id }), _jsx(TableCell, { children: user.name }), _jsx(TableCell, { children: user.email }), _jsx(TableCell, { children: _jsx(Chip, { size: "small", label: user.role, color: user.role === 'Admin' ? 'error' : user.role === 'Editor' ? 'warning' : 'default' }) }), _jsx(TableCell, { children: _jsx(Chip, { size: "small", label: user.status, color: user.status === 'Hoạt động' ? 'success' : 'error' }) }), _jsx(TableCell, { children: user.lastLogin }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => navigate(`/admin/users/${user.id}/edit`), children: "S\u1EEDa" }), _jsx(Button, { size: "small", color: "error", children: "Xo\u00E1" })] })] }, user.id))) })] }) })] }));
};
export default UserListPage;
