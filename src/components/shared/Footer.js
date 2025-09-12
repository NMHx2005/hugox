import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import { Phone, LocationOn, Email, ArrowUpward, } from '@mui/icons-material';
import { useAppContext } from '../../hooks/useAppContext';
const Footer = () => {
    const { categories, generalSettings, contactSettings, loading } = useAppContext();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const customerSupport = [
        'Giới thiệu',
        'Tin tức',
        'Liên hệ',
        'Reviews sản phẩm',
        'CTV bán hàng',
        'Chính sách bảo mật',
        'Chính sách huỷ, đổi trả, hoàn tiền',
        'Chính sách vận chuyển'
    ];
    return (_jsxs(Box, { component: "footer", sx: {
            // backgroundColor: '#0a0a0a',
            background: 'linear-gradient(0deg, #2b2c2b 0%, #000000 100%)',
            color: '#fff',
            position: 'relative',
            paddingTop: "40px",
            marginBottom: { xs: '90px', md: '0' }
        }, children: [_jsxs(Box, { className: "container", sx: {
                    padding: { xs: '30px 0 15px 0', md: '40px 0 20px 0' },
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: { xs: '30px', md: '40px' },
                    borderBottom: '1px solid #fff0',
                    // borderBottom: 'linear-gradient(to right, #fff0 5%, #d9d9d9 50%, #d9d9d9 50%, #fff0 95%)'
                }, children: [_jsx(Box, { sx: {
                            flex: { xs: '1 1 100%', md: '1 1 280px' },
                            minWidth: { xs: '100%', md: '280px' }
                        }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, marginBottom: 1.5 }, children: [_jsx(Box, { component: "img", src: generalSettings?.logo || "/logo-removebg-preview.png", alt: generalSettings?.siteName || "Lumias logo", sx: { height: 70, textAlign: 'center' } }), _jsx(Typography, { variant: "h5", sx: {
                                        fontWeight: 500,
                                        fontSize: '28px',
                                        color: '#fff',
                                        fontFamily: 'Roboto, sans-serif'
                                    } })] }) }), _jsxs(Box, { sx: {
                            flex: { xs: '1 1 100%', md: '1 1 180px' },
                            minWidth: { xs: '100%', md: '180px' }
                        }, children: [_jsx(Typography, { variant: "h6", sx: {
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    marginBottom: 2.5,
                                    color: '#fff'
                                }, children: "Danh m\u1EE5c n\u1ED5i b\u1EADt" }), _jsx(Box, { component: "ul", sx: { listStyle: 'none', padding: 0, margin: 0 }, children: !loading && categories.map((category) => (_jsx(Box, { component: "li", sx: {
                                        marginBottom: 1.75,
                                        fontSize: '14px',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        '&:hover': { color: '#f58220' }
                                    }, children: category.name }, category._id))) })] }), _jsxs(Box, { sx: {
                            flex: { xs: '1 1 100%', md: '1 1 180px' },
                            minWidth: { xs: '100%', md: '180px' }
                        }, children: [_jsx(Typography, { variant: "h6", sx: {
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    marginBottom: 2.5,
                                    color: '#fff'
                                }, children: "H\u1ED7 tr\u1EE3 kh\u00E1ch h\u00E0ng" }), _jsx(Box, { component: "ul", sx: { listStyle: 'none', padding: 0, margin: 0 }, children: customerSupport.map((item, index) => (_jsx(Box, { component: "li", sx: {
                                        marginBottom: 1.75,
                                        fontSize: '14px',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        '&:hover': { color: '#f58220' }
                                    }, children: item }, index))) })] }), _jsxs(Box, { sx: {
                            flex: { xs: '1 1 100%', md: '1 1 320px' },
                            minWidth: { xs: '100%', md: '320px' },
                            fontSize: '14px',
                            color: '#fff'
                        }, children: [_jsx(Typography, { variant: "h6", sx: {
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    marginBottom: 2.5,
                                    color: '#fff'
                                }, children: "Th\u00F4ng tin li\u00EAn h\u1EC7" }), _jsx(Typography, { sx: { margin: '0 0 16px 0', lineHeight: 1.5, color: '#fff' }, children: generalSettings?.siteDescription || 'HUGOX – Thương hiệu hàng đầu cung cấp hệ sinh thái đầy đủ sản phẩm về gia dụng thông minh, không dây và không giới hạn.' }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', marginBottom: 1, color: '#fff' }, children: [_jsx(LocationOn, { sx: { marginRight: 1, fontSize: '16px' } }), _jsxs(Typography, { sx: { fontSize: '14px', color: '#fff' }, children: ["\u0110\u1ECBa ch\u1EC9: ", contactSettings?.address || '27 Đoàn Thị Điểm - Phường Sông Cầu - Dăk Lăk'] })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', marginBottom: 1, color: '#fff' }, children: [_jsx(Phone, { sx: { marginRight: 1, fontSize: '16px' } }), _jsxs(Typography, { sx: { fontSize: '14px', color: '#fff' }, children: ["Hotline mua h\u00E0ng: ", contactSettings?.phone || '08.7878.4842'] })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', marginBottom: 1, color: '#fff' }, children: [_jsx(Box, { component: "img", src: "/zalo_logo.jpg", alt: "Zalo", sx: { width: 20, height: 20 } }), _jsxs(Typography, { sx: { fontSize: '14px', color: '#fff', marginLeft: 1 }, children: ["Zalo mua h\u00E0ng: ", contactSettings?.phone || '08.7878.4842'] })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', marginBottom: 1, color: '#fff' }, children: [_jsx(Box, { component: "img", src: "/zalo_logo.jpg", alt: "Zalo", sx: { width: 20, height: 20 } }), _jsxs(Typography, { sx: { fontSize: '14px', color: '#fff', marginLeft: 1 }, children: ["Zalo b\u1EA3o h\u00E0nh: ", contactSettings?.phone || '0876.83.63.43'] })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', color: '#fff' }, children: [_jsx(Email, { sx: { marginRight: 1, fontSize: '16px' } }), _jsxs(Typography, { sx: { fontSize: '14px', color: '#fff' }, children: ["Email: ", contactSettings?.email || 'Hugodigital2003@gmail.com'] })] })] })] }), _jsxs(Box, { sx: {
                    position: 'fixed',
                    right: { xs: '4px', sm: '8px', md: '10px' },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)',
                    width: '72px',
                    fontSize: '12px',
                    color: '#000',
                    fontWeight: 600,
                    // textAlign: 'center',
                    userSelect: 'none',
                    zIndex: 1000,
                    display: { xs: 'none', lg: 'block' }
                }, children: [_jsxs(Box, { sx: {
                            borderBottom: '1px solid #ddd',
                            padding: '10px 6px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '&:hover': { backgroundColor: '#f5f5f5' }
                        }, onClick: () => window.open(`tel:${contactSettings?.phone || '0878784842'}`, '_self'), children: [_jsx(Phone, { sx: { fontSize: '24px', marginBottom: 0.5, color: '#f58220' } }), _jsxs(Typography, { sx: { fontSize: '12px', fontWeight: 600, color: '#000' }, children: ["Hotline", _jsx("br", {}), "mua h\u00E0ng"] })] }), _jsxs(Box, { sx: {
                            borderBottom: '1px solid #ddd',
                            padding: '10px 6px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '&:hover': { backgroundColor: '#f5f5f5' }
                        }, onClick: () => window.open(`https://zalo.me/${contactSettings?.phone || '0878784842'}`, '_blank'), children: [_jsx(Box, { component: "img", src: "/zalo_logo.jpg", alt: "Zalo", sx: { width: 20, height: 20 } }), _jsxs(Typography, { sx: { fontSize: '12px', fontWeight: 600, color: '#000', marginTop: 0.5 }, children: ["Zalo mua", _jsx("br", {}), "h\u00E0ng"] })] }), _jsxs(Box, { onClick: scrollToTop, sx: {
                            padding: '10px 6px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '&:hover': { backgroundColor: '#f5f5f5' }
                        }, children: [_jsx(ArrowUpward, { sx: { fontSize: '24px', marginBottom: 0.5, color: '#333' } }), _jsxs(Typography, { sx: { fontSize: '12px', fontWeight: 600, color: '#000' }, children: ["L\u00EAn \u0111\u1EA7u", _jsx("br", {}), "trang"] })] })] }), _jsx(Box, { className: "container", sx: {
                    textAlign: 'center',
                    padding: '16px 0',
                    fontSize: '14px',
                    color: '#999',
                }, children: _jsx(Typography, { sx: { fontSize: '14px', color: '#999' }, children: "Copyright 2025 \u00A9 HungDan" }) })] }));
};
export default Footer;
