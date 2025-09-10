import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const GeneralSettingsPage: React.FC = () => {
    return (
        <AdminLayout title="Cài đặt chung">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Cài đặt chung</Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Thông tin website</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Tên website" defaultValue="HugoX" InputProps={{ sx: { height: 56 } }} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Mô tả" multiline minRows={3} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Email liên hệ" defaultValue="Hugodigital2003@gmail.com" InputProps={{ sx: { height: 56 } }} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Số điện thoại" defaultValue="08.7878.4842" InputProps={{ sx: { height: 56 } }} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Mạng xã hội</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Facebook" placeholder="https://facebook.com/..." InputProps={{ sx: { height: 56 } }} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="YouTube" placeholder="https://youtube.com/..." InputProps={{ sx: { height: 56 } }} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Zalo" placeholder="https://zalo.me/..." InputProps={{ sx: { height: 56 } }} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }}>Lưu cài đặt</Button>
                <Button variant="outlined">Khôi phục mặc định</Button>
            </Box>
        </AdminLayout>
    );
};

export default GeneralSettingsPage;
