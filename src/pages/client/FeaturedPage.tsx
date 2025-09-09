import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';

const FeaturedPage: React.FC = () => {
    const featured = new Array(10).fill(0).map((_, i) => ({
        id: i + 1,
        name: i % 2 === 0 ? 'Điều hòa di động PAC-26' : `Sản phẩm nổi bật #${i + 1}`,
        href: 'https://lumias.vn/dieu-hoa-di-dong-pac-26/',
        image: 'https://lumias.vn/wp-content/uploads/2025/04/quat-dieu-hoa-lumias-pac-26-405x405.jpg',
        priceOriginal: i % 2 === 0 ? '6.990.000' : undefined,
        priceCurrent: i % 2 === 0 ? '5.290.000' : 'Liên hệ',
        rating: 4.9,
        sold: 273,
    }));

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

    const Section: React.FC<{ title: string }> = ({ title }) => (
        <>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>{title}</Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(5, 1fr)' },
                gap: { xs: 1.5, md: 2 }
            }}>
                {featured.map((p) => (
                    <Box
                        key={p.id}
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
                            <Link to={`/products/${p.id}`} className="alignnone img-wrap img-css-resize-wrapper" style={{ display: 'block', textDecoration: 'none' }}>
                                <Box
                                    component="img"
                                    className="card-img"
                                    src={p.image}
                                    alt={p.name}
                                    sx={{ width: '100%', objectFit: 'cover', transition: 'transform .25s ease' }}
                                />
                            </Link>
                            {/* image zoom on card hover */}
                            <Box sx={{
                                position: 'absolute',
                                inset: 0,
                                pointerEvents: 'none',
                                '&': {
                                    // anchor for sibling selector
                                }
                            }} />
                        </Box>
                        <Box sx={{ p: 1.5, '&:hover ~ .card-img': { transform: 'scale(1.04)' } }}>
                            <Typography component="h3" sx={{ fontSize: 14, fontWeight: 700, mb: .5, lineHeight: 1.35 }}>
                                <Link to={`/products/${p.id}`} title={p.name} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {p.name}
                                </Link>
                            </Typography>
                            <Box sx={{ mb: .75 }}>
                                <PriceRow original={p.priceOriginal} current={p.priceCurrent} />
                            </Box>
                            <StatsRow rating={p.rating} sold={p.sold} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );

    return (
        <Layout>
            <Box sx={{ pt: { xs: 2, md: 3 } }} className="container">
                <Box component="img" src="https://lumias.vn/wp-content/uploads/2025/05/Banner-Thiet-bi-khac.jpg" alt="Banner" sx={{ width: '100%', borderRadius: 2, mb: { xs: 2, md: 3 } }} />
                <Section title="Sản phẩm nổi bật" />
                <Box sx={{ height: 16 }} />
                <Section title="Sản phẩm hot tháng 6" />
                <Box sx={{ height: 16 }} />
                <Section title="Sản phẩm xu hướng tháng 7" />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }}>
                    <Button variant="outlined" sx={{ borderRadius: '999px', px: 3 }}>Xem thêm sản phẩm</Button>
                </Box>
            </Box>
        </Layout>
    );
};

export default FeaturedPage;


