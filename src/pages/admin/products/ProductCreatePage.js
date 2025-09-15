import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button, IconButton, Snackbar, Alert, Tabs, Tab } from '@mui/material';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { get_admin_categories } from '../../../api/categories';
import { create_admin_product } from '../../../api/products';
import { upload_product_image } from '../../../api/uploads';
import RichTextEditor from '../../../components/shared/RichTextEditor';
const ProductCreatePage = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        stock: '',
        category: '',
        sku: '',
        brand: '',
        featured: 'false',
        status: 'active'
    });
    const [purchaseLinks, setPurchaseLinks] = useState({
        shopee: '',
        tiktok: '',
        facebook: '',
        custom: [{ platform: '', url: '' }]
    });
    const [additionalInfo, setAdditionalInfo] = useState([{ title: '', content: '', order: 0 }]);
    const [specifications, setSpecifications] = useState([{ title: '', content: '', order: 0 }]);
    // Rating and Review Information
    const [ratingInfo, setRatingInfo] = useState({
        rating: '',
        reviewsCount: '',
        sold: ''
    });
    // Quality Metrics
    const [qualityMetrics, setQualityMetrics] = useState({
        qualityRating: '',
        deliveryRating: '5',
        warrantyRating: '5'
    });
    const [images, setImages] = useState(['']);
    const [imageMode, setImageMode] = useState('url');
    const [tags, setTags] = useState('');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const [uploadingCount, setUploadingCount] = useState(0);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get_admin_categories().then((list) => setCategories(list)).catch(() => setCategories([]));
    }, []);
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
    const handleSpecificationChange = (index, field, value) => {
        setSpecifications(prev => prev.map((spec, i) => i === index ? { ...spec, [field]: value } : spec));
    };
    const addSpecification = () => {
        setSpecifications(prev => [...prev, { title: '', content: '', order: prev.length }]);
    };
    const removeSpecification = (index) => {
        setSpecifications(prev => prev.filter((_, i) => i !== index));
    };
    // Rating and metrics handlers
    const handleRatingInfoChange = (field, value) => {
        setRatingInfo(prev => ({ ...prev, [field]: value }));
    };
    const handleQualityMetricsChange = (field, value) => {
        setQualityMetrics(prev => ({ ...prev, [field]: value }));
    };
    const handleUpload = async (file, index) => {
        try {
            setUploadingCount((c) => c + 1);
            const url = await upload_product_image(file);
            handleImageChange(index, url);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (e) {
            setToast({ open: true, message: e?.message || 'Upload ảnh thất bại', severity: 'error' });
        }
        finally {
            setUploadingCount((c) => Math.max(0, c - 1));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (uploadingCount > 0) {
                setToast({ open: true, message: 'Đang upload ảnh, vui lòng đợi hoàn tất...', severity: 'error' });
                return;
            }
            const slug = (form.name || '')
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '');
            const payload = {
                name: form.name,
                slug,
                description: form.description,
                price: Number(form.price || 0),
                originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
                stock: Number(form.stock || 0),
                category: form.category,
                images: images.filter(Boolean),
                sku: form.sku || undefined,
                brand: form.brand || undefined,
                featured: form.featured === 'true',
                status: form.status,
                tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
                purchaseLinks: {
                    shopee: purchaseLinks.shopee || undefined,
                    tiktok: purchaseLinks.tiktok || undefined,
                    facebook: purchaseLinks.facebook || undefined,
                    custom: purchaseLinks.custom.filter(link => link.platform && link.url)
                },
                additionalInfo: additionalInfo.filter(info => info.title && info.content),
                specifications: specifications.filter(spec => spec.title && spec.content),
                // Rating and Review Information
                rating: ratingInfo.rating ? Number(ratingInfo.rating) : undefined,
                reviewsCount: ratingInfo.reviewsCount ? Number(ratingInfo.reviewsCount) : undefined,
                sold: ratingInfo.sold ? Number(ratingInfo.sold) : undefined,
                // Quality Metrics
                qualityRating: qualityMetrics.qualityRating ? Number(qualityMetrics.qualityRating) : undefined,
                deliveryRating: qualityMetrics.deliveryRating ? Number(qualityMetrics.deliveryRating) : undefined,
                warrantyRating: qualityMetrics.warrantyRating ? Number(qualityMetrics.warrantyRating) : undefined
            };
            await create_admin_product(payload);
            setToast({ open: true, message: 'Tạo sản phẩm thành công', severity: 'success' });
            setTimeout(() => navigate('/admin/products'), 800);
        }
        catch (e) {
            const error = e;
            setToast({ open: true, message: error?.response?.data?.message || 'Tạo sản phẩm thất bại', severity: 'error' });
        }
    };
    return (_jsxs(AdminLayout, { title: "S\u1EA3n ph\u1EA9m", children: [_jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 700, textAlign: 'left' }, children: "Th\u00EAm s\u1EA3n ph\u1EA9m m\u1EDBi" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: { mt: 2, display: 'grid', gap: 2, maxWidth: 820 }, children: [_jsx(TextField, { label: "T\u00EAn s\u1EA3n ph\u1EA9m", name: "name", value: form.name, onChange: handleChange, required: true }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body1", sx: { mb: 1, fontWeight: 600 }, children: "M\u00F4 t\u1EA3 s\u1EA3n ph\u1EA9m" }), _jsx(RichTextEditor, { value: form.description, onChange: (value) => setForm(prev => ({ ...prev, description: value })), placeholder: "Nh\u1EADp m\u00F4 t\u1EA3 chi ti\u1EBFt s\u1EA3n ph\u1EA9m...", minHeight: 200 })] }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(TextField, { label: "Gi\u00E1", name: "price", value: form.price, onChange: handleChange, type: "number" }), _jsx(TextField, { label: "Gi\u00E1 g\u1ED1c", name: "originalPrice", value: form.originalPrice, onChange: handleChange, type: "number" })] }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(TextField, { label: "T\u1ED3n kho", name: "stock", value: form.stock, onChange: handleChange, type: "number" }), _jsxs(TextField, { select: true, label: "Tr\u1EA1ng th\u00E1i", name: "status", value: form.status, onChange: handleChange, children: [_jsx(MenuItem, { value: "active", children: "\u0110ang b\u00E1n" }), _jsx(MenuItem, { value: "inactive", children: "T\u1EA1m \u1EA9n" }), _jsx(MenuItem, { value: "draft", children: "Nh\u00E1p" })] })] }), _jsx(TextField, { select: true, label: "Danh m\u1EE5c", name: "category", value: form.category, onChange: handleChange, required: true, children: categories.map(c => (_jsx(MenuItem, { value: c._id, children: c.name }, c._id))) }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(TextField, { label: "SKU", name: "sku", value: form.sku, onChange: handleChange }), _jsx(TextField, { label: "Th\u01B0\u01A1ng hi\u1EC7u", name: "brand", value: form.brand, onChange: handleChange })] }), _jsx(TextField, { label: "Tags (ph\u00E2n t\u00E1ch d\u1EA5u ph\u1EA9y)", value: tags, onChange: (e) => setTags(e.target.value) }), _jsx(Typography, { variant: "h6", sx: { mt: 2 }, children: "Th\u00F4ng tin \u0111\u00E1nh gi\u00E1 & b\u00E1n h\u00E0ng" }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }, children: [_jsx(TextField, { label: "\u0110i\u1EC3m \u0111\u00E1nh gi\u00E1 (0-5)", type: "number", inputProps: { min: 0, max: 5, step: 0.1 }, value: ratingInfo.rating, onChange: (e) => handleRatingInfoChange('rating', e.target.value), placeholder: "4.5" }), _jsx(TextField, { label: "S\u1ED1 l\u01B0\u1EE3t \u0111\u00E1nh gi\u00E1", type: "number", inputProps: { min: 0 }, value: ratingInfo.reviewsCount, onChange: (e) => handleRatingInfoChange('reviewsCount', e.target.value), placeholder: "120" }), _jsx(TextField, { label: "S\u1ED1 l\u01B0\u1EE3ng \u0111\u00E3 b\u00E1n", type: "number", inputProps: { min: 0 }, value: ratingInfo.sold, onChange: (e) => handleRatingInfoChange('sold', e.target.value), placeholder: "500" })] }), _jsx(Typography, { variant: "h6", sx: { mt: 2 }, children: "\u0110\u00E1nh gi\u00E1 ch\u1EA5t l\u01B0\u1EE3ng d\u1ECBch v\u1EE5" }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }, children: [_jsx(TextField, { label: "Ch\u1EA5t l\u01B0\u1EE3ng s\u1EA3n ph\u1EA9m (0-5)", type: "number", inputProps: { min: 0, max: 5, step: 0.1 }, value: qualityMetrics.qualityRating, onChange: (e) => handleQualityMetricsChange('qualityRating', e.target.value), placeholder: "4.5" }), _jsx(TextField, { label: "T\u1ED1c \u0111\u1ED9 giao h\u00E0ng (0-5)", type: "number", inputProps: { min: 0, max: 5, step: 0.1 }, value: qualityMetrics.deliveryRating, onChange: (e) => handleQualityMetricsChange('deliveryRating', e.target.value) }), _jsx(TextField, { label: "B\u1EA3o h\u00E0nh d\u1ECBch v\u1EE5 (0-5)", type: "number", inputProps: { min: 0, max: 5, step: 0.1 }, value: qualityMetrics.warrantyRating, onChange: (e) => handleQualityMetricsChange('warrantyRating', e.target.value) })] }), _jsx(Typography, { variant: "h6", sx: { mt: 2 }, children: "Li\u00EAn k\u1EBFt mua h\u00E0ng" }), _jsxs(Box, { sx: { display: 'grid', gap: 2 }, children: [_jsx(TextField, { label: "Shopee URL", value: purchaseLinks.shopee, onChange: (e) => handlePurchaseLinkChange('shopee', e.target.value), placeholder: "https://shopee.vn/..." }), _jsx(TextField, { label: "TikTok URL", value: purchaseLinks.tiktok, onChange: (e) => handlePurchaseLinkChange('tiktok', e.target.value), placeholder: "https://www.tiktok.com/..." }), _jsx(TextField, { label: "Facebook URL", value: purchaseLinks.facebook, onChange: (e) => handlePurchaseLinkChange('facebook', e.target.value), placeholder: "https://facebook.com/..." }), purchaseLinks.custom.map((link, index) => (_jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [_jsx(TextField, { label: "T\u00EAn n\u1EC1n t\u1EA3ng", value: link.platform, onChange: (e) => handleCustomLinkChange(index, 'platform', e.target.value), placeholder: "Lazada, Tiki, ...", sx: { flex: 1 } }), _jsx(TextField, { label: "URL", value: link.url, onChange: (e) => handleCustomLinkChange(index, 'url', e.target.value), placeholder: "https://...", sx: { flex: 2 } }), _jsx(IconButton, { onClick: () => removeCustomLink(index), children: _jsx(DeleteIcon, {}) })] }, index))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: addCustomLink, variant: "outlined", children: "Th\u00EAm n\u1EC1n t\u1EA3ng kh\u00E1c" })] }), _jsx(Typography, { variant: "h6", sx: { mt: 2 }, children: "Th\u00F4ng s\u1ED1 k\u1EF9 thu\u1EADt" }), specifications.map((spec, index) => (_jsxs(Box, { sx: { display: 'grid', gap: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }, children: [_jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [_jsx(TextField, { label: "Ti\u00EAu \u0111\u1EC1", value: spec.title, onChange: (e) => handleSpecificationChange(index, 'title', e.target.value), placeholder: "Model, M\u00E0u s\u1EAFc, Dung t\u00EDch, ...", sx: { flex: 1 } }), _jsx(TextField, { label: "Th\u1EE9 t\u1EF1", type: "number", value: spec.order, onChange: (e) => handleSpecificationChange(index, 'order', Number(e.target.value)), sx: { width: 100 } }), _jsx(IconButton, { onClick: () => removeSpecification(index), children: _jsx(DeleteIcon, {}) })] }), _jsx(TextField, { label: "N\u1ED9i dung", value: spec.content, onChange: (e) => handleSpecificationChange(index, 'content', e.target.value), placeholder: "LTC-20L, B\u1EA1c kim lo\u1EA1i, 20L, ..." })] }, index))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: addSpecification, variant: "outlined", children: "Th\u00EAm th\u00F4ng s\u1ED1 k\u1EF9 thu\u1EADt" }), _jsx(Typography, { variant: "h6", sx: { mt: 2 }, children: "Th\u00F4ng tin b\u1ED5 sung" }), additionalInfo.map((info, index) => (_jsxs(Box, { sx: { display: 'grid', gap: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }, children: [_jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [_jsx(TextField, { label: "Ti\u00EAu \u0111\u1EC1", value: info.title, onChange: (e) => handleAdditionalInfoChange(index, 'title', e.target.value), placeholder: "Trong h\u1ED9p c\u00F3 g\u00EC?, Th\u00F4ng s\u1ED1 k\u1EF9 thu\u1EADt, ...", sx: { flex: 1 } }), _jsx(TextField, { label: "Th\u1EE9 t\u1EF1", type: "number", value: info.order, onChange: (e) => handleAdditionalInfoChange(index, 'order', Number(e.target.value)), sx: { width: 100 } }), _jsx(IconButton, { onClick: () => removeAdditionalInfo(index), children: _jsx(DeleteIcon, {}) })] }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", sx: { mb: 1, fontWeight: 500 }, children: "N\u1ED9i dung" }), _jsx(RichTextEditor, { value: info.content, onChange: (value) => handleAdditionalInfoChange(index, 'content', value), placeholder: "Nh\u1EADp n\u1ED9i dung chi ti\u1EBFt...", minHeight: 120 })] })] }, index))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: addAdditionalInfo, variant: "outlined", children: "Th\u00EAm th\u00F4ng tin b\u1ED5 sung" }), _jsx(Typography, { variant: "h6", sx: { mt: 1 }, children: "H\u00ECnh \u1EA3nh" }), _jsxs(Tabs, { value: imageMode, onChange: (_, v) => setImageMode(v), sx: { mb: 1 }, children: [_jsx(Tab, { label: "D\u00E1n URL", value: "url" }), _jsx(Tab, { label: "Upload", value: "upload" })] }), images.map((img, idx) => (_jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [imageMode === 'url' ? (_jsx(TextField, { fullWidth: true, placeholder: "D\u00E1n URL \u1EA3nh", value: img, onChange: (e) => handleImageChange(idx, e.target.value) })) : (_jsxs(_Fragment, { children: [_jsx(TextField, { fullWidth: true, placeholder: "URL \u1EA3nh (t\u1EF1 \u0111i\u1EC1n sau upload)", value: img, onChange: (e) => handleImageChange(idx, e.target.value) }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => { const f = e.target.files?.[0]; if (f)
                                            handleUpload(f, idx); } })] })), images.length > 1 && (_jsx(IconButton, { onClick: () => removeImageField(idx), children: _jsx(DeleteIcon, {}) }))] }, idx))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: addImageField, variant: "outlined", children: "Th\u00EAm \u1EA3nh" }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsx(Button, { type: "button", variant: "outlined", onClick: () => navigate('/admin/products'), children: "Hu\u1EF7" }), _jsx(Button, { type: "submit", variant: "contained", disabled: uploadingCount > 0, children: uploadingCount > 0 ? 'Đang upload ảnh...' : 'Lưu' })] })] }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 3000, onClose: () => setToast({ ...toast, open: false }), anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, children: _jsxs(Alert, { severity: toast.severity, variant: "filled", onClose: () => setToast({ ...toast, open: false }), children: [toast.message, toast.severity === 'success' && (_jsx(Button, { color: "inherit", size: "small", onClick: () => navigate('/admin/products'), sx: { ml: 2 }, children: "V\u1EC1 danh s\u00E1ch" }))] }) })] }));
};
export default ProductCreatePage;
