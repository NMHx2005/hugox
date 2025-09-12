import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
const PartnersAwardsSection = () => {
    const partners = [
        {
            name: 'HOANGHAMOBILE',
            logo: '/logo-03.png',
        },
        {
            name: 'Pico.',
            logo: '/logo-04.png',
        },
        {
            name: 'HC Home Center',
            logo: '/logo-03.png',
        },
        {
            name: 'NGUYENKIM',
            logo: '/logo-03.png',
        },
        {
            name: 'cellphone S',
            logo: '/logo-03.png',
        },
        {
            name: 'FPT Shop.com.vn',
            logo: '/logo-03.png',
        },
    ];
    const awards = [
        {
            name: 'Chứng nhận',
            image: '/chung-nhan-sp-toi-yeu.png',
            description: 'Chứng nhận chất lượng sản phẩm',
        },
        {
            name: 'Tech Awards',
            image: '/chung-nhan-sp-toi-yeu.png',
            description: 'Giải thưởng công nghệ',
        },
        {
            name: 'Trophy',
            image: '/chung-nhan-sp-toi-yeu.png',
            description: 'Giải thưởng danh giá',
        },
    ];
    return (_jsx("div", { className: 'partners-awards-section', style: { backgroundColor: '#FFFFFF', padding: '60px 0' }, children: _jsx(Box, { className: "container", sx: { padding: { xs: '60px 0', md: '80px 0' } }, children: _jsxs(Box, { sx: {
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: '1fr 1px 1fr',
                    },
                    gap: { xs: 4, md: 6 },
                    alignItems: 'start',
                }, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h3", sx: {
                                    fontWeight: 700,
                                    fontSize: { xs: '28px', md: '38px' },
                                    color: '#333',
                                    marginBottom: 4,
                                    textAlign: 'center',
                                }, children: "\u0110\u1ED1i t\u00E1c" }), _jsx(Box, { sx: {
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(2, 1fr)',
                                        sm: 'repeat(3, 1fr)',
                                    },
                                    gap: 3,
                                }, children: partners.map((partner, index) => (_jsxs(Box, { sx: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: 3,
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                                        },
                                    }, children: [_jsx(Box, { component: "img", src: partner.logo, alt: partner.name, sx: {
                                                height: '60px',
                                                objectFit: 'contain',
                                                marginBottom: 2,
                                            } }), _jsx(Typography, { sx: {
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                color: '#333',
                                                textAlign: 'center',
                                            }, children: partner.name })] }, index))) })] }), _jsx(Box, { sx: {
                            display: { xs: 'none', md: 'block' },
                            width: '1px',
                            backgroundColor: '#e0e0e0',
                            height: '100%',
                            minHeight: '400px',
                        } }), _jsxs(Box, { children: [_jsx(Typography, { variant: "h3", sx: {
                                    fontWeight: 700,
                                    fontSize: { xs: '28px', md: '38px' },
                                    color: '#333',
                                    marginBottom: 4,
                                    textAlign: 'center',
                                }, children: "Gi\u1EA3i th\u01B0\u1EDFng" }), _jsx(Box, { sx: {
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(3, 1fr)',
                                    },
                                    gap: 3,
                                }, children: awards.map((award, index) => (_jsxs(Box, { sx: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: 3,
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                                        },
                                    }, children: [_jsx(Box, { component: "img", src: award.image, alt: award.name, sx: {
                                                height: '120px',
                                                objectFit: 'contain',
                                                marginBottom: 2,
                                            } }), _jsx(Typography, { sx: {
                                                fontSize: '16px',
                                                fontWeight: 700,
                                                color: '#333',
                                                textAlign: 'center',
                                                marginBottom: 1,
                                            }, children: award.name }), _jsx(Typography, { sx: {
                                                fontSize: '12px',
                                                color: '#666',
                                                textAlign: 'center',
                                            }, children: award.description })] }, index))) })] })] }) }) }));
};
export default PartnersAwardsSection;
