import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Chip, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Pagination, CircularProgress, Alert, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Search as SearchIcon, CalendarToday as CalendarIcon, Person as PersonIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_news, get_news_categories } from '../../api/client/news';
const NewsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
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
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [sort, setSort] = useState(searchParams.get('sort') || '-publishedAt');
    useEffect(() => {
        loadNews();
    }, [searchParams]);
    useEffect(() => {
        loadCategories();
    }, []);
    const loadNews = async () => {
        try {
            setLoading(true);
            setError(null);
            const params = {
                page: Number(searchParams.get('page')) || 1,
                limit: 12,
                category: searchParams.get('category') || undefined,
                search: searchParams.get('search') || undefined,
                sort: searchParams.get('sort') || '-publishedAt'
            };
            const response = await get_news(params);
            setNews(response.data.news);
            setPagination(response.data.pagination);
        }
        catch (err) {
            console.error('Error loading news:', err);
            setError('Không thể tải danh sách tin tức');
        }
        finally {
            setLoading(false);
        }
    };
    const loadCategories = async () => {
        try {
            const categoriesData = await get_news_categories();
            setCategories(categoriesData);
        }
        catch (err) {
            console.error('Error loading categories:', err);
        }
    };
    const handleSearch = () => {
        const newParams = new URLSearchParams();
        if (search)
            newParams.set('search', search);
        if (category)
            newParams.set('category', category);
        if (sort !== '-publishedAt')
            newParams.set('sort', sort);
        newParams.set('page', '1');
        setSearchParams(newParams);
    };
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        const newParams = new URLSearchParams(searchParams);
        if (newCategory) {
            newParams.set('category', newCategory);
        }
        else {
            newParams.delete('category');
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
    if (loading) {
        return (_jsx(Layout, { children: _jsx(Box, { className: "container", sx: { mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }, children: _jsx(CircularProgress, {}) }) }));
    }
    if (error) {
        return (_jsx(Layout, { children: _jsx(Box, { className: "container", sx: { mt: 3 }, children: _jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error }) }) }));
    }
    return (_jsx(Layout, { children: _jsxs(Box, { className: "container", sx: { mt: 3 }, children: [_jsxs(Breadcrumbs, { sx: { mb: 3 }, children: [_jsx(MuiLink, { component: Link, to: "/", color: "inherit", children: "Trang ch\u1EE7" }), _jsx(Typography, { color: "text.primary", children: "Tin t\u1EE9c" })] }), _jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Typography, { variant: "h3", component: "h1", sx: { fontWeight: 700, mb: 2 }, children: "Tin t\u1EE9c & S\u1EF1 ki\u1EC7n" }), _jsx(Typography, { variant: "body1", color: "text.secondary", sx: { mb: 3 }, children: "C\u1EADp nh\u1EADt nh\u1EEFng tin t\u1EE9c m\u1EDBi nh\u1EA5t v\u1EC1 s\u1EA3n ph\u1EA9m, c\u00F4ng ngh\u1EC7 v\u00E0 s\u1EF1 ki\u1EC7n c\u1EE7a ch\u00FAng t\u00F4i" })] }), _jsxs(Box, { sx: { mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx(TextField, { placeholder: "T\u00ECm ki\u1EBFm tin t\u1EE9c...", value: search, onChange: (e) => setSearch(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleSearch(), InputProps: {
                                startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, {}) })),
                            }, sx: { minWidth: 300 } }), _jsxs(FormControl, { sx: { minWidth: 150 }, children: [_jsx(InputLabel, { children: "Danh m\u1EE5c" }), _jsxs(Select, { value: category, onChange: (e) => handleCategoryChange(e.target.value), label: "Danh m\u1EE5c", children: [_jsx(MenuItem, { value: "", children: "T\u1EA5t c\u1EA3" }), categories.map((cat) => (_jsx(MenuItem, { value: cat, children: cat }, cat)))] })] }), _jsxs(FormControl, { sx: { minWidth: 150 }, children: [_jsx(InputLabel, { children: "S\u1EAFp x\u1EBFp" }), _jsxs(Select, { value: sort, onChange: (e) => handleSortChange(e.target.value), label: "S\u1EAFp x\u1EBFp", children: [_jsx(MenuItem, { value: "-publishedAt", children: "M\u1EDBi nh\u1EA5t" }), _jsx(MenuItem, { value: "publishedAt", children: "C\u0169 nh\u1EA5t" }), _jsx(MenuItem, { value: "-views", children: "Xem nhi\u1EC1u" }), _jsx(MenuItem, { value: "views", children: "\u00CDt xem" })] })] }), _jsx(Box, { sx: { ml: 'auto' }, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [pagination.total, " b\u00E0i vi\u1EBFt"] }) })] }), news.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }, children: news.map((article) => (_jsx(Box, { children: _jsxs(Card, { sx: {
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 3
                                        }
                                    }, children: [article.featuredImage && (_jsx(CardMedia, { component: "img", height: "200", image: article.featuredImage, alt: article.title, sx: { objectFit: 'cover' } })), _jsxs(CardContent, { sx: { flexGrow: 1, display: 'flex', flexDirection: 'column' }, children: [_jsxs(Box, { sx: { mb: 2 }, children: [_jsx(Chip, { label: article.category, size: "small", sx: {
                                                                backgroundColor: '#f58220',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                mb: 1
                                                            } }), article.featured && (_jsx(Chip, { label: "N\u1ED5i b\u1EADt", size: "small", color: "secondary", sx: { ml: 1, mb: 1 } }))] }), _jsx(Typography, { variant: "h6", component: "h2", sx: {
                                                        fontWeight: 700,
                                                        mb: 2,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        minHeight: '3.2em'
                                                    }, children: _jsx(Link, { to: `/news/${article._id}`, style: { textDecoration: 'none', color: 'inherit' }, children: article.title }) }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: {
                                                        mb: 2,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        flexGrow: 1
                                                    }, children: article.excerpt || article.content.substring(0, 150) + '...' }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 0.5 }, children: [_jsx(PersonIcon, { sx: { fontSize: 16, color: 'text.secondary' } }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: article.author.name })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 0.5 }, children: [_jsx(CalendarIcon, { sx: { fontSize: 16, color: 'text.secondary' } }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: formatDate(article.publishedAt || article.createdAt) })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 0.5 }, children: [_jsx(VisibilityIcon, { sx: { fontSize: 16, color: 'text.secondary' } }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: article.views })] })] })] })] }) }, article._id))) }), pagination.pages > 1 && (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', mt: 4 }, children: _jsx(Pagination, { count: pagination.pages, page: pagination.page, onChange: handlePageChange, color: "primary", size: "large" }) }))] })) : (_jsxs(Box, { sx: { textAlign: 'center', py: 8 }, children: [_jsx(Typography, { variant: "h5", color: "text.secondary", sx: { mb: 2 }, children: "Kh\u00F4ng t\u00ECm th\u1EA5y tin t\u1EE9c n\u00E0o" }), _jsx(Typography, { variant: "body1", color: "text.secondary", children: "H\u00E3y th\u1EED thay \u0111\u1ED5i b\u1ED9 l\u1ECDc ho\u1EB7c t\u1EEB kh\u00F3a t\u00ECm ki\u1EBFm" })] }))] }) }));
};
export default NewsPage;
