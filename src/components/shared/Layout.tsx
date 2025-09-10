import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import MobileBottomBar from './MobileBottomBar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    // Scroll to top on route change (both desktop & mobile)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        }
    }, [location.pathname]);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box component="main" sx={{ flex: 1, width: '100%', paddingTop: { xs: '100px', md: '120px' }, paddingBottom: { xs: '80px', md: '0' } }}>
                {children}
            </Box>
            <Footer />
            <MobileBottomBar />
        </Box>
    );
};

export default Layout;
