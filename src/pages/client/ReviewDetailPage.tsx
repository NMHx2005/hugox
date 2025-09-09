import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Chip,
    Breadcrumbs,
    Link as MuiLink,
    Card,
    CardContent,
    Rating,
    TextField,
    InputAdornment,
    Avatar
} from '@mui/material';
import {
    Star as StarIcon,
    Search as SearchIcon,
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';

const ReviewDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for review details
    const reviewData = {
        productName: 'Thùng rác dung tích 20L Lumias LTC-20L',
        totalReviews: 15,
        averageRating: 4.9,
        ratingDistribution: [
            { stars: 5, percentage: 93, count: 14 },
            { stars: 4, percentage: 6, count: 1 },
            { stars: 3, percentage: 0, count: 0 },
            { stars: 2, percentage: 0, count: 0 },
            { stars: 1, percentage: 0, count: 0 }
        ],
        customerImages: [
            'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg',
            'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg',
            'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg',
            'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg',
            'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg',
            'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg'
        ],
        reviews: [
            {
                id: 1,
                user: 'Giang',
                verified: true,
                rating: 5,
                comment: 'thiết kế chắc chắn, có vị trí cố định túi rác, rất ưng ý',
                images: [
                    'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg',
                    'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg'
                ],
                likes: 0,
                dislikes: 0
            },
            {
                id: 2,
                user: 'trang',
                verified: true,
                rating: 5,
                comment: 'thiết kế đẹp, nắp thùng rác mở êm, tự động mở ra khi đạp chân',
                images: [
                    'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg',
                    'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg',
                    'https://lumias.vn/wp-content/uploads/2025/03/thung-rac-dung-tich-20l-lumias-ltc-20l-405x405.jpg'
                ],
                likes: 0,
                dislikes: 0
            },
            {
                id: 3,
                user: 'thanhhang016',
                verified: true,
                rating: 5,
                comment: 'Sản phẩm chất lượng tốt, đóng gói cẩn thận. Rất hài lòng với việc mua sắm.',
                images: [],
                likes: 0,
                dislikes: 0
            }
        ]
    };

    const relatedProducts = [
        {
            id: 1,
            name: 'Máy cắt lông quần áo có màn hình hiển thị Lumias LFS-168...',
            image: 'https://lumias.vn/wp-content/uploads/2025/03/may-cat-long-quan-ao-lumias-lsf-168-405x405.jpg',
            priceOriginal: '790.000',
            priceCurrent: '490.000',
            rating: 5.0,
            sold: 987
        },
        {
            id: 2,
            name: 'Máy cắt lông quần áo Lumias LFS-168',
            image: 'https://lumias.vn/wp-content/uploads/2025/03/may-cat-long-quan-ao-lumias-lsf-168-405x405.jpg',
            priceCurrent: '390.000',
            rating: 4.9,
            sold: 1854
        },
        {
            id: 3,
            name: 'Hộp đựng xà phòng rửa tay 350ml Lumias LSD-350S',
            image: 'https://lumias.vn/wp-content/uploads/2025/03/may-cat-long-quan-ao-lumias-lsf-168-405x405.jpg',
            priceOriginal: '1.290.000',
            priceCurrent: '990.000',
            rating: 4.9,
            sold: 312
        },
        {
            id: 4,
            name: 'Hộp đựng xà phòng rửa tay 300ml Lumias LSD-300G',
            image: 'https://lumias.vn/wp-content/uploads/2025/03/may-cat-long-quan-ao-lumias-lsf-168-405x405.jpg',
            priceOriginal: '990.000',
            priceCurrent: '690.000',
            rating: 4.8,
            sold: 320
        },
        {
            id: 5,
            name: 'Hộp đựng xà phòng rửa tay 280ml LUMIAS LSD-280S',
            image: 'https://lumias.vn/wp-content/uploads/2025/03/may-cat-long-quan-ao-lumias-lsf-168-405x405.jpg',
            priceOriginal: '1.190.000',
            priceCurrent: '890.000',
            rating: 4.8,
            sold: 283
        }
    ];

    return (
        <Layout>
            <Box className="container" sx={{ mt: 3 }}>
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ mb: 3 }}>
                    <MuiLink component={Link} to="/" color="inherit">
                        Trang chủ
                    </MuiLink>
                    <MuiLink component={Link} to="/reviews" color="inherit">
                        Reviews
                    </MuiLink>
                    <Typography color="text.primary">{reviewData.productName}</Typography>
                </Breadcrumbs>

                {/* Review Summary Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
                        {reviewData.totalReviews} đánh giá cho {reviewData.productName}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ fontWeight: 700, color: '#f58220' }}>
                                {reviewData.averageRating}
                            </Typography>
                            <Rating value={reviewData.averageRating} readOnly size="large" />
                            <Typography sx={{ color: '#666', mt: 1 }}>
                                {reviewData.totalReviews} đánh giá
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            {reviewData.ratingDistribution.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                    <Typography sx={{ minWidth: 20, fontSize: 14 }}>
                                        {item.stars} sao
                                    </Typography>
                                    <Box sx={{
                                        flex: 1,
                                        height: 8,
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: 4,
                                        overflow: 'hidden'
                                    }}>
                                        <Box sx={{
                                            width: `${item.percentage}%`,
                                            height: '100%',
                                            backgroundColor: '#f58220',
                                            transition: 'width 0.3s ease'
                                        }} />
                                    </Box>
                                    <Typography sx={{ minWidth: 30, fontSize: 14, color: '#666' }}>
                                        {item.percentage}%
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: '#f58220',
                                '&:hover': { backgroundColor: '#e6731a' },
                                px: 3,
                                py: 1.5
                            }}
                        >
                            Thêm đánh giá
                        </Button>
                    </Box>
                </Box>

                {/* Customer Images Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                        Hình ảnh khách hàng
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        overflowX: 'auto',
                        pb: 1
                    }}>
                        {reviewData.customerImages.map((image, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={image}
                                alt={`Customer image ${index + 1}`}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        transition: 'transform 0.2s ease'
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Search Reviews */}
                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Tìm kiếm đánh giá của khách hàng"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#666' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                            }
                        }}
                    />
                </Box>

                {/* Reviews List */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            1-{Math.min(5, reviewData.reviews.length)} của {reviewData.totalReviews} đánh giá
                        </Typography>
                        <Button variant="outlined" sx={{ borderRadius: 2 }}>
                            Mới nhất
                        </Button>
                    </Box>

                    {reviewData.reviews.map((review) => (
                        <Card key={review.id} sx={{ mb: 3, boxShadow: 1 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Avatar sx={{ bgcolor: '#f58220' }}>
                                        {review.user.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                {review.user}
                                            </Typography>
                                            {review.verified && (
                                                <Chip
                                                    label="Đã mua tại Lumias"
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: '#e8f5e8',
                                                        color: '#2e7d32',
                                                        fontSize: 12
                                                    }}
                                                />
                                            )}
                                        </Box>
                                        <Rating value={review.rating} readOnly size="small" />
                                    </Box>
                                </Box>

                                <Typography sx={{ mb: 2, lineHeight: 1.6 }}>
                                    {review.comment}
                                </Typography>

                                {review.images.length > 0 && (
                                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                        {review.images.map((image, index) => (
                                            <Box
                                                key={index}
                                                component="img"
                                                src={image}
                                                alt={`Review image ${index + 1}`}
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    objectFit: 'cover',
                                                    borderRadius: 1,
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Button
                                        startIcon={<ThumbUpIcon />}
                                        size="small"
                                        sx={{ color: '#666' }}
                                    >
                                        ({review.likes})
                                    </Button>
                                    <Button
                                        startIcon={<ThumbDownIcon />}
                                        size="small"
                                        sx={{ color: '#666' }}
                                    >
                                        ({review.dislikes})
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Button variant="outlined" sx={{ borderRadius: 2, px: 4 }}>
                            Xem thêm đánh giá (10)
                        </Button>
                    </Box>
                </Box>

                {/* Q&A Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                        Hỏi - Đáp sản phẩm
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <TextField
                            fullWidth
                            placeholder="Tìm kiếm câu trả lời"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#666' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#f58220',
                                '&:hover': { backgroundColor: '#e6731a' },
                                px: 3
                            }}
                        >
                            Đặt một câu hỏi
                        </Button>
                    </Box>

                    <Box sx={{
                        textAlign: 'center',
                        py: 4,
                        backgroundColor: '#f9f9f9',
                        borderRadius: 2
                    }}>
                        <Typography sx={{ color: '#666' }}>
                            Chưa có câu hỏi nào!
                        </Typography>
                    </Box>
                </Box>

                {/* Related Products */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                        Sản phẩm liên quan
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(5, 1fr)'
                        },
                        gap: 2
                    }}>
                        {relatedProducts.map((product) => (
                            <Card
                                key={product.id}
                                sx={{
                                    height: '100%',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 3
                                    },
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => window.location.href = `/products/${product.id}`}
                            >
                                <Box
                                    component="img"
                                    src={product.image}
                                    alt={product.name}
                                    sx={{
                                        width: '100%',
                                        height: 150,
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        }
                                    }}
                                />
                                <CardContent sx={{ p: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            minHeight: '2.8em'
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <StarIcon sx={{ color: '#ffb400', fontSize: 16 }} />
                                        <Typography variant="body2">{product.rating}</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Đã bán: {product.sold}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {product.priceOriginal && (
                                            <Typography sx={{
                                                color: '#999',
                                                textDecoration: 'line-through',
                                                fontSize: 14
                                            }}>
                                                {product.priceOriginal}₫
                                            </Typography>
                                        )}
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: '#f58220',
                                                fontWeight: 700,
                                                fontSize: 16
                                            }}
                                        >
                                            {product.priceCurrent === 'Liên hệ'
                                                ? product.priceCurrent
                                                : `${product.priceCurrent}₫`
                                            }
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default ReviewDetailPage;
