import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Pagination, TextField, InputAdornment, Card, CardMedia, CardContent, Rating } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Layout from '../../components/shared/Layout';
import { search_products } from '../../api/client/products';
const ProductCard = ({ product }) => {
    return (_jsxs(Card, { component: Link, to: `/products/${product.slug || product._id}`, sx: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            textDecoration: 'none',
            color: 'inherit',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
            },
        }, children: [_jsx(CardMedia, { component: "img", image: product.images?.[0] || '/placeholder.jpg', alt: product.name, sx: {
                    height: 200,
                    objectFit: 'contain',
                    padding: 2,
                    backgroundColor: '#fafafa'
                } }), _jsxs(CardContent, { sx: { padding: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }, children: [_jsx(Typography, { variant: "h6", sx: {
                            fontWeight: 600,
                            fontSize: '16px',
                            color: '#333',
                            marginBottom: 1,
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            minHeight: '48px'
                        }, children: product.name }), _jsx(Typography, { variant: "body2", sx: {
                            fontSize: '12px',
                            color: '#666',
                            marginBottom: 1,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }, children: product.category?.name }), _jsxs(Typography, { sx: {
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#f58220',
                            marginBottom: 1
                        }, children: [product.price?.toLocaleString('vi-VN'), "\u0111"] }), product.rating && (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 1 }, children: [_jsx(Rating, { value: product.rating, readOnly: true, size: "small", sx: { '& .MuiRating-iconFilled': { color: '#ffc107' } } }), _jsxs(Typography, { sx: { fontSize: '12px', color: '#666' }, children: ["(", product.reviewsCount || 0, ")"] })] }))] })] }));
};
const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentQuery, setCurrentQuery] = useState(query);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        pages: 0
    });
    const currentPage = parseInt(searchParams.get('page') || '1');
    const searchProducts = async (searchQuery, page = 1) => {
        if (!searchQuery.trim()) {
            setProducts([]);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const response = await search_products(searchQuery, {
                page,
                limit: 12,
                sort: '-createdAt'
            });
            setProducts(response.data?.products || []);
            setPagination(response.data?.pagination || {
                page: 1,
                limit: 12,
                total: 0,
                pages: 0
            });
        }
        catch (err) {
            console.error('Search error:', err);
            setError('Không thể tìm kiếm sản phẩm. Vui lòng thử lại.');
            setProducts([]);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (query) {
            setCurrentQuery(query);
            searchProducts(query, currentPage);
        }
    }, [query, currentPage]);
    const handleSearch = (newQuery) => {
        if (newQuery.trim()) {
            setSearchParams({ q: newQuery, page: '1' });
        }
    };
    const handlePageChange = (event, page) => {
        setSearchParams({
            q: query,
            page: page.toString()
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(currentQuery);
        }
    };
    return (_jsx(Layout, { children: _jsx(Box, { sx: { minHeight: '60vh', py: 4 }, children: _jsxs(Box, { className: "container", sx: { maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 3 } }, children: [_jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700, mb: 2, color: '#333' }, children: "T\u00ECm ki\u1EBFm s\u1EA3n ph\u1EA9m" }), _jsx(TextField, { fullWidth: true, placeholder: "Nh\u1EADp t\u00EAn s\u1EA3n ph\u1EA9m c\u1EA7n t\u00ECm...", value: currentQuery, onChange: (e) => setCurrentQuery(e.target.value), onKeyPress: handleKeyPress, InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, { sx: { color: '#666' } }) })),
                                    sx: { fontSize: '16px' }
                                }, sx: {
                                    maxWidth: 600,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#f8f9fa'
                                    }
                                } })] }), query && (_jsxs(Box, { sx: { mb: 3 }, children: [_jsxs(Typography, { variant: "h6", sx: { fontWeight: 600, color: '#333' }, children: ["K\u1EBFt qu\u1EA3 t\u00ECm ki\u1EBFm cho: \"", query, "\""] }), !loading && (_jsxs(Typography, { variant: "body2", sx: { color: '#666', mt: 1 }, children: ["T\u00ECm th\u1EA5y ", pagination.total, " s\u1EA3n ph\u1EA9m"] }))] })), loading && (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', py: 8 }, children: _jsx(CircularProgress, {}) })), error && (_jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error })), !query && !loading && (_jsxs(Box, { sx: { textAlign: 'center', py: 8 }, children: [_jsx(Typography, { variant: "h6", sx: { color: '#666', mb: 2 }, children: "Nh\u1EADp t\u1EEB kh\u00F3a \u0111\u1EC3 t\u00ECm ki\u1EBFm s\u1EA3n ph\u1EA9m" }), _jsx(Typography, { variant: "body2", sx: { color: '#999' }, children: "V\u00ED d\u1EE5: \"m\u00E1y l\u1EA1nh\", \"t\u1EE7 l\u1EA1nh\", \"m\u00E1y gi\u1EB7t\"..." })] })), !loading && query && products.length === 0 && (_jsxs(Box, { sx: { textAlign: 'center', py: 8 }, children: [_jsx(Typography, { variant: "h6", sx: { color: '#666', mb: 2 }, children: "Kh\u00F4ng t\u00ECm th\u1EA5y s\u1EA3n ph\u1EA9m n\u00E0o" }), _jsx(Typography, { variant: "body2", sx: { color: '#999', mb: 3 }, children: "Th\u1EED t\u00ECm ki\u1EBFm v\u1EDBi t\u1EEB kh\u00F3a kh\u00E1c ho\u1EB7c ki\u1EC3m tra l\u1EA1i ch\u00EDnh t\u1EA3" })] })), !loading && products.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Box, { sx: {
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(2, 1fr)',
                                        sm: 'repeat(3, 1fr)',
                                        md: 'repeat(4, 1fr)'
                                    },
                                    gap: 3
                                }, children: products.map((product) => (_jsx(ProductCard, { product: product }, product._id))) }), pagination.pages > 1 && (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', mt: 6 }, children: _jsx(Pagination, { count: pagination.pages, page: pagination.page, onChange: handlePageChange, color: "primary", size: "large", showFirstButton: true, showLastButton: true }) }))] }))] }) }) }));
};
export default SearchPage;
