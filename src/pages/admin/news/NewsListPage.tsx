import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { get_admin_news, delete_admin_news, AdminNews } from '../../../api/news';

const NewsListPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<AdminNews[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        get_admin_news({ page, limit: 12, search }).then(({ items, pagination }) => {
            setItems(items);
            setPages(pagination?.pages || 1);
        });
    }, [page, search]);

    return (
        <AdminLayout title="Tin tức">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Quản lý tin tức</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }} onClick={() => navigate('/admin/news/create')}>
                    Thêm bài viết
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField placeholder="Tìm theo tiêu đề..." size="small" sx={{ width: 360 }} value={search} onChange={(e) => setSearch(e.target.value)} />
            </Box>

            <Paper elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tiêu đề</TableCell>
                            <TableCell>Danh mục</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((n) => (
                            <TableRow key={n._id} hover>
                                <TableCell>{n.title}</TableCell>
                                <TableCell>{n.category}</TableCell>
                                <TableCell>{n.status}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/news/${n._id}/edit`)}>Sửa</Button>
                                    <Button size="small" color="error" onClick={async () => { await delete_admin_news(n._id); setItems(items.filter(i => i._id !== n._id)); }}>Xoá</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Pagination count={pages} page={page} onChange={(_, p) => setPage(p)} />
            </Box>
        </AdminLayout>
    );
};

export default NewsListPage;
