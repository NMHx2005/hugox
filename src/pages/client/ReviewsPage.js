import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Rating, Chip, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Pagination, CircularProgress, Alert, Breadcrumbs, Link as MuiLink, Avatar, Button } from '@mui/material';
import { Search as SearchIcon, ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Verified as VerifiedIcon } from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_reviews } from '../../api/client/reviews';
const ReviewsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        }
        catch (err) {
            console.error('Error loading reviews:', err);
            setError('Không thể tải danh sách đánh giá');
        }
        finally {
            setLoading(false);
        }
    };
    const handleSearch = () => {
        const newParams = new URLSearchParams();
        if (search)
            newParams.set('search', search);
        if (rating)
            newParams.set('rating', rating);
        if (sort !== '-createdAt')
            newParams.set('sort', sort);
        newParams.set('page', '1');
        setSearchParams(newParams);
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        const newParams = new URLSearchParams(searchParams);
        if (newRating) {
            newParams.set('rating', newRating);
        }
        else {
            newParams.delete('rating');
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
    };
    const handleSortChange = (newSort) => {
        setSort(newSort);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort', newSort);
        newParams.set('page', '1');
        setSearchParams(newParams);
    };
    const handlePageChange = (event, value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', value.toString());
        setSearchParams(newParams);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const getRatingColor = (rating) => {
        if (rating >= 4)
            return '#4caf50';
        if (rating >= 3)
            return '#ff9800';
        return '#f44336';
    };
    if (loading) {
        return (_jsx(Layout, { children: _jsx(Box, { className: "container", sx: { mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }, children: _jsx(CircularProgress, {}) }) }));
    }
    if (error) {
        return (_jsx(Layout, { children: _jsx(Box, { className: "container", sx: { mt: 3 }, children: _jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error }) }) }));
    }
    return (_jsx(Layout, { children: _jsxs(Box, { className: "container", sx: { mt: 3 }, children: [_jsxs(Breadcrumbs, { sx: { mb: 3 }, children: [_jsx(MuiLink, { component: Link, to: "/", color: "inherit", children: "Trang ch\u1EE7" }), _jsx(Typography, { color: "text.primary", children: "\u0110\u00E1nh gi\u00E1 s\u1EA3n ph\u1EA9m" })] }), _jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Typography, { variant: "h3", component: "h1", sx: { fontWeight: 700, mb: 2 }, children: "\u0110\u00E1nh gi\u00E1 s\u1EA3n ph\u1EA9m" }), _jsx(Typography, { variant: "body1", color: "text.secondary", sx: { mb: 3 }, children: "Xem nh\u1EEFng \u0111\u00E1nh gi\u00E1 ch\u00E2n th\u1EF1c t\u1EEB kh\u00E1ch h\u00E0ng v\u1EC1 s\u1EA3n ph\u1EA9m c\u1EE7a ch\u00FAng t\u00F4i" })] }), _jsxs(Box, { sx: { mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx(TextField, { placeholder: "T\u00ECm ki\u1EBFm \u0111\u00E1nh gi\u00E1...", value: search, onChange: (e) => setSearch(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleSearch(), InputProps: {
                                startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, {}) })),
                            }, sx: { minWidth: 300 } }), _jsxs(FormControl, { sx: { minWidth: 150 }, children: [_jsx(InputLabel, { children: "\u0110\u00E1nh gi\u00E1" }), _jsxs(Select, { value: rating, onChange: (e) => handleRatingChange(e.target.value), label: "\u0110\u00E1nh gi\u00E1", children: [_jsx(MenuItem, { value: "", children: "T\u1EA5t c\u1EA3" }), _jsx(MenuItem, { value: "5", children: "5 sao" }), _jsx(MenuItem, { value: "4", children: "4 sao" }), _jsx(MenuItem, { value: "3", children: "3 sao" }), _jsx(MenuItem, { value: "2", children: "2 sao" }), _jsx(MenuItem, { value: "1", children: "1 sao" })] })] }), _jsxs(FormControl, { sx: { minWidth: 150 }, children: [_jsx(InputLabel, { children: "S\u1EAFp x\u1EBFp" }), _jsxs(Select, { value: sort, onChange: (e) => handleSortChange(e.target.value), label: "S\u1EAFp x\u1EBFp", children: [_jsx(MenuItem, { value: "-createdAt", children: "M\u1EDBi nh\u1EA5t" }), _jsx(MenuItem, { value: "createdAt", children: "C\u0169 nh\u1EA5t" }), _jsx(MenuItem, { value: "-rating", children: "\u0110\u00E1nh gi\u00E1 cao" }), _jsx(MenuItem, { value: "rating", children: "\u0110\u00E1nh gi\u00E1 th\u1EA5p" })] })] }), _jsx(Box, { sx: { ml: 'auto' }, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [pagination.total, " \u0111\u00E1nh gi\u00E1"] }) })] }), reviews.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }, children: reviews.map((review) => (_jsx(Box, { children: _jsx(Card, { sx: { height: '100%' }, children: _jsxs(CardContent, { children: [_jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 2 }, children: [_jsx(Avatar, { sx: { bgcolor: '#f58220' }, children: review.user?.name?.charAt(0) || 'U' }), _jsxs(Box, { sx: { flexGrow: 1 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(Typography, { variant: "subtitle1", sx: { fontWeight: 600 }, children: review.user?.name || 'Người dùng ẩn danh' }), review.verified && (_jsx(Chip, { icon: _jsx(VerifiedIcon, {}), label: "\u0110\u00E3 x\u00E1c th\u1EF1c", size: "small", color: "success" }))] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: formatDate(review.createdAt) })] }), _jsxs(Box, { sx: { textAlign: 'right' }, children: [_jsx(Rating, { value: review.rating, readOnly: true, size: "small", sx: { color: getRatingColor(review.rating) } }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [review.rating, "/5"] })] })] }), review.product && (_jsxs(Box, { sx: { mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }, children: [_jsx(Typography, { variant: "subtitle2", sx: { fontWeight: 600, mb: 1 }, children: "S\u1EA3n ph\u1EA9m:" }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [review.product.images && review.product.images.length > 0 && (_jsx(Box, { component: "img", src: review.product.images[0], alt: review.product.name || 'Sản phẩm', sx: { width: 60, height: 60, objectFit: 'cover', borderRadius: 1 } })), _jsx(Box, { children: _jsx(Link, { to: `/products/${review.product.slug || review.product._id}`, style: { textDecoration: 'none', color: 'inherit' }, children: _jsx(Typography, { variant: "subtitle2", sx: {
                                                                            fontWeight: 600,
                                                                            '&:hover': { color: '#f58220' }
                                                                        }, children: review.product.name || 'Sản phẩm không xác định' }) }) })] })] })), review.title && (_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 1 }, children: review.title })), _jsx(Typography, { variant: "body1", sx: { mb: 2, lineHeight: 1.6 }, children: review.comment }), review.images && review.images.length > 0 && (_jsx(Box, { sx: { mb: 2 }, children: _jsx(Box, { sx: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 1 }, children: review.images.map((image, index) => (_jsx(Box, { children: _jsx(Box, { component: "img", src: image, alt: `Review image ${index + 1}`, sx: {
                                                                width: 80,
                                                                height: 80,
                                                                objectFit: 'cover',
                                                                borderRadius: 1,
                                                                cursor: 'pointer'
                                                            } }) }, index))) }) })), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Button, { startIcon: _jsx(ThumbUpIcon, {}), size: "small", sx: { color: 'text.secondary' }, children: review.likes }), _jsx(Button, { startIcon: _jsx(ThumbDownIcon, {}), size: "small", sx: { color: 'text.secondary' }, children: review.dislikes }), _jsx(Box, { sx: { ml: 'auto' }, children: _jsx(Chip, { label: review.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt', size: "small", color: review.status === 'approved' ? 'success' : 'warning' }) })] })] }) }) }, review._id))) }), pagination.pages > 1 && (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', mt: 4 }, children: _jsx(Pagination, { count: pagination.pages, page: pagination.page, onChange: handlePageChange, color: "primary", size: "large" }) }))] })) : (_jsxs(Box, { sx: { textAlign: 'center', py: 8 }, children: [_jsx(Typography, { variant: "h5", color: "text.secondary", sx: { mb: 2 }, children: "Kh\u00F4ng t\u00ECm th\u1EA5y \u0111\u00E1nh gi\u00E1 n\u00E0o" }), _jsx(Typography, { variant: "body1", color: "text.secondary", children: "H\u00E3y th\u1EED thay \u0111\u1ED5i b\u1ED9 l\u1ECDc ho\u1EB7c t\u1EEB kh\u00F3a t\u00ECm ki\u1EBFm" })] }))] }) }));
};
export default ReviewsPage;
