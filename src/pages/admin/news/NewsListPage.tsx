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

const news = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: `Tin tức ${i + 1}`,
    category: ['Công nghệ', 'Sản phẩm', 'Khuyến mãi'][i % 3],
    status: i % 2 === 0 ? 'Đã xuất bản' : 'Bản nháp',
    views: (i + 1) * 100,
    createdAt: '2025-09-10 10:00'
}));

const NewsListPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout title="Tin tức">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Quản lý tin tức</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }} onClick={() => navigate('/admin/news/create')}>
                    Thêm tin tức
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField placeholder="Tìm theo tiêu đề..." size="small" sx={{ width: 360 }} />
                <TextField placeholder="Danh mục" size="small" sx={{ width: 200 }} />
            </Box>

            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tiêu đề</TableCell>
                            <TableCell>Danh mục</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="right">Lượt xem</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {news.map((article) => (
                            <TableRow key={article.id} hover>
                                <TableCell>{article.id}</TableCell>
                                <TableCell>{article.title}</TableCell>
                                <TableCell>{article.category}</TableCell>
                                <TableCell>
                                    <Chip size="small" label={article.status} color={article.status === 'Đã xuất bản' ? 'success' : 'default'} />
                                </TableCell>
                                <TableCell align="right">{article.views}</TableCell>
                                <TableCell>{article.createdAt}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/news/${article.id}/edit`)}>Sửa</Button>
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

export default NewsListPage;
