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
import { useNavigate } from 'react-router-dom';

const rows = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `Sản phẩm ${i + 1}`,
    price: (i + 1) * 100000,
    stock: 100 - i * 3,
    status: i % 2 === 0 ? 'Đang bán' : 'Tạm ẩn'
}));

const ProductListPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout title="Sản phẩm">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Quản lý sản phẩm</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }} onClick={() => navigate('/admin/products/create')}>
                    Thêm sản phẩm
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField placeholder="Tìm theo tên..." size="small" sx={{ width: 360 }} />
                <TextField placeholder="Trạng thái" size="small" sx={{ width: 200 }} />
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
                        {rows.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell align="right">{row.price.toLocaleString('vi-VN')}₫</TableCell>
                                <TableCell align="right">{row.stock}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/products/${row.id}/edit`)}>Sửa</Button>
                                    <Button size="small" color="error">Xoá</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Pagination count={5} color="primary" />
            </Box>
        </AdminLayout>
    );
};

export default ProductListPage;
