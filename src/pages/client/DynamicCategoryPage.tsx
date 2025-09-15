import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import CategoryPage from './CategoryPage';
import { get_products_by_category } from '../../api/client/products';
import { get_categories } from '../../api/client/categories';
import { useAppContext } from '../../hooks/useAppContext';
import { Product } from '../../api/client/products';

const DynamicCategoryPage: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const { categories } = useAppContext();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategoryData = async () => {
            if (!categorySlug) return;

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
            } catch (err) {
                console.error('Error loading category data:', err);
                setError('Không thể tải dữ liệu danh mục');
            } finally {
                setLoading(false);
            }
        };

        loadCategoryData();
    }, [categorySlug, categories]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!categorySlug) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4">Danh mục không tồn tại</Typography>
                <Typography>Vui lòng kiểm tra lại đường dẫn.</Typography>
            </Box>
        );
    }

    const category = categories.find(cat => cat.slug === categorySlug);
    if (!category) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4">Danh mục không tồn tại</Typography>
                <Typography>Vui lòng kiểm tra lại đường dẫn.</Typography>
            </Box>
        );
    }

    // Convert API products to CategoryPage format
    const convertedProducts = products.map(product => ({
        id: product._id,
        name: product.name,
        image: product.images[0] || '/placeholder.jpg',
        priceOriginal: product.originalPrice ? product.originalPrice.toLocaleString('vi-VN') : undefined,
        priceCurrent: product.price.toLocaleString('vi-VN'),
        rating: product.rating || 0,
        sold: product.sold || 0,
        href: `/products/${product.slug}`,
        category: product.category.slug
    }));

    return (
        <CategoryPage
            categoryName={category.name}
            bannerImage={category.image || '/placeholder-banner.jpg'}
            products={convertedProducts}
        />
    );
};

export default DynamicCategoryPage;
