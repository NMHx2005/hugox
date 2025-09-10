import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

const categories = ['Công nghệ', 'Sản phẩm', 'Khuyến mãi', 'Tin tức'];

const NewsFormPage: React.FC = () => {
    return (
        <AdminLayout title="Tin tức">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Thêm/Sửa tin tức</Typography>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Tiêu đề" InputProps={{ sx: { height: 56 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Slug" placeholder="tu-dong-sinh" InputProps={{ sx: { height: 56 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Danh mục" defaultValue="Công nghệ" InputProps={{ sx: { height: 56 } }}>
                            {categories.map((c) => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Mô tả ngắn" multiline minRows={2} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Nội dung" multiline minRows={8} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Hình ảnh đại diện" placeholder="URL hình ảnh" InputProps={{ sx: { height: 56 } }} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined">Huỷ</Button>
                            <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }}>Lưu bản nháp</Button>
                            <Button variant="contained" sx={{ backgroundColor: '#f58220', '&:hover': { backgroundColor: '#e6731a' } }}>Xuất bản</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </AdminLayout>
    );
};

export default NewsFormPage;
