import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

const parents = [
    { id: 0, name: '— Không có —' },
    { id: 1, name: 'Điện gia dụng' },
    { id: 2, name: 'Quạt' },
];

const CategoryFormPage: React.FC = () => {
    return (
        <AdminLayout title="Danh mục">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Thêm/Sửa danh mục</Typography>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Tên danh mục" InputProps={{ sx: { height: 56 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Slug" placeholder="tu-dong-sinh" InputProps={{ sx: { height: 56 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Danh mục cha" defaultValue={0} InputProps={{ sx: { height: 56 } }}>
                            {parents.map((p) => (
                                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Mô tả" multiline minRows={4} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined">Huỷ</Button>
                            <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }}>Lưu</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </AdminLayout>
    );
};

export default CategoryFormPage;
