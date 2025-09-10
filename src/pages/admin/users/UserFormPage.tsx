import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const roles = ['Admin', 'Editor', 'Viewer'];

const UserFormPage: React.FC = () => {
    return (
        <AdminLayout title="Người dùng">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Thêm/Sửa người dùng</Typography>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Họ tên" InputProps={{ sx: { height: 56 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Email" type="email" InputProps={{ sx: { height: 56 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Mật khẩu" type="password" InputProps={{ sx: { height: 56 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Vai trò" defaultValue="Viewer" InputProps={{ sx: { height: 56 } }}>
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>{role}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Tài khoản hoạt động" />
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

export default UserFormPage;
