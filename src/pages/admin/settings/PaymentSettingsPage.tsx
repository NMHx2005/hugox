import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const PaymentSettingsPage: React.FC = () => {
    return (
        <AdminLayout title="Cài đặt thanh toán">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Cài đặt thanh toán</Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Phương thức thanh toán</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Thanh toán khi nhận hàng (COD)" />
                            <FormControlLabel control={<Checkbox />} label="Chuyển khoản ngân hàng" />
                            <FormControlLabel control={<Checkbox />} label="Ví điện tử (MoMo, ZaloPay)" />
                            <FormControlLabel control={<Checkbox />} label="Thẻ tín dụng" />
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Cài đặt vận chuyển</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Phí vận chuyển (₫)" defaultValue="30000" InputProps={{ sx: { height: 56 } }} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Miễn phí vận chuyển từ (₫)" defaultValue="500000" InputProps={{ sx: { height: 56 } }} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Thời gian giao hàng (ngày)" defaultValue="3-5" InputProps={{ sx: { height: 56 } }} />
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

export default PaymentSettingsPage;
