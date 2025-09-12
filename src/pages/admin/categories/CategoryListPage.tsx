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
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get_admin_categories, AdminCategory, delete_admin_category } from '../../../api/categories';

const categoriesMock: never[] = [];

const CategoryListPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<AdminCategory[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        get_admin_categories({ search }).then((list) => {
            setItems(Array.isArray(list) ? list : []);
        }).catch(() => setItems([]));
    }, [search]);

    return (
        <AdminLayout title="Danh mục">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Quản lý danh mục</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }} onClick={() => navigate('/admin/categories/create')}>
                    Thêm danh mục
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField placeholder="Tìm theo tên..." size="small" sx={{ width: 360 }} value={search} onChange={(e) => setSearch(e.target.value)} />
            </Box>

            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ảnh</TableCell>
                            <TableCell>Tên danh mục</TableCell>
                            <TableCell>Slug</TableCell>
                            <TableCell align="right">Trạng thái</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((c) => (
                            <TableRow key={c._id} hover>
                                <TableCell>
                                    <Avatar
                                        src={c.image}
                                        sx={{ width: 50, height: 50 }}
                                        variant="rounded"
                                    >
                                        {c.name.charAt(0)}
                                    </Avatar>
                                </TableCell>
                                <TableCell>{c.name}</TableCell>
                                <TableCell>{c.slug}</TableCell>
                                <TableCell align="right">{c.status}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/categories/${c._id}/edit`)}>Sửa</Button>
                                    <Button size="small" color="error" onClick={async () => { await delete_admin_category(c._id); setItems(items.filter(i => i._id !== c._id)); }}>Xoá</Button>
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
