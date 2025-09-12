import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Button } from '@mui/material';
const HeroBanner = () => {
    return (_jsx(Box, { sx: {
            position: 'relative',
            width: '100%',
            height: 'calc(100vh - 120px)', // Full viewport height minus header height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#bcb5a9',
            backgroundImage: 'url(/banner-home-1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }, children: _jsx(Box
        // className="container"
        , { 
            // className="container"
            sx: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start', // Changed from 'center' to 'flex-start' to align left
                height: '100%',
                padding: { xs: '20px 16px', sm: '30px 24px', md: '0 150px' },
            }, children: _jsxs(Box, { sx: {
                    backgroundColor: '#fff',
                    borderRadius: { xs: '16px', md: '16px' },
                    padding: { xs: '24px 20px', sm: '28px 24px', md: '32px 40px' },
                    maxWidth: { xs: '100%', sm: '90%', md: '480px' },
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    textAlign: { xs: 'center', md: 'left' },
                    marginLeft: { xs: 0, md: 0 } // Ensure it starts from the left edge
                }, children: [_jsxs(Typography, { variant: "h2", sx: {
                            fontWeight: 700,
                            fontSize: { xs: '18px', sm: '20px', md: '24px' },
                            lineHeight: 1.2,
                            margin: '0 0 12px 0',
                            color: '#000'
                        }, children: ["S\u1ED0NG TH\u00C0NH TH\u01A0I C\u00D9NG", ' ', _jsx(Box, { component: "span", sx: { color: '#f58220' }, children: "HUGOX" })] }), _jsx(Typography, { sx: {
                            fontSize: { xs: '11px', sm: '12px', md: '13px' },
                            fontWeight: 600,
                            margin: '0 0 24px 0',
                            lineHeight: 1.3,
                            color: '#222'
                        }, children: "T\u1EA1i HUGOX, ch\u00FAng t\u00F4i theo \u0111u\u1ED5i nh\u1EEFng ti\u00EAu chu\u1EA9n cao nh\u1EA5t v\u1EC1 ch\u1EA5t l\u01B0\u1EE3ng s\u1EA3n ph\u1EA9m, \u0111\u1EB7t an to\u00E0n v\u00E0 l\u1EE3i \u00EDch c\u1EE7a ng\u01B0\u1EDDi ti\u00EAu d\u00F9ng l\u00EAn h\u00E0ng \u0111\u1EA7u." }), _jsx(Button, { variant: "contained", sx: {
                            backgroundColor: '#f58220',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: { xs: '13px', md: '14px' },
                            padding: { xs: '8px 20px', md: '10px 24px' },
                            borderRadius: '20px',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#d46f00'
                            }
                        }, children: "Mua ngay" })] }) }) }));
};
export default HeroBanner;
