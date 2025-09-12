import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
const CategoryPage = ({ categoryName, bannerImage, products }) => {
    const [sortBy, setSortBy] = useState('newest');
    const [displayedProducts, setDisplayedProducts] = useState(products.slice(0, 8));
    const [showLoadMore, setShowLoadMore] = useState(products.length > 8);
    useEffect(() => {
        setDisplayedProducts(products.slice(0, 8));
        setShowLoadMore(products.length > 8);
    }, [products]);
    const handleLoadMore = () => {
        const currentCount = displayedProducts.length;
        const nextBatch = products.slice(currentCount, currentCount + 8);
        setDisplayedProducts([...displayedProducts, ...nextBatch]);
        setShowLoadMore(currentCount + 8 < products.length);
    };
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        // Implement sorting logic here
        const sortedProducts = [...products];
        switch (event.target.value) {
            case 'newest':
                // Keep original order
                break;
            case 'price-low':
                sortedProducts.sort((a, b) => {
                    const priceA = parseFloat(a.priceCurrent.replace(/[^\d]/g, ''));
                    const priceB = parseFloat(b.priceCurrent.replace(/[^\d]/g, ''));
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => {
                    const priceA = parseFloat(a.priceCurrent.replace(/[^\d]/g, ''));
                    const priceB = parseFloat(b.priceCurrent.replace(/[^\d]/g, ''));
                    return priceB - priceA;
                });
                break;
            case 'rating':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
        }
        setDisplayedProducts(sortedProducts.slice(0, displayedProducts.length));
    };
    const PriceDisplay = ({ original, current }) => (_jsxs(Box, { sx: { display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }, children: [original && (_jsxs(Typography, { component: "span", sx: { color: '#999', textDecoration: 'line-through', fontSize: 14 }, children: [original, "\u20AB"] })), _jsx(Typography, { component: "span", sx: { color: '#f58220', fontWeight: 700, fontSize: 16 }, children: current === 'Liên hệ' ? current : `${current}₫` })] }));
    const ProductCard = ({ product }) => (_jsxs(Box, { sx: {
            backgroundColor: '#fff',
            borderRadius: 0,
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
        }, children: [_jsx(Box, { sx: { position: 'relative', overflow: 'hidden' }, children: _jsx(Link, { to: `/products/${product.id}`, style: { display: 'block', textDecoration: 'none' }, children: _jsx(Box, { component: "img", src: product.image, alt: product.name, sx: {
                            width: '100%',
                            height: { xs: 150, md: 200 },
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            }
                        } }) }) }), _jsxs(Box, { sx: { p: 2 }, children: [_jsx(Typography, { component: "h4", sx: {
                            fontSize: 14,
                            fontWeight: 600,
                            mb: 1,
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.8em'
                        }, children: _jsx(Link, { to: `/products/${product.id}`, style: { color: 'inherit', textDecoration: 'none' }, children: product.name }) }), _jsx(PriceDisplay, { original: product.priceOriginal, current: product.priceCurrent }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(Typography, { sx: { fontSize: 12, color: '#ffb400', fontWeight: 700 }, children: "\u2605" }), _jsx(Typography, { sx: { fontSize: 12, color: '#666' }, children: product.rating }), _jsx(Typography, { sx: { fontSize: 12, color: '#999', mx: 0.5 }, children: "\u2022" }), _jsxs(Typography, { sx: { fontSize: 12, color: '#666' }, children: ["\u0110\u00E3 b\u00E1n: ", product.sold] })] })] })] }));
    return (_jsx(Layout, { children: _jsxs(Box, { className: "container", sx: { mt: 3 }, children: [_jsx(Box, { component: "img", src: bannerImage, alt: "Banner", sx: { width: '100%', borderRadius: 2, mb: { xs: 2, md: 3 } } }), _jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700, color: '#333', fontSize: { xs: '1.5rem', md: '2rem' } }, children: categoryName }), _jsx(FormControl, { size: "small", sx: { minWidth: 200 }, children: _jsxs(Select, { value: sortBy, onChange: handleSortChange, displayEmpty: true, sx: {
                                    '& .MuiSelect-select': {
                                        padding: '8px 32px 8px 12px',
                                        fontSize: '14px'
                                    }
                                }, children: [_jsx(MenuItem, { value: "newest", children: "M\u1EDBi nh\u1EA5t" }), _jsx(MenuItem, { value: "popularity", children: "Th\u1EE9 t\u1EF1 theo m\u1EE9c \u0111\u1ED9 ph\u1ED5 bi\u1EBFn" }), _jsx(MenuItem, { value: "rating", children: "Th\u1EE9 t\u1EF1 theo \u0111i\u1EC3m \u0111\u00E1nh gi\u00E1" }), _jsx(MenuItem, { value: "price-low", children: "Th\u1EE9 t\u1EF1 theo gi\u00E1: th\u1EA5p \u0111\u1EBFn cao" }), _jsx(MenuItem, { value: "price-high", children: "Th\u1EE9 t\u1EF1 theo gi\u00E1: cao xu\u1ED1ng th\u1EA5p" })] }) })] }), _jsx(Box, { sx: {
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(6, 1fr)'
                        },
                        gap: { xs: 2, md: 3 },
                        mb: 4,
                    }, children: displayedProducts.map((product) => (_jsx(ProductCard, { product: product }, product.id))) }), showLoadMore && (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', mb: 4 }, children: _jsx(Button, { variant: "outlined", onClick: handleLoadMore, sx: {
                            borderRadius: '999px',
                            px: 4,
                            py: 1.5,
                            fontSize: 16,
                            fontWeight: 600,
                            borderColor: '#f58220',
                            color: '#f58220',
                            '&:hover': {
                                backgroundColor: '#f58220',
                                color: '#fff',
                                borderColor: '#f58220',
                            },
                        }, children: "Xem th\u00EAm s\u1EA3n ph\u1EA9m" }) }))] }) }));
};
export default CategoryPage;
