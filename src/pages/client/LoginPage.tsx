import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            console.log(data);
            // Backend returns { success, message, data: { user, token } }
            const token = (data && (data.data?.token || data.token || data.accessToken)) as string | undefined;
            console.log(token);
            if (token) localStorage.setItem('token', token);
            // redirect
            const redirect = (location.state)?.from || '/';
            navigate(redirect, { replace: true });
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Paper elevation={0} sx={{ p: 3, width: 420 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
                    Đăng nhập
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Mật khẩu"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" disabled={loading} sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }}>
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
