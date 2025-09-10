import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

const CustomerDetailPage: React.FC = () => {
    return (
        <AdminLayout title="Chi tiết liên hệ">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Chi tiết khách hàng</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Thông tin</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: 1.5 }}>
                            <Typography sx={{ color: '#666' }}>Tên</Typography>
                            <Typography>Khách 1</Typography>
                            <Typography sx={{ color: '#666' }}>SĐT</Typography>
                            <Typography>0900000000</Typography>
                            <Typography sx={{ color: '#666' }}>Email</Typography>
                            <Typography>khach1@mail.com</Typography>
                            <Typography sx={{ color: '#666' }}>Chủ đề</Typography>
                            <Typography>Hỏi giá</Typography>
                            <Typography sx={{ color: '#666' }}>Trạng thái</Typography>
                            <Chip size="small" color="primary" label="Mới" />
                            <Typography sx={{ color: '#666' }}>Thời gian</Typography>
                            <Typography>2025-09-10 10:00</Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Ghi chú nội bộ</Typography>
                        <TextField fullWidth multiline minRows={6} placeholder="Thêm ghi chú chăm sóc khách hàng..." />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }}>Lưu ghi chú</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default CustomerDetailPage;
