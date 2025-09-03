import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TrendingBar from '../client/Home/TrendingBar';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Kiểm tra nếu đã scroll xuống ít nhất 100px
            if (currentScrollY > 100) {
                setIsScrolled(true);

                // Ẩn header khi scroll xuống, hiện khi scroll lên
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
                            sx={{
                                width: 24,
                                height: 24,
                                backgroundColor: '#f58220',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    width: 8,
                                    height: 8,
                                    backgroundColor: '#fff',
                                    borderRadius: '50%'
                                }
                            }}
                        />
                        <Typography
                            sx={{
                                fontFamily: 'Orbitron, sans-serif',
                                fontWeight: 700,
                                fontSize: '18px',
                                letterSpacing: '0.1em',
                                color: '#000'
                            }}
                        >
                            LUMIAS
                        </Typography>
                    </Box>

                    {/* Right Icons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton sx={{ color: '#000', padding: '8px' }}>
                            <SearchIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                        <IconButton sx={{ color: '#000', padding: '8px' }}>
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
                            <Link to="/" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                Mới & Nổi Bật
                            </Link>

                            <Box sx={{ position: 'relative' }}>
                                <Link to="/categories/appliances" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                    Điện gia dụng
                                </Link>
                            </Box>

                            <Link to="/categories/dehumidifier" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                Máy hút ẩm
                            </Link>

                            <Link to="/categories/fans" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                Quạt
                            </Link>

                            <Box sx={{ position: 'relative' }}>
                                <Link to="/categories/kitchen" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                    Thiết bị nhà bếp
                                </Link>
                            </Box>

                            <Box sx={{ position: 'relative' }}>
                                <Link to="/categories/health-beauty" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                    Sức khoẻ & Làm đẹp
                                </Link>
                            </Box>

                            <Link to="/categories" style={{ textDecoration: 'none', color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                Thiết bị khác
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
    );
};

export default Header;
