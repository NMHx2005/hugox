import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_featured_products, Product } from '../../api/client/products';

const FeaturedPage: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadFeaturedProducts();
    }, []);

    const loadFeaturedProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await get_featured_products();
            setFeaturedProducts(response.data.products);
        } catch (err) {
            console.error('Error loading featured products:', err);
            setError('Không thể tải danh sách sản phẩm nổi bật');
        } finally {
            setLoading(false);
        }
    };

    const PriceRow: React.FC<{ original?: string; current: string }> = ({ original, current }) => (
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            {original && (
                <Typography component="span" sx={{ color: '#999', textDecoration: 'line-through', fontSize: 13 }}>
                    {original}
                    <Typography component="span" sx={{ ml: .25 }}>₫</Typography>
                </Typography>
            )}
            <Typography component="span" sx={{ color: '#f58220', fontWeight: 700, fontSize: 14 }}>
                {current}
                {current !== 'Liên hệ' && <Typography component="span" sx={{ ml: .25 }}>₫</Typography>}
            </Typography>
        </Box>
    );

    const StatsRow: React.FC<{ rating: number; sold: number }> = ({ rating, sold }) => (
        <Typography sx={{ fontSize: 12, color: '#666' }}>
            <Typography component="span" sx={{ color: '#ffb400', fontWeight: 700 }}>★</Typography> {rating}
            <Typography component="span" sx={{ mx: 1, color: '#bbb' }}>•</Typography>
            Đã bán: {sold}
        </Typography>
    );

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const Section: React.FC<{ title: string; products: Product[] }> = ({ title, products }) => (
        <>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>{title}</Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(5, 1fr)' },
                gap: { xs: 1.5, md: 2 }
            }}>
                {products.map((p) => (
                    <Box
                        key={p._id}
                        sx={{
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
                        }}
                    >
                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                            <Link to={`/products/${p.slug || p._id}`} className="alignnone img-wrap img-css-resize-wrapper" style={{ display: 'block', textDecoration: 'none' }}>
                                <Box
                                    component="img"
                                    className="card-img"
                                    src={p.images?.[0] || '/placeholder-product.jpg'}
                                    alt={p.name}
                                    sx={{ width: '100%', height: 200, objectFit: 'cover', transition: 'transform .25s ease' }}
                                />
                            </Link>
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                            <Typography component="h3" sx={{ fontSize: 14, fontWeight: 700, mb: .5, lineHeight: 1.35 }}>
                                <Link to={`/products/${p.slug || p._id}`} title={p.name} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {p.name}
                                </Link>
                            </Typography>
                            <Box sx={{ mb: .75 }}>
                                <PriceRow
                                    original={p.originalPrice ? formatPrice(p.originalPrice) : undefined}
                                    current={p.price ? formatPrice(p.price) : 'Liên hệ'}
                                />
                            </Box>
                            <StatsRow rating={p.rating || 0} sold={p.sold || 0} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );

    if (loading) {
        return (
            <Layout>
                <Box sx={{ pt: { xs: 2, md: 3 }, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }} className="container">
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Box sx={{ pt: { xs: 2, md: 3 } }} className="container">
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box sx={{ pt: { xs: 2, md: 3 } }} className="container">
                <Box component="img" src="https://lumias.vn/wp-content/uploads/2025/05/Banner-Thiet-bi-khac.jpg" alt="Banner" sx={{ width: '100%', borderRadius: 2, mb: { xs: 2, md: 3 } }} />
                <Section title="Sản phẩm nổi bật" products={featuredProducts} />
                <Box sx={{ height: 16 }} />
                <Section title="Sản phẩm hot tháng 6" products={featuredProducts.slice(0, 5)} />
                <Box sx={{ height: 16 }} />
                <Section title="Sản phẩm xu hướng tháng 7" products={featuredProducts.slice(5, 10)} />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }}>
                    <Button variant="outlined" sx={{ borderRadius: '999px', px: 3 }} component={Link} to="/featured">
                        Xem thêm sản phẩm
                    </Button>
                </Box>
            </Box>
        </Layout>
    );
};

export default FeaturedPage;


