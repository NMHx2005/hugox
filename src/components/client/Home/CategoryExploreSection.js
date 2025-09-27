import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Card, CardMedia, CardContent, Rating, CircularProgress, Alert } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { get_featured_products } from '../../../api/client/products';
const ProductCard = ({ product }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price).replace('₫', '₫');
    };
    return (_jsxs(Card, { component: Link, to: `/products/${product._id}`, sx: {
            backgroundColor: '#fff',
            borderRadius: { xs: '8px', sm: '10px', md: '12px' },
            boxShadow: { xs: '0 2px 8px rgba(0, 0, 0, 0.08)', sm: '0 3px 10px rgba(0, 0, 0, 0.08)', md: '0 4px 12px rgba(0, 0, 0, 0.08)' },
            textDecoration: 'none',
            color: 'inherit',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: { xs: '0 4px 12px rgba(0, 0, 0, 0.12)', sm: '0 5px 14px rgba(0, 0, 0, 0.12)', md: '0 6px 16px rgba(0, 0, 0, 0.12)' },
            },
        }, children: [_jsx(CardMedia, { component: "img", image: product.images[0] || '/placeholder.jpg', alt: product.name, sx: {
                    height: { xs: '180px', sm: '200px', md: '220px' },
                    objectFit: 'contain',
                    padding: { xs: '12px', sm: '14px', md: '16px' },
                    backgroundColor: '#fafafa'
                } }), _jsxs(CardContent, { sx: { padding: { xs: '12px', sm: '14px', md: '16px' }, flexGrow: 1, display: 'flex', flexDirection: 'column' }, children: [_jsx(Typography, { variant: "h6", sx: {
                            fontWeight: 600,
                            fontSize: { xs: '14px', sm: '15px', md: '16px' },
                            color: '#333',
                            marginBottom: { xs: '8px', sm: '10px' },
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            minHeight: { xs: '40px', sm: '44px', md: '48px' }
                        }, children: product.name }), _jsx(Typography, { variant: "body2", sx: {
                            fontSize: { xs: '11px', sm: '12px' },
                            color: '#666',
                            marginBottom: { xs: '8px', sm: '10px' },
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }, children: product.category?.name || 'Chưa phân loại' }), _jsxs(Box, { sx: { marginBottom: { xs: '8px', sm: '10px' } }, children: [product.originalPrice && (_jsx(Typography, { sx: {
                                    fontSize: { xs: '12px', sm: '13px' },
                                    color: '#999',
                                    textDecoration: 'line-through',
                                    display: 'inline-block',
                                    marginRight: 1
                                }, children: formatPrice(product.originalPrice) })), _jsx(Typography, { sx: {
                                    fontSize: { xs: '16px', sm: '17px', md: '18px' },
                                    fontWeight: 700,
                                    color: '#f58220',
                                    display: 'inline-block'
                                }, children: formatPrice(product.price) })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, marginBottom: { xs: '8px', sm: '10px' } }, children: [_jsx(Rating, { value: product.rating || 0, precision: 0.1, size: "small", readOnly: true, sx: {
                                    '& .MuiRating-iconFilled': { color: '#ffc107' },
                                    fontSize: { xs: '16px', sm: '18px' }
                                } }), _jsxs(Typography, { sx: { fontSize: { xs: '11px', sm: '12px' }, color: '#666' }, children: ["(", product.reviewsCount || 0, ")"] })] }), _jsx(Typography, { sx: {
                            fontSize: { xs: '11px', sm: '12px' },
                            color: product.stock > 0 ? '#4caf50' : '#f44336',
                            fontWeight: 500,
                            marginTop: 'auto'
                        }, children: product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng' })] })] }));
};
const CategoryExploreSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadFeaturedProducts();
    }, []);
    const loadFeaturedProducts = async () => {
        try {
            setLoading(true);
            const response = await get_featured_products(12); // Load 12 featured products
            setProducts(response.data.products);
        }
        catch (error) {
            console.error('Error loading featured products:', error);
            setError('Lỗi tải sản phẩm nổi bật');
        }
        finally {
            setLoading(false);
        }
    };
    if (error) {
        return (_jsx(Box, { className: "container", sx: { padding: { xs: '40px 0', sm: '50px 0', md: '60px 0', lg: '80px 0' }, backgroundColor: '#F2F4F7' }, children: _jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error }) }));
    }
    return (_jsxs(Box, { className: "container", sx: { padding: { xs: '40px 0', sm: '50px 0', md: '60px 0', lg: '80px 0' }, backgroundColor: '#F2F4F7' }, children: [_jsxs(Box, { sx: { textAlign: 'center', marginBottom: { xs: 4, sm: 5, md: 6 } }, children: [_jsx(Typography, { sx: {
                            fontSize: { xs: '12px', sm: '13px', md: '14px', lg: '16px' },
                            fontWeight: 600,
                            color: '#f58220',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: { xs: 0.8, sm: 0.9, md: 1 },
                        }, children: "S\u1EA2N PH\u1EA8M N\u1ED4I B\u1EACT" }), _jsx(Typography, { variant: "h3", sx: {
                            fontWeight: 700,
                            fontSize: { xs: '22px', sm: '26px', md: '32px', lg: '38px' },
                            color: '#000',
                            lineHeight: 1.2,
                        }, children: "Kh\u00E1m ph\u00E1 s\u1EA3n ph\u1EA9m ch\u1EA5t l\u01B0\u1EE3ng" })] }), _jsxs(Box, { sx: { position: 'relative', paddingX: { xs: 0, md: 2 } }, children: [loading ? (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }, children: _jsx(CircularProgress, {}) })) : (_jsx(Swiper, { modules: [Navigation, Pagination], spaceBetween: 16, slidesPerView: 1, navigation: {
                            nextEl: '.swiper-button-next-explore',
                            prevEl: '.swiper-button-prev-explore',
                        }, pagination: { clickable: true }, breakpoints: {
                            600: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            900: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                            1500: {
                                slidesPerView: 5,
                                spaceBetween: 24,
                            },
                        }, style: { paddingBottom: 40 }, children: products.map((product) => (_jsx(SwiperSlide, { children: _jsx(ProductCard, { product: product }) }, product._id))) })), _jsx(IconButton, { className: "swiper-button-prev-explore", sx: {
                            position: 'absolute',
                            top: '50%',
                            left: { xs: '0px', md: '-20px' },
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                            zIndex: 10,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: { xs: 'none', md: 'flex' },
                        }, children: _jsx(ArrowBackIos, { sx: { fontSize: '20px', color: '#000' } }) }), _jsx(IconButton, { className: "swiper-button-next-explore", sx: {
                            position: 'absolute',
                            top: '50%',
                            right: { xs: '0px', md: '-20px' },
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                            zIndex: 10,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: { xs: 'none', md: 'flex' },
                        }, children: _jsx(ArrowForwardIos, { sx: { fontSize: '20px', color: '#000' } }) })] })] }));
};
export default CategoryExploreSection;
