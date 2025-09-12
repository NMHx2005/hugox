import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Rating,
    Chip,
    Breadcrumbs,
    Link as MuiLink,
    Avatar,
    Divider,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    Verified as VerifiedIcon,
    Share as ShareIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_review, get_reviews, Review } from '../../api/client/reviews';

const ReviewDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [review, setReview] = useState<Review | null>(null);
    const [relatedReviews, setRelatedReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadReview();
        }
    }, [id]);

    const loadReview = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);

            const response = await get_review(id);
            setReview(response.data.review);

            // Load related reviews
            loadRelatedReviews(response.data.review?.product?._id || '');
        } catch (err) {
            console.error('Error loading review:', err);
            setError('Không thể tải đánh giá');
        } finally {
            setLoading(false);
        }
    };

    const loadRelatedReviews = async (productId: string) => {
        try {
            const response = await get_reviews({
                product: productId,
                limit: 4,
                page: 1
            });
            setRelatedReviews(response.data.reviews.filter(r => r._id !== id));
        } catch (err) {
            console.error('Error loading related reviews:', err);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 4) return '#4caf50';
        if (rating >= 3) return '#ff9800';
        return '#f44336';
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Đánh giá: ${review?.product?.name || 'Sản phẩm không xác định'}`,
                    text: review?.comment,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    if (loading) {
        return (
            <Layout>
                <Box className="container" sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    if (error || !review) {
        return (
            <Layout>
                <Box className="container" sx={{ mt: 3 }}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error || 'Đánh giá không tồn tại'}
                    </Alert>
                    <Typography variant="h4" component="h1">
                        Đánh giá không tồn tại
                    </Typography>
                    <Typography>
                        Vui lòng kiểm tra lại đường dẫn.
                    </Typography>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box className="container" sx={{ mt: 3 }}>
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ mb: 3 }}>
                    <MuiLink component={Link} to="/" color="inherit">
                        Trang chủ
                    </MuiLink>
                    <MuiLink component={Link} to="/reviews" color="inherit">
                        Đánh giá
                    </MuiLink>
                    <Typography color="text.primary">Chi tiết đánh giá</Typography>
                </Breadcrumbs>

                <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* Main Content */}
                    <Box sx={{ flex: { xs: 1, md: 2 } }}>
                        <Card>
                            <CardContent sx={{ p: 4 }}>
                                {/* Back Button */}
                                <Box sx={{ mb: 3 }}>
                                    <Button
                                        startIcon={<ArrowBackIcon />}
                                        onClick={() => navigate(-1)}
                                        sx={{ color: '#f58220' }}
                                    >
                                        Quay lại
                                    </Button>
                                </Box>

                                {/* Review Header */}
                                <Box sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <Avatar sx={{ bgcolor: '#f58220', width: 48, height: 48 }}>
                                            {review.user?.name?.charAt(0) || 'U'}
                                        </Avatar>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {review.user?.name || 'Người dùng ẩn danh'}
                                                </Typography>
                                                {review.verified && (
                                                    <Chip
                                                        icon={<VerifiedIcon />}
                                                        label="Đã xác thực"
                                                        size="small"
                                                        color="success"
                                                    />
                                                )}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {formatDate(review.createdAt)}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Rating
                                                value={review.rating}
                                                readOnly
                                                size="large"
                                                sx={{ color: getRatingColor(review.rating) }}
                                            />
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: getRatingColor(review.rating) }}>
                                                {review.rating}/5
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ mb: 3 }} />
                                </Box>

                                {/* Product Info */}
                                {review.product && (
                                    <Box sx={{ mb: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                            Sản phẩm được đánh giá:
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                            {review.product.images && review.product.images.length > 0 && (
                                                <Box
                                                    component="img"
                                                    src={review.product.images[0]}
                                                    alt={review.product.name || 'Sản phẩm'}
                                                    sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2 }}
                                                />
                                            )}
                                            <Box>
                                                <Link
                                                    to={`/products/${review.product.slug || review.product._id}`}
                                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                                >
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 1,
                                                            '&:hover': { color: '#f58220' }
                                                        }}
                                                    >
                                                        {review.product.name || 'Sản phẩm không xác định'}
                                                    </Typography>
                                                </Link>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ borderColor: '#f58220', color: '#f58220' }}
                                                    onClick={() => navigate(`/products/${review.product?.slug || review.product?._id}`)}
                                                >
                                                    Xem sản phẩm
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}

                                {/* Review Title */}
                                {review.title && (
                                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
                                        {review.title}
                                    </Typography>
                                )}

                                {/* Review Content */}
                                <Box
                                    sx={{
                                        mb: 4,
                                        '& p': { mb: 2, lineHeight: 1.8, fontSize: '1.1rem' },
                                        '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1, mb: 2 }
                                    }}
                                >
                                    <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                                        {review.comment}
                                    </Typography>
                                </Box>

                                {/* Review Images */}
                                {review.images && review.images.length > 0 && (
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                            Hình ảnh đánh giá:
                                        </Typography>
                                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                                            {review.images.map((image, index) => (
                                                <Box key={index}>
                                                    <Box
                                                        component="img"
                                                        src={image}
                                                        alt={`Review image ${index + 1}`}
                                                        sx={{
                                                            width: '100%',
                                                            height: 200,
                                                            objectFit: 'cover',
                                                            borderRadius: 2,
                                                            cursor: 'pointer',
                                                            transition: 'transform 0.2s ease-in-out',
                                                            '&:hover': { transform: 'scale(1.05)' }
                                                        }}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Action Buttons */}
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ThumbUpIcon />}
                                        sx={{ borderColor: '#4caf50', color: '#4caf50' }}
                                    >
                                        Thích ({review.likes})
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ThumbDownIcon />}
                                        sx={{ borderColor: '#f44336', color: '#f44336' }}
                                    >
                                        Không thích ({review.dislikes})
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ShareIcon />}
                                        onClick={handleShare}
                                        sx={{ borderColor: '#f58220', color: '#f58220' }}
                                    >
                                        Chia sẻ
                                    </Button>
                                    <Box sx={{ ml: 'auto' }}>
                                        <Chip
                                            label={review.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                                            color={review.status === 'approved' ? 'success' : 'warning'}
                                        />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Sidebar */}
                    <Box sx={{ flex: { xs: 1, md: 1 }, minWidth: { md: '300px' } }}>
                        {/* Related Reviews */}
                        {relatedReviews.length > 0 && (
                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                        Đánh giá khác của sản phẩm này
                                    </Typography>
                                    {relatedReviews.map((relatedReview) => (
                                        <Box key={relatedReview._id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                                            <Link
                                                to={`/reviews/${relatedReview._id}`}
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <Rating
                                                        value={relatedReview.rating}
                                                        readOnly
                                                        size="small"
                                                        sx={{ color: getRatingColor(relatedReview.rating) }}
                                                    />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {relatedReview.rating}/5
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        mb: 1,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        '&:hover': { color: '#f58220' }
                                                    }}
                                                >
                                                    {relatedReview.title || relatedReview.comment.substring(0, 50) + '...'}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    bởi {relatedReview.user?.name || 'Người dùng ẩn danh'} • {formatDate(relatedReview.createdAt)}
                                                </Typography>
                                            </Link>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* Review Guidelines */}
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                    Hướng dẫn đánh giá
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Để đánh giá hữu ích, hãy:
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                    <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Mô tả trải nghiệm thực tế của bạn
                                    </Typography>
                                    <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Chia sẻ ưu và nhược điểm
                                    </Typography>
                                    <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Đính kèm hình ảnh nếu có thể
                                    </Typography>
                                    <Typography component="li" variant="body2" color="text.secondary">
                                        Sử dụng ngôn ngữ lịch sự và xây dựng
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default ReviewDetailPage;
