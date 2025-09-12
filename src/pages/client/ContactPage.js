import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from '../../components/shared/Layout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import api from '../../api';
const GOOGLE_MAP_EMBED = 'https://www.google.com/maps?q=27%20%C4%90o%C3%A0n%20Th%E1%BB%8B%20%C4%90i%E1%BB%83m%20-%20Ph%C6%B0%E1%BB%9Dng%20S%C3%B4ng%20C%E1%BA%A7u%20-%20D%C4%83k%20L%C4%83k&output=embed';
const ContactPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            await api.post('/contact', data);
            alert('Gửi liên hệ thành công!');
        }
        catch {
            alert('Đã có lỗi xảy ra!');
        }
    };
    return (_jsx(Layout, { children: _jsxs(Box, { sx: { backgroundColor: '#f5f5f5' }, children: [_jsx(Box, { sx: {
                        backgroundImage: 'url(/Banner-web-1.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: '#fff',
                        py: { xs: 6, md: 8 },
                        textAlign: 'center',
                    }, children: _jsx(Typography, { variant: "h3", sx: { fontWeight: 700 }, children: "Li\u00EAn h\u1EC7" }) }), _jsx(Box, { className: "container", sx: { py: 4 }, children: _jsxs(Grid, { container: true, spacing: 4, children: [_jsx(Grid, { size: { xs: 12, md: 5 }, children: _jsxs(Paper, { elevation: 0, sx: { p: { xs: 2, md: 3 } }, children: [_jsx(Typography, { variant: "h5", sx: { fontWeight: 700, mb: 1 }, children: "Li\u00EAn h\u1EC7 l\u00E0m \u0111\u1EA1i l\u00FD" }), _jsx(Typography, { sx: { color: '#666', mb: 2 }, children: "\u0110\u0103ng k\u00FD l\u00E0m \u0111\u1EA1i l\u00FD v\u1EDBi nhi\u1EC1u ch\u00EDnh s\u00E1ch \u01B0u \u0111\u00E3i v\u00E0 chi\u1EBFt kh\u1EA5u h\u1EA5p d\u1EABn." }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(Typography, { sx: { fontWeight: 600, minWidth: 84 }, children: "\u0110\u1ECBa ch\u1EC9:" }), _jsx(Typography, { children: "27 \u0110o\u00E0n Th\u1ECB \u0110i\u1EC3m - Ph\u01B0\u1EDDng S\u00F4ng C\u1EA7u - D\u0103k L\u0103k" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(Typography, { sx: { fontWeight: 600, minWidth: 84 }, children: "Hotline:" }), _jsx(Typography, { children: "08.7878.4842" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(Typography, { sx: { fontWeight: 600, minWidth: 84 }, children: "Zalo:" }), _jsx(Typography, { children: "08.7878.4842" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 600, minWidth: 84 }, children: "Email:" }), _jsx(Typography, { children: "Hugodigital2003@gmail.com" })] }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsx(Button, { variant: "contained", sx: { backgroundColor: '#f58220', '&:hover': { backgroundColor: '#e6731a' } }, onClick: () => window.open('https://zalo.me/0878784842', '_blank'), children: "Nh\u1EAFn Zalo mua h\u00E0ng" }), _jsx(Button, { variant: "outlined", sx: { borderColor: '#f58220', color: '#f58220', '&:hover': { backgroundColor: '#fff5f0', borderColor: '#f58220' } }, onClick: () => window.open('tel:0878784842', '_self'), children: "G\u1ECDi hotline" })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 7 }, children: _jsx(Paper, { elevation: 0, sx: { p: { xs: 2, md: 3 } }, children: _jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "H\u1ECD t\u00EAn", size: "medium", InputProps: { sx: { height: 56 } }, ...register('name', { required: 'Vui lòng nhập họ tên' }), error: !!errors.name, helperText: errors.name?.message }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", size: "medium", InputProps: { sx: { height: 56 } }, ...register('phone', { required: 'Vui lòng nhập số điện thoại' }), error: !!errors.phone, helperText: errors.phone?.message }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "Email", size: "medium", InputProps: { sx: { height: 56 } }, ...register('email', {
                                                            required: 'Vui lòng nhập email',
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: 'Email không hợp lệ',
                                                            },
                                                        }), error: !!errors.email, helperText: errors.email?.message }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "Ch\u1EE7 \u0111\u1EC1", size: "medium", InputProps: { sx: { height: 56 } }, ...register('subject', { required: 'Vui lòng nhập chủ đề' }), error: !!errors.subject, helperText: errors.subject?.message }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "N\u1ED9i dung", size: "medium", multiline: true, minRows: 6, ...register('content', { required: 'Vui lòng nhập nội dung' }), error: !!errors.content, helperText: errors.content?.message }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(Button, { fullWidth: true, variant: "contained", type: "submit", sx: { backgroundColor: '#000', '&:hover': { backgroundColor: '#111' }, py: 1.25 }, children: "Li\u00EAn h\u1EC7 ch\u00FAng t\u00F4i" }) })] }) }) }) })] }) }), _jsx(Box, { sx: { width: '100%', height: { xs: 360, md: 540 }, borderTop: '1px solid #eee' }, children: _jsx(Box, { component: "iframe", src: GOOGLE_MAP_EMBED, sx: { width: '100%', height: '100%', border: 0 }, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) })] }) }));
};
export default ContactPage;
