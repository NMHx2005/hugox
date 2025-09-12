import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button, Snackbar, Alert, IconButton, Tabs, Tab } from '@mui/material';
import AdminLayout from '../../../components/admin/AdminLayout';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import { get_admin_categories } from '../../../api/categories';
import { get_admin_product, update_admin_product } from '../../../api/products';
import { upload_product_image } from '../../../api/uploads';
const ProductEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category: '', originalPrice: '', sku: '', brand: '', status: 'active' });
    const [images, setImages] = useState(['']);
    const [imageMode, setImageMode] = useState('url');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const [uploadingCount, setUploadingCount] = useState(0);
    const [tags, setTags] = useState('');
    const [purchaseLinks, setPurchaseLinks] = useState({
        shopee: '',
        tiktok: '',
        facebook: '',
        custom: [{ platform: '', url: '' }]
    });
    const [additionalInfo, setAdditionalInfo] = useState([{ title: '', content: '', order: 0 }]);
    useEffect(() => {
        get_admin_categories().then((list) => setCategories(list)).catch(() => setCategories([]));
        if (id) {
            get_admin_product(id).then((p) => {
                setForm({
                    name: p.name || '',
                    description: p.description || '',
                    price: String(p.price ?? ''),
                    stock: String(p.stock ?? ''),
                    category: (p.category?._id || p.category || ''),
                    originalPrice: String(p.originalPrice ?? ''),
                    sku: p.sku || '',
                    brand: p.brand || '',
                    status: p.status || 'active'
                });
                setImages(Array.isArray(p.images) && p.images.length ? p.images : ['']);
                setTags(Array.isArray(p.tags) ? p.tags.join(', ') : '');
                // Load purchase links
                if (p.purchaseLinks) {
                    setPurchaseLinks({
                        shopee: p.purchaseLinks.shopee || '',
                        tiktok: p.purchaseLinks.tiktok || '',
                        facebook: p.purchaseLinks.facebook || '',
                        custom: p.purchaseLinks.custom && Array.isArray(p.purchaseLinks.custom)
                            ? p.purchaseLinks.custom
                            : [{ platform: '', url: '' }]
                    });
                }
                // Load additional info
                if (p.additionalInfo && Array.isArray(p.additionalInfo)) {
                    setAdditionalInfo(p.additionalInfo);
                }
                else {
                    setAdditionalInfo([{ title: '', content: '', order: 0 }]);
                }
            });
        }
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleImageChange = (index, value) => {
        setImages(prev => prev.map((v, i) => i === index ? value : v));
    };
    const addImageField = () => setImages(prev => [...prev, '']);
    const removeImageField = (index) => setImages(prev => prev.filter((_, i) => i !== index));
    const handlePurchaseLinkChange = (field, value) => {
        setPurchaseLinks(prev => ({ ...prev, [field]: value }));
    };
    const handleCustomLinkChange = (index, field, value) => {
        setPurchaseLinks(prev => ({
            ...prev,
            custom: prev.custom.map((link, i) => i === index ? { ...link, [field]: value } : link)
        }));
    };
    const addCustomLink = () => {
        setPurchaseLinks(prev => ({ ...prev, custom: [...prev.custom, { platform: '', url: '' }] }));
    };
    const removeCustomLink = (index) => {
        setPurchaseLinks(prev => ({ ...prev, custom: prev.custom.filter((_, i) => i !== index) }));
    };
    const handleAdditionalInfoChange = (index, field, value) => {
        setAdditionalInfo(prev => prev.map((info, i) => i === index ? { ...info, [field]: value } : info));
    };
    const addAdditionalInfo = () => {
        setAdditionalInfo(prev => [...prev, { title: '', content: '', order: prev.length }]);
    };
    const removeAdditionalInfo = (index) => {
        setAdditionalInfo(prev => prev.filter((_, i) => i !== index));
    };
    const handleUpload = async (file, index) => {
        try {
            setUploadingCount(c => c + 1);
            const url = await upload_product_image(file);
            handleImageChange(index, url);
        }
        catch (e) {
            setToast({ open: true, message: e?.message || 'Upload ảnh thất bại', severity: 'error' });
        }
        finally {
            setUploadingCount(c => Math.max(0, c - 1));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (uploadingCount > 0) {
                setToast({ open: true, message: 'Đang upload ảnh, vui lòng đợi hoàn tất...', severity: 'error' });
                return;
            }
            if (!id)
                return;
            await update_admin_product(id, {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
                stock: Number(form.stock),
                category: form.category,
                sku: form.sku || undefined,
                brand: form.brand || undefined,
                status: form.status,
                images: images.filter(Boolean),
                tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
                purchaseLinks: {
                    shopee: purchaseLinks.shopee || undefined,
                    tiktok: purchaseLinks.tiktok || undefined,
                    facebook: purchaseLinks.facebook || undefined,
                    custom: purchaseLinks.custom.filter(link => link.platform && link.url)
                },
                additionalInfo: additionalInfo.filter(info => info.title && info.content)
            });
            setToast({ open: true, message: 'Cập nhật sản phẩm thành công', severity: 'success' });
            setTimeout(() => navigate('/admin/products'), 600);
        }
        catch (e) {
            setToast({ open: true, message: e?.response?.data?.message || 'Cập nhật thất bại', severity: 'error' });
        }
    };
    return (_jsxs(AdminLayout, { title: "S\u1EA3n ph\u1EA9m", children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 700 }, children: "Ch\u1EC9nh s\u1EEDa s\u1EA3n ph\u1EA9m" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: { mt: 2, display: 'grid', gap: 2, maxWidth: 820 }, children: [_jsx(TextField, { label: "T\u00EAn s\u1EA3n ph\u1EA9m", name: "name", value: form.name, onChange: handleChange, required: true }), _jsx(TextField, { label: "M\u00F4 t\u1EA3", name: "description", value: form.description, onChange: handleChange, multiline: true, minRows: 3 }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(TextField, { label: "Gi\u00E1", name: "price", value: form.price, onChange: handleChange, type: "number" }), _jsx(TextField, { label: "Gi\u00E1 g\u1ED1c", name: "originalPrice", value: form.originalPrice, onChange: handleChange, type: "number" })] }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(TextField, { label: "T\u1ED3n kho", name: "stock", value: form.stock, onChange: handleChange, type: "number" }), _jsxs(TextField, { select: true, label: "Tr\u1EA1ng th\u00E1i", name: "status", value: form.status, onChange: handleChange, children: [_jsx(MenuItem, { value: "active", children: "\u0110ang b\u00E1n" }), _jsx(MenuItem, { value: "inactive", children: "T\u1EA1m \u1EA9n" }), _jsx(MenuItem, { value: "draft", children: "Nh\u00E1p" })] })] }), _jsx(TextField, { select: true, label: "Danh m\u1EE5c", name: "category", value: form.category, onChange: handleChange, required: true, children: categories.map(c => (_jsx(MenuItem, { value: c._id, children: c.name }, c._id))) }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(TextField, { label: "SKU", name: "sku", value: form.sku, onChange: handleChange }), _jsx(TextField, { label: "Th\u01B0\u01A1ng hi\u1EC7u", name: "brand", value: form.brand, onChange: handleChange })] }), _jsx(TextField, { label: "Tags (ph\u00E2n t\u00E1ch d\u1EA5u ph\u1EA9y)", value: tags, onChange: (e) => setTags(e.target.value) }), _jsx(Typography, { variant: "h6", sx: { mt: 2 }, children: "Li\u00EAn k\u1EBFt mua h\u00E0ng" }), _jsxs(Box, { sx: { display: 'grid', gap: 2 }, children: [_jsx(TextField, { label: "Shopee URL", value: purchaseLinks.shopee, onChange: (e) => handlePurchaseLinkChange('shopee', e.target.value), placeholder: "https://shopee.vn/..." }), _jsx(TextField, { label: "TikTok URL", value: purchaseLinks.tiktok, onChange: (e) => handlePurchaseLinkChange('tiktok', e.target.value), placeholder: "https://www.tiktok.com/..." }), _jsx(TextField, { label: "Facebook URL", value: purchaseLinks.facebook, onChange: (e) => handlePurchaseLinkChange('facebook', e.target.value), placeholder: "https://facebook.com/..." }), purchaseLinks.custom.map((link, index) => (_jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [_jsx(TextField, { label: "T\u00EAn n\u1EC1n t\u1EA3ng", value: link.platform, onChange: (e) => handleCustomLinkChange(index, 'platform', e.target.value), placeholder: "Lazada, Tiki, ...", sx: { flex: 1 } }), _jsx(TextField, { label: "URL", value: link.url, onChange: (e) => handleCustomLinkChange(index, 'url', e.target.value), placeholder: "https://...", sx: { flex: 2 } }), _jsx(IconButton, { onClick: () => removeCustomLink(index), children: _jsx(DeleteIcon, {}) })] }, index))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: addCustomLink, variant: "outlined", children: "Th\u00EAm n\u1EC1n t\u1EA3ng kh\u00E1c" })] }), _jsx(Typography, { variant: "h6", sx: { mt: 2 }, children: "Th\u00F4ng tin b\u1ED5 sung" }), additionalInfo.map((info, index) => (_jsxs(Box, { sx: { display: 'grid', gap: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }, children: [_jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [_jsx(TextField, { label: "Ti\u00EAu \u0111\u1EC1", value: info.title, onChange: (e) => handleAdditionalInfoChange(index, 'title', e.target.value), placeholder: "Trong h\u1ED9p c\u00F3 g\u00EC?, Th\u00F4ng s\u1ED1 k\u1EF9 thu\u1EADt, ...", sx: { flex: 1 } }), _jsx(TextField, { label: "Th\u1EE9 t\u1EF1", type: "number", value: info.order, onChange: (e) => handleAdditionalInfoChange(index, 'order', Number(e.target.value)), sx: { width: 100 } }), _jsx(IconButton, { onClick: () => removeAdditionalInfo(index), children: _jsx(DeleteIcon, {}) })] }), _jsx(TextField, { label: "N\u1ED9i dung", value: info.content, onChange: (e) => handleAdditionalInfoChange(index, 'content', e.target.value), multiline: true, minRows: 3, placeholder: "Nh\u1EADp n\u1ED9i dung chi ti\u1EBFt..." })] }, index))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: addAdditionalInfo, variant: "outlined", children: "Th\u00EAm th\u00F4ng tin b\u1ED5 sung" }), _jsx(Typography, { variant: "h6", sx: { mt: 1 }, children: "H\u00ECnh \u1EA3nh" }), _jsxs(Tabs, { value: imageMode, onChange: (_, v) => setImageMode(v), sx: { mb: 1 }, children: [_jsx(Tab, { label: "D\u00E1n URL", value: "url" }), _jsx(Tab, { label: "Upload", value: "upload" })] }), images.map((img, idx) => (_jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [imageMode === 'url' ? (_jsx(TextField, { fullWidth: true, placeholder: "D\u00E1n URL \u1EA3nh", value: img, onChange: (e) => handleImageChange(idx, e.target.value) })) : (_jsxs(_Fragment, { children: [_jsx(TextField, { fullWidth: true, placeholder: "URL \u1EA3nh (t\u1EF1 \u0111i\u1EC1n sau upload)", value: img, onChange: (e) => handleImageChange(idx, e.target.value) }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => { const f = e.target.files?.[0]; if (f)
                                            handleUpload(f, idx); } })] })), images.length > 1 && (_jsx(IconButton, { onClick: () => removeImageField(idx), children: _jsx(DeleteIcon, {}) }))] }, idx))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: addImageField, variant: "outlined", children: "Th\u00EAm \u1EA3nh" }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsx(Button, { type: "button", variant: "outlined", onClick: () => navigate('/admin/products'), children: "Hu\u1EF7" }), _jsx(Button, { type: "submit", variant: "contained", disabled: uploadingCount > 0, children: uploadingCount > 0 ? 'Đang upload ảnh...' : 'Cập nhật' })] })] }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 3000, onClose: () => setToast({ ...toast, open: false }), anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, children: _jsx(Alert, { severity: toast.severity, variant: "filled", onClose: () => setToast({ ...toast, open: false }), children: toast.message }) })] }));
};
export default ProductEditPage;
