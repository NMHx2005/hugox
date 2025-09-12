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
import { useEffect, useState } from 'react';
import { get_admin_products, AdminProduct, delete_admin_product } from '../../../api/products';



const ProductListPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<AdminProduct[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        get_admin_products({ search, page, limit: 12 }).then(({ items, pagination }) => {
            setItems(items);
            setPages(pagination?.pages || 1);
        }).catch(() => { setItems([]); setPages(1); });
    }, [search, page]);

    return (
        <AdminLayout title="Sản phẩm">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Quản lý sản phẩm</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }} onClick={() => navigate('/admin/products/create')}>
                    Thêm sản phẩm
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField placeholder="Tìm theo tên..." size="small" sx={{ width: 360 }} value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                <TableCell>{row._id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell align="right">{Number(row.price).toLocaleString('vi-VN')}₫</TableCell>
                                <TableCell align="right">{row.stock}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/products/${row._id}/edit`)}>Sửa</Button>
                                    <Button size="small" color="error" onClick={async () => { await delete_admin_product(row._id); setItems(items.filter(i => i._id !== row._id)); }}>Xoá</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Pagination count={pages} page={page} onChange={(_, p) => setPage(p)} color="primary" />
            </Box>
        </AdminLayout>
    );
};

export default ProductListPage;
