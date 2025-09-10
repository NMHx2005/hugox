import React from 'react';
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

const UserListPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout title="Người dùng">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Quản lý người dùng</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }} onClick={() => navigate('/admin/users/create')}>
                    Thêm người dùng
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField placeholder="Tìm theo tên, email..." size="small" sx={{ width: 360 }} />
                <TextField placeholder="Vai trò" size="small" sx={{ width: 200 }} />
            </Box>

            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Vai trò</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Lần cuối</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip size="small" label={user.role} color={user.role === 'Admin' ? 'error' : user.role === 'Editor' ? 'warning' : 'default'} />
                                </TableCell>
                                <TableCell>
                                    <Chip size="small" label={user.status} color={user.status === 'Hoạt động' ? 'success' : 'error'} />
                                </TableCell>
                                <TableCell>{user.lastLogin}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/users/${user.id}/edit`)}>Sửa</Button>
                                    <Button size="small" color="error">Xoá</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
};

export default UserListPage;
