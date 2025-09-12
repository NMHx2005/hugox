import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
const AboutSection = () => {
    return (_jsx("div", { className: 'about-section', style: { backgroundColor: '#F2F4F7' }, children: _jsxs(Box, { className: "container", sx: { padding: { xs: '40px 0', sm: '50px 0', md: '60px 0', lg: '80px 0' } }, children: [_jsxs(Box, { sx: { textAlign: 'center', marginBottom: { xs: 3, sm: 3.5, md: 4 } }, children: [_jsx(Typography, { sx: {
                                fontSize: { xs: '12px', sm: '13px', md: '14px', lg: '16px' },
                                fontWeight: 600,
                                color: '#f58220',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: { xs: 1.5, sm: 1.8, md: 2 }
                            }, children: "B\u1EAET \u0110\u1EA6U TR\u1EA2I NGHI\u1EC6M" }), _jsx(Typography, { variant: "h3", sx: {
                                fontWeight: 700,
                                fontSize: { xs: '22px', sm: '26px', md: '32px', lg: '40px' },
                                color: '#333',
                                marginBottom: { xs: 2, sm: 2.5, md: 3 },
                                lineHeight: 1.2
                            }, children: "Kh\u00F4ng gian s\u1ED1ng hi\u1EC7n \u0111\u1EA1i" }), _jsx(Typography, { sx: {
                                fontSize: { xs: '14px', sm: '15px', md: '16px', lg: '18px' },
                                color: '#666',
                                lineHeight: 1.6,
                                maxWidth: { xs: '100%', sm: '90%', md: '800px' },
                                margin: '0 auto',
                                marginBottom: { xs: 3, sm: 3.5, md: 4 },
                                paddingX: { xs: 2, sm: 1, md: 0 }
                            }, children: "Thay \u00E1o m\u1EDBi cho t\u1ED5 \u1EA5m b\u1EB1ng s\u1EF1 k\u1EBFt h\u1EE3p ho\u00E0n h\u1EA3o gi\u1EEFa \u00E1nh s\u00E1ng v\u00E0 n\u1ED9i th\u1EA5t, tr\u1EA3i nghi\u1EC7m tr\u1ECDn v\u1EB9n c\u1EA3m gi\u00E1c th\u01B0 gi\u00E3n, b\u00ECnh y\u00EAn trong ch\u00EDnh ng\u00F4i nh\u00E0 c\u1EE7a b\u1EA1n." }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 1.5, sm: 2 } }, children: [_jsx(Box, { sx: {
                                        width: { xs: 20, sm: 22, md: 24 },
                                        height: { xs: 20, sm: 22, md: 24 },
                                        backgroundColor: '#f58220',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            width: { xs: 6, sm: 7, md: 8 },
                                            height: { xs: 6, sm: 7, md: 8 },
                                            backgroundColor: '#fff',
                                            borderRadius: '50%'
                                        }
                                    } }), _jsx(Typography, { sx: {
                                        fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '32px' },
                                        fontWeight: 700,
                                        color: '#333',
                                        fontFamily: 'Orbitron, sans-serif',
                                        letterSpacing: '0.1em'
                                    }, children: "HUGOX" })] })] }), _jsx(Box, { sx: {
                        width: '100%',
                        height: { xs: '250px', sm: '320px', md: '400px', lg: '500px', xl: '600px' },
                        borderRadius: { xs: '8px', sm: '10px', md: '12px' },
                        overflow: 'hidden',
                        boxShadow: { xs: '0 4px 16px rgba(0,0,0,0.1)', sm: '0 6px 24px rgba(0,0,0,0.1)', md: '0 8px 32px rgba(0,0,0,0.1)' },
                        position: 'relative'
                    }, children: _jsx(Box, { component: "img", src: "/Banner-web-1.jpg", alt: "Kh\u00F4ng gian s\u1ED1ng hi\u1EC7n \u0111\u1EA1i v\u1EDBi c\u00E1c s\u1EA3n ph\u1EA9m HUGOX", sx: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        } }) })] }) }));
};
export default AboutSection;
