import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, TextField, MenuItem, Button, Snackbar, Alert, Tabs, Tab, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { create_admin_news, get_admin_news_article, update_admin_news } from '../../../api/news';
import { upload_product_image } from '../../../api/uploads';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
const NewsFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    console.log('NewsFormPage rendered - isEdit:', isEdit, 'id:', id);
    const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'Tin tức', status: 'draft', featuredImage: '' });
    const [images, setImages] = useState(['']);
    const [imageMode, setImageMode] = useState('url');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleImageChange = (index, value) => setImages(prev => prev.map((v, i) => i === index ? value : v));
    const addImageField = () => setImages(prev => [...prev, '']);
    const removeImageField = (index) => setImages(prev => prev.filter((_, i) => i !== index));
    const handleUpload = async (file, index) => {
        try {
            setUploadingCount(c => c + 1);
            const url = await upload_product_image(file);
            handleImageChange(index, url);
        }
        finally {
            setUploadingCount(c => Math.max(0, c - 1));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uploadingCount > 0) {
            setToast({ open: true, message: 'Đang upload ảnh, vui lòng đợi hoàn tất...', severity: 'error' });
            return;
        }
        const slug = form.title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload = { ...form, slug, images: images.filter(Boolean) };
        try {
            if (isEdit && id)
                await update_admin_news(id, payload);
            else
                await create_admin_news(payload);
            setToast({ open: true, message: 'Lưu bài viết thành công', severity: 'success' });
            setTimeout(() => navigate('/admin/news'), 700);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (e) {
            setToast({ open: true, message: e?.response?.data?.message || 'Lưu bài viết thất bại', severity: 'error' });
        }
    };
    return (_jsxs(AdminLayout, { title: "Tin t\u1EE9c", children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700 }, children: isEdit ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới' }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: { mt: 2, display: 'grid', gap: 2, maxWidth: 900 }, children: [_jsx(TextField, { label: "Ti\u00EAu \u0111\u1EC1", name: "title", value: form.title, onChange: handleChange, required: true }), _jsx(TextField, { label: "T\u00F3m t\u1EAFt", name: "excerpt", value: form.excerpt, onChange: handleChange, multiline: true, minRows: 2 }), _jsx(TextField, { label: "N\u1ED9i dung", name: "content", value: form.content, onChange: handleChange, multiline: true, minRows: 6 }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(TextField, { select: true, label: "Danh m\u1EE5c", name: "category", value: form.category, onChange: handleChange, children: ['Công nghệ', 'Sản phẩm', 'Khuyến mãi', 'Tin tức', 'Khác'].map(c => (_jsx(MenuItem, { value: c, children: c }, c))) }), _jsxs(TextField, { select: true, label: "Tr\u1EA1ng th\u00E1i", name: "status", value: form.status, onChange: handleChange, children: [_jsx(MenuItem, { value: "draft", children: "Nh\u00E1p" }), _jsx(MenuItem, { value: "published", children: "C\u00F4ng khai" })] })] }), _jsx(Typography, { variant: "h6", sx: { mt: 1 }, children: "\u1EA2nh n\u1ED5i b\u1EADt" }), _jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [_jsx(TextField, { fullWidth: true, placeholder: "URL \u1EA3nh n\u1ED5i b\u1EADt", name: "featuredImage", value: form.featuredImage, onChange: handleChange }), _jsx("input", { type: "file", accept: "image/*", onChange: async (e) => { const f = e.target.files?.[0]; if (f) {
                                    const url = await upload_product_image(f);
                                    setForm(prev => ({ ...prev, featuredImage: url }));
                                } } })] }), _jsx(Typography, { variant: "h6", sx: { mt: 1 }, children: "Th\u01B0 vi\u1EC7n \u1EA3nh" }), _jsxs(Tabs, { value: imageMode, onChange: (_, v) => setImageMode(v), sx: { mb: 1 }, children: [_jsx(Tab, { label: "D\u00E1n URL", value: "url" }), _jsx(Tab, { label: "Upload", value: "upload" })] }), images.map((img, idx) => (_jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [imageMode === 'url' ? (_jsx(TextField, { fullWidth: true, placeholder: "D\u00E1n URL \u1EA3nh", value: img, onChange: (e) => handleImageChange(idx, e.target.value) })) : (_jsxs(_Fragment, { children: [_jsx(TextField, { fullWidth: true, placeholder: "URL \u1EA3nh (t\u1EF1 \u0111i\u1EC1n sau upload)", value: img, onChange: (e) => handleImageChange(idx, e.target.value) }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => { const f = e.target.files?.[0]; if (f)
                                            handleUpload(f, idx); } })] })), images.length > 1 && (_jsx(IconButton, { onClick: () => removeImageField(idx), children: _jsx(DeleteIcon, {}) }))] }, idx))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: addImageField, variant: "outlined", children: "Th\u00EAm \u1EA3nh" }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsx(Button, { type: "button", variant: "outlined", onClick: () => navigate('/admin/news'), children: "Hu\u1EF7" }), _jsx(Button, { type: "submit", variant: "contained", disabled: uploadingCount > 0, children: uploadingCount > 0 ? 'Đang upload ảnh...' : 'Lưu' })] })] }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 3000, onClose: () => setToast({ ...toast, open: false }), anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, children: _jsx(Alert, { severity: toast.severity, variant: "filled", onClose: () => setToast({ ...toast, open: false }), children: toast.message }) })] }));
};
export default NewsFormPage;
