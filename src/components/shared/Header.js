import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Avatar, Dialog, DialogContent, TextField, InputAdornment, CircularProgress } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import TrendingBar from '../client/Home/TrendingBar';
import { useAppContext } from '../../hooks/useAppContext';
import { get_products_by_category, search_products } from '../../api/client/products';
const Header = () => {
    const { categories, generalSettings, loading } = useAppContext();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    // Hover dropdown state
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState({});
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileCategories, setOpenMobileCategories] = useState([]);
    // Search modal state
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchInputRef = useRef(null);
    // Load products for category
    const loadCategoryProducts = async (categorySlug) => {
        if (categoryProducts[categorySlug])
            return; // Already loaded
        try {
            setLoadingProducts(true);
            const response = await get_products_by_category(categorySlug, { page: 1, limit: 6 });
            const products = response.data?.products || [];
            setCategoryProducts(prev => ({
                ...prev,
                [categorySlug]: products
            }));
        }
        catch (error) {
            console.error('Error loading category products:', error);
        }
        finally {
            setLoadingProducts(false);
        }
    };
    // Helper functions for organizing categories
    const getParentCategories = () => {
        return categories.filter(cat => !cat.parent);
    };
    const getChildCategories = (parentId) => {
        return categories.filter(cat => cat.parent === parentId);
    };
    const toggleMobileCategory = (categoryId) => {
        setOpenMobileCategories(prev => prev.includes(categoryId)
            ? prev.filter(id => id !== categoryId)
            : [...prev, categoryId]);
    };
    // Search functions
    const handleSearchOpen = () => {
        setIsSearchOpen(true);
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 100);
    };
    const handleSearchClose = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };
    const handleSearchChange = async (query) => {
        setSearchQuery(query);
        if (query.trim().length === 0) {
            setSearchResults([]);
            return;
        }
        if (query.trim().length < 2)
            return; // Wait for at least 2 characters
        try {
            setIsSearching(true);
            const response = await search_products(query, { page: 1, limit: 8 });
            setSearchResults(response.data?.products || []);
        }
        catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        }
        finally {
            setIsSearching(false);
        }
    };
    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            handleSearchClose();
        }
    };
    const handleProductClick = (productSlug) => {
        navigate(`/products/${productSlug}`);
        handleSearchClose();
    };
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                setIsScrolled(true);
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    setIsHeaderVisible(false);
                }
                else {
                    setIsHeaderVisible(true);
                }
            }
            else {
                setIsScrolled(false);
                setIsHeaderVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);
    return (_jsxs(_Fragment, { children: [_jsxs(AppBar, { position: "fixed", sx: {
                    backgroundColor: '#fff',
                    color: '#000',
                    boxShadow: isScrolled ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
                    borderBottom: '1px solid #ddd',
                    paddingTop: '10px',
                    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    zIndex: 1100,
                }, children: [_jsx(TrendingBar, {}), _jsxs(Toolbar, { className: "container", sx: {
                            width: '100%',
                            padding: { xs: '0 16px', sm: '0 24px' },
                            minHeight: { xs: '56px', sm: '64px' }
                        }, children: [_jsxs(Box, { sx: { display: { xs: 'flex', md: 'none' }, alignItems: 'center', width: '100%', justifyContent: 'space-between' }, children: [_jsx(Box, { component: Link, to: "/", sx: { display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }, children: _jsx(Box, { component: "img", src: generalSettings?.logo || "/logo.jpg", alt: generalSettings?.siteName || "Lumias logo", sx: { width: 200, height: 70 } }) }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(IconButton, { sx: { color: '#000', padding: '8px' }, onClick: handleSearchOpen, children: _jsx(SearchIcon, { sx: { fontSize: '20px' } }) }), _jsx(IconButton, { sx: { color: '#000', padding: '8px' }, onClick: () => setIsMobileMenuOpen(true), children: _jsx(MenuIcon, { sx: { fontSize: '20px' } }) })] })] }), _jsxs(Box, { sx: { display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: '100%' }, children: [_jsx(Box, { component: Link, to: "/", sx: { display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }, children: _jsx(Box, { component: "img", src: generalSettings?.logo || "/logo.jpg", alt: generalSettings?.siteName || "Lumias logo", sx: { width: 200, height: 70 } }) }), _jsx(Box, { sx: { flexGrow: 1, marginLeft: 5 }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 3 }, children: [_jsx(Link, { to: "/featured", style: { textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 700 }, children: "M\u1EDBi & N\u1ED5i B\u1EADt" }), !loading && categories.slice(0, 6).map((category) => (_jsxs(Box, { sx: { position: 'relative' }, onMouseEnter: () => {
                                                        setHoveredCategory(category.slug);
                                                        loadCategoryProducts(category.slug);
                                                    }, onMouseLeave: () => setHoveredCategory(null), children: [_jsx(Link, { to: `/categories/${category.slug}`, style: {
                                                                textDecoration: 'none',
                                                                color: '#000',
                                                                fontSize: '14px',
                                                                fontWeight: 500,
                                                                display: 'block',
                                                                padding: '8px 0'
                                                            }, children: category.name }), hoveredCategory === category.slug && (_jsxs(Box, { sx: {
                                                                position: 'absolute',
                                                                top: '100%',
                                                                left: 0,
                                                                backgroundColor: '#fff',
                                                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                                borderRadius: '8px',
                                                                padding: 2,
                                                                minWidth: '300px',
                                                                zIndex: 1200,
                                                            }, onMouseEnter: () => setHoveredCategory(category.slug), onMouseLeave: () => setHoveredCategory(null), children: [_jsx(Typography, { variant: "h6", sx: { fontSize: '14px', fontWeight: 600, mb: 1, color: '#f58220' }, children: category.name }), loadingProducts ? (_jsx(Typography, { sx: { fontSize: '12px', color: '#666' }, children: "\u0110ang t\u1EA3i..." })) : categoryProducts[category.slug]?.length > 0 ? (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 1 }, children: [categoryProducts[category.slug].slice(0, 4).map((product) => (_jsxs(Box, { component: Link, to: `/products/${product.slug}`, sx: {
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: 1,
                                                                                padding: '6px 8px',
                                                                                borderRadius: '4px',
                                                                                textDecoration: 'none',
                                                                                color: 'inherit',
                                                                                transition: 'background-color 0.2s ease',
                                                                                '&:hover': {
                                                                                    backgroundColor: '#f8f9fa'
                                                                                }
                                                                            }, children: [_jsx(Avatar, { src: product.images?.[0], sx: { width: 32, height: 32 }, variant: "rounded" }), _jsxs(Box, { sx: { flex: 1, minWidth: 0 }, children: [_jsx(Typography, { sx: {
                                                                                                fontSize: '12px',
                                                                                                fontWeight: 500,
                                                                                                lineHeight: 1.2,
                                                                                                overflow: 'hidden',
                                                                                                textOverflow: 'ellipsis',
                                                                                                whiteSpace: 'nowrap',
                                                                                                maxWidth: '150px'
                                                                                            }, children: product.name }), _jsxs(Typography, { sx: { fontSize: '11px', color: '#f58220', fontWeight: 600 }, children: [product.price?.toLocaleString('vi-VN'), "\u0111"] })] })] }, product._id))), _jsx(Box, { sx: { mt: 1, pt: 1, borderTop: '1px solid #eee' }, children: _jsx(Link, { to: `/categories/${category.slug}`, style: {
                                                                                    fontSize: '12px',
                                                                                    color: '#f58220',
                                                                                    textDecoration: 'none',
                                                                                    fontWeight: 500
                                                                                }, children: "Xem t\u1EA5t c\u1EA3 \u2192" }) })] })) : (_jsx(Typography, { sx: { fontSize: '12px', color: '#666' }, children: "Ch\u01B0a c\u00F3 s\u1EA3n ph\u1EA9m" }))] }))] }, category._id))), _jsx(Link, { to: "/news", style: { textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }, children: "Tin t\u1EE9c" }), _jsx(Link, { to: "/reviews", style: { textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }, children: "Reviews" })] }) }), _jsx(IconButton, { sx: { color: '#000' }, onClick: handleSearchOpen, children: _jsx(SearchIcon, {}) })] })] })] }), isMobileMenuOpen && (_jsx(Box, { sx: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    zIndex: 2000,
                    display: { xs: 'block', md: 'none' },
                }, onClick: () => setIsMobileMenuOpen(false), children: _jsxs(Box, { onClick: (e) => e.stopPropagation(), sx: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '78%',
                        maxWidth: '360px',
                        backgroundColor: '#fff',
                        padding: 2,
                        overflowY: 'auto',
                    }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }, children: [_jsx(Box, { component: "img", src: generalSettings?.logo || "/logo.jpg", alt: generalSettings?.siteName || "Lumias logo", sx: { width: 160, height: 56 } }), _jsx(Box, { onClick: () => setIsMobileMenuOpen(false), sx: { marginLeft: 'auto', fontSize: '14px', cursor: 'pointer' }, children: "\u0110\u00F3ng" })] }), _jsx(Box, { sx: { fontWeight: 700, fontSize: '14px', marginBottom: 1 }, children: "Danh m\u1EE5c" }), _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column' }, children: [_jsx(Link, { to: "/", style: {
                                        display: 'block',
                                        padding: '12px 8px',
                                        borderBottom: '1px solid #f0f0f0',
                                        textDecoration: 'none',
                                        color: '#222',
                                        fontSize: '14px'
                                    }, onClick: () => setIsMobileMenuOpen(false), children: "Trang ch\u1EE7" }), _jsx(Link, { to: "/featured", style: {
                                        display: 'block',
                                        padding: '12px 8px',
                                        borderBottom: '1px solid #f0f0f0',
                                        textDecoration: 'none',
                                        color: '#222',
                                        fontSize: '14px'
                                    }, onClick: () => setIsMobileMenuOpen(false), children: "M\u1EDBi & N\u1ED5i B\u1EADt" }), _jsx(Link, { to: "/news", style: {
                                        display: 'block',
                                        padding: '12px 8px',
                                        borderBottom: '1px solid #f0f0f0',
                                        textDecoration: 'none',
                                        color: '#222',
                                        fontSize: '14px'
                                    }, onClick: () => setIsMobileMenuOpen(false), children: "Tin t\u1EE9c" }), _jsx(Link, { to: "/reviews", style: {
                                        display: 'block',
                                        padding: '12px 8px',
                                        borderBottom: '1px solid #f0f0f0',
                                        textDecoration: 'none',
                                        color: '#222',
                                        fontSize: '14px'
                                    }, onClick: () => setIsMobileMenuOpen(false), children: "Reviews" }), _jsx(Link, { to: "/contact", style: {
                                        display: 'block',
                                        padding: '12px 8px',
                                        borderBottom: '1px solid #f0f0f0',
                                        textDecoration: 'none',
                                        color: '#222',
                                        fontSize: '14px'
                                    }, onClick: () => setIsMobileMenuOpen(false), children: "Li\u00EAn h\u1EC7" }), !loading && categories.map((category) => {
                                    const childCategories = getChildCategories(category._id);
                                    const isOpen = openMobileCategories.includes(category._id);
                                    const hasChildren = childCategories.length > 0;
                                    const hasProducts = categoryProducts[category.slug]?.length > 0;
                                    // Show dropdown arrow if has children OR if we want to show products
                                    const showDropdown = hasChildren || true; // Always show dropdown for now
                                    return (_jsxs(Box, { children: [_jsxs(Box, { sx: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '12px 8px',
                                                    borderBottom: '1px solid #f0f0f0',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: '#f5f5f5'
                                                    }
                                                }, onClick: () => {
                                                    if (showDropdown) {
                                                        toggleMobileCategory(category._id);
                                                        // Load products when opening dropdown
                                                        if (!isOpen) {
                                                            loadCategoryProducts(category.slug);
                                                        }
                                                    }
                                                    else {
                                                        // Navigate to category directly
                                                        window.location.href = `/categories/${category.slug}`;
                                                        setIsMobileMenuOpen(false);
                                                    }
                                                }, children: [_jsx(Typography, { sx: {
                                                            flex: 1,
                                                            color: '#222',
                                                            fontSize: '14px',
                                                            fontWeight: hasChildren ? 600 : 400
                                                        }, children: category.name }), showDropdown && (isOpen ? _jsx(ExpandLessIcon, { sx: { fontSize: 18, color: '#666' } }) : _jsx(ExpandMoreIcon, { sx: { fontSize: 18, color: '#666' } }))] }), showDropdown && isOpen && (_jsxs(Box, { sx: { backgroundColor: '#f9f9f9' }, children: [_jsxs(Link, { to: `/categories/${category.slug}`, style: {
                                                            display: 'block',
                                                            padding: '8px 24px',
                                                            borderBottom: '1px solid #e0e0e0',
                                                            textDecoration: 'none',
                                                            color: '#f58220',
                                                            fontSize: '13px',
                                                            fontWeight: 500
                                                        }, onClick: () => setIsMobileMenuOpen(false), children: ["T\u1EA5t c\u1EA3 ", category.name] }), hasChildren && childCategories.map((childCategory) => (_jsx(Link, { to: `/categories/${childCategory.slug}`, style: {
                                                            display: 'block',
                                                            padding: '8px 24px',
                                                            borderBottom: '1px solid #e0e0e0',
                                                            textDecoration: 'none',
                                                            color: '#555',
                                                            fontSize: '13px'
                                                        }, onClick: () => setIsMobileMenuOpen(false), children: childCategory.name }, childCategory._id))), loadingProducts && (_jsx(Box, { sx: { padding: '8px 24px', fontSize: '12px', color: '#666' }, children: "\u0110ang t\u1EA3i s\u1EA3n ph\u1EA9m..." })), !loadingProducts && hasProducts && (_jsxs(Box, { children: [_jsx(Typography, { sx: { padding: '8px 24px', fontSize: '12px', fontWeight: 600, color: '#888', borderBottom: '1px solid #e0e0e0' }, children: "S\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt" }), categoryProducts[category.slug].slice(0, 3).map((product) => (_jsxs(Link, { to: `/products/${product.slug}`, style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '8px',
                                                                    padding: '8px 24px',
                                                                    borderBottom: '1px solid #e0e0e0',
                                                                    textDecoration: 'none',
                                                                    color: '#555'
                                                                }, onClick: () => setIsMobileMenuOpen(false), children: [_jsx(Avatar, { src: product.images?.[0], sx: { width: 24, height: 24 }, variant: "rounded" }), _jsxs(Box, { sx: { flex: 1, minWidth: 0 }, children: [_jsx(Typography, { sx: {
                                                                                    fontSize: '12px',
                                                                                    fontWeight: 500,
                                                                                    lineHeight: 1.2,
                                                                                    overflow: 'hidden',
                                                                                    textOverflow: 'ellipsis',
                                                                                    whiteSpace: 'nowrap',
                                                                                    maxWidth: '180px'
                                                                                }, children: product.name }), _jsxs(Typography, { sx: { fontSize: '11px', color: '#f58220', fontWeight: 600 }, children: [product.price?.toLocaleString('vi-VN'), "\u0111"] })] })] }, product._id)))] })), !loadingProducts && !hasProducts && (_jsx(Box, { sx: { padding: '8px 24px', fontSize: '12px', color: '#999' }, children: "Ch\u01B0a c\u00F3 s\u1EA3n ph\u1EA9m" }))] }))] }, category._id));
                                })] })] }) })), _jsx(Dialog, { open: isSearchOpen, onClose: handleSearchClose, maxWidth: "md", fullWidth: true, PaperProps: {
                    sx: {
                        borderRadius: 2,
                        maxHeight: '80vh',
                        margin: { xs: 1, md: 2 }
                    }
                }, children: _jsxs(DialogContent, { sx: { padding: 0 }, children: [_jsxs(Box, { sx: { padding: 3, borderBottom: '1px solid #eee' }, children: [_jsx(TextField, { ref: searchInputRef, fullWidth: true, placeholder: "T\u00ECm ki\u1EBFm s\u1EA3n ph\u1EA9m...", value: searchQuery, onChange: (e) => handleSearchChange(e.target.value), onKeyDown: (e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchSubmit();
                                        }
                                    }, InputProps: {
                                        startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, { sx: { color: '#666' } }) })),
                                        endAdornment: (_jsx(InputAdornment, { position: "end", children: isSearching ? (_jsx(CircularProgress, { size: 20 })) : (_jsx(IconButton, { onClick: handleSearchClose, edge: "end", children: _jsx(CloseIcon, {}) })) })),
                                        sx: {
                                            fontSize: '16px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none'
                                            }
                                        }
                                    }, sx: {
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: 2
                                        }
                                    } }), searchQuery.trim() && (_jsx(Box, { sx: { mt: 2, display: 'flex', alignItems: 'center', gap: 1 }, children: _jsxs(Typography, { variant: "body2", sx: { color: '#666' }, children: ["Nh\u1EA5n Enter \u0111\u1EC3 t\u00ECm ki\u1EBFm \"", searchQuery, "\""] }) }))] }), searchResults.length > 0 && (_jsxs(Box, { sx: { padding: 2 }, children: [_jsx(Typography, { variant: "h6", sx: { fontSize: '16px', fontWeight: 600, mb: 2, color: '#333' }, children: "K\u1EBFt qu\u1EA3 t\u00ECm ki\u1EBFm" }), _jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 1 }, children: searchResults.map((product) => (_jsxs(Box, { onClick: () => handleProductClick(product.slug), sx: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            padding: 2,
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: '#f8f9fa'
                                            }
                                        }, children: [_jsx(Avatar, { src: product.images?.[0], sx: { width: 48, height: 48 }, variant: "rounded" }), _jsxs(Box, { sx: { flex: 1, minWidth: 0 }, children: [_jsx(Typography, { variant: "body2", sx: {
                                                            fontWeight: 500,
                                                            color: '#333',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }, children: product.name }), _jsxs(Typography, { variant: "body2", sx: {
                                                            color: '#f58220',
                                                            fontWeight: 600,
                                                            mt: 0.5
                                                        }, children: [product.price?.toLocaleString('vi-VN'), "\u0111"] }), product.category?.name && (_jsx(Typography, { variant: "caption", sx: { color: '#666' }, children: product.category.name }))] })] }, product._id))) }), searchQuery.trim() && (_jsx(Box, { sx: { mt: 2, pt: 2, borderTop: '1px solid #eee' }, children: _jsxs(Typography, { variant: "body2", onClick: handleSearchSubmit, sx: {
                                            color: '#f58220',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }, children: ["Xem t\u1EA5t c\u1EA3 k\u1EBFt qu\u1EA3 cho \"", searchQuery, "\" \u2192"] }) }))] })), !isSearching && searchQuery.trim().length >= 2 && searchResults.length === 0 && (_jsxs(Box, { sx: { padding: 3, textAlign: 'center' }, children: [_jsxs(Typography, { variant: "body2", sx: { color: '#666', mb: 1 }, children: ["Kh\u00F4ng t\u00ECm th\u1EA5y s\u1EA3n ph\u1EA9m n\u00E0o cho \"", searchQuery, "\""] }), _jsx(Typography, { variant: "body2", sx: { color: '#999' }, children: "Th\u1EED t\u00ECm ki\u1EBFm v\u1EDBi t\u1EEB kh\u00F3a kh\u00E1c" })] })), searchQuery.trim().length === 0 && (_jsx(Box, { sx: { padding: 3, textAlign: 'center' }, children: _jsx(Typography, { variant: "body2", sx: { color: '#666' }, children: "Nh\u1EADp t\u00EAn s\u1EA3n ph\u1EA9m \u0111\u1EC3 t\u00ECm ki\u1EBFm" }) }))] }) })] }));
};
export default Header;
