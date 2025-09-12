import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';
const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            console.log(data);
            // Backend returns { success, message, data: { user, token } }
            const token = (data && (data.data?.token || data.token || data.accessToken));
            console.log(token);
            if (token)
                localStorage.setItem('token', token);
            // redirect
            const redirect = (location.state)?.from || '/';
            navigate(redirect, { replace: true });
        }
        catch (err) {
            setError(err?.response?.data?.message || 'Đăng nhập thất bại');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', mt: 6 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, width: 420 }, children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { mb: 2, fontWeight: 700 }, children: "\u0110\u0103ng nh\u1EADp" }), error && _jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error }), _jsxs(Box, { component: "form", onSubmit: onSubmit, sx: { display: 'grid', gap: 2 }, children: [_jsx(TextField, { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx(TextField, { label: "M\u1EADt kh\u1EA9u", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx(Button, { type: "submit", variant: "contained", disabled: loading, sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, children: loading ? 'Đang đăng nhập...' : 'Đăng nhập' })] })] }) }));
};
export default LoginPage;
