import React from 'react';
import Layout from '../../components/shared/Layout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import api from '../../api';

const GOOGLE_MAP_EMBED =
    'https://www.google.com/maps?q=27%20%C4%90o%C3%A0n%20Th%E1%BB%8B%20%C4%90i%E1%BB%83m%20-%20Ph%C6%B0%E1%BB%9Dng%20S%C3%B4ng%20C%E1%BA%A7u%20-%20D%C4%83k%20L%C4%83k&output=embed';

type ContactFormData = {
    name: string;
    phone: string;
    email: string;
    subject: string;
    content: string;
};

const ContactPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        try {
            await api.post('/contact', data);
            alert('Gửi liên hệ thành công!');
        } catch {
            alert('Đã có lỗi xảy ra!');
        }
    };

    return (
        <Layout>
            <Box sx={{ backgroundColor: '#f5f5f5' }}>
                {/* Hero / Title */}
                <Box
                    sx={{
                        backgroundImage: 'url(/Banner-web-1.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: '#fff',
                        py: { xs: 6, md: 8 },
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        Liên hệ
                    </Typography>
                </Box>

                <Box className="container" sx={{ py: 4 }}>
                    <Grid container spacing={4}>
                        {/* Left: Contact Info */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                    Liên hệ làm đại lý
                                </Typography>
                                <Typography sx={{ color: '#666', mb: 2 }}>
                                    Đăng ký làm đại lý với nhiều chính sách ưu đãi và chiết khấu hấp dẫn.
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Typography sx={{ fontWeight: 600, minWidth: 84 }}>Địa chỉ:</Typography>
                                    <Typography>27 Đoàn Thị Điểm - Phường Sông Cầu - Dăk Lăk</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Typography sx={{ fontWeight: 600, minWidth: 84 }}>Hotline:</Typography>
                                    <Typography>08.7878.4842</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Typography sx={{ fontWeight: 600, minWidth: 84 }}>Zalo:</Typography>
                                    <Typography>08.7878.4842</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <Typography sx={{ fontWeight: 600, minWidth: 84 }}>Email:</Typography>
                                    <Typography>Hugodigital2003@gmail.com</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: '#f58220', '&:hover': { backgroundColor: '#e6731a' } }}
                                        onClick={() => window.open('https://zalo.me/0878784842', '_blank')}
                                    >
                                        Nhắn Zalo mua hàng
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{ borderColor: '#f58220', color: '#f58220', '&:hover': { backgroundColor: '#fff5f0', borderColor: '#f58220' } }}
                                        onClick={() => window.open('tel:0878784842', '_self')}
                                    >
                                        Gọi hotline
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Right: Contact Form */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Họ tên"
                                                size="medium"
                                                InputProps={{ sx: { height: 56 } }}
                                                {...register('name', { required: 'Vui lòng nhập họ tên' })}
                                                error={!!errors.name}
                                                helperText={errors.name?.message as string}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Số điện thoại"
                                                size="medium"
                                                InputProps={{ sx: { height: 56 } }}
                                                {...register('phone', { required: 'Vui lòng nhập số điện thoại' })}
                                                error={!!errors.phone}
                                                helperText={errors.phone?.message as string}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                size="medium"
                                                InputProps={{ sx: { height: 56 } }}
                                                {...register('email', {
                                                    required: 'Vui lòng nhập email',
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: 'Email không hợp lệ',
                                                    },
                                                })}
                                                error={!!errors.email}
                                                helperText={errors.email?.message as string}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Chủ đề"
                                                size="medium"
                                                InputProps={{ sx: { height: 56 } }}
                                                {...register('subject', { required: 'Vui lòng nhập chủ đề' })}
                                                error={!!errors.subject}
                                                helperText={errors.subject?.message as string}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Nội dung"
                                                size="medium"
                                                multiline
                                                minRows={6}
                                                {...register('content', { required: 'Vui lòng nhập nội dung' })}
                                                error={!!errors.content}
                                                helperText={errors.content?.message as string}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                type="submit"
                                                sx={{ backgroundColor: '#000', '&:hover': { backgroundColor: '#111' }, py: 1.25 }}
                                            >
                                                Liên hệ chúng tôi
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                {/* Map */}
                <Box sx={{ width: '100%', height: { xs: 360, md: 540 }, borderTop: '1px solid #eee' }}>
                    <Box
                        component="iframe"
                        src={GOOGLE_MAP_EMBED}
                        sx={{ width: '100%', height: '100%', border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </Box>
            </Box>
        </Layout>
    );
};

export default ContactPage;