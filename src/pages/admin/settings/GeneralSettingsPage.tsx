import React, { useEffect, useState, useRef } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, Paper, TextField, Button, Grid, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel, IconButton, Avatar } from '@mui/material';
import { CloudUpload, Image as ImageIcon } from '@mui/icons-material';
import { get_admin_general_settings, update_admin_general_settings, GeneralSettings } from '../../../api/settings';
import { upload_settings_logo, upload_settings_favicon } from '../../../api/upload';

const GeneralSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<GeneralSettings>({
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
    const [uploading, setUploading] = useState<{ logo: boolean; favicon: boolean }>({ logo: false, favicon: false });
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

    const logoInputRef = useRef<HTMLInputElement>(null);
    const faviconInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await get_admin_general_settings();
            setSettings(data);
        } catch (error) {
            console.error('Error loading settings:', error);
            setToast({ open: true, message: 'Lỗi tải cài đặt', severity: 'error' });
        }
    };

    const handleChange = (field: keyof GeneralSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target) return;
        setSettings(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await update_admin_general_settings(settings);
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

    const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setUploading(prev => ({ ...prev, logo: true }));
            const response = await upload_settings_logo(file);
            setSettings(prev => ({ ...prev, logo: response.data.secure_url }));
            setToast({ open: true, message: 'Upload logo thành công', severity: 'success' });
        } catch (error) {
            console.error('Error uploading logo:', error);
            setToast({ open: true, message: 'Lỗi upload logo', severity: 'error' });
        } finally {
            setUploading(prev => ({ ...prev, logo: false }));
        }
    };

    const handleFaviconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setUploading(prev => ({ ...prev, favicon: true }));
            const response = await upload_settings_favicon(file);
            setSettings(prev => ({ ...prev, favicon: response.data.secure_url }));
            setToast({ open: true, message: 'Upload favicon thành công', severity: 'success' });
        } catch (error) {
            console.error('Error uploading favicon:', error);
            setToast({ open: true, message: 'Lỗi upload favicon', severity: 'error' });
        } finally {
            setUploading(prev => ({ ...prev, favicon: false }));
        }
    };

    const triggerLogoUpload = () => {
        logoInputRef.current?.click();
    };

    const triggerFaviconUpload = () => {
        faviconInputRef.current?.click();
    };
    return (
        <AdminLayout title="Cài đặt chung">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Cài đặt chung</Typography>

            <Grid container spacing={3}>
                {/* Thông tin website */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Thông tin website</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Tên website"
                                    value={settings.siteName}
                                    onChange={handleChange('siteName')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Mô tả"
                                    multiline
                                    minRows={3}
                                    value={settings.siteDescription}
                                    onChange={handleChange('siteDescription')}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="URL website"
                                    value={settings.siteUrl}
                                    onChange={handleChange('siteUrl')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Logo URL"
                                        value={settings.logo}
                                        onChange={handleChange('logo')}
                                        InputProps={{ sx: { height: 56 } }}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <Avatar
                                            src={settings.logo}
                                            sx={{ width: 56, height: 56, cursor: 'pointer' }}
                                            onClick={triggerLogoUpload}
                                        >
                                            <ImageIcon />
                                        </Avatar>
                                        <IconButton
                                            size="small"
                                            onClick={triggerLogoUpload}
                                            disabled={uploading.logo}
                                            sx={{
                                                backgroundColor: '#f5f5f5',
                                                '&:hover': { backgroundColor: '#e0e0e0' }
                                            }}
                                        >
                                            <CloudUpload fontSize="small" />
                                        </IconButton>
                                        <input
                                            ref={logoInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Favicon URL"
                                        value={settings.favicon}
                                        onChange={handleChange('favicon')}
                                        InputProps={{ sx: { height: 56 } }}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <Avatar
                                            src={settings.favicon}
                                            sx={{ width: 56, height: 56, cursor: 'pointer' }}
                                            onClick={triggerFaviconUpload}
                                        >
                                            <ImageIcon />
                                        </Avatar>
                                        <IconButton
                                            size="small"
                                            onClick={triggerFaviconUpload}
                                            disabled={uploading.favicon}
                                            sx={{
                                                backgroundColor: '#f5f5f5',
                                                '&:hover': { backgroundColor: '#e0e0e0' }
                                            }}
                                        >
                                            <CloudUpload fontSize="small" />
                                        </IconButton>
                                        <input
                                            ref={faviconInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFaviconUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Thông tin liên hệ */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Thông tin liên hệ</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Email admin"
                                    value={settings.adminEmail}
                                    onChange={handleChange('adminEmail')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Email hỗ trợ"
                                    value={settings.supportEmail}
                                    onChange={handleChange('supportEmail')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    value={settings.phone}
                                    onChange={handleChange('phone')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    value={settings.address}
                                    onChange={handleChange('address')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Mạng xã hội */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Mạng xã hội</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Facebook"
                                    placeholder="https://facebook.com/..."
                                    value={settings.facebook}
                                    onChange={handleChange('facebook')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="YouTube"
                                    placeholder="https://youtube.com/..."
                                    value={settings.youtube}
                                    onChange={handleChange('youtube')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Zalo"
                                    placeholder="https://zalo.me/..."
                                    value={settings.zalo}
                                    onChange={handleChange('zalo')}
                                    InputProps={{ sx: { height: 56 } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Cài đặt hệ thống */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Cài đặt hệ thống</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Theme</InputLabel>
                                    <Select
                                        value={settings.theme}
                                        onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                                        label="Theme"
                                        sx={{ height: 56 }}
                                    >
                                        <MenuItem value="light">Light</MenuItem>
                                        <MenuItem value="dark">Dark</MenuItem>
                                        <MenuItem value="auto">Auto</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Ngôn ngữ</InputLabel>
                                    <Select
                                        value={settings.language}
                                        onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                                        label="Ngôn ngữ"
                                        sx={{ height: 56 }}
                                    >
                                        <MenuItem value="vi">Tiếng Việt</MenuItem>
                                        <MenuItem value="en">English</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Tiền tệ</InputLabel>
                                    <Select
                                        value={settings.currency}
                                        onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                                        label="Tiền tệ"
                                        sx={{ height: 56 }}
                                    >
                                        <MenuItem value="VND">VND (₫)</MenuItem>
                                        <MenuItem value="USD">USD ($)</MenuItem>
                                        <MenuItem value="EUR">EUR (€)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Múi giờ</InputLabel>
                                    <Select
                                        value={settings.timezone}
                                        onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                                        label="Múi giờ"
                                        sx={{ height: 56 }}
                                    >
                                        <MenuItem value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</MenuItem>
                                        <MenuItem value="Asia/Bangkok">Asia/Bangkok</MenuItem>
                                        <MenuItem value="Asia/Singapore">Asia/Singapore</MenuItem>
                                        <MenuItem value="UTC">UTC</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
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

export default GeneralSettingsPage;
