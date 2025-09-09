import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TrendingBar from '../client/Home/TrendingBar';
// import api from '../../api'; // tạm thời không gọi API thật

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    // Hover dropdown state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement | null>(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Mock API response - danh sách sản phẩm cho dropdown (tạm thời cố định dữ liệu)
    const MOCK_API_PRODUCTS = [
        // Cột trái
        'Máy Xay Sinh Tố Công Nghiệp',
        'Máy Ép Chậm',
        'Máy làm sữa hạt',
        'Máy xay thịt',
        'Nồi Áp Suất',
        'Nồi & Chảo',
        'Nồi chiên Hấp đa năng',
        'Dụng cụ nhà bếp',
        // Cột phải
        'Máy Xay Sinh Tố',
        'Máy Ép Nhanh',
        'Máy Vắt Cam',
        'Bình Thuỷ Điện',
        'Nồi Cơm Điện',
        'Nồi Chiên Không Dầu',
        'Bếp Từ - Hồng Ngoại'
    ];

    // Categories for inline navigation (vẫn giữ để hiển thị inline)
    const MOCK_API_CATEGORIES = [
        { id: 'appliances', name: 'Điện gia dụng', slug: 'appliances' },
        { id: 'dehumidifier', name: 'Máy hút ẩm', slug: 'dehumidifier' },
        { id: 'fans', name: 'Quạt', slug: 'fans' },
        { id: 'kitchen', name: 'Thiết bị nhà bếp', slug: 'kitchen' },
        { id: 'health-beauty', name: 'Sức khoẻ & Làm đẹp', slug: 'health-beauty' },
        { id: 'others', name: 'Thiết bị khác', slug: 'others' },
    ];

    const categories = MOCK_API_CATEGORIES;
    const products = MOCK_API_PRODUCTS;

    // Simulate API fetch (để sẵn khung, hiện tại dùng dữ liệu mock)
    // useEffect(() => {
    //     let mounted = true;
    //     (async () => {
    //         try {
    //             const res = await api.get('/categories');
    //             const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
    //             if (mounted) setCategories(data);
    //         } catch {
    //             // fallback giữ MOCK_API_CATEGORIES
    //         }
    //     })();
    //     return () => { mounted = false; };
    // }, []);

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
                                src="/logo.jpg"
                                alt="Lumias logo"
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
                                src="/logo.jpg"
                                alt="Lumias logo"
                                sx={{ width: 200, height: 70 }}
                            />
                        </Box>

                        {/* Navigation */}
                        <Box sx={{ flexGrow: 1, marginLeft: 5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Link to="/featured" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 700 }}>
                                    Mới & Nổi Bật
                                </Link>

                                {/* Render several categories inline from API (mock) */}
                                {categories.slice(0, 3).map((c) => (
                                    <Link key={c.id} to={`/categories/${c.slug || c.id}`} style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                        {c.name}
                                    </Link>
                                ))}

                                {/* Hoverable dropdown - keep open when moving mouse into submenu */}
                                <Box
                                    sx={{ position: 'relative' }}
                                    onMouseEnter={() => setIsMenuOpen(true)}
                                    onMouseLeave={() => setIsMenuOpen(false)}
                                >
                                    <Box ref={triggerRef} style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500, cursor: 'default' }}>
                                        Danh mục
                                    </Box>
                                    {isMenuOpen && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                backgroundColor: '#fff',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                borderRadius: '8px',
                                                padding: 2,
                                                minWidth: '400px',
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: 1.5,
                                                zIndex: 1200,
                                            }}
                                            onMouseEnter={() => setIsMenuOpen(true)}
                                            onMouseLeave={() => setIsMenuOpen(false)}
                                        >
                                            {/* Hover buffer to avoid accidental close when moving from trigger to menu */}
                                            <Box sx={{ position: 'absolute', top: -8, left: 0, right: 0, height: 8, backgroundColor: 'transparent' }} />
                                            {/* Cột trái */}
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                {products.slice(0, 8).map((product, index) => (
                                                    <Box
                                                        key={index}
                                                        component={Link}
                                                        to={`/categories/${product.toLowerCase().replace(/\s+/g, '-').replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e').replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o').replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')}`}
                                                        sx={{
                                                            padding: '8px 12px',
                                                            fontSize: '13px',
                                                            cursor: 'pointer',
                                                            borderRadius: '4px',
                                                            transition: 'background-color 0.2s ease',
                                                            textDecoration: 'none',
                                                            color: 'inherit',
                                                            display: 'block',
                                                            '&:hover': {
                                                                backgroundColor: '#f8f9fa',
                                                                color: '#f58220'
                                                            }
                                                        }}
                                                    >
                                                        {product}
                                                    </Box>
                                                ))}
                                            </Box>
                                            {/* Cột phải */}
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                {products.slice(8).map((product, index) => (
                                                    <Box
                                                        key={index + 8}
                                                        component={Link}
                                                        to={`/categories/${product.toLowerCase().replace(/\s+/g, '-').replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e').replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o').replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')}`}
                                                        sx={{
                                                            padding: '8px 12px',
                                                            fontSize: '13px',
                                                            cursor: 'pointer',
                                                            borderRadius: '4px',
                                                            transition: 'background-color 0.2s ease',
                                                            textDecoration: 'none',
                                                            color: 'inherit',
                                                            display: 'block',
                                                            '&:hover': {
                                                                backgroundColor: '#f8f9fa',
                                                                color: '#f58220'
                                                            }
                                                        }}
                                                    >
                                                        {product}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </Box>

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
                            <Box component="img" src="/logo.jpg" alt="Lumias logo" sx={{ width: 160, height: 56 }} />
                            <Box onClick={() => setIsMobileMenuOpen(false)} sx={{ marginLeft: 'auto', fontSize: '14px', cursor: 'pointer' }}>Đóng</Box>
                        </Box>
                        <Box sx={{ fontWeight: 700, fontSize: '14px', marginBottom: 1 }}>Danh mục</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link to="/featured" style={{ textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: 700 }}>Mới & Nổi Bật</Link>
                            {categories.map((c) => (
                                <Link key={c.id} to={`/categories/${c.slug || c.id}`} style={{ textDecoration: 'none', color: '#333', fontSize: '14px' }}>
                                    {c.name}
                                </Link>
                            ))}
                            <Link to="/reviews" style={{ textDecoration: 'none', color: '#333', fontSize: '14px' }}>Reviews</Link>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Header;
