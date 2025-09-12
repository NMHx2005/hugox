import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import CategoryPage from './CategoryPage';
import { get_products_by_category } from '../../api/client/products';
import { useAppContext } from '../../hooks/useAppContext';
const DynamicCategoryPage = () => {
    const { categorySlug } = useParams();
    const { categories } = useAppContext();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadCategoryData = async () => {
            if (!categorySlug)
                return;
            try {
                setLoading(true);
                setError(null);
                // Find category by slug
                const category = categories.find(cat => cat.slug === categorySlug);
                if (!category) {
                    setError('Danh mục không tồn tại');
                    return;
                }
                // Load products for this category
                const response = await get_products_by_category(categorySlug, {
                    limit: 100, // Load more products initially
                    sort: 'newest'
                });
                setProducts(response.data.products);
            }
            catch (err) {
                console.error('Error loading category data:', err);
                setError('Không thể tải dữ liệu danh mục');
            }
            finally {
                setLoading(false);
            }
        };
        loadCategoryData();
    }, [categorySlug, categories]);
    if (loading) {
        return (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }, children: _jsx(CircularProgress, {}) }));
    }
    if (error) {
        return (_jsx(Box, { sx: { p: 3 }, children: _jsx(Alert, { severity: "error", children: error }) }));
    }
    if (!categorySlug) {
        return (_jsxs(Box, { sx: { p: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Danh m\u1EE5c kh\u00F4ng t\u1ED3n t\u1EA1i" }), _jsx(Typography, { children: "Vui l\u00F2ng ki\u1EC3m tra l\u1EA1i \u0111\u01B0\u1EDDng d\u1EABn." })] }));
    }
    const category = categories.find(cat => cat.slug === categorySlug);
    if (!category) {
        return (_jsxs(Box, { sx: { p: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Danh m\u1EE5c kh\u00F4ng t\u1ED3n t\u1EA1i" }), _jsx(Typography, { children: "Vui l\u00F2ng ki\u1EC3m tra l\u1EA1i \u0111\u01B0\u1EDDng d\u1EABn." })] }));
    }
    // Convert API products to CategoryPage format
    const convertedProducts = products.map(product => ({
        id: product._id,
        name: product.name,
        image: product.images[0] || '/placeholder.jpg',
        priceOriginal: product.originalPrice ? product.originalPrice.toLocaleString('vi-VN') : undefined,
        priceCurrent: product.price.toLocaleString('vi-VN'),
        rating: product.ratingAvg || 0,
        sold: product.sold || 0,
        href: `/products/${product.slug}`,
        category: product.category.slug
    }));
    return (_jsx(CategoryPage, { categoryName: category.name, bannerImage: category.image || '/placeholder-banner.jpg', products: convertedProducts }));
};
export default DynamicCategoryPage;
