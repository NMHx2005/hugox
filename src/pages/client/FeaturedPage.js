import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_featured_products } from '../../api/client/products';
const FeaturedPage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadFeaturedProducts();
    }, []);
    const loadFeaturedProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await get_featured_products();
            setFeaturedProducts(response.data.products);
        }
        catch (err) {
            console.error('Error loading featured products:', err);
            setError('Không thể tải danh sách sản phẩm nổi bật');
        }
        finally {
            setLoading(false);
        }
    };
    const PriceRow = ({ original, current }) => (_jsxs(Box, { sx: { display: 'flex', alignItems: 'baseline', gap: 1 }, children: [original && (_jsxs(Typography, { component: "span", sx: { color: '#999', textDecoration: 'line-through', fontSize: 13 }, children: [original, _jsx(Typography, { component: "span", sx: { ml: .25 }, children: "\u20AB" })] })), _jsxs(Typography, { component: "span", sx: { color: '#f58220', fontWeight: 700, fontSize: 14 }, children: [current, current !== 'Liên hệ' && _jsx(Typography, { component: "span", sx: { ml: .25 }, children: "\u20AB" })] })] }));
    const StatsRow = ({ rating, sold }) => (_jsxs(Typography, { sx: { fontSize: 12, color: '#666' }, children: [_jsx(Typography, { component: "span", sx: { color: '#ffb400', fontWeight: 700 }, children: "\u2605" }), " ", rating, _jsx(Typography, { component: "span", sx: { mx: 1, color: '#bbb' }, children: "\u2022" }), "\u0110\u00E3 b\u00E1n: ", sold] }));
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };
    const Section = ({ title, products }) => (_jsxs(_Fragment, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 800, mb: 1.5 }, children: title }), _jsx(Box, { sx: {
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(5, 1fr)' },
                    gap: { xs: 1.5, md: 2 }
                }, children: products.map((p) => (_jsxs(Box, { sx: {
                        background: '#fff',
                        border: '1px solid #eee',
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                            borderColor: '#f2f2f2',
                        },
                    }, children: [_jsx(Box, { sx: { position: 'relative', overflow: 'hidden' }, children: _jsx(Link, { to: `/products/${p.slug || p._id}`, className: "alignnone img-wrap img-css-resize-wrapper", style: { display: 'block', textDecoration: 'none' }, children: _jsx(Box, { component: "img", className: "card-img", src: p.images?.[0] || '/placeholder-product.jpg', alt: p.name, sx: { width: '100%', height: 200, objectFit: 'cover', transition: 'transform .25s ease' } }) }) }), _jsxs(Box, { sx: { p: 1.5 }, children: [_jsx(Typography, { component: "h3", sx: { fontSize: 14, fontWeight: 700, mb: .5, lineHeight: 1.35 }, children: _jsx(Link, { to: `/products/${p.slug || p._id}`, title: p.name, style: { color: 'inherit', textDecoration: 'none' }, children: p.name }) }), _jsx(Box, { sx: { mb: .75 }, children: _jsx(PriceRow, { original: p.originalPrice ? formatPrice(p.originalPrice) : undefined, current: p.price ? formatPrice(p.price) : 'Liên hệ' }) }), _jsx(StatsRow, { rating: p.ratingAvg || 0, sold: p.sold || 0 })] })] }, p._id))) })] }));
    if (loading) {
        return (_jsx(Layout, { children: _jsx(Box, { sx: { pt: { xs: 2, md: 3 }, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }, className: "container", children: _jsx(CircularProgress, {}) }) }));
    }
    if (error) {
        return (_jsx(Layout, { children: _jsx(Box, { sx: { pt: { xs: 2, md: 3 } }, className: "container", children: _jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error }) }) }));
    }
    return (_jsx(Layout, { children: _jsxs(Box, { sx: { pt: { xs: 2, md: 3 } }, className: "container", children: [_jsx(Box, { component: "img", src: "https://lumias.vn/wp-content/uploads/2025/05/Banner-Thiet-bi-khac.jpg", alt: "Banner", sx: { width: '100%', borderRadius: 2, mb: { xs: 2, md: 3 } } }), _jsx(Section, { title: "S\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt", products: featuredProducts }), _jsx(Box, { sx: { height: 16 } }), _jsx(Section, { title: "S\u1EA3n ph\u1EA9m hot th\u00E1ng 6", products: featuredProducts.slice(0, 5) }), _jsx(Box, { sx: { height: 16 } }), _jsx(Section, { title: "S\u1EA3n ph\u1EA9m xu h\u01B0\u1EDBng th\u00E1ng 7", products: featuredProducts.slice(5, 10) }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }, children: _jsx(Button, { variant: "outlined", sx: { borderRadius: '999px', px: 3 }, component: Link, to: "/featured", children: "Xem th\u00EAm s\u1EA3n ph\u1EA9m" }) })] }) }));
};
export default FeaturedPage;
