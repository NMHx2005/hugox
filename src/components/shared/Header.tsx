import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Avatar } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TrendingBar from '../client/Home/TrendingBar';
import { useAppContext } from '../../hooks/useAppContext';
import { get_products_by_category } from '../../api/client/products';

const Header: React.FC = () => {
    const { categories, generalSettings, loading } = useAppContext();

    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    // Hover dropdown state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [categoryProducts, setCategoryProducts] = useState<{ [key: string]: any[] }>({});
    const [loadingProducts, setLoadingProducts] = useState(false);
    const triggerRef = useRef<HTMLDivElement | null>(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Load products for category
    const loadCategoryProducts = async (categorySlug: string) => {
        if (categoryProducts[categorySlug]) return; // Already loaded

        try {
            setLoadingProducts(true);
            const response = await get_products_by_category(categorySlug, { page: 1, limit: 6 });
            const products = response.data?.products || [];
            setCategoryProducts(prev => ({
                ...prev,
                [categorySlug]: products
            }));
        } catch (error) {
            console.error('Error loading category products:', error);
        } finally {
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
                } else {
                    setIsHeaderVisible(true);
                }
            } else {
                setIsScrolled(false);
                setIsHeaderVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    boxShadow: isScrolled ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
                    borderBottom: '1px solid #ddd',
                    paddingTop: '10px',
                    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    zIndex: 1100,
                }}
            >
                <TrendingBar />
                <Toolbar
                    className="container"
                    sx={{
                        width: '100%',
                        padding: { xs: '0 16px', sm: '0 24px' },
                        minHeight: { xs: '56px', sm: '64px' }
                    }}
                >
                    {/* Mobile Layout */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                        {/* Logo */}
                        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}>
                            <Box
                                component="img"
                                src={generalSettings?.logo || "/logo.jpg"}
                                alt={generalSettings?.siteName || "Lumias logo"}
                                sx={{ width: 200, height: 70 }}
                            />
                        </Box>

                        {/* Right Icons */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton sx={{ color: '#000', padding: '8px' }}>
                                <SearchIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                            <IconButton sx={{ color: '#000', padding: '8px' }} onClick={() => setIsMobileMenuOpen(true)}>
                                <MenuIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Desktop Layout */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: '100%' }}>
                        {/* Logo */}
                        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}>
                            <Box
                                component="img"
                                src={generalSettings?.logo || "/logo.jpg"}
                                alt={generalSettings?.siteName || "Lumias logo"}
                                sx={{ width: 200, height: 70 }}
                            />
                        </Box>

                        {/* Navigation */}
                        <Box sx={{ flexGrow: 1, marginLeft: 5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Link to="/featured" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 700 }}>
                                    Mới & Nổi Bật
                                </Link>

                                {/* Categories with product dropdowns */}
                                {!loading && categories.slice(0, 6).map((category) => (
                                    <Box
                                        key={category._id}
                                        sx={{ position: 'relative' }}
                                        onMouseEnter={() => {
                                            setHoveredCategory(category.slug);
                                            loadCategoryProducts(category.slug);
                                        }}
                                        onMouseLeave={() => setHoveredCategory(null)}
                                    >
                                        <Link
                                            to={`/categories/${category.slug}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#000',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                display: 'block',
                                                padding: '8px 0'
                                            }}
                                        >
                                            {category.name}
                                        </Link>

                                        {/* Product dropdown */}
                                        {hoveredCategory === category.slug && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: 0,
                                                    backgroundColor: '#fff',
                                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                    borderRadius: '8px',
                                                    padding: 2,
                                                    minWidth: '300px',
                                                    zIndex: 1200,
                                                }}
                                                onMouseEnter={() => setHoveredCategory(category.slug)}
                                                onMouseLeave={() => setHoveredCategory(null)}
                                            >
                                                <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, mb: 1, color: '#f58220' }}>
                                                    {category.name}
                                                </Typography>

                                                {loadingProducts ? (
                                                    <Typography sx={{ fontSize: '12px', color: '#666' }}>
                                                        Đang tải...
                                                    </Typography>
                                                ) : categoryProducts[category.slug]?.length > 0 ? (
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                        {categoryProducts[category.slug].slice(0, 4).map((product) => (
                                                            <Box
                                                                key={product._id}
                                                                component={Link}
                                                                to={`/products/${product.slug}`}
                                                                sx={{
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
                                                                }}
                                                            >
                                                                <Avatar
                                                                    src={product.images?.[0]}
                                                                    sx={{ width: 32, height: 32 }}
                                                                    variant="rounded"
                                                                />
                                                                <Box>
                                                                    <Typography sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.2 }}>
                                                                        {product.name}
                                                                    </Typography>
                                                                    <Typography sx={{ fontSize: '11px', color: '#f58220', fontWeight: 600 }}>
                                                                        {product.price?.toLocaleString('vi-VN')}đ
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        ))}
                                                        <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #eee' }}>
                                                            <Link
                                                                to={`/categories/${category.slug}`}
                                                                style={{
                                                                    fontSize: '12px',
                                                                    color: '#f58220',
                                                                    textDecoration: 'none',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                Xem tất cả →
                                                            </Link>
                                                        </Box>
                                                    </Box>
                                                ) : (
                                                    <Typography sx={{ fontSize: '12px', color: '#666' }}>
                                                        Chưa có sản phẩm
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                ))}

                                <Link to="/news" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                    Tin tức
                                </Link>
                                <Link to="/reviews" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                    Reviews
                                </Link>
                            </Box>
                        </Box>

                        {/* Search Icon */}
                        <IconButton sx={{ color: '#000' }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer (rendered outside AppBar to avoid stacking issues) */}
            {isMobileMenuOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        zIndex: 2000,
                        display: { xs: 'block', md: 'none' },
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '78%',
                            maxWidth: '360px',
                            backgroundColor: '#fff',
                            padding: 2,
                            overflowY: 'auto',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                            <Box component="img" src={generalSettings?.logo || "/logo.jpg"} alt={generalSettings?.siteName || "Lumias logo"} sx={{ width: 160, height: 56 }} />
                            <Box onClick={() => setIsMobileMenuOpen(false)} sx={{ marginLeft: 'auto', fontSize: '14px', cursor: 'pointer' }}>Đóng</Box>
                        </Box>
                        <Box sx={{ fontWeight: 700, fontSize: '14px', marginBottom: 1 }}>Danh mục</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {/* Static menu items */}
                            <Link
                                to="/"
                                style={{
                                    display: 'block',
                                    padding: '12px 8px',
                                    borderBottom: '1px solid #f0f0f0',
                                    textDecoration: 'none',
                                    color: '#222',
                                    fontSize: '14px'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Trang chủ
                            </Link>
                            <Link
                                to="/featured"
                                style={{
                                    display: 'block',
                                    padding: '12px 8px',
                                    borderBottom: '1px solid #f0f0f0',
                                    textDecoration: 'none',
                                    color: '#222',
                                    fontSize: '14px'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Mới & Nổi Bật
                            </Link>
                            <Link
                                to="/news"
                                style={{
                                    display: 'block',
                                    padding: '12px 8px',
                                    borderBottom: '1px solid #f0f0f0',
                                    textDecoration: 'none',
                                    color: '#222',
                                    fontSize: '14px'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Tin tức
                            </Link>
                            <Link
                                to="/reviews"
                                style={{
                                    display: 'block',
                                    padding: '12px 8px',
                                    borderBottom: '1px solid #f0f0f0',
                                    textDecoration: 'none',
                                    color: '#222',
                                    fontSize: '14px'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Reviews
                            </Link>
                            <Link
                                to="/contact"
                                style={{
                                    display: 'block',
                                    padding: '12px 8px',
                                    borderBottom: '1px solid #f0f0f0',
                                    textDecoration: 'none',
                                    color: '#222',
                                    fontSize: '14px'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Liên hệ
                            </Link>

                            {/* Categories from API */}
                            {!loading && categories.map((category) => (
                                <Link
                                    key={category._id}
                                    to={`/categories/${category.slug}`}
                                    style={{
                                        display: 'block',
                                        padding: '12px 8px',
                                        borderBottom: '1px solid #f0f0f0',
                                        textDecoration: 'none',
                                        color: '#222',
                                        fontSize: '14px'
                                    }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Header;
