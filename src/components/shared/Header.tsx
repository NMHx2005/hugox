import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Avatar, Dialog, DialogContent, TextField, InputAdornment, CircularProgress } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import TrendingBar from '../client/Home/TrendingBar';
import { useAppContext } from '../../hooks/useAppContext';
import { get_products_by_category, search_products } from '../../api/client/products';

const Header: React.FC = () => {
    const { categories, generalSettings, loading } = useAppContext();
    const navigate = useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    // Hover dropdown state
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [categoryProducts, setCategoryProducts] = useState<{ [key: string]: unknown[] }>({});
    const [loadingProducts, setLoadingProducts] = useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileCategories, setOpenMobileCategories] = useState<string[]>([]);

    // Search modal state
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

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

    // Helper functions for organizing categories
    const getParentCategories = () => {
        return categories.filter(cat => !cat.parent);
    };

    const getChildCategories = (parentId: string) => {
        return categories.filter(cat => cat.parent === parentId);
    };


    const toggleMobileCategory = (categoryId: string) => {
        setOpenMobileCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
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

    const handleSearchChange = async (query: string) => {
        setSearchQuery(query);

        if (query.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        if (query.trim().length < 2) return; // Wait for at least 2 characters

        try {
            setIsSearching(true);
            const response = await search_products(query, { page: 1, limit: 8 });
            setSearchResults(response.data?.products || []);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            handleSearchClose();
        }
    };

    const handleProductClick = (productSlug: string) => {
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
                            <IconButton sx={{ color: '#000', padding: '8px' }} onClick={handleSearchOpen}>
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
                                                        {categoryProducts[category.slug].slice(0, 4).map((product: any) => (
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
                                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                                    <Typography sx={{
                                                                        fontSize: '12px',
                                                                        fontWeight: 500,
                                                                        lineHeight: 1.2,
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap',
                                                                        maxWidth: '150px'
                                                                    }}>
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
                        <IconButton sx={{ color: '#000' }} onClick={handleSearchOpen}>
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

                            {/* Categories from API - All Categories with Dropdown for Products */}
                            {!loading && categories.map((category) => {
                                const childCategories = getChildCategories(category._id);
                                const isOpen = openMobileCategories.includes(category._id);
                                const hasChildren = childCategories.length > 0;
                                const hasProducts = categoryProducts[category.slug]?.length > 0;

                                // Show dropdown arrow if has children OR if we want to show products
                                const showDropdown = hasChildren || true; // Always show dropdown for now

                                return (
                                    <Box key={category._id}>
                                        {/* Category with Dropdown */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '12px 8px',
                                                borderBottom: '1px solid #f0f0f0',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5'
                                                }
                                            }}
                                            onClick={() => {
                                                if (showDropdown) {
                                                    toggleMobileCategory(category._id);
                                                    // Load products when opening dropdown
                                                    if (!isOpen) {
                                                        loadCategoryProducts(category.slug);
                                                    }
                                                } else {
                                                    // Navigate to category directly
                                                    window.location.href = `/categories/${category.slug}`;
                                                    setIsMobileMenuOpen(false);
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    flex: 1,
                                                    color: '#222',
                                                    fontSize: '14px',
                                                    fontWeight: hasChildren ? 600 : 400
                                                }}
                                            >
                                                {category.name}
                                            </Typography>
                                            {showDropdown && (
                                                isOpen ? <ExpandLessIcon sx={{ fontSize: 18, color: '#666' }} /> : <ExpandMoreIcon sx={{ fontSize: 18, color: '#666' }} />
                                            )}
                                        </Box>

                                        {/* Dropdown Content */}
                                        {showDropdown && isOpen && (
                                            <Box sx={{ backgroundColor: '#f9f9f9' }}>
                                                {/* Category link */}
                                                <Link
                                                    to={`/categories/${category.slug}`}
                                                    style={{
                                                        display: 'block',
                                                        padding: '8px 24px',
                                                        borderBottom: '1px solid #e0e0e0',
                                                        textDecoration: 'none',
                                                        color: '#f58220',
                                                        fontSize: '13px',
                                                        fontWeight: 500
                                                    }}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Tất cả {category.name}
                                                </Link>

                                                {/* Child Categories (if any) */}
                                                {hasChildren && childCategories.map((childCategory) => (
                                                    <Link
                                                        key={childCategory._id}
                                                        to={`/categories/${childCategory.slug}`}
                                                        style={{
                                                            display: 'block',
                                                            padding: '8px 24px',
                                                            borderBottom: '1px solid #e0e0e0',
                                                            textDecoration: 'none',
                                                            color: '#555',
                                                            fontSize: '13px'
                                                        }}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {childCategory.name}
                                                    </Link>
                                                ))}

                                                {/* Products in this category */}
                                                {loadingProducts && (
                                                    <Box sx={{ padding: '8px 24px', fontSize: '12px', color: '#666' }}>
                                                        Đang tải sản phẩm...
                                                    </Box>
                                                )}

                                                {!loadingProducts && hasProducts && (
                                                    <Box>
                                                        <Typography sx={{ padding: '8px 24px', fontSize: '12px', fontWeight: 600, color: '#888', borderBottom: '1px solid #e0e0e0' }}>
                                                            Sản phẩm nổi bật
                                                        </Typography>
                                                        {categoryProducts[category.slug].slice(0, 3).map((product: any) => (
                                                            <Link
                                                                key={product._id}
                                                                to={`/products/${product.slug}`}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '8px',
                                                                    padding: '8px 24px',
                                                                    borderBottom: '1px solid #e0e0e0',
                                                                    textDecoration: 'none',
                                                                    color: '#555'
                                                                }}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                            >
                                                                <Avatar
                                                                    src={product.images?.[0]}
                                                                    sx={{ width: 24, height: 24 }}
                                                                    variant="rounded"
                                                                />
                                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                                    <Typography sx={{
                                                                        fontSize: '12px',
                                                                        fontWeight: 500,
                                                                        lineHeight: 1.2,
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap',
                                                                        maxWidth: '180px'
                                                                    }}>
                                                                        {product.name}
                                                                    </Typography>
                                                                    <Typography sx={{ fontSize: '11px', color: '#f58220', fontWeight: 600 }}>
                                                                        {product.price?.toLocaleString('vi-VN')}đ
                                                                    </Typography>
                                                                </Box>
                                                            </Link>
                                                        ))}
                                                    </Box>
                                                )}

                                                {!loadingProducts && !hasProducts && (
                                                    <Box sx={{ padding: '8px 24px', fontSize: '12px', color: '#999' }}>
                                                        Chưa có sản phẩm
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
            )}

            {/* Search Modal */}
            <Dialog
                open={isSearchOpen}
                onClose={handleSearchClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        maxHeight: '80vh',
                        margin: { xs: 1, md: 2 }
                    }
                }}
            >
                <DialogContent sx={{ padding: 0 }}>
                    {/* Search Input */}
                    <Box sx={{ padding: 3, borderBottom: '1px solid #eee' }}>
                        <TextField
                            ref={searchInputRef}
                            fullWidth
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearchSubmit();
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#666' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isSearching ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            <IconButton onClick={handleSearchClose} edge="end">
                                                <CloseIcon />
                                            </IconButton>
                                        )}
                                    </InputAdornment>
                                ),
                                sx: {
                                    fontSize: '16px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    }
                                }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: 2
                                }
                            }}
                        />

                        {searchQuery.trim() && (
                            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    Nhấn Enter để tìm kiếm "{searchQuery}"
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, mb: 2, color: '#333' }}>
                                Kết quả tìm kiếm
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {searchResults.map((product: any) => (
                                    <Box
                                        key={product._id}
                                        onClick={() => handleProductClick(product.slug)}
                                        sx={{
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
                                        }}
                                    >
                                        <Avatar
                                            src={product.images?.[0]}
                                            sx={{ width: 48, height: 48 }}
                                            variant="rounded"
                                        />
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 500,
                                                    color: '#333',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#f58220',
                                                    fontWeight: 600,
                                                    mt: 0.5
                                                }}
                                            >
                                                {product.price?.toLocaleString('vi-VN')}đ
                                            </Typography>
                                            {product.category?.name && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: '#666' }}
                                                >
                                                    {product.category.name}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            {searchQuery.trim() && (
                                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                                    <Typography
                                        variant="body2"
                                        onClick={handleSearchSubmit}
                                        sx={{
                                            color: '#f58220',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Xem tất cả kết quả cho "{searchQuery}" →
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* No Results */}
                    {!isSearching && searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                        <Box sx={{ padding: 3, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                Không tìm thấy sản phẩm nào cho "{searchQuery}"
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#999' }}>
                                Thử tìm kiếm với từ khóa khác
                            </Typography>
                        </Box>
                    )}

                    {/* Empty State */}
                    {searchQuery.trim().length === 0 && (
                        <Box sx={{ padding: 3, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Nhập tên sản phẩm để tìm kiếm
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Header;
