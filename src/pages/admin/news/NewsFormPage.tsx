import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, TextField, MenuItem, Button, Snackbar, Alert, Tabs, Tab, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { create_admin_news, get_admin_news_article, update_admin_news } from '../../../api/news';
import { upload_product_image } from '../../../api/uploads';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const NewsFormPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    console.log('NewsFormPage rendered - isEdit:', isEdit, 'id:', id);
    const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'Tin tức', status: 'draft', featuredImage: '' });
    const [images, setImages] = useState<string[]>(['']);
    const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
    const [uploadingCount, setUploadingCount] = useState(0);

    useEffect(() => {
        console.log('useEffect triggered - isEdit:', isEdit, 'id:', id);
        if (isEdit && id) {
            console.log('Loading news article with ID:', id);
            get_admin_news_article(id).then((n) => {
                console.log('Loaded news data:', n);
                const formData = {
                    title: n.title || '',
                    excerpt: n.excerpt || '',
                    content: n.content || '',
                    category: n.category || 'Tin tức',
                    status: n.status || 'draft',
                    featuredImage: n.featuredImage || ''
                };
                console.log('Setting form data:', formData);
                setForm(formData);
                setImages(Array.isArray(n.images) && n.images.length ? n.images : ['']);
            }).catch((error) => {
                console.error('Error loading news article:', error);
                setToast({ open: true, message: 'Lỗi tải dữ liệu bài viết', severity: 'error' });
            });
        }
    }, [id, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index: number, value: string) => setImages(prev => prev.map((v, i) => i === index ? value : v));
    const addImageField = () => setImages(prev => [...prev, '']);
    const removeImageField = (index: number) => setImages(prev => prev.filter((_, i) => i !== index));
    const handleUpload = async (file: File, index: number) => {
        try {
            setUploadingCount(c => c + 1);
            const url = await upload_product_image(file);
            handleImageChange(index, url);
        } finally { setUploadingCount(c => Math.max(0, c - 1)); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (uploadingCount > 0) { setToast({ open: true, message: 'Đang upload ảnh, vui lòng đợi hoàn tất...', severity: 'error' }); return; }
        const slug = form.title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload = { ...form, slug, images: images.filter(Boolean) } as any;
        try {
            if (isEdit && id) await update_admin_news(id, payload);
            else await create_admin_news(payload);
            setToast({ open: true, message: 'Lưu bài viết thành công', severity: 'success' });
            setTimeout(() => navigate('/admin/news'), 700);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            setToast({ open: true, message: e?.response?.data?.message || 'Lưu bài viết thất bại', severity: 'error' });
        }
    };

    return (
        <AdminLayout title="Tin tức">
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{isEdit ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'grid', gap: 2, maxWidth: 900 }}>
                <TextField label="Tiêu đề" name="title" value={form.title} onChange={handleChange} required />
                <TextField label="Tóm tắt" name="excerpt" value={form.excerpt} onChange={handleChange} multiline minRows={2} />
                <TextField label="Nội dung" name="content" value={form.content} onChange={handleChange} multiline minRows={6} />
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    <TextField select label="Danh mục" name="category" value={form.category} onChange={handleChange}>
                        {['Công nghệ', 'Sản phẩm', 'Khuyến mãi', 'Tin tức', 'Khác'].map(c => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
                    </TextField>
                    <TextField select label="Trạng thái" name="status" value={form.status} onChange={handleChange}>
                        <MenuItem value="draft">Nháp</MenuItem>
                        <MenuItem value="published">Công khai</MenuItem>
                    </TextField>
                </Box>

                <Typography variant="h6" sx={{ mt: 1 }}>Ảnh nổi bật</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField fullWidth placeholder="URL ảnh nổi bật" name="featuredImage" value={form.featuredImage} onChange={handleChange} />
                    <input type="file" accept="image/*" onChange={async (e) => { const f = e.target.files?.[0]; if (f) { const url = await upload_product_image(f); setForm(prev => ({ ...prev, featuredImage: url })); } }} />
                </Box>

                <Typography variant="h6" sx={{ mt: 1 }}>Thư viện ảnh</Typography>
                <Tabs value={imageMode} onChange={(_, v) => setImageMode(v)} sx={{ mb: 1 }}>
                    <Tab label="Dán URL" value="url" />
                    <Tab label="Upload" value="upload" />
                </Tabs>
                {images.map((img, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {imageMode === 'url' ? (
                            <TextField fullWidth placeholder="Dán URL ảnh" value={img} onChange={(e) => handleImageChange(idx, e.target.value)} />
                        ) : (
                            <>
                                <TextField fullWidth placeholder="URL ảnh (tự điền sau upload)" value={img} onChange={(e) => handleImageChange(idx, e.target.value)} />
                                <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, idx); }} />
                            </>
                        )}
                        {images.length > 1 && (<IconButton onClick={() => removeImageField(idx)}><DeleteIcon /></IconButton>)}
                    </Box>
                ))}
                <Button startIcon={<AddIcon />} onClick={addImageField} variant="outlined">Thêm ảnh</Button>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button type="button" variant="outlined" onClick={() => navigate('/admin/news')}>Huỷ</Button>
                    <Button type="submit" variant="contained" disabled={uploadingCount > 0}>{uploadingCount > 0 ? 'Đang upload ảnh...' : 'Lưu'}</Button>
                </Box>
            </Box>

            <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity={toast.severity} variant="filled" onClose={() => setToast({ ...toast, open: false })}>{toast.message}</Alert>
            </Snackbar>
        </AdminLayout>
    );
};

export default NewsFormPage;
