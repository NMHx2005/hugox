import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Avatar } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TrendingBar from '../client/Home/TrendingBar';
import { useAppContext } from '../../hooks/useAppContext';
import { get_products_by_category } from '../../api/client/products';
const Header = () => {
    const { categories, generalSettings, loading } = useAppContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    // Hover dropdown state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState({});
    const [loadingProducts, setLoadingProducts] = useState(false);
    const triggerRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                        }, children: [_jsxs(Box, { sx: { display: { xs: 'flex', md: 'none' }, alignItems: 'center', width: '100%', justifyContent: 'space-between' }, children: [_jsx(Box, { component: Link, to: "/", sx: { display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }, children: _jsx(Box, { component: "img", src: generalSettings?.logo || "/logo.jpg", alt: generalSettings?.siteName || "Lumias logo", sx: { width: 200, height: 70 } }) }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(IconButton, { sx: { color: '#000', padding: '8px' }, children: _jsx(SearchIcon, { sx: { fontSize: '20px' } }) }), _jsx(IconButton, { sx: { color: '#000', padding: '8px' }, onClick: () => setIsMobileMenuOpen(true), children: _jsx(MenuIcon, { sx: { fontSize: '20px' } }) })] })] }), _jsxs(Box, { sx: { display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: '100%' }, children: [_jsx(Box, { component: Link, to: "/", sx: { display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }, children: _jsx(Box, { component: "img", src: generalSettings?.logo || "/logo.jpg", alt: generalSettings?.siteName || "Lumias logo", sx: { width: 200, height: 70 } }) }), _jsx(Box, { sx: { flexGrow: 1, marginLeft: 5 }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 3 }, children: [_jsx(Link, { to: "/featured", style: { textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 700 }, children: "M\u1EDBi & N\u1ED5i B\u1EADt" }), !loading && categories.slice(0, 6).map((category) => (_jsxs(Box, { sx: { position: 'relative' }, onMouseEnter: () => {
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
                                                                            }, children: [_jsx(Avatar, { src: product.images?.[0], sx: { width: 32, height: 32 }, variant: "rounded" }), _jsxs(Box, { children: [_jsx(Typography, { sx: { fontSize: '12px', fontWeight: 500, lineHeight: 1.2 }, children: product.name }), _jsxs(Typography, { sx: { fontSize: '11px', color: '#f58220', fontWeight: 600 }, children: [product.price?.toLocaleString('vi-VN'), "\u0111"] })] })] }, product._id))), _jsx(Box, { sx: { mt: 1, pt: 1, borderTop: '1px solid #eee' }, children: _jsx(Link, { to: `/categories/${category.slug}`, style: {
                                                                                    fontSize: '12px',
                                                                                    color: '#f58220',
                                                                                    textDecoration: 'none',
                                                                                    fontWeight: 500
                                                                                }, children: "Xem t\u1EA5t c\u1EA3 \u2192" }) })] })) : (_jsx(Typography, { sx: { fontSize: '12px', color: '#666' }, children: "Ch\u01B0a c\u00F3 s\u1EA3n ph\u1EA9m" }))] }))] }, category._id))), _jsx(Link, { to: "/news", style: { textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }, children: "Tin t\u1EE9c" }), _jsx(Link, { to: "/reviews", style: { textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }, children: "Reviews" })] }) }), _jsx(IconButton, { sx: { color: '#000' }, children: _jsx(SearchIcon, {}) })] })] })] }), isMobileMenuOpen && (_jsx(Box, { sx: {
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
                                    }, onClick: () => setIsMobileMenuOpen(false), children: "Li\u00EAn h\u1EC7" }), !loading && categories.map((category) => (_jsx(Link, { to: `/categories/${category.slug}`, style: {
                                        display: 'block',
                                        padding: '12px 8px',
                                        borderBottom: '1px solid #f0f0f0',
                                        textDecoration: 'none',
                                        color: '#222',
                                        fontSize: '14px'
                                    }, onClick: () => setIsMobileMenuOpen(false), children: category.name }, category._id)))] })] }) }))] }));
};
export default Header;
