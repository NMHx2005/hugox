import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Rating,
    Chip,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    CircularProgress,
    Alert,
    Breadcrumbs,
    Link as MuiLink,
    Avatar,
    Button
} from '@mui/material';
import {
    Search as SearchIcon,
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    Verified as VerifiedIcon
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_reviews, get_review_stats, Review } from '../../api/client/reviews';

interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

const ReviewsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [stats, setStats] = useState<ReviewStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        pages: 0
    });

    // Filters
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [rating, setRating] = useState(searchParams.get('rating') || '');
    const [sort, setSort] = useState(searchParams.get('sort') || '-createdAt');

    useEffect(() => {
        loadReviews();
    }, [searchParams]);

    const loadReviews = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                page: Number(searchParams.get('page')) || 1,
                limit: 12,
                rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
                search: searchParams.get('search') || undefined,
                sort: searchParams.get('sort') || '-createdAt'
            };

            const response = await get_reviews(params);
            setReviews(response.data.reviews);
            setPagination(response.data.pagination);
        } catch (err) {
            console.error('Error loading reviews:', err);
            setError('Không thể tải danh sách đánh giá');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const newParams = new URLSearchParams();
        if (search) newParams.set('search', search);
        if (rating) newParams.set('rating', rating);
        if (sort !== '-createdAt') newParams.set('sort', sort);
        newParams.set('page', '1');

        setSearchParams(newParams);
    };

    const handleRatingChange = (newRating: string) => {
        setRating(newRating);
        const newParams = new URLSearchParams(searchParams);
        if (newRating) {
            newParams.set('rating', newRating);
        } else {
            newParams.delete('rating');
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const handleSortChange = (newSort: string) => {
        setSort(newSort);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort', newSort);
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', value.toString());
        setSearchParams(newParams);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 4) return '#4caf50';
        if (rating >= 3) return '#ff9800';
        return '#f44336';
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

    if (error) {
        return (
            <Layout>
                <Box className="container" sx={{ mt: 3 }}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
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
                    <Typography color="text.primary">Đánh giá sản phẩm</Typography>
                </Breadcrumbs>

                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
                        Đánh giá sản phẩm
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Xem những đánh giá chân thực từ khách hàng về sản phẩm của chúng tôi
                    </Typography>
                </Box>

                {/* Filters */}
                <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        placeholder="Tìm kiếm đánh giá..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ minWidth: 300 }}
                    />

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Đánh giá</InputLabel>
                        <Select
                            value={rating}
                            onChange={(e) => handleRatingChange(e.target.value)}
                            label="Đánh giá"
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="5">5 sao</MenuItem>
                            <MenuItem value="4">4 sao</MenuItem>
                            <MenuItem value="3">3 sao</MenuItem>
                            <MenuItem value="2">2 sao</MenuItem>
                            <MenuItem value="1">1 sao</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Sắp xếp</InputLabel>
                        <Select
                            value={sort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            label="Sắp xếp"
                        >
                            <MenuItem value="-createdAt">Mới nhất</MenuItem>
                            <MenuItem value="createdAt">Cũ nhất</MenuItem>
                            <MenuItem value="-rating">Đánh giá cao</MenuItem>
                            <MenuItem value="rating">Đánh giá thấp</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ ml: 'auto' }}>
                        <Typography variant="body2" color="text.secondary">
                            {pagination.total} đánh giá
                        </Typography>
                    </Box>
                </Box>

                {/* Reviews Grid */}
                {reviews.length > 0 ? (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                            {reviews.map((review) => (
                                <Box key={review._id}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                <Avatar sx={{ bgcolor: '#f58220' }}>
                                                    {review.user?.name?.charAt(0) || 'U'}
                                                </Avatar>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
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
                                                        size="small"
                                                        sx={{ color: getRatingColor(review.rating) }}
                                                    />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {review.rating}/5
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Product Info */}
                                            {review.product && (
                                                <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                        Sản phẩm:
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        {review.product.images && review.product.images.length > 0 && (
                                                            <Box
                                                                component="img"
                                                                src={review.product.images[0]}
                                                                alt={review.product.name || 'Sản phẩm'}
                                                                sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                                                            />
                                                        )}
                                                        <Box>
                                                            <Link
                                                                to={`/products/${review.product.slug || review.product._id}`}
                                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                                            >
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    sx={{
                                                                        fontWeight: 600,
                                                                        '&:hover': { color: '#f58220' }
                                                                    }}
                                                                >
                                                                    {review.product.name || 'Sản phẩm không xác định'}
                                                                </Typography>
                                                            </Link>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            )}

                                            {/* Review Title */}
                                            {review.title && (
                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                    {review.title}
                                                </Typography>
                                            )}

                                            {/* Review Content */}
                                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                                                {review.comment}
                                            </Typography>

                                            {/* Review Images */}
                                            {review.images && review.images.length > 0 && (
                                                <Box sx={{ mb: 2 }}>
                                                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 1 }}>
                                                        {review.images.map((image, index) => (
                                                            <Box key={index}>
                                                                <Box
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
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            )}

                                            {/* Action Buttons */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Button
                                                    startIcon={<ThumbUpIcon />}
                                                    size="small"
                                                    sx={{ color: 'text.secondary' }}
                                                >
                                                    {review.likes}
                                                </Button>
                                                <Button
                                                    startIcon={<ThumbDownIcon />}
                                                    size="small"
                                                    sx={{ color: 'text.secondary' }}
                                                >
                                                    {review.dislikes}
                                                </Button>
                                                <Box sx={{ ml: 'auto' }}>
                                                    <Chip
                                                        label={review.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                                                        size="small"
                                                        color={review.status === 'approved' ? 'success' : 'warning'}
                                                    />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </Box>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination
                                    count={pagination.pages}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                />
                            </Box>
                        )}
                    </>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                            Không tìm thấy đánh giá nào
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                        </Typography>
                    </Box>
                )}
            </Box>
        </Layout>
    );
};

export default ReviewsPage;