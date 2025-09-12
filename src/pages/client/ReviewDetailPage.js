import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Rating, Chip, Breadcrumbs, Link as MuiLink, Avatar, Divider, Button, CircularProgress, Alert, } from '@mui/material';
import { ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Verified as VerifiedIcon, Share as ShareIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_review, get_reviews } from '../../api/client/reviews';
const ReviewDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);
    const [relatedReviews, setRelatedReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (id) {
            loadReview();
        }
    }, [id]);
    const loadReview = async () => {
        if (!id)
            return;
        try {
            setLoading(true);
            setError(null);
            const response = await get_review(id);
            setReview(response.data.review);
            // Load related reviews
            loadRelatedReviews(response.data.review?.product?._id || '');
        }
        catch (err) {
            console.error('Error loading review:', err);
            setError('Không thể tải đánh giá');
        }
        finally {
            setLoading(false);
        }
    };
    const loadRelatedReviews = async (productId) => {
        try {
            const response = await get_reviews({
                product: productId,
                limit: 4,
                page: 1
            });
            setRelatedReviews(response.data.reviews.filter(r => r._id !== id));
        }
        catch (err) {
            console.error('Error loading related reviews:', err);
        }
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const getRatingColor = (rating) => {
        if (rating >= 4)
            return '#4caf50';
        if (rating >= 3)
            return '#ff9800';
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
            }
            catch (err) {
                console.log('Error sharing:', err);
            }
        }
        else {
            navigator.clipboard.writeText(window.location.href);
        }
    };
    if (loading) {
        return (_jsx(Layout, { children: _jsx(Box, { className: "container", sx: { mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }, children: _jsx(CircularProgress, {}) }) }));
    }
    if (error || !review) {
        return (_jsx(Layout, { children: _jsxs(Box, { className: "container", sx: { mt: 3 }, children: [_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error || 'Đánh giá không tồn tại' }), _jsx(Typography, { variant: "h4", component: "h1", children: "\u0110\u00E1nh gi\u00E1 kh\u00F4ng t\u1ED3n t\u1EA1i" }), _jsx(Typography, { children: "Vui l\u00F2ng ki\u1EC3m tra l\u1EA1i \u0111\u01B0\u1EDDng d\u1EABn." })] }) }));
    }
    return (_jsx(Layout, { children: _jsxs(Box, { className: "container", sx: { mt: 3 }, children: [_jsxs(Breadcrumbs, { sx: { mb: 3 }, children: [_jsx(MuiLink, { component: Link, to: "/", color: "inherit", children: "Trang ch\u1EE7" }), _jsx(MuiLink, { component: Link, to: "/reviews", color: "inherit", children: "\u0110\u00E1nh gi\u00E1" }), _jsx(Typography, { color: "text.primary", children: "Chi ti\u1EBFt \u0111\u00E1nh gi\u00E1" })] }), _jsxs(Box, { sx: { display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }, children: [_jsx(Box, { sx: { flex: { xs: 1, md: 2 } }, children: _jsx(Card, { children: _jsxs(CardContent, { sx: { p: 4 }, children: [_jsx(Box, { sx: { mb: 3 }, children: _jsx(Button, { startIcon: _jsx(ArrowBackIcon, {}), onClick: () => navigate(-1), sx: { color: '#f58220' }, children: "Quay l\u1EA1i" }) }), _jsxs(Box, { sx: { mb: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2, mb: 2 }, children: [_jsx(Avatar, { sx: { bgcolor: '#f58220', width: 48, height: 48 }, children: review.user?.name?.charAt(0) || 'U' }), _jsxs(Box, { sx: { flexGrow: 1 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600 }, children: review.user?.name || 'Người dùng ẩn danh' }), review.verified && (_jsx(Chip, { icon: _jsx(VerifiedIcon, {}), label: "\u0110\u00E3 x\u00E1c th\u1EF1c", size: "small", color: "success" }))] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: formatDate(review.createdAt) })] }), _jsxs(Box, { sx: { textAlign: 'right' }, children: [_jsx(Rating, { value: review.rating, readOnly: true, size: "large", sx: { color: getRatingColor(review.rating) } }), _jsxs(Typography, { variant: "h6", sx: { fontWeight: 600, color: getRatingColor(review.rating) }, children: [review.rating, "/5"] })] })] }), _jsx(Divider, { sx: { mb: 3 } })] }), review.product && (_jsxs(Box, { sx: { mb: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 2 }, children: "S\u1EA3n ph\u1EA9m \u0111\u01B0\u1EE3c \u0111\u00E1nh gi\u00E1:" }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 3 }, children: [review.product.images && review.product.images.length > 0 && (_jsx(Box, { component: "img", src: review.product.images[0], alt: review.product.name || 'Sản phẩm', sx: { width: 100, height: 100, objectFit: 'cover', borderRadius: 2 } })), _jsxs(Box, { children: [_jsx(Link, { to: `/products/${review.product.slug || review.product._id}`, style: { textDecoration: 'none', color: 'inherit' }, children: _jsx(Typography, { variant: "h5", sx: {
                                                                            fontWeight: 600,
                                                                            mb: 1,
                                                                            '&:hover': { color: '#f58220' }
                                                                        }, children: review.product.name || 'Sản phẩm không xác định' }) }), _jsx(Button, { variant: "outlined", size: "small", sx: { borderColor: '#f58220', color: '#f58220' }, onClick: () => navigate(`/products/${review.product?.slug || review.product?._id}`), children: "Xem s\u1EA3n ph\u1EA9m" })] })] })] })), review.title && (_jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 700, mb: 3 }, children: review.title })), _jsx(Box, { sx: {
                                                mb: 4,
                                                '& p': { mb: 2, lineHeight: 1.8, fontSize: '1.1rem' },
                                                '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1, mb: 2 }
                                            }, children: _jsx(Typography, { variant: "body1", sx: { lineHeight: 1.8, fontSize: '1.1rem' }, children: review.comment }) }), review.images && review.images.length > 0 && (_jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 600, mb: 2 }, children: "H\u00ECnh \u1EA3nh \u0111\u00E1nh gi\u00E1:" }), _jsx(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }, children: review.images.map((image, index) => (_jsx(Box, { children: _jsx(Box, { component: "img", src: image, alt: `Review image ${index + 1}`, sx: {
                                                                width: '100%',
                                                                height: 200,
                                                                objectFit: 'cover',
                                                                borderRadius: 2,
                                                                cursor: 'pointer',
                                                                transition: 'transform 0.2s ease-in-out',
                                                                '&:hover': { transform: 'scale(1.05)' }
                                                            } }) }, index))) })] })), _jsxs(Box, { sx: { display: 'flex', gap: 2, alignItems: 'center' }, children: [_jsxs(Button, { variant: "outlined", startIcon: _jsx(ThumbUpIcon, {}), sx: { borderColor: '#4caf50', color: '#4caf50' }, children: ["Th\u00EDch (", review.likes, ")"] }), _jsxs(Button, { variant: "outlined", startIcon: _jsx(ThumbDownIcon, {}), sx: { borderColor: '#f44336', color: '#f44336' }, children: ["Kh\u00F4ng th\u00EDch (", review.dislikes, ")"] }), _jsx(Button, { variant: "outlined", startIcon: _jsx(ShareIcon, {}), onClick: handleShare, sx: { borderColor: '#f58220', color: '#f58220' }, children: "Chia s\u1EBB" }), _jsx(Box, { sx: { ml: 'auto' }, children: _jsx(Chip, { label: review.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt', color: review.status === 'approved' ? 'success' : 'warning' }) })] })] }) }) }), _jsxs(Box, { sx: { flex: { xs: 1, md: 1 }, minWidth: { md: '300px' } }, children: [relatedReviews.length > 0 && (_jsx(Card, { sx: { mb: 3 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 2 }, children: "\u0110\u00E1nh gi\u00E1 kh\u00E1c c\u1EE7a s\u1EA3n ph\u1EA9m n\u00E0y" }), relatedReviews.map((relatedReview) => (_jsx(Box, { sx: { mb: 2, pb: 2, borderBottom: '1px solid #eee' }, children: _jsxs(Link, { to: `/reviews/${relatedReview._id}`, style: { textDecoration: 'none', color: 'inherit' }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(Rating, { value: relatedReview.rating, readOnly: true, size: "small", sx: { color: getRatingColor(relatedReview.rating) } }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [relatedReview.rating, "/5"] })] }), _jsx(Typography, { variant: "subtitle2", sx: {
                                                                fontWeight: 600,
                                                                mb: 1,
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                                '&:hover': { color: '#f58220' }
                                                            }, children: relatedReview.title || relatedReview.comment.substring(0, 50) + '...' }), _jsxs(Typography, { variant: "caption", color: "text.secondary", children: ["b\u1EDFi ", relatedReview.user?.name || 'Người dùng ẩn danh', " \u2022 ", formatDate(relatedReview.createdAt)] })] }) }, relatedReview._id)))] }) })), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 2 }, children: "H\u01B0\u1EDBng d\u1EABn \u0111\u00E1nh gi\u00E1" }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "\u0110\u1EC3 \u0111\u00E1nh gi\u00E1 h\u1EEFu \u00EDch, h\u00E3y:" }), _jsxs(Box, { component: "ul", sx: { pl: 2, m: 0 }, children: [_jsx(Typography, { component: "li", variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: "M\u00F4 t\u1EA3 tr\u1EA3i nghi\u1EC7m th\u1EF1c t\u1EBF c\u1EE7a b\u1EA1n" }), _jsx(Typography, { component: "li", variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: "Chia s\u1EBB \u01B0u v\u00E0 nh\u01B0\u1EE3c \u0111i\u1EC3m" }), _jsx(Typography, { component: "li", variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: "\u0110\u00EDnh k\u00E8m h\u00ECnh \u1EA3nh n\u1EBFu c\u00F3 th\u1EC3" }), _jsx(Typography, { component: "li", variant: "body2", color: "text.secondary", children: "S\u1EED d\u1EE5ng ng\u00F4n ng\u1EEF l\u1ECBch s\u1EF1 v\u00E0 x\u00E2y d\u1EF1ng" })] })] }) })] })] })] }) }));
};
export default ReviewDetailPage;
