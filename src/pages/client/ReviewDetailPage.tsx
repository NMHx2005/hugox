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
            <Box className="container" sx={{
                mt: { xs: 2, md: 3 },
                px: { xs: 2, sm: 3, md: 0 }
            }}>
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{
                    mb: { xs: 2, md: 3 },
                    '& .MuiBreadcrumbs-separator': {
                        fontSize: { xs: '0.875rem', md: '1rem' }
                    }
                }}>
                    <MuiLink
                        component={Link}
                        to="/"
                        color="inherit"
                        sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                    >
                        Trang chủ
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        to="/reviews"
                        color="inherit"
                        sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                    >
                        Reviews
                    </MuiLink>
                    <Typography
                        color="text.primary"
                        sx={{
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        {reviewData.productName}
                    </Typography>
                    <Typography
                        color="text.primary"
                        sx={{
                            fontSize: '0.875rem',
                            display: { xs: 'block', sm: 'none' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '200px'
                        }}
                    >
                        {reviewData.productName}
                    </Typography>
                </Breadcrumbs>

                {/* Review Summary Section */}
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            mb: { xs: 2, md: 3 },
                            fontWeight: 700,
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                            lineHeight: 1.2
                        }}
                    >
                        {reviewData.totalReviews} đánh giá cho {reviewData.productName}
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'stretch', md: 'center' },
                        gap: { xs: 3, md: 3 },
                        mb: 3
                    }}>
                        <Box sx={{
                            textAlign: 'center',
                            order: { xs: 1, md: 1 }
                        }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 700,
                                    color: '#f58220',
                                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' }
                                }}
                            >
                                {reviewData.averageRating}
                            </Typography>
                            <Rating
                                value={reviewData.averageRating}
                                readOnly
                                size="large"
                                sx={{
                                    '& .MuiRating-icon': {
                                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                                    }
                                }}
                            />
                            <Typography sx={{ color: '#666', mt: 1, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                {reviewData.totalReviews} đánh giá
                            </Typography>
                        </Box>

                        <Box sx={{
                            flex: 1,
                            order: { xs: 2, md: 2 }
                        }}>
                            {reviewData.ratingDistribution.map((item, index) => (
                                <Box key={index} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: { xs: 1, sm: 2 },
                                    mb: 1
                                }}>
                                    <Typography sx={{
                                        minWidth: { xs: 16, sm: 20 },
                                        fontSize: { xs: 12, sm: 14 }
                                    }}>
                                        {item.stars} sao
                                    </Typography>
                                    <Box sx={{
                                        flex: 1,
                                        height: { xs: 6, sm: 8 },
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
                                    <Typography sx={{
                                        minWidth: { xs: 25, sm: 30 },
                                        fontSize: { xs: 12, sm: 14 },
                                        color: '#666'
                                    }}>
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
                                px: { xs: 2, md: 3 },
                                py: { xs: 1, md: 1.5 },
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                order: { xs: 3, md: 3 },
                                alignSelf: { xs: 'stretch', md: 'flex-start' }
                            }}
                        >
                            Thêm đánh giá
                        </Button>
                    </Box>
                </Box>

                {/* Customer Images Section */}
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            fontWeight: 700,
                            fontSize: { xs: '1.125rem', md: '1.25rem' }
                        }}
                    >
                        Hình ảnh khách hàng
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: { xs: 1, sm: 2 },
                        overflowX: 'auto',
                        pb: 1,
                        '&::-webkit-scrollbar': {
                            height: 4,
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#f1f1f1',
                            borderRadius: 2,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#c1c1c1',
                            borderRadius: 2,
                        },
                    }}>
                        {reviewData.customerImages.map((image, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={image}
                                alt={`Customer image ${index + 1}`}
                                sx={{
                                    width: { xs: 80, sm: 100, md: 120 },
                                    height: { xs: 80, sm: 100, md: 120 },
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
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'stretch', sm: 'center' },
                        gap: { xs: 2, sm: 0 },
                        mb: 3
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '1rem', md: '1.25rem' },
                                textAlign: { xs: 'center', sm: 'left' }
                            }}
                        >
                            1-{Math.min(5, reviewData.reviews.length)} của {reviewData.totalReviews} đánh giá
                        </Typography>
                        <Button
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                alignSelf: { xs: 'center', sm: 'flex-end' },
                                minWidth: { xs: 'auto', sm: '120px' }
                            }}
                        >
                            Mới nhất
                        </Button>
                    </Box>

                    {reviewData.reviews.map((review) => (
                        <Card key={review.id} sx={{ mb: 3, boxShadow: 1 }}>
                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: { xs: 1.5, md: 2 },
                                    mb: 2
                                }}>
                                    <Avatar sx={{
                                        bgcolor: '#f58220',
                                        width: { xs: 32, md: 40 },
                                        height: { xs: 32, md: 40 },
                                        fontSize: { xs: '0.875rem', md: '1rem' }
                                    }}>
                                        {review.user.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column', sm: 'row' },
                                            alignItems: { xs: 'flex-start', sm: 'center' },
                                            gap: { xs: 0.5, sm: 1 }
                                        }}>
                                            <Typography sx={{
                                                fontWeight: 600,
                                                fontSize: { xs: '0.875rem', md: '1rem' }
                                            }}>
                                                {review.user}
                                            </Typography>
                                            {review.verified && (
                                                <Chip
                                                    label="Đã mua tại Lumias"
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: '#e8f5e8',
                                                        color: '#2e7d32',
                                                        fontSize: { xs: 10, md: 12 },
                                                        height: { xs: 20, md: 24 }
                                                    }}
                                                />
                                            )}
                                        </Box>
                                        <Rating
                                            value={review.rating}
                                            readOnly
                                            size="small"
                                            sx={{
                                                '& .MuiRating-icon': {
                                                    fontSize: { xs: '1rem', md: '1.25rem' }
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Typography sx={{
                                    mb: 2,
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.875rem', md: '1rem' }
                                }}>
                                    {review.comment}
                                </Typography>

                                {review.images.length > 0 && (
                                    <Box sx={{
                                        display: 'flex',
                                        gap: { xs: 0.5, md: 1 },
                                        mb: 2,
                                        overflowX: 'auto',
                                        pb: 0.5
                                    }}>
                                        {review.images.map((image, index) => (
                                            <Box
                                                key={index}
                                                component="img"
                                                src={image}
                                                alt={`Review image ${index + 1}`}
                                                sx={{
                                                    width: { xs: 60, sm: 70, md: 80 },
                                                    height: { xs: 60, sm: 70, md: 80 },
                                                    objectFit: 'cover',
                                                    borderRadius: 1,
                                                    cursor: 'pointer',
                                                    flexShrink: 0
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: { xs: 1, md: 2 },
                                    flexWrap: 'wrap'
                                }}>
                                    <Button
                                        startIcon={<ThumbUpIcon />}
                                        size="small"
                                        sx={{
                                            color: '#666',
                                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                                            minWidth: 'auto'
                                        }}
                                    >
                                        ({review.likes})
                                    </Button>
                                    <Button
                                        startIcon={<ThumbDownIcon />}
                                        size="small"
                                        sx={{
                                            color: '#666',
                                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                                            minWidth: 'auto'
                                        }}
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
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: { xs: 2, md: 3 },
                            fontWeight: 700,
                            fontSize: { xs: '1.25rem', md: '1.5rem' }
                        }}
                    >
                        Hỏi - Đáp sản phẩm
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 2 },
                        mb: 3
                    }}>
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
                                px: { xs: 2, md: 3 },
                                py: { xs: 1, md: 1.5 },
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                alignSelf: { xs: 'stretch', sm: 'flex-start' }
                            }}
                        >
                            Đặt một câu hỏi
                        </Button>
                    </Box>

                    <Box sx={{
                        textAlign: 'center',
                        py: { xs: 3, md: 4 },
                        backgroundColor: '#f9f9f9',
                        borderRadius: 2
                    }}>
                        <Typography sx={{
                            color: '#666',
                            fontSize: { xs: '0.875rem', md: '1rem' }
                        }}>
                            Chưa có câu hỏi nào!
                        </Typography>
                    </Box>
                </Box>

                {/* Related Products */}
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: { xs: 2, md: 3 },
                            fontWeight: 700,
                            fontSize: { xs: '1.25rem', md: '1.5rem' }
                        }}
                    >
                        Sản phẩm liên quan
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(4, 1fr)',
                            lg: 'repeat(5, 1fr)'
                        },
                        gap: { xs: 1.5, md: 2 }
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
                                        height: { xs: 120, sm: 140, md: 150 },
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        }
                                    }}
                                />
                                <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            minHeight: { xs: '2.4em', md: '2.8em' },
                                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.875rem' },
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: { xs: 0.5, md: 1 },
                                        mb: 1,
                                        flexWrap: 'wrap'
                                    }}>
                                        <StarIcon sx={{
                                            color: '#ffb400',
                                            fontSize: { xs: 14, md: 16 }
                                        }} />
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                        >
                                            {product.rating}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#666',
                                                fontSize: { xs: '0.75rem', md: '0.875rem' }
                                            }}
                                        >
                                            Đã bán: {product.sold}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: { xs: 0.5, md: 1 },
                                        flexWrap: 'wrap'
                                    }}>
                                        {product.priceOriginal && (
                                            <Typography sx={{
                                                color: '#999',
                                                textDecoration: 'line-through',
                                                fontSize: { xs: 12, md: 14 }
                                            }}>
                                                {product.priceOriginal}₫
                                            </Typography>
                                        )}
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: '#f58220',
                                                fontWeight: 700,
                                                fontSize: { xs: 14, md: 16 }
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
