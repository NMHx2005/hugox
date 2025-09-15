import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Pagination, TextField, InputAdornment, Card, CardMedia, CardContent, Rating } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Layout from '../../components/shared/Layout';
import { search_products, Product } from '../../api/client/products';

// Simple ProductCard component
interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Card
            component={Link}
            to={`/products/${product.slug || product._id}`}
            sx={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                textDecoration: 'none',
                color: 'inherit',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
                },
            }}
        >
            <CardMedia
                component="img"
                image={product.images?.[0] || '/placeholder.jpg'}
                alt={product.name}
                sx={{
                    height: 200,
                    objectFit: 'contain',
                    padding: 2,
                    backgroundColor: '#fafafa'
                }}
            />
            <CardContent sx={{ padding: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#333',
                        marginBottom: 1,
                        lineHeight: 1.4,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '48px'
                    }}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}
                >
                    {product.category?.name}
                </Typography>

                <Typography
                    sx={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#f58220',
                        marginBottom: 1
                    }}
                >
                    {product.price?.toLocaleString('vi-VN')}đ
                </Typography>

                {product.rating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Rating
                            value={product.rating}
                            readOnly
                            size="small"
                            sx={{ '& .MuiRating-iconFilled': { color: '#ffc107' } }}
                        />
                        <Typography sx={{ fontSize: '12px', color: '#666' }}>
                            ({product.reviewsCount || 0})
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentQuery, setCurrentQuery] = useState(query);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        pages: 0
    });

    const currentPage = parseInt(searchParams.get('page') || '1');

    const searchProducts = async (searchQuery: string, page: number = 1) => {
        if (!searchQuery.trim()) {
            setProducts([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await search_products(searchQuery, {
                page,
                limit: 12,
                sort: '-createdAt'
            });

            setProducts(response.data?.products || []);
            setPagination(response.data?.pagination || {
                page: 1,
                limit: 12,
                total: 0,
                pages: 0
            });
        } catch (err) {
            console.error('Search error:', err);
            setError('Không thể tìm kiếm sản phẩm. Vui lòng thử lại.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            setCurrentQuery(query);
            searchProducts(query, currentPage);
        }
    }, [query, currentPage]);

    const handleSearch = (newQuery: string) => {
        if (newQuery.trim()) {
            setSearchParams({ q: newQuery, page: '1' });
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setSearchParams({
            q: query,
            page: page.toString()
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch(currentQuery);
        }
    };

    return (
        <Layout>
            <Box sx={{ minHeight: '60vh', py: 4 }}>
                <Box className="container" sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 3 } }}>
                    {/* Search Header */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
                            Tìm kiếm sản phẩm
                        </Typography>

                        {/* Search Input */}
                        <TextField
                            fullWidth
                            placeholder="Nhập tên sản phẩm cần tìm..."
                            value={currentQuery}
                            onChange={(e) => setCurrentQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#666' }} />
                                    </InputAdornment>
                                ),
                                sx: { fontSize: '16px' }
                            }}
                            sx={{
                                maxWidth: 600,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#f8f9fa'
                                }
                            }}
                        />
                    </Box>

                    {/* Search Results Header */}
                    {query && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                                Kết quả tìm kiếm cho: "{query}"
                            </Typography>
                            {!loading && (
                                <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                                    Tìm thấy {pagination.total} sản phẩm
                                </Typography>
                            )}
                        </Box>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {/* Error State */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    {/* No Query */}
                    {!query && !loading && (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
                                Nhập từ khóa để tìm kiếm sản phẩm
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#999' }}>
                                Ví dụ: "máy lạnh", "tủ lạnh", "máy giặt"...
                            </Typography>
                        </Box>
                    )}

                    {/* No Results */}
                    {!loading && query && products.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
                                Không tìm thấy sản phẩm nào
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#999', mb: 3 }}>
                                Thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả
                            </Typography>
                        </Box>
                    )}

                    {/* Products Grid */}
                    {!loading && products.length > 0 && (
                        <>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(2, 1fr)',
                                    sm: 'repeat(3, 1fr)',
                                    md: 'repeat(4, 1fr)'
                                },
                                gap: 3
                            }}>
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </Box>

                            {/* Pagination */}
                            {pagination.pages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                                    <Pagination
                                        count={pagination.pages}
                                        page={pagination.page}
                                        onChange={handlePageChange}
                                        color="primary"
                                        size="large"
                                        showFirstButton
                                        showLastButton
                                    />
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </Layout>
    );
};

export default SearchPage;
