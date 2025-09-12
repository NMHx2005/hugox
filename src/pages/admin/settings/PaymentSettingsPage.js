import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, Paper, TextField, Button, Grid, FormControlLabel, Checkbox, Snackbar, Alert } from '@mui/material';
import { get_admin_settings, update_admin_settings } from '../../../api/settings';
const PaymentSettingsPage = () => {
    const [paymentSettings, setPaymentSettings] = useState({
        vnpay: { enabled: false, merchantId: '', secretKey: '', returnUrl: '', cancelUrl: '' },
        momo: { enabled: false, partnerCode: '', accessKey: '', secretKey: '' },
        cod: { enabled: true, fee: 0 }
    });
    const [shippingSettings, setShippingSettings] = useState({
        freeShippingThreshold: 500000,
        shippingRates: []
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    useEffect(() => {
        loadSettings();
    }, []);
    const loadSettings = async () => {
        try {
            const data = await get_admin_settings();
            setPaymentSettings(data.payment);
            setShippingSettings(data.shipping);
        }
        catch (error) {
            console.error('Error loading settings:', error);
            setToast({ open: true, message: 'Lỗi tải cài đặt', severity: 'error' });
        }
    };
    const handlePaymentChange = (provider, field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPaymentSettings(prev => ({
            ...prev,
            [provider]: {
                ...prev[provider],
                [field]: value
            }
        }));
    };
    const handleShippingChange = (field) => (e) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        setShippingSettings(prev => ({ ...prev, [field]: value }));
    };
    const handleSave = async () => {
        try {
            setLoading(true);
            await update_admin_settings('payment', paymentSettings);
            await update_admin_settings('shipping', shippingSettings);
            setToast({ open: true, message: 'Lưu cài đặt thành công', severity: 'success' });
        }
        catch (error) {
            console.error('Error saving settings:', error);
            setToast({ open: true, message: 'Lỗi lưu cài đặt', severity: 'error' });
        }
        finally {
            setLoading(false);
        }
    };
    const handleReset = () => {
        loadSettings();
    };
    return (_jsxs(AdminLayout, { title: "C\u00E0i \u0111\u1EB7t thanh to\u00E1n", children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700, mb: 2 }, children: "C\u00E0i \u0111\u1EB7t thanh to\u00E1n" }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "Ph\u01B0\u01A1ng th\u1EE9c thanh to\u00E1n" }), _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: [_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: paymentSettings.cod.enabled, onChange: handlePaymentChange('cod', 'enabled') }), label: "Thanh to\u00E1n khi nh\u1EADn h\u00E0ng (COD)" }), _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: paymentSettings.vnpay.enabled, onChange: handlePaymentChange('vnpay', 'enabled') }), label: "VNPay" }), _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: paymentSettings.momo.enabled, onChange: handlePaymentChange('momo', 'enabled') }), label: "MoMo" })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "C\u00E0i \u0111\u1EB7t v\u1EADn chuy\u1EC3n" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "Mi\u1EC5n ph\u00ED v\u1EADn chuy\u1EC3n t\u1EEB (\u20AB)", type: "number", value: shippingSettings.freeShippingThreshold, onChange: handleShippingChange('freeShippingThreshold'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "Ph\u00ED COD (\u20AB)", type: "number", value: paymentSettings.cod.fee, onChange: handlePaymentChange('cod', 'fee'), InputProps: { sx: { height: 56 } } }) })] })] }) }), paymentSettings.vnpay.enabled && (_jsx(Grid, { size: { xs: 12 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "C\u1EA5u h\u00ECnh VNPay" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "Merchant ID", value: paymentSettings.vnpay.merchantId, onChange: handlePaymentChange('vnpay', 'merchantId'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "Secret Key", type: "password", value: paymentSettings.vnpay.secretKey, onChange: handlePaymentChange('vnpay', 'secretKey'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "Return URL", value: paymentSettings.vnpay.returnUrl, onChange: handlePaymentChange('vnpay', 'returnUrl'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "Cancel URL", value: paymentSettings.vnpay.cancelUrl, onChange: handlePaymentChange('vnpay', 'cancelUrl'), InputProps: { sx: { height: 56 } } }) })] })] }) })), paymentSettings.momo.enabled && (_jsx(Grid, { size: { xs: 12 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "C\u1EA5u h\u00ECnh MoMo" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, md: 4 }, children: _jsx(TextField, { fullWidth: true, label: "Partner Code", value: paymentSettings.momo.partnerCode, onChange: handlePaymentChange('momo', 'partnerCode'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 4 }, children: _jsx(TextField, { fullWidth: true, label: "Access Key", value: paymentSettings.momo.accessKey, onChange: handlePaymentChange('momo', 'accessKey'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 4 }, children: _jsx(TextField, { fullWidth: true, label: "Secret Key", type: "password", value: paymentSettings.momo.secretKey, onChange: handlePaymentChange('momo', 'secretKey'), InputProps: { sx: { height: 56 } } }) })] })] }) }))] }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mt: 3 }, children: [_jsx(Button, { variant: "contained", onClick: handleSave, disabled: loading, sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, children: loading ? 'Đang lưu...' : 'Lưu cài đặt' }), _jsx(Button, { variant: "outlined", onClick: handleReset, children: "Kh\u00F4i ph\u1EE5c m\u1EB7c \u0111\u1ECBnh" })] }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 3000, onClose: () => setToast({ ...toast, open: false }), anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, children: _jsx(Alert, { severity: toast.severity, variant: "filled", onClose: () => setToast({ ...toast, open: false }), children: toast.message }) })] }));
};
export default PaymentSettingsPage;
