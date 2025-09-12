import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import MobileBottomBar from './MobileBottomBar';
import { useLocation } from 'react-router-dom';
const Layout = ({ children }) => {
    const location = useLocation();
    // Scroll to top on route change (both desktop & mobile)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [location.pathname]);
    return (_jsxs(Box, { sx: { minHeight: '100vh', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column' }, children: [_jsx(Header, {}), _jsx(Box, { component: "main", sx: { flex: 1, width: '100%', paddingTop: { xs: '100px', md: '120px' }, paddingBottom: { xs: '80px', md: '0' } }, children: children }), _jsx(Footer, {}), _jsx(MobileBottomBar, {})] }));
};
export default Layout;
