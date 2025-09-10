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
import { useNavigate } from 'react-router-dom';

const leads = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Khách ${i + 1}`,
    phone: `09${(Math.random() * 100000000).toFixed(0).padStart(8, '0')}`,
    email: `khach${i + 1}@mail.com`,
    subject: i % 3 === 0 ? 'Hỏi giá' : i % 3 === 1 ? 'Bảo hành' : 'Tư vấn',
    status: i % 2 === 0 ? 'Mới' : 'Đã liên hệ',
    createdAt: '2025-09-10 10:00'
}));

const CustomerListPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout title="Khách hàng (Leads)">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Danh sách liên hệ</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField placeholder="Tìm theo tên, email, SĐT..." size="small" sx={{ width: 420 }} />
                <TextField placeholder="Trạng thái" size="small" sx={{ width: 200 }} />
            </Box>

            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>SĐT</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Chủ đề</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thời gian</TableCell>
                            <TableCell align="right">Chi tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leads.map((lead) => (
                            <TableRow key={lead.id} hover>
                                <TableCell>{lead.id}</TableCell>
                                <TableCell>{lead.name}</TableCell>
                                <TableCell>{lead.phone}</TableCell>
                                <TableCell>{lead.email}</TableCell>
                                <TableCell>{lead.subject}</TableCell>
                                <TableCell>
                                    <Chip size="small" label={lead.status} color={lead.status === 'Mới' ? 'primary' : 'success'} />
                                </TableCell>
                                <TableCell>{lead.createdAt}</TableCell>
                                <TableCell align="right">
                                    <Chip label="Xem" onClick={() => navigate(`/admin/customers/${lead.id}`)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
};

export default CustomerListPage;
