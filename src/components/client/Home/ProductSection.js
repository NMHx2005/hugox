import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Tabs, Tab, Card, CardMedia, CardContent, Rating, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { get_categories, get_category_products } from '../../../api/client/categories';
const ProductSection = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadCategories();
    }, []);
    useEffect(() => {
        if (categories.length > 0) {
            loadProducts();
        }
    }, [activeTab, categories]);
    const loadCategories = async () => {
        try {
            const data = await get_categories();
            setCategories(data);
        }
        catch (error) {
            console.error('Error loading categories:', error);
            setError('Lỗi tải danh mục sản phẩm');
        }
    };
    const loadProducts = async () => {
        if (categories.length === 0)
            return;
        try {
            setLoading(true);
            const categoryId = categories[activeTab]._id;
            const data = await get_category_products(categoryId, { limit: 8 });
            // Chuyển đổi format từ API sang format của ProductSection
            const formattedProducts = data.map((product) => ({
                id: product._id,
                name: product.name,
                image: product.images[0] || '/placeholder.jpg',
                originalPrice: product.originalPrice,
                salePrice: product.price,
                rating: product.ratingAvg || 0,
                sold: Math.floor(Math.random() * 100) + 10, // Mock sold count
                isFromPrice: false
            }));
            setProducts(formattedProducts);
        }
        catch (error) {
            console.error('Error loading products:', error);
            setError('Lỗi tải sản phẩm');
        }
        finally {
            setLoading(false);
        }
    };
    const handleTabChange = (_event, newValue) => {
        setActiveTab(newValue);
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price).replace('₫', '₫');
    };
    if (error) {
        return (_jsx("div", { className: 'product-section', children: _jsx(Box, { className: "container", sx: { padding: { xs: '40px 0', sm: '50px 0', md: '60px 0' } }, children: _jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error }) }) }));
    }
    return (_jsx("div", { className: 'product-section', children: _jsx(Box, { className: "container", sx: { padding: { xs: '40px 0', sm: '50px 0', md: '60px 0' } }, children: _jsxs(Box, { sx: {
                    display: 'flex',
                    gap: { xs: 0, md: 4 },
                    margin: { xs: '0 0 30px 0', sm: '0 0 35px 0', md: '0' },
                    flexDirection: { xs: 'column', lg: 'row' }
                }, children: [_jsxs(Box, { sx: {
                            flex: { xs: '1', lg: '0 0 300px' },
                            marginBottom: { xs: 3, sm: 4, lg: 0 },
                            textAlign: "left"
                        }, children: [_jsx(Typography, { variant: "h4", sx: {
                                    fontWeight: 700,
                                    fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '32px' },
                                    color: '#333',
                                    marginBottom: { xs: 2, sm: 2.5, md: 3 },
                                    lineHeight: 1.2,
                                    textAlign: "left"
                                }, children: "S\u1EA3n ph\u1EA9m \u0111a d\u1EA1ng v\u00E0 ch\u1EA5t l\u01B0\u1EE3ng" }), _jsx(Typography, { sx: {
                                    fontSize: { xs: '14px', sm: '15px', md: '16px' },
                                    color: '#666',
                                    lineHeight: 1.6,
                                    marginBottom: { xs: 2.5, sm: 3, md: 3 },
                                    textAlign: "left"
                                }, children: "HUGOX l\u00E0 th\u01B0\u01A1ng hi\u1EC7u h\u00E0ng \u0111\u1EA7u cung c\u1EA5p h\u1EC7 sinh th\u00E1i \u0111\u1EA7y \u0111\u1EE7 s\u1EA3n ph\u1EA9m v\u1EC1 gia d\u1EE5ng th\u00F4ng minh, kh\u00F4ng d\u00E2y v\u00E0 kh\u00F4ng gi\u1EDBi h\u1EA1n. V\u1EDBi uy t\u00EDn v\u00E0 ch\u1EA5t l\u01B0\u1EE3ng \u0111\u01B0\u1EE3c kh\u1EB3ng \u0111\u1ECBnh tr\u00EAn th\u1ECB tr\u01B0\u1EDDng th\u01B0\u01A1ng m\u1EA1i \u0111i\u1EC7n t\u1EED H\u00E0n Qu\u1ED1c, HUGOX \u0111\u00E3 m\u1EDF r\u1ED9ng ph\u00E2n ph\u1ED1i t\u1EA1i c\u00E1c th\u1ECB tr\u01B0\u1EDDng qu\u1ED1c t\u1EBF, \u0111\u1EB7c bi\u1EC7t l\u00E0 Vi\u1EC7t Nam th\u00F4ng qua Hoplongtech." }), _jsx(Button, { component: Link, to: "/products", variant: "contained", sx: {
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: { xs: '13px', sm: '14px' },
                                    padding: { xs: '10px 20px', sm: '12px 24px' },
                                    borderRadius: '4px',
                                    textTransform: 'none',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        backgroundColor: '#333'
                                    },
                                    textAlign: "left"
                                }, children: "Xem th\u00EAm s\u1EA3n ph\u1EA9m" })] }), _jsxs(Box, { sx: { flex: 1, minWidth: 0 }, children: [_jsx(Box, { sx: { marginBottom: { xs: 3, sm: 3.5, md: 4 } }, children: _jsx(Tabs, { value: activeTab, onChange: handleTabChange, variant: "scrollable", scrollButtons: "auto", sx: {
                                        '& .MuiTabs-indicator': {
                                            display: 'none'
                                        },
                                        '& .MuiTab-root': {
                                            minHeight: { xs: '40px', sm: '44px', md: '48px' },
                                            padding: { xs: '8px 12px', sm: '10px 16px', md: '12px 20px' },
                                            marginRight: { xs: '6px', sm: '8px', md: '10px' },
                                            backgroundColor: '#fff',
                                            border: '1px solid #e0e0e0',
                                            borderBottom: 'none',
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            fontSize: { xs: '12px', sm: '13px', md: '14px' },
                                            color: '#666',
                                            '&:first-of-type': {
                                                borderTopLeftRadius: '8px'
                                            },
                                            '&:last-of-type': {
                                                borderTopRightRadius: '8px',
                                                marginRight: 0
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: '#f58220',
                                                color: '#fff',
                                                borderColor: '#f58220'
                                            }
                                        }
                                    }, children: categories.map((category, index) => (_jsx(Tab, { label: category.name }, category._id))) }) }), loading ? (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }, children: _jsx(CircularProgress, {}) })) : (_jsx(Box, { sx: {
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(2, 1fr)',
                                        sm: 'repeat(3, 1fr)',
                                        md: 'repeat(4, 1fr)'
                                    },
                                    gap: { xs: 2, sm: 2.5, md: 3 }
                                }, children: products.map((product) => (_jsxs(Card, { component: Link, to: `/products/${product.id}`, sx: {
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                                        }
                                    }, children: [_jsx(CardMedia, { component: "img", sx: {
                                                height: { xs: 160, sm: 180, md: 200 },
                                                objectFit: 'contain',
                                                padding: { xs: 1.5, sm: 1.8, md: 2 },
                                                backgroundColor: '#fafafa'
                                            }, image: product.image, alt: product.name }), _jsxs(CardContent, { sx: { padding: { xs: 1.5, sm: 1.8, md: 2 } }, children: [_jsx(Typography, { variant: "body2", sx: {
                                                        fontSize: { xs: '12px', sm: '13px', md: '14px' },
                                                        fontWeight: 500,
                                                        color: '#333',
                                                        marginBottom: { xs: 1, sm: 1.2, md: 1.5 },
                                                        lineHeight: 1.4,
                                                        height: { xs: '32px', sm: '36px', md: '40px' },
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical'
                                                    }, children: product.name }), _jsxs(Box, { sx: { marginBottom: { xs: 1, sm: 1.2, md: 1.5 } }, children: [product.originalPrice && (_jsx(Typography, { sx: {
                                                                fontSize: { xs: '11px', sm: '12px', md: '13px' },
                                                                color: '#999',
                                                                textDecoration: 'line-through',
                                                                display: 'inline-block',
                                                                marginRight: 1
                                                            }, children: formatPrice(product.originalPrice) })), _jsxs(Typography, { sx: {
                                                                fontSize: { xs: '14px', sm: '15px', md: '16px' },
                                                                fontWeight: 700,
                                                                color: '#f58220',
                                                                display: 'inline-block'
                                                            }, children: [product.isFromPrice ? 'Chỉ từ: ' : '', formatPrice(product.salePrice)] })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.8, md: 1 } }, children: [_jsx(Rating, { value: product.rating, precision: 0.1, size: "small", readOnly: true, sx: {
                                                                '& .MuiRating-iconFilled': { color: '#ffc107' },
                                                                fontSize: { xs: '16px', sm: '18px', md: '20px' }
                                                            } }), _jsx(Typography, { sx: { fontSize: { xs: '10px', sm: '11px', md: '12px' }, color: '#666' }, children: product.rating }), _jsxs(Typography, { sx: { fontSize: { xs: '10px', sm: '11px', md: '12px' }, color: '#999' }, children: ["\u0110\u00E3 b\u00E1n: ", product.sold] })] })] })] }, product.id))) }))] })] }) }) }));
};
export default ProductSection;
