import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AdminLoginPage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
            <Paper elevation={0} sx={{ p: 4, width: 380, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>Đăng nhập Admin</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Email" type="email" fullWidth InputProps={{ sx: { height: 56 } }} />
                    <TextField label="Mật khẩu" type="password" fullWidth InputProps={{ sx: { height: 56 } }} />
                    <Button variant="contained" fullWidth sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' }, py: 1.25 }}>
                        Đăng nhập
                    </Button>
                    <Button variant="text" sx={{ color: '#111' }}>Quên mật khẩu?</Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AdminLoginPage;
