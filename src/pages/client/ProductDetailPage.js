import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Chip, Accordion, AccordionSummary, AccordionDetails, Breadcrumbs, Link as MuiLink, Card, CardContent, Rating, CircularProgress, Alert,
// Divider
 } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Star as StarIcon, 
// ShoppingCart as ShoppingCartIcon,
Support as SupportIcon, Business as BusinessIcon } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_product, get_products } from '../../api/client/products';
const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    useEffect(() => {
        const loadProduct = async () => {
            if (!id)
                return;
            try {
                setLoading(true);
                setError(null);
                const response = await get_product(id);
                setProduct(response.data.product);
                // Load 4 random products for related products
                await loadRelatedProducts();
            }
            catch (err) {
                console.error('Error loading product:', err);
                setError('Không thể tải thông tin sản phẩm');
            }
            finally {
                setLoading(false);
            }
        };
        const loadRelatedProducts = async () => {
            try {
                const response = await get_products({ limit: 20, page: 1 });
                // Get 4 random products from the response, excluding current product
                const allProducts = response.data.products.filter(p => p._id !== id);
                const shuffled = allProducts.sort(() => 0.5 - Math.random());
                setRelatedProducts(shuffled.slice(0, 4));
            }
            catch (err) {
                console.error('Error loading related products:', err);
                setRelatedProducts([]);
            }
        };
        loadProduct();
    }, [id]);
    if (loading) {
        return (_jsx(Layout, { children: _jsx(Box, { className: "container", sx: { mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }, children: _jsx(CircularProgress, {}) }) }));
    }
    if (error || !product) {
        return (_jsx(Layout, { children: _jsxs(Box, { className: "container", sx: { mt: 3 }, children: [_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error || 'Sản phẩm không tồn tại' }), _jsx(Typography, { variant: "h4", component: "h1", children: "S\u1EA3n ph\u1EA9m kh\u00F4ng t\u1ED3n t\u1EA1i" }), _jsx(Typography, { children: "Vui l\u00F2ng ki\u1EC3m tra l\u1EA1i \u0111\u01B0\u1EDDng d\u1EABn." })] }) }));
    }
    // Product images from API
    const productImages = product.images && product.images.length > 0
        ? product.images
        : ['/placeholder-product.jpg'];
    // Get quality metrics from database with fallback values
    const qualityMetrics = [
        { label: 'Chất lượng sản phẩm', rating: product?.qualityRating || product?.rating || 0 },
        { label: 'Tốc độ giao hàng', rating: product?.deliveryRating || 5.0 },
        { label: 'Bảo hành dịch vụ', rating: product?.warrantyRating || 5.0 }
    ];
    return (_jsx(Layout, { children: _jsxs(Box, { className: "container", sx: { mt: 3 }, children: [_jsxs(Breadcrumbs, { sx: { mb: 3 }, children: [_jsx(MuiLink, { component: Link, to: "/", color: "inherit", children: "Trang ch\u1EE7" }), _jsx(MuiLink, { component: Link, to: `/categories/${product.category.slug}`, color: "inherit", children: product.category.name }), _jsx(Typography, { color: "text.primary", children: product.name })] }), _jsxs(Box, { sx: {
                        display: 'flex',
                        gap: 4,
                        flexDirection: { xs: 'column', md: 'row' }
                    }, children: [_jsx(Box, { sx: { flex: 1 }, children: _jsxs(Box, { sx: { position: 'relative' }, children: [_jsx(Box, { component: "img", src: productImages[selectedImage], alt: product.name, sx: {
                                            width: '100%',
                                            // maxHeight: 500,
                                            objectFit: 'cover',
                                            borderRadius: 2,
                                            mb: 2
                                        } }), _jsx(Box, { sx: { display: 'flex', gap: 1 }, children: productImages.map((img, index) => (_jsx(Box, { component: "img", src: img, alt: `${product.name} ${index + 1}`, onClick: () => setSelectedImage(index), sx: {
                                                width: 80,
                                                height: 80,
                                                objectFit: 'cover',
                                                borderRadius: 1,
                                                cursor: 'pointer',
                                                border: selectedImage === index ? '2px solid #f58220' : '1px solid #ddd',
                                                '&:hover': {
                                                    borderColor: '#f58220'
                                                }
                                            } }, index))) })] }) }), _jsx(Box, { sx: { flex: 1 }, children: _jsxs(Box, { sx: { pl: { xs: 0, md: 2 } }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 2 }, children: [_jsx(StarIcon, { sx: { color: '#ffb400', fontSize: 20 } }), _jsx(Typography, { variant: "h6", sx: { fontWeight: 700 }, children: (product.rating || 0).toFixed(1) }), _jsx(Typography, { sx: { color: '#666' }, children: "\u2022" }), _jsxs(Typography, { sx: { color: '#666' }, children: ["\u0110\u00E1nh gi\u00E1: ", product.reviewsCount || 0] }), product.sold && (_jsxs(_Fragment, { children: [_jsx(Typography, { sx: { color: '#666' }, children: "\u2022" }), _jsxs(Typography, { sx: { color: '#666' }, children: ["\u0110\u00E3 b\u00E1n: ", product.sold] })] }))] }), _jsx(Typography, { variant: "h4", component: "h1", sx: { mb: 3, fontWeight: 700 }, children: product.name }), _jsx(Box, { sx: { mb: 3 }, children: qualityMetrics.map((metric, index) => (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(Typography, { sx: { minWidth: 120, fontSize: 14 }, children: metric.label }), _jsx(Rating, { value: metric.rating, readOnly: true, size: "small" }), _jsx(Typography, { sx: { fontSize: 14, fontWeight: 700 }, children: metric.rating })] }, index))) }), _jsxs(Box, { sx: { mb: 3 }, children: [product.originalPrice && (_jsxs(Typography, { sx: {
                                                    color: '#999',
                                                    textDecoration: 'line-through',
                                                    fontSize: 18,
                                                    mb: 1
                                                }, children: [product.originalPrice.toLocaleString('vi-VN'), "\u20AB"] })), _jsxs(Typography, { variant: "h4", sx: {
                                                    color: '#f58220',
                                                    fontWeight: 700,
                                                    mb: 2
                                                }, children: [product.price.toLocaleString('vi-VN'), "\u20AB"] }), product.discountPercentage && product.discountPercentage > 0 && (_jsx(Chip, { label: `Giảm ${product.discountPercentage}%`, sx: {
                                                    backgroundColor: '#ff4444',
                                                    color: 'white',
                                                    fontWeight: 600
                                                } }))] }), product.purchaseLinks && (_jsxs(Box, { sx: { mb: 3 }, children: [_jsx(Typography, { sx: { mb: 2, fontWeight: 600 }, children: "Mua h\u00E0ng t\u1EA1i:" }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }, children: [product.purchaseLinks.shopee && (_jsx(Button, { variant: "outlined", sx: {
                                                            borderColor: '#f58220',
                                                            color: '#f58220',
                                                            '&:hover': {
                                                                borderColor: '#f58220',
                                                                backgroundColor: '#fff5f0'
                                                            }
                                                        }, onClick: () => window.open(product.purchaseLinks.shopee, '_blank'), children: "Shopee" })), product.purchaseLinks.tiktok && (_jsx(Button, { variant: "outlined", sx: {
                                                            borderColor: '#f58220',
                                                            color: '#f58220',
                                                            '&:hover': {
                                                                borderColor: '#f58220',
                                                                backgroundColor: '#fff5f0'
                                                            }
                                                        }, onClick: () => window.open(product.purchaseLinks.tiktok, '_blank'), children: "TikTok" })), product.purchaseLinks.facebook && (_jsx(Button, { variant: "outlined", sx: {
                                                            borderColor: '#f58220',
                                                            color: '#f58220',
                                                            '&:hover': {
                                                                borderColor: '#f58220',
                                                                backgroundColor: '#fff5f0'
                                                            }
                                                        }, onClick: () => window.open(product.purchaseLinks.facebook, '_blank'), children: "Facebook" })), product.purchaseLinks.custom?.map((link, index) => (_jsx(Button, { variant: "outlined", sx: {
                                                            borderColor: '#f58220',
                                                            color: '#f58220',
                                                            '&:hover': {
                                                                borderColor: '#f58220',
                                                                backgroundColor: '#fff5f0'
                                                            }
                                                        }, onClick: () => window.open(link.url, '_blank'), children: link.platform }, index)))] })] })), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsx(Button, { variant: "contained", startIcon: _jsx(BusinessIcon, {}), sx: {
                                                    backgroundColor: '#f58220',
                                                    '&:hover': {
                                                        backgroundColor: '#e6731a'
                                                    },
                                                    px: 3,
                                                    py: 1.5
                                                }, onClick: () => window.open('https://zalo.me/0878784842', '_blank'), children: "MUA H\u00C0NG" }), _jsx(Button, { variant: "outlined", startIcon: _jsx(SupportIcon, {}), sx: {
                                                    borderColor: '#f58220',
                                                    color: '#f58220',
                                                    '&:hover': {
                                                        borderColor: '#f58220',
                                                        backgroundColor: '#fff5f0'
                                                    },
                                                    px: 3,
                                                    py: 1.5
                                                }, onClick: () => window.open('tel:0878784842', '_self'), children: "H\u1ED6 TR\u1EE2 KH\u00C1CH H\u00C0NG" })] })] }) })] }), _jsxs(Box, { sx: { mt: 6 }, children: [_jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 3 }, children: [_jsx(Button, { variant: "contained", sx: {
                                        backgroundColor: '#f58220',
                                        '&:hover': { backgroundColor: '#e6731a' }
                                    }, children: "M\u00F4 t\u1EA3 s\u1EA3n ph\u1EA9m" }), _jsx(Button, { variant: "outlined", children: "Th\u00F4ng s\u1ED1 k\u1EF9 thu\u1EADt" })] }), _jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Typography, { variant: "h6", sx: { mb: 2, fontWeight: 700 }, children: "M\u00F4 t\u1EA3 s\u1EA3n ph\u1EA9m" }), _jsx(Box, { sx: {
                                        lineHeight: 1.8,
                                        color: '#666',
                                        textAlign: 'left',
                                        fontSize: '14px',
                                        '& p': { margin: '0 0 16px 0' },
                                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                                            margin: '16px 0 8px 0',
                                            fontWeight: 600
                                        },
                                        '& ul, & ol': {
                                            margin: '0 0 16px 0',
                                            paddingLeft: '24px'
                                        },
                                        '& li': { margin: '4px 0' },
                                        '& strong, & b': { fontWeight: 600 },
                                        '& a': { color: '#1976d2', textDecoration: 'underline' },
                                        '& img': { maxWidth: '100%', height: 'auto' }
                                    }, dangerouslySetInnerHTML: {
                                        __html: product.description || `<p>${product.name} là sản phẩm chất lượng cao với thiết kế hiện đại và tiện ích vượt trội.</p>`
                                    } })] }), product.specifications && product.specifications.length > 0 && (_jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Typography, { variant: "h6", sx: { mb: 2, fontWeight: 700 }, children: "Th\u00F4ng s\u1ED1 k\u1EF9 thu\u1EADt" }), _jsx(Box, { sx: {
                                        border: '1px solid #ddd',
                                        borderRadius: 1,
                                        overflow: 'hidden'
                                    }, children: _jsxs(Box, { sx: {
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            '& > *': {
                                                borderBottom: '1px solid #eee',
                                                p: 2,
                                                '&:nth-of-type(odd)': {
                                                    backgroundColor: '#f9f9f9',
                                                    fontWeight: 600
                                                }
                                            }
                                        }, children: [_jsx(Box, { children: "T\u00EAn s\u1EA3n ph\u1EA9m" }), _jsx(Box, { children: product.name }), product.specifications
                                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                                .map((spec, index) => (_jsxs(React.Fragment, { children: [_jsx(Box, { children: spec.title }), _jsx(Box, { children: spec.content })] }, index)))] }) })] }))] }), product.additionalInfo && product.additionalInfo.length > 0 && (_jsx(Box, { sx: { mb: 4 }, children: product.additionalInfo
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((info, index) => (_jsxs(Accordion, { sx: { mb: 1 }, children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), children: _jsx(Typography, { sx: { fontWeight: 600 }, children: info.title }) }), _jsx(AccordionDetails, { children: _jsx(Box, { sx: {
                                        lineHeight: 1.8,
                                        textAlign: 'left',
                                        fontSize: '14px',
                                        '& p': { margin: '0 0 16px 0' },
                                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                                            margin: '16px 0 8px 0',
                                            fontWeight: 600
                                        },
                                        '& ul, & ol': {
                                            margin: '0 0 16px 0',
                                            paddingLeft: '24px'
                                        },
                                        '& li': { margin: '4px 0' },
                                        '& strong, & b': { fontWeight: 600 },
                                        '& a': { color: '#1976d2', textDecoration: 'underline' },
                                        '& img': { maxWidth: '100%', height: 'auto' }
                                    }, dangerouslySetInnerHTML: { __html: info.content } }) })] }, index))) })), relatedProducts.length > 0 && (_jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Typography, { variant: "h5", sx: { mb: 3, fontWeight: 700 }, children: "S\u1EA3n ph\u1EA9m li\u00EAn quan" }), _jsx(Box, { sx: {
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(2, 1fr)',
                                    sm: 'repeat(3, 1fr)',
                                    md: 'repeat(4, 1fr)'
                                },
                                gap: 2
                            }, children: relatedProducts.map((relatedProduct) => (_jsxs(Card, { sx: {
                                    height: '100%',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 3
                                    },
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer'
                                }, onClick: () => window.location.href = `/products/${relatedProduct.slug}`, children: [_jsx(Box, { component: "img", src: relatedProduct.images?.[0] || '/placeholder-product.jpg', alt: relatedProduct.name, sx: {
                                            width: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            }
                                        } }), _jsxs(CardContent, { sx: { p: 2 }, children: [_jsx(Typography, { variant: "body2", sx: {
                                                    fontWeight: 600,
                                                    mb: 1,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    minHeight: '2.8em'
                                                }, children: relatedProduct.name }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(StarIcon, { sx: { color: '#ffb400', fontSize: 16 } }), _jsx(Typography, { variant: "body2", children: relatedProduct.rating?.toFixed(1) || '0.0' }), relatedProduct.sold && (_jsxs(Typography, { variant: "body2", sx: { color: '#666' }, children: ["\u0110\u00E3 b\u00E1n: ", relatedProduct.sold] }))] }), _jsxs(Typography, { variant: "h6", sx: {
                                                    color: '#f58220',
                                                    fontWeight: 700,
                                                    fontSize: 16
                                                }, children: [relatedProduct.price.toLocaleString('vi-VN'), "\u20AB"] })] })] }, relatedProduct._id))) })] }))] }) }));
};
export default ProductDetailPage;
