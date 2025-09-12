import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { CloudUpload, Image } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { create_admin_category, get_admin_category, update_admin_category, get_admin_categories, AdminCategory } from '../../../api/categories';
import { upload_category_image } from '../../../api/upload';
import { useParams, useNavigate } from 'react-router-dom';

const parents = [
    { id: '', name: '— Không có —' }
];

const CategoryFormPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const [form, setForm] = useState({ name: '', slug: '', parent: '', description: '', status: 'active', image: '' });
    const [parentOptions, setParentOptions] = useState<AdminCategory[]>([]);
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
    const [uploading, setUploading] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEdit && id) {
            get_admin_category(id).then((data: any) => {
                setForm({
                    name: data.name || '',
                    slug: data.slug || '',
                    parent: (data.parent as string) || '',
                    description: data.description || '',
                    status: data.status || 'active',
                    image: data.image || ''
                });
            });
        }
    }, [id]);

    useEffect(() => {
        // load parents for select
        get_admin_categories().then((list) => {
            setParentOptions(Array.isArray(list) ? list : []);
        }).catch(() => setParentOptions([]));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (file: File) => {
        try {
            setUploading(true);
            const response = await upload_category_image(file);
            setForm(prev => ({ ...prev, image: response.data.url }));
            setToast({ open: true, message: 'Upload ảnh thành công', severity: 'success' });
        } catch (error) {
            console.error('Upload error:', error);
            setToast({ open: true, message: 'Upload ảnh thất bại', severity: 'error' });
        } finally {
            setUploading(false);
        }
    };

    const triggerImageUpload = () => {
        imageInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                name: form.name,
                slug: form.slug || form.name.toLowerCase().trim().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, ''),
                description: form.description,
                parent: form.parent || undefined,
                status: form.status as any,
                image: form.image
            };
            if (isEdit && id) await update_admin_category(id, payload);
            else await create_admin_category(payload);
            setToast({ open: true, message: 'Lưu danh mục thành công', severity: 'success' });
            setTimeout(() => navigate('/admin/categories'), 600);
        } catch (e: any) {
            setToast({ open: true, message: e?.response?.data?.message || 'Lưu danh mục thất bại', severity: 'error' });
        }
    };
    return (
        <>
            <AdminLayout title="Danh mục">
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Thêm/Sửa danh mục</Typography>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Tên danh mục" name="name" value={form.name} onChange={handleChange} InputProps={{ sx: { height: 56 } }} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Slug" placeholder="tu-dong-sinh" name="slug" value={form.slug} onChange={handleChange} InputProps={{ sx: { height: 56 } }} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField select fullWidth label="Danh mục cha" name="parent" value={form.parent} onChange={handleChange} InputProps={{ sx: { height: 56 } }}>
                                {parents.map((p) => (
                                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                                ))}
                                {parentOptions.map((p) => (
                                    <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Ảnh danh mục (URL)" name="image" value={form.image} onChange={handleChange} InputProps={{ sx: { height: 56 } }} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                    src={form.image}
                                    sx={{ width: 80, height: 80, border: '2px dashed #ddd' }}
                                >
                                    <Image />
                                </Avatar>
                                <Box>
                                    <Button
                                        variant="outlined"
                                        startIcon={<CloudUpload />}
                                        onClick={triggerImageUpload}
                                        disabled={uploading}
                                        sx={{ mb: 1 }}
                                    >
                                        {uploading ? 'Đang upload...' : 'Upload ảnh'}
                                    </Button>
                                    <input
                                        ref={imageInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth label="Mô tả" name="description" value={form.description} onChange={handleChange} multiline minRows={4} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" onClick={() => navigate('/admin/categories')}>Huỷ</Button>
                                <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }}>Lưu</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </AdminLayout>
            <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CategoryFormPage;
