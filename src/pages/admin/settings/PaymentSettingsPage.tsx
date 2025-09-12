import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, Paper, TextField, Button, Grid, FormControlLabel, Checkbox, Snackbar, Alert } from '@mui/material';
import { get_admin_settings, update_admin_settings, PaymentSettings, ShippingSettings } from '../../../api/settings';

const PaymentSettingsPage: React.FC = () => {
    const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
        vnpay: { enabled: false, merchantId: '', secretKey: '', returnUrl: '', cancelUrl: '' },
        momo: { enabled: false, partnerCode: '', accessKey: '', secretKey: '' },
        cod: { enabled: true, fee: 0 }
    });
    const [shippingSettings, setShippingSettings] = useState<ShippingSettings>({
        freeShippingThreshold: 500000,
        shippingRates: []
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await get_admin_settings();
            setPaymentSettings(data.payment);
            setShippingSettings(data.shipping);
        } catch (error) {
            console.error('Error loading settings:', error);
            setToast({ open: true, message: 'Lỗi tải cài đặt', severity: 'error' });
        }
    };

    const handlePaymentChange = (provider: keyof PaymentSettings, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPaymentSettings(prev => ({
            ...prev,
            [provider]: {
                ...prev[provider],
                [field]: value
            }
        }));
    };

    const handleShippingChange = (field: keyof ShippingSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        setShippingSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await update_admin_settings('payment', paymentSettings);
            await update_admin_settings('shipping', shippingSettings);
            setToast({ open: true, message: 'Lưu cài đặt thành công', severity: 'success' });
        } catch (error) {
            console.error('Error saving settings:', error);
            setToast({ open: true, message: 'Lỗi lưu cài đặt', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        loadSettings();
    };
    return (
        <AdminLayout title="Cài đặt thanh toán">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Cài đặt thanh toán</Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Phương thức thanh toán</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={paymentSettings.cod.enabled}
                                        onChange={handlePaymentChange('cod', 'enabled')}
                                    />
                                }
                                label="Thanh toán khi nhận hàng (COD)"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={paymentSettings.vnpay.enabled}
                                        onChange={handlePaymentChange('vnpay', 'enabled')}
                                    />
                                }
                                label="VNPay"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={paymentSettings.momo.enabled}
                                        onChange={handlePaymentChange('momo', 'enabled')}
                                    />
                                }
                                label="MoMo"
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Cài đặt vận chuyển</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Miễn phí vận chuyển từ (₫)"
                                    type="number"
                                    value={shippingSettings.freeShippingThreshold}
                                    onChange={handleShippingChange('freeShippingThreshold')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Phí COD (₫)"
                                    type="number"
                                    value={paymentSettings.cod.fee}
                                    onChange={handlePaymentChange('cod', 'fee')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {paymentSettings.vnpay.enabled && (
                    <Grid size={{ xs: 12 }}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>Cấu hình VNPay</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Merchant ID"
                                        value={paymentSettings.vnpay.merchantId}
                                        onChange={handlePaymentChange('vnpay', 'merchantId')}
                                        InputProps={{ sx: { height: 56 } }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Secret Key"
                                        type="password"
                                        value={paymentSettings.vnpay.secretKey}
                                        onChange={handlePaymentChange('vnpay', 'secretKey')}
                                        InputProps={{ sx: { height: 56 } }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Return URL"
                                        value={paymentSettings.vnpay.returnUrl}
                                        onChange={handlePaymentChange('vnpay', 'returnUrl')}
                                        InputProps={{ sx: { height: 56 } }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Cancel URL"
                                        value={paymentSettings.vnpay.cancelUrl}
                                        onChange={handlePaymentChange('vnpay', 'cancelUrl')}
                                        InputProps={{ sx: { height: 56 } }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}

                {paymentSettings.momo.enabled && (
                    <Grid size={{ xs: 12 }}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>Cấu hình MoMo</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Partner Code"
                                        value={paymentSettings.momo.partnerCode}
                                        onChange={handlePaymentChange('momo', 'partnerCode')}
                                        InputProps={{ sx: { height: 56 } }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Access Key"
                                        value={paymentSettings.momo.accessKey}
                                        onChange={handlePaymentChange('momo', 'accessKey')}
                                        InputProps={{ sx: { height: 56 } }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Secret Key"
                                        type="password"
                                        value={paymentSettings.momo.secretKey}
                                        onChange={handlePaymentChange('momo', 'secretKey')}
                                        InputProps={{ sx: { height: 56 } }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                    sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }}
                >
                    {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
                </Button>
                <Button variant="outlined" onClick={handleReset}>
                    Khôi phục mặc định
                </Button>
            </Box>

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={toast.severity} variant="filled" onClose={() => setToast({ ...toast, open: false })}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </AdminLayout>
    );
};

export default PaymentSettingsPage;
