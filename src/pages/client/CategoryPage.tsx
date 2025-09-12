import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, FormControl, type SelectChangeEvent } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';

interface Product {
    id: string;
    name: string;
    image: string;
    priceOriginal?: string;
    priceCurrent: string;
    rating: number;
    sold: number;
    href: string;
}

interface CategoryPageProps {
    categoryName: string;
    bannerImage: string;
    products: Product[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({
    categoryName,
    bannerImage,
    products
}) => {
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

    const handleSortChange = (event: SelectChangeEvent<string>) => {
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

    const PriceDisplay: React.FC<{ original?: string; current: string }> = ({ original, current }) => (
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
            {original && (
                <Typography component="span" sx={{ color: '#999', textDecoration: 'line-through', fontSize: 14 }}>
                    {original}₫
                </Typography>
            )}
            <Typography component="span" sx={{ color: '#f58220', fontWeight: 700, fontSize: 16 }}>
                {current === 'Liên hệ' ? current : `${current}₫`}
            </Typography>
        </Box>
    );

    const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: 0,
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
            }}
        >
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <Link
                    to={`/products/${product.id}`}
                    style={{ display: 'block', textDecoration: 'none' }}
                >
                    <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{
                            width: '100%',
                            height: { xs: 150, md: 200 },
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            }
                        }}
                    />
                </Link>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography
                    component="h4"
                    sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        mb: 1,
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '2.8em'
                    }}
                >
                    <Link
                        to={`/products/${product.id}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        {product.name}
                    </Link>
                </Typography>
                <PriceDisplay original={product.priceOriginal} current={product.priceCurrent} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography sx={{ fontSize: 12, color: '#ffb400', fontWeight: 700 }}>★</Typography>
                    <Typography sx={{ fontSize: 12, color: '#666' }}>{product.rating}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#999', mx: 0.5 }}>•</Typography>
                    <Typography sx={{ fontSize: 12, color: '#666' }}>Đã bán: {product.sold}</Typography>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Layout>
            {/* Full-width Banner Image */}
            {/* <Box sx={{ width: '100%', mb: 0 }}>
                <Box
                    component="img"
                    src={bannerImage}
                    alt="Banner"
                    sx={{
                        width: '100%',
                        height: { xs: 200, md: 300 },
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            </Box> */}

            {/* Category Header */}
            <Box className="container" sx={{ mt: 3 }}>
                {/* Full-width Banner Image */}
                <Box component="img" src={bannerImage} alt="Banner" sx={{ width: '100%', borderRadius: 2, mb: { xs: 2, md: 3 } }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                        {categoryName}
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <Select
                            value={sortBy}
                            onChange={handleSortChange}
                            displayEmpty
                            sx={{
                                '& .MuiSelect-select': {
                                    padding: '8px 32px 8px 12px',
                                    fontSize: '14px'
                                }
                            }}
                        >
                            <MenuItem value="newest">Mới nhất</MenuItem>
                            <MenuItem value="popularity">Thứ tự theo mức độ phổ biến</MenuItem>
                            <MenuItem value="rating">Thứ tự theo điểm đánh giá</MenuItem>
                            <MenuItem value="price-low">Thứ tự theo giá: thấp đến cao</MenuItem>
                            <MenuItem value="price-high">Thứ tự theo giá: cao xuống thấp</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Product Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(6, 1fr)'
                        },
                        gap: { xs: 2, md: 3 },
                        mb: 4,
                    }}
                >
                    {displayedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Box>

                {/* Load More Button */}
                {showLoadMore && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={handleLoadMore}
                            sx={{
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
                            }}
                        >
                            Xem thêm sản phẩm
                        </Button>
                    </Box>
                )}
            </Box>
        </Layout>
    );
};

export default CategoryPage;
