import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import MobileBottomBar from '../../components/shared/MobileBottomBar';

const ReviewsPage: React.FC = () => {
    const posts = [
        {
            id: 1,
            title: 'Đánh giá chi tiết quạt cầm tay Lumias F3600',
            date: '30/06/2025',
            excerpt:
                'Quạt cầm tay giờ đã khác xưa rất nhiều. Với thiết kế và hoàn thiện tốt, dung lượng pin cao cho...',
            image:
                'https://lumias.vn/wp-content/uploads/2025/05/image-24-768x480.webp',
        },
        {
            id: 2,
            title: 'Review chi tiết quạt DC Lumias F08 Pro',
            date: '28/06/2025',
            excerpt:
                'Lumias F08 Pro hiện đang là mẫu quạt DC được quan tâm nhờ khả năng...',
            image:
                'https://lumias.vn/wp-content/uploads/2025/06/review-chi-tiet-quat-dc-lumias-f08-pro-1-768x478.jpg',
        },
        {
            id: 3,
            title: 'Mổ tung Lumias D3T Pro ra xem nội thất',
            date: '20/05/2025',
            excerpt:
                'Trải nghiệm với máy hút ẩm Lumias D3T Pro, thiết kế đẹp, hoàn thiện chỉn chu...',
            image:
                'https://lumias.vn/wp-content/uploads/2025/05/image-24-768x480.webp',
        },
        {
            id: 4,
            title: 'Trải nghiệm máy giặt mini Lumias WS030 Pro',
            date: '20/05/2025',
            excerpt:
                'Lumias WS030 Pro là chiếc máy giặt mini tự động hoàn toàn, nhỏ gọn...',
            image:
                'https://lumias.vn/wp-content/uploads/2025/05/image-24-768x480.webp',
        },
        {
            id: 5,
            title: 'Trải nghiệm Lumias WS040WH và WS050WH',
            date: '15/05/2025',
            excerpt:
                'Hai mẫu máy giặt mini bản nâng cấp với nhiều cải tiến thực tế...',
            image:
                'https://lumias.vn/wp-content/uploads/2025/05/image-24-768x480.webp',
        },
        {
            id: 6,
            title: 'Test máy lọc không khí Lumias Bulma Pro',
            date: '15/05/2025',
            excerpt:
                'Lumias Bulma Pro có thiết kế đẹp, dễ sử dụng và hiệu quả...',
            image:
                'https://lumias.vn/wp-content/uploads/2025/05/image-24-768x480.webp',
        },
    ];

    return (
        <>
            <Header />
            <Box sx={{ paddingTop: { xs: '100px', md: '120px' }, paddingBottom: { xs: '100px', md: '120px' } }}>
                <Box className="container">
                    {/* Title */}
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: { xs: 1.5, md: 2 } }}>
                        Danh mục Reviews HugoX
                    </Typography>

                    {/* Intro box */}
                    <Box
                        sx={{
                            backgroundColor: '#fff7ed',
                            border: '1px solid #fde6d2',
                            color: '#7a4b2a',
                            borderRadius: '8px',
                            padding: { xs: 2, md: 2.5 },
                            mb: { xs: 2, md: 3 },
                            lineHeight: 1.7,
                            fontSize: '14px',
                        }}
                    >
                        Tổng hợp các bài viết review HugoX, chia sẻ các thông tin sản phẩm mới, chương trình khuyến mãi HugoX hấp dẫn, và những thông tin đồng hành cùng các fan yêu thích thương hiệu đến từ Hàn Quốc.
                        <br />
                        Ngoài ra Blog HugoX Việt Nam cũng tổng hợp một số công thức nấu ăn với các sản phẩm HugoX, chia sẻ những món ăn đời thường dễ làm tại nhà.
                    </Box>

                    {/* Grid list */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
                            gap: { xs: 2, md: 2.5 },
                            mb: { xs: 2.5, md: 3 },
                        }}
                    >
                        {posts.map((p, idx) => (
                            <Box
                                key={idx}
                                component={Link}
                                to={`/reviews/${p.id}`}
                                sx={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                                    transition: 'transform .2s ease',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' },
                                }}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <Box component="img" src={p.image} alt={p.title} sx={{ width: '100%', height: { xs: 180, md: 200 }, objectFit: 'cover' }} />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            left: 10,
                                            backgroundColor: '#ff8a00',
                                            color: '#fff',
                                            fontSize: '10px',
                                            fontWeight: 800,
                                            padding: '4px 8px',
                                            borderRadius: '999px',
                                            letterSpacing: .5,
                                        }}
                                    >
                                        REVIEWS
                                    </Box>
                                </Box>
                                <Box sx={{ padding: 2 }}>
                                    <Typography component="h3" sx={{ fontSize: '16px', fontWeight: 700, mb: 1, lineHeight: 1.35 }}>
                                        {p.title}
                                    </Typography>
                                    <Typography sx={{ color: '#666', fontSize: '13px', mb: 2, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.excerpt}</Typography>
                                    <Typography sx={{ color: '#999', fontSize: '12px' }}>{p.date}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* Load more */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" sx={{ backgroundColor: '#1f2937', '&:hover': { backgroundColor: '#111827' }, borderRadius: '999px', px: 3 }}>
                            Tải thêm
                        </Button>
                    </Box>
                </Box>
            </Box>
            <MobileBottomBar />
            <Footer />
        </>
    );
};

export default ReviewsPage;
