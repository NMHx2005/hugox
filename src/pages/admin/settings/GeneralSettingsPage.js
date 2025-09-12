import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, Paper, TextField, Button, Grid, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel, IconButton, Avatar } from '@mui/material';
import { CloudUpload, Image as ImageIcon } from '@mui/icons-material';
import { get_admin_general_settings, update_admin_general_settings } from '../../../api/settings';
import { upload_settings_logo, upload_settings_favicon } from '../../../api/upload';
const GeneralSettingsPage = () => {
    const [settings, setSettings] = useState({
        siteName: '',
        siteDescription: '',
        siteUrl: '',
        adminEmail: '',
        supportEmail: '',
        phone: '',
        address: '',
        zalo: '',
        facebook: '',
        youtube: '',
        logo: '',
        favicon: '',
        theme: 'light',
        language: 'vi',
        currency: 'VND',
        timezone: 'Asia/Ho_Chi_Minh'
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState({ logo: false, favicon: false });
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const logoInputRef = useRef(null);
    const faviconInputRef = useRef(null);
    useEffect(() => {
        loadSettings();
    }, []);
    const loadSettings = async () => {
        try {
            const data = await get_admin_general_settings();
            setSettings(data);
        }
        catch (error) {
            console.error('Error loading settings:', error);
            setToast({ open: true, message: 'Lỗi tải cài đặt', severity: 'error' });
        }
    };
    const handleChange = (field) => (e) => {
        setSettings(prev => ({ ...prev, [field]: e.target.value }));
    };
    const handleSave = async () => {
        try {
            setLoading(true);
            await update_admin_general_settings(settings);
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
    const handleLogoUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        try {
            setUploading(prev => ({ ...prev, logo: true }));
            const response = await upload_settings_logo(file);
            setSettings(prev => ({ ...prev, logo: response.data.secure_url }));
            setToast({ open: true, message: 'Upload logo thành công', severity: 'success' });
        }
        catch (error) {
            console.error('Error uploading logo:', error);
            setToast({ open: true, message: 'Lỗi upload logo', severity: 'error' });
        }
        finally {
            setUploading(prev => ({ ...prev, logo: false }));
        }
    };
    const handleFaviconUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        try {
            setUploading(prev => ({ ...prev, favicon: true }));
            const response = await upload_settings_favicon(file);
            setSettings(prev => ({ ...prev, favicon: response.data.secure_url }));
            setToast({ open: true, message: 'Upload favicon thành công', severity: 'success' });
        }
        catch (error) {
            console.error('Error uploading favicon:', error);
            setToast({ open: true, message: 'Lỗi upload favicon', severity: 'error' });
        }
        finally {
            setUploading(prev => ({ ...prev, favicon: false }));
        }
    };
    const triggerLogoUpload = () => {
        logoInputRef.current?.click();
    };
    const triggerFaviconUpload = () => {
        faviconInputRef.current?.click();
    };
    return (_jsxs(AdminLayout, { title: "C\u00E0i \u0111\u1EB7t chung", children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700, mb: 2 }, children: "C\u00E0i \u0111\u1EB7t chung" }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "Th\u00F4ng tin website" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "T\u00EAn website", value: settings.siteName, onChange: handleChange('siteName'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "M\u00F4 t\u1EA3", multiline: true, minRows: 3, value: settings.siteDescription, onChange: handleChange('siteDescription') }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "URL website", value: settings.siteUrl, onChange: handleChange('siteUrl'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(TextField, { fullWidth: true, label: "Logo URL", value: settings.logo, onChange: handleChange('logo'), InputProps: { sx: { height: 56 } } }), _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }, children: [_jsx(Avatar, { src: settings.logo, sx: { width: 56, height: 56, cursor: 'pointer' }, onClick: triggerLogoUpload, children: _jsx(ImageIcon, {}) }), _jsx(IconButton, { size: "small", onClick: triggerLogoUpload, disabled: uploading.logo, sx: {
                                                                    backgroundColor: '#f5f5f5',
                                                                    '&:hover': { backgroundColor: '#e0e0e0' }
                                                                }, children: _jsx(CloudUpload, { fontSize: "small" }) }), _jsx("input", { ref: logoInputRef, type: "file", accept: "image/*", onChange: handleLogoUpload, style: { display: 'none' } })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(TextField, { fullWidth: true, label: "Favicon URL", value: settings.favicon, onChange: handleChange('favicon'), InputProps: { sx: { height: 56 } } }), _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }, children: [_jsx(Avatar, { src: settings.favicon, sx: { width: 56, height: 56, cursor: 'pointer' }, onClick: triggerFaviconUpload, children: _jsx(ImageIcon, {}) }), _jsx(IconButton, { size: "small", onClick: triggerFaviconUpload, disabled: uploading.favicon, sx: {
                                                                    backgroundColor: '#f5f5f5',
                                                                    '&:hover': { backgroundColor: '#e0e0e0' }
                                                                }, children: _jsx(CloudUpload, { fontSize: "small" }) }), _jsx("input", { ref: faviconInputRef, type: "file", accept: "image/*", onChange: handleFaviconUpload, style: { display: 'none' } })] })] }) })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "Th\u00F4ng tin li\u00EAn h\u1EC7" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "Email admin", value: settings.adminEmail, onChange: handleChange('adminEmail'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "Email h\u1ED7 tr\u1EE3", value: settings.supportEmail, onChange: handleChange('supportEmail'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", value: settings.phone, onChange: handleChange('phone'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "\u0110\u1ECBa ch\u1EC9", value: settings.address, onChange: handleChange('address'), InputProps: { sx: { height: 56 } } }) })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "M\u1EA1ng x\u00E3 h\u1ED9i" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "Facebook", placeholder: "https://facebook.com/...", value: settings.facebook, onChange: handleChange('facebook'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "YouTube", placeholder: "https://youtube.com/...", value: settings.youtube, onChange: handleChange('youtube'), InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "Zalo", placeholder: "https://zalo.me/...", value: settings.zalo, onChange: handleChange('zalo'), InputProps: { sx: { height: 56 } } }) })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "C\u00E0i \u0111\u1EB7t h\u1EC7 th\u1ED1ng" }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Theme" }), _jsxs(Select, { value: settings.theme, onChange: (e) => setSettings(prev => ({ ...prev, theme: e.target.value })), label: "Theme", sx: { height: 56 }, children: [_jsx(MenuItem, { value: "light", children: "Light" }), _jsx(MenuItem, { value: "dark", children: "Dark" }), _jsx(MenuItem, { value: "auto", children: "Auto" })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Ng\u00F4n ng\u1EEF" }), _jsxs(Select, { value: settings.language, onChange: (e) => setSettings(prev => ({ ...prev, language: e.target.value })), label: "Ng\u00F4n ng\u1EEF", sx: { height: 56 }, children: [_jsx(MenuItem, { value: "vi", children: "Ti\u1EBFng Vi\u1EC7t" }), _jsx(MenuItem, { value: "en", children: "English" })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Ti\u1EC1n t\u1EC7" }), _jsxs(Select, { value: settings.currency, onChange: (e) => setSettings(prev => ({ ...prev, currency: e.target.value })), label: "Ti\u1EC1n t\u1EC7", sx: { height: 56 }, children: [_jsx(MenuItem, { value: "VND", children: "VND (\u20AB)" }), _jsx(MenuItem, { value: "USD", children: "USD ($)" }), _jsx(MenuItem, { value: "EUR", children: "EUR (\u20AC)" })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "M\u00FAi gi\u1EDD" }), _jsxs(Select, { value: settings.timezone, onChange: (e) => setSettings(prev => ({ ...prev, timezone: e.target.value })), label: "M\u00FAi gi\u1EDD", sx: { height: 56 }, children: [_jsx(MenuItem, { value: "Asia/Ho_Chi_Minh", children: "Asia/Ho_Chi_Minh" }), _jsx(MenuItem, { value: "Asia/Bangkok", children: "Asia/Bangkok" }), _jsx(MenuItem, { value: "Asia/Singapore", children: "Asia/Singapore" }), _jsx(MenuItem, { value: "UTC", children: "UTC" })] })] }) })] })] }) })] }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mt: 3 }, children: [_jsx(Button, { variant: "contained", onClick: handleSave, disabled: loading, sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, children: loading ? 'Đang lưu...' : 'Lưu cài đặt' }), _jsx(Button, { variant: "outlined", onClick: handleReset, children: "Kh\u00F4i ph\u1EE5c m\u1EB7c \u0111\u1ECBnh" })] }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 3000, onClose: () => setToast({ ...toast, open: false }), anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, children: _jsx(Alert, { severity: toast.severity, variant: "filled", onClose: () => setToast({ ...toast, open: false }), children: toast.message }) })] }));
};
export default GeneralSettingsPage;
