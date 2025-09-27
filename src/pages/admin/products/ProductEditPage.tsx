import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button, Snackbar, Alert, IconButton, Tabs, Tab } from '@mui/material';
import AdminLayout from '../../../components/admin/AdminLayout';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import { get_admin_categories } from '../../../api/categories';
import { get_admin_product, update_admin_product } from '../../../api/products';
import { upload_product_image } from '../../../api/uploads';
import RichTextEditor from '../../../components/shared/RichTextEditor';

const ProductEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState<any[]>([]);
    const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category: '', originalPrice: '', sku: '', brand: '', status: 'active' });
    const [images, setImages] = useState<string[]>(['']);
    const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
    const [uploadingCount, setUploadingCount] = useState(0);
    const [tags, setTags] = useState<string>('');

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


    useEffect(() => {
        get_admin_categories().then((list: any) => setCategories(list as any[])).catch(() => setCategories([]));
        if (id) {
            get_admin_product(id).then((p: any) => {
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
                } else {
                    setAdditionalInfo([{ title: '', content: '', order: 0 }]);
                }

                // Load specifications
                if (p.specifications && Array.isArray(p.specifications)) {
                    setSpecifications(p.specifications);
                } else {
                    setSpecifications([{ title: '', content: '', order: 0 }]);
                }

                // Load rating and review info
                setRatingInfo({
                    rating: p.rating ? String(p.rating) : '',
                    reviewsCount: p.reviewsCount ? String(p.reviewsCount) : '',
                    sold: p.sold ? String(p.sold) : ''
                });

                // Load quality metrics
                setQualityMetrics({
                    qualityRating: p.qualityRating ? String(p.qualityRating) : '',
                    deliveryRating: p.deliveryRating ? String(p.deliveryRating) : '5',
                    warrantyRating: p.warrantyRating ? String(p.warrantyRating) : '5'
                });

            });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target) return;
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index: number, value: string) => {
        setImages(prev => prev.map((v, i) => i === index ? value : v));
    };
    const addImageField = () => setImages(prev => [...prev, '']);
    const removeImageField = (index: number) => setImages(prev => prev.filter((_, i) => i !== index));

    const handlePurchaseLinkChange = (field: string, value: string) => {
        setPurchaseLinks(prev => ({ ...prev, [field]: value }));
    };

    const handleCustomLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
        setPurchaseLinks(prev => ({
            ...prev,
            custom: prev.custom.map((link, i) => i === index ? { ...link, [field]: value } : link)
        }));
    };

    const addCustomLink = () => {
        setPurchaseLinks(prev => ({ ...prev, custom: [...prev.custom, { platform: '', url: '' }] }));
    };

    const removeCustomLink = (index: number) => {
        setPurchaseLinks(prev => ({ ...prev, custom: prev.custom.filter((_, i) => i !== index) }));
    };

    const handleAdditionalInfoChange = (index: number, field: 'title' | 'content' | 'order', value: string | number) => {
        setAdditionalInfo(prev => prev.map((info, i) => i === index ? { ...info, [field]: value } : info));
    };

    const addAdditionalInfo = () => {
        setAdditionalInfo(prev => [...prev, { title: '', content: '', order: prev.length }]);
    };

    const removeAdditionalInfo = (index: number) => {
        setAdditionalInfo(prev => prev.filter((_, i) => i !== index));
    };

    const handleSpecificationChange = (index: number, field: 'title' | 'content' | 'order', value: string | number) => {
        setSpecifications(prev => prev.map((spec, i) => i === index ? { ...spec, [field]: value } : spec));
    };

    const addSpecification = () => {
        setSpecifications(prev => [...prev, { title: '', content: '', order: prev.length }]);
    };

    const removeSpecification = (index: number) => {
        setSpecifications(prev => prev.filter((_, i) => i !== index));
    };

    // Rating and metrics handlers
    const handleRatingInfoChange = (field: 'rating' | 'reviewsCount' | 'sold', value: string) => {
        setRatingInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleQualityMetricsChange = (field: 'qualityRating' | 'deliveryRating' | 'warrantyRating', value: string) => {
        setQualityMetrics(prev => ({ ...prev, [field]: value }));
    };

    const handleUpload = async (file: File, index: number) => {
        try {
            setUploadingCount(c => c + 1);
            const url = await upload_product_image(file);
            handleImageChange(index, url);
        } catch (e: any) {
            setToast({ open: true, message: e?.message || 'Upload ảnh thất bại', severity: 'error' });
        } finally {
            setUploadingCount(c => Math.max(0, c - 1));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (uploadingCount > 0) {
                setToast({ open: true, message: 'Đang upload ảnh, vui lòng đợi hoàn tất...', severity: 'error' });
                return;
            }
            if (!id) return;
            await update_admin_product(id, {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
                stock: Number(form.stock),
                category: form.category,
                sku: form.sku || undefined,
                brand: form.brand || undefined,
                status: form.status as 'active' | 'inactive' | 'draft',
                images: images.filter(Boolean),
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
            });
            setToast({ open: true, message: 'Cập nhật sản phẩm thành công', severity: 'success' });
            setTimeout(() => navigate('/admin/products'), 600);
        } catch (e: any) {
            setToast({ open: true, message: e?.response?.data?.message || 'Cập nhật thất bại', severity: 'error' });
        }
    };

    return (
        <AdminLayout title="Sản phẩm">
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                Chỉnh sửa sản phẩm
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'grid', gap: 2, maxWidth: 820 }}>
                <TextField label="Tên sản phẩm" name="name" value={form.name} onChange={handleChange} required />
                <Box>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                        Mô tả sản phẩm
                    </Typography>
                    <RichTextEditor
                        value={form.description}
                        onChange={(value) => setForm(prev => ({ ...prev, description: value }))}
                        placeholder="Nhập mô tả chi tiết sản phẩm..."
                        minHeight={200}
                        onImageUpload={upload_product_image}
                    />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    <TextField label="Giá" name="price" value={form.price} onChange={handleChange} type="number" />
                    <TextField label="Giá gốc" name="originalPrice" value={form.originalPrice} onChange={handleChange} type="number" />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    <TextField label="Tồn kho" name="stock" value={form.stock} onChange={handleChange} type="number" />
                    <TextField select label="Trạng thái" name="status" value={form.status} onChange={handleChange}>
                        <MenuItem value="active">Đang bán</MenuItem>
                        <MenuItem value="inactive">Tạm ẩn</MenuItem>
                        <MenuItem value="draft">Nháp</MenuItem>
                    </TextField>
                </Box>
                <TextField select label="Danh mục" name="category" value={form.category} onChange={handleChange} required>
                    {categories.map(c => (
                        <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                    ))}
                </TextField>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    <TextField label="SKU" name="sku" value={form.sku} onChange={handleChange} />
                    <TextField label="Thương hiệu" name="brand" value={form.brand} onChange={handleChange} />
                </Box>
                <TextField label="Tags (phân tách dấu phẩy)" value={tags} onChange={(e) => setTags(e.target.value)} />

                {/* Rating and Review Information */}
                <Typography variant="h6" sx={{ mt: 2 }}>Thông tin đánh giá & bán hàng</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                    <TextField
                        label="Điểm đánh giá (0-5)"
                        type="number"
                        inputProps={{ min: 0, max: 5, step: 0.1 }}
                        value={ratingInfo.rating}
                        onChange={(e) => handleRatingInfoChange('rating', e.target.value)}
                        placeholder="4.5"
                    />
                    <TextField
                        label="Số lượt đánh giá"
                        type="number"
                        inputProps={{ min: 0 }}
                        value={ratingInfo.reviewsCount}
                        onChange={(e) => handleRatingInfoChange('reviewsCount', e.target.value)}
                        placeholder="120"
                    />
                    <TextField
                        label="Số lượng đã bán"
                        type="number"
                        inputProps={{ min: 0 }}
                        value={ratingInfo.sold}
                        onChange={(e) => handleRatingInfoChange('sold', e.target.value)}
                        placeholder="500"
                    />
                </Box>

                {/* Quality Metrics */}
                <Typography variant="h6" sx={{ mt: 2 }}>Đánh giá chất lượng dịch vụ</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                    <TextField
                        label="Chất lượng sản phẩm (0-5)"
                        type="number"
                        inputProps={{ min: 0, max: 5, step: 0.1 }}
                        value={qualityMetrics.qualityRating}
                        onChange={(e) => handleQualityMetricsChange('qualityRating', e.target.value)}
                        placeholder="4.5"
                    />
                    <TextField
                        label="Tốc độ giao hàng (0-5)"
                        type="number"
                        inputProps={{ min: 0, max: 5, step: 0.1 }}
                        value={qualityMetrics.deliveryRating}
                        onChange={(e) => handleQualityMetricsChange('deliveryRating', e.target.value)}
                    />
                    <TextField
                        label="Bảo hành dịch vụ (0-5)"
                        type="number"
                        inputProps={{ min: 0, max: 5, step: 0.1 }}
                        value={qualityMetrics.warrantyRating}
                        onChange={(e) => handleQualityMetricsChange('warrantyRating', e.target.value)}
                    />
                </Box>

                {/* Purchase Links */}
                <Typography variant="h6" sx={{ mt: 2 }}>Liên kết mua hàng</Typography>
                <Box sx={{ display: 'grid', gap: 2 }}>
                    <TextField
                        label="Shopee URL"
                        value={purchaseLinks.shopee}
                        onChange={(e) => handlePurchaseLinkChange('shopee', e.target.value)}
                        placeholder="https://shopee.vn/..."
                    />
                    <TextField
                        label="TikTok URL"
                        value={purchaseLinks.tiktok}
                        onChange={(e) => handlePurchaseLinkChange('tiktok', e.target.value)}
                        placeholder="https://www.tiktok.com/..."
                    />
                    <TextField
                        label="Facebook URL"
                        value={purchaseLinks.facebook}
                        onChange={(e) => handlePurchaseLinkChange('facebook', e.target.value)}
                        placeholder="https://facebook.com/..."
                    />
                    {purchaseLinks.custom.map((link, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <TextField
                                label="Tên nền tảng"
                                value={link.platform}
                                onChange={(e) => handleCustomLinkChange(index, 'platform', e.target.value)}
                                placeholder="Lazada, Tiki, ..."
                                sx={{ flex: 1 }}
                            />
                            <TextField
                                label="URL"
                                value={link.url}
                                onChange={(e) => handleCustomLinkChange(index, 'url', e.target.value)}
                                placeholder="https://..."
                                sx={{ flex: 2 }}
                            />
                            <IconButton onClick={() => removeCustomLink(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button startIcon={<AddIcon />} onClick={addCustomLink} variant="outlined">
                        Thêm nền tảng khác
                    </Button>
                </Box>

                {/* Specifications */}
                <Typography variant="h6" sx={{ mt: 2 }}>Thông số kỹ thuật</Typography>
                {specifications.map((spec, index) => (
                    <Box key={index} sx={{ display: 'grid', gap: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <TextField
                                label="Tiêu đề"
                                value={spec.title}
                                onChange={(e) => handleSpecificationChange(index, 'title', e.target.value)}
                                placeholder="Model, Màu sắc, Dung tích, ..."
                                sx={{ flex: 1 }}
                            />
                            <TextField
                                label="Thứ tự"
                                type="number"
                                value={spec.order}
                                onChange={(e) => handleSpecificationChange(index, 'order', Number(e.target.value))}
                                sx={{ width: 100 }}
                            />
                            <IconButton onClick={() => removeSpecification(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <TextField
                            label="Nội dung"
                            value={spec.content}
                            onChange={(e) => handleSpecificationChange(index, 'content', e.target.value)}
                            placeholder="LTC-20L, Bạc kim loại, 20L, ..."
                        />
                    </Box>
                ))}
                <Button startIcon={<AddIcon />} onClick={addSpecification} variant="outlined">
                    Thêm thông số kỹ thuật
                </Button>

                {/* Additional Info */}
                <Typography variant="h6" sx={{ mt: 2 }}>Thông tin bổ sung</Typography>
                {additionalInfo.map((info, index) => (
                    <Box key={index} sx={{ display: 'grid', gap: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <TextField
                                label="Tiêu đề"
                                value={info.title}
                                onChange={(e) => handleAdditionalInfoChange(index, 'title', e.target.value)}
                                placeholder="Trong hộp có gì?, Thông số kỹ thuật, ..."
                                sx={{ flex: 1 }}
                            />
                            <TextField
                                label="Thứ tự"
                                type="number"
                                value={info.order}
                                onChange={(e) => handleAdditionalInfoChange(index, 'order', Number(e.target.value))}
                                sx={{ width: 100 }}
                            />
                            <IconButton onClick={() => removeAdditionalInfo(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Nội dung
                            </Typography>
                            <RichTextEditor
                                value={info.content}
                                onChange={(value) => handleAdditionalInfoChange(index, 'content', value)}
                                placeholder="Nhập nội dung chi tiết..."
                                minHeight={120}
                                onImageUpload={upload_product_image}
                            />
                        </Box>
                    </Box>
                ))}
                <Button startIcon={<AddIcon />} onClick={addAdditionalInfo} variant="outlined">
                    Thêm thông tin bổ sung
                </Button>

                <Typography variant="h6" sx={{ mt: 1 }}>Hình ảnh</Typography>
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
                        {images.length > 1 && (
                            <IconButton onClick={() => removeImageField(idx)}><DeleteIcon /></IconButton>
                        )}
                    </Box>
                ))}
                <Button startIcon={<AddIcon />} onClick={addImageField} variant="outlined">Thêm ảnh</Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button type="button" variant="outlined" onClick={() => navigate('/admin/products')}>Huỷ</Button>
                    <Button type="submit" variant="contained" disabled={uploadingCount > 0}>{uploadingCount > 0 ? 'Đang upload ảnh...' : 'Cập nhật'}</Button>
                </Box>
            </Box>
            <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity={toast.severity} variant="filled" onClose={() => setToast({ ...toast, open: false })}>{toast.message}</Alert>
            </Snackbar>
        </AdminLayout>
    );
};

export default ProductEditPage;
