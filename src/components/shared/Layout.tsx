import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import MobileBottomBar from './MobileBottomBar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box component="main" sx={{ flex: 1, width: '100%', paddingBottom: { xs: '80px', md: '0' } }}>
                {children}
            </Box>
            <Footer />
            <MobileBottomBar />
        </Box>
    );
};

export default Layout;
