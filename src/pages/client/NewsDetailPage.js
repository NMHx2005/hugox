import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Chip, Breadcrumbs, Link as MuiLink, CircularProgress, Alert, Divider, IconButton, Avatar, Button, TextField } from '@mui/material';
import { CalendarToday as CalendarIcon, Person as PersonIcon, Visibility as VisibilityIcon, Share as ShareIcon, ThumbUp as ThumbUpIcon, Comment as CommentIcon } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_news_article, get_news } from '../../api/client/news';
const NewsDetailPage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (id) {
            loadArticle();
        }
    }, [id]);
    const loadArticle = async () => {
        if (!id)
            return;
        try {
            setLoading(true);
            setError(null);
            const response = await get_news_article(id);
            setArticle(response.data.article);
            // Load related news
            loadRelatedNews(response.data.article.category);
        }
        catch (err) {
            console.error('Error loading article:', err);
            setError('Không thể tải bài viết');
        }
        finally {
            setLoading(false);
        }
    };
    const loadRelatedNews = async (category) => {
        try {
            const response = await get_news({
                category,
                limit: 4,
                page: 1
            });
            setRelatedNews(response.data.news.filter(news => news._id !== id));
        }
        catch (err) {
            console.error('Error loading related news:', err);
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
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article?.title,
                    text: article?.excerpt,
                    url: window.location.href,
                });
            }
            catch (err) {
                console.log('Error sharing:', err);
            }
        }
        else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };
    if (loading) {
        return (_jsx(Layout, { children: _jsx(Box, { className: "container", sx: { mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }, children: _jsx(CircularProgress, {}) }) }));
    }
    if (error || !article) {
        return (_jsx(Layout, { children: _jsxs(Box, { className: "container", sx: { mt: 3 }, children: [_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error || 'Bài viết không tồn tại' }), _jsx(Typography, { variant: "h4", component: "h1", children: "B\u00E0i vi\u1EBFt kh\u00F4ng t\u1ED3n t\u1EA1i" }), _jsx(Typography, { children: "Vui l\u00F2ng ki\u1EC3m tra l\u1EA1i \u0111\u01B0\u1EDDng d\u1EABn." })] }) }));
    }
    return (_jsx(Layout, { children: _jsxs(Box, { className: "container", sx: { mt: 3 }, children: [_jsxs(Breadcrumbs, { sx: { mb: 3 }, children: [_jsx(MuiLink, { component: Link, to: "/", color: "inherit", children: "Trang ch\u1EE7" }), _jsx(MuiLink, { component: Link, to: "/news", color: "inherit", children: "Tin t\u1EE9c" }), _jsx(Typography, { color: "text.primary", children: article.title })] }), _jsxs(Box, { sx: { display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }, children: [_jsx(Box, { sx: { flex: { xs: 1, md: 2 } }, children: _jsxs(Card, { children: [article.featuredImage && (_jsx(CardMedia, { component: "img", height: "400", image: article.featuredImage, alt: article.title, sx: { objectFit: 'cover' } })), _jsxs(CardContent, { sx: { p: 4 }, children: [_jsxs(Box, { sx: { mb: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 2 }, children: [_jsx(Chip, { label: article.category, sx: {
                                                                    backgroundColor: '#f58220',
                                                                    color: 'white',
                                                                    fontWeight: 600
                                                                } }), article.featured && (_jsx(Chip, { label: "N\u1ED5i b\u1EADt", color: "secondary", size: "small" }))] }), _jsx(Typography, { variant: "h3", component: "h1", sx: { fontWeight: 700, mb: 3 }, children: article.title }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 3, mb: 3, flexWrap: 'wrap' }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Avatar, { sx: { width: 32, height: 32, bgcolor: '#f58220' }, children: _jsx(PersonIcon, {}) }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: article.author.name })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(CalendarIcon, { sx: { fontSize: 16, color: 'text.secondary' } }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: formatDate(article.publishedAt || article.createdAt) })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(VisibilityIcon, { sx: { fontSize: 16, color: 'text.secondary' } }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [article.views, " l\u01B0\u1EE3t xem"] })] }), _jsx(Box, { sx: { ml: 'auto' }, children: _jsx(IconButton, { onClick: handleShare, color: "primary", children: _jsx(ShareIcon, {}) }) })] }), _jsx(Divider, { sx: { mb: 3 } })] }), _jsx(Box, { sx: {
                                                    '& h2': { fontSize: '1.5rem', fontWeight: 700, mb: 2, mt: 3 },
                                                    '& h3': { fontSize: '1.25rem', fontWeight: 600, mb: 1.5, mt: 2 },
                                                    '& p': { mb: 2, lineHeight: 1.8 },
                                                    '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1, mb: 2 },
                                                    '& ul, & ol': { pl: 3, mb: 2 },
                                                    '& li': { mb: 0.5 }
                                                }, dangerouslySetInnerHTML: { __html: article.content } }), article.tags && article.tags.length > 0 && (_jsxs(Box, { sx: { mt: 4 }, children: [_jsx(Typography, { variant: "h6", sx: { mb: 2, fontWeight: 600 }, children: "Tags:" }), _jsx(Box, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' }, children: article.tags.map((tag, index) => (_jsx(Chip, { label: tag, variant: "outlined", size: "small" }, index))) })] })), _jsxs(Box, { sx: { mt: 4, display: 'flex', gap: 2 }, children: [_jsx(Button, { variant: "outlined", startIcon: _jsx(ThumbUpIcon, {}), sx: { borderColor: '#f58220', color: '#f58220' }, children: "Th\u00EDch" }), _jsx(Button, { variant: "outlined", startIcon: _jsx(CommentIcon, {}), sx: { borderColor: '#f58220', color: '#f58220' }, children: "B\u00ECnh lu\u1EADn" }), _jsx(Button, { variant: "outlined", startIcon: _jsx(ShareIcon, {}), onClick: handleShare, sx: { borderColor: '#f58220', color: '#f58220' }, children: "Chia s\u1EBB" })] })] })] }) }), _jsxs(Box, { sx: { flex: { xs: 1, md: 1 }, minWidth: { md: '300px' } }, children: [relatedNews.length > 0 && (_jsx(Card, { sx: { mb: 3 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 2 }, children: "Tin t\u1EE9c li\u00EAn quan" }), relatedNews.map((news) => (_jsxs(Box, { sx: { mb: 2, pb: 2, borderBottom: '1px solid #eee' }, children: [_jsx(Link, { to: `/news/${news._id}`, style: { textDecoration: 'none', color: 'inherit' }, children: _jsx(Typography, { variant: "subtitle2", sx: {
                                                                fontWeight: 600,
                                                                mb: 1,
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                                '&:hover': { color: '#f58220' }
                                                            }, children: news.title }) }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: formatDate(news.publishedAt || news.createdAt) })] }, news._id)))] }) })), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { fontWeight: 700, mb: 2 }, children: "\u0110\u0103ng k\u00FD nh\u1EADn tin" }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "Nh\u1EADn th\u00F4ng b\u00E1o v\u1EC1 tin t\u1EE9c m\u1EDBi nh\u1EA5t t\u1EEB ch\u00FAng t\u00F4i" }), _jsx(TextField, { fullWidth: true, placeholder: "Nh\u1EADp email c\u1EE7a b\u1EA1n", size: "small", sx: { mb: 2 } }), _jsx(Button, { fullWidth: true, variant: "contained", sx: { backgroundColor: '#f58220', '&:hover': { backgroundColor: '#e6731a' } }, children: "\u0110\u0103ng k\u00FD" })] }) })] })] })] }) }));
};
export default NewsDetailPage;
