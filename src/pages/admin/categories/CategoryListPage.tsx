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
import { useNavigate } from 'react-router-dom';

const categories = [
    { id: 1, name: 'Điện gia dụng', slug: 'dien-gia-dung', products: 120 },
    { id: 2, name: 'Quạt', slug: 'quat', products: 45 },
    { id: 3, name: 'Máy hút ẩm', slug: 'may-hut-am', products: 32 },
];

const CategoryListPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout title="Danh mục">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Quản lý danh mục</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }} onClick={() => navigate('/admin/categories/create')}>
                    Thêm danh mục
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField placeholder="Tìm theo tên..." size="small" sx={{ width: 360 }} />
            </Box>

            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên danh mục</TableCell>
                            <TableCell>Slug</TableCell>
                            <TableCell align="right">Số SP</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((c) => (
                            <TableRow key={c.id} hover>
                                <TableCell>{c.id}</TableCell>
                                <TableCell>{c.name}</TableCell>
                                <TableCell>{c.slug}</TableCell>
                                <TableCell align="right">{c.products}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/categories/${c.id}/edit`)}>Sửa</Button>
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

export default CategoryListPage;
