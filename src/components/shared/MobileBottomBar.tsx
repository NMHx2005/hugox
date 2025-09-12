import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Phone, ArrowUpward } from '@mui/icons-material';
import { useAppContext } from '../../hooks/useAppContext';

const MobileBottomBar: React.FC = () => {
    const { contactSettings } = useAppContext();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                borderTop: '1px solid #e0e0e0',
                padding: '12px 16px',
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'space-around',
                alignItems: 'center',
                zIndex: 1000,
                boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
            }}
        >
            {/* Hotline */}
            <Box
                onClick={() => window.open(`tel:${contactSettings?.phone || '0878784842'}`, '_self')}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                }}
            >
                <IconButton
                    sx={{
                        backgroundColor: '#f58220',
                        color: '#fff',
                        width: 40,
                        height: 40,
                        '&:hover': {
                            backgroundColor: '#d46f00',
                        },
                    }}
                >
                    <Phone sx={{ fontSize: '20px' }} />
                </IconButton>
                <Typography
                    sx={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#333',
                        textAlign: 'center',
                        lineHeight: 1.2,
                    }}
                >
                    Hotline
                    <br />
                    mua hàng
                </Typography>
            </Box>

            {/* Zalo */}
            <Box
                onClick={() => window.open(`https://zalo.me/${contactSettings?.phone || '0878784842'}`, '_blank')}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                }}
            >
                <IconButton
                    sx={{
                        backgroundColor: '#0068ff',
                        color: '#fff',
                        width: 40,
                        height: 40,
                        '&:hover': {
                            backgroundColor: '#0056cc',
                        },
                    }}
                >
                    <Box
                        component="img"
                        src="/zalo_logo.jpg"
                        alt="Zalo"
                        sx={{ width: 20, height: 20 }}
                    />
                </IconButton>
                <Typography
                    sx={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#333',
                        textAlign: 'center',
                        lineHeight: 1.2,
                    }}
                >
                    Zalo mua
                    <br />
                    hàng
                </Typography>
            </Box>

            {/* Back to Top */}
            <Box
                onClick={scrollToTop}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                }}
            >
                <IconButton
                    sx={{
                        backgroundColor: '#666',
                        color: '#fff',
                        width: 40,
                        height: 40,
                        '&:hover': {
                            backgroundColor: '#555',
                        },
                    }}
                >
                    <ArrowUpward sx={{ fontSize: '20px' }} />
                </IconButton>
                <Typography
                    sx={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#333',
                        textAlign: 'center',
                        lineHeight: 1.2,
                    }}
                >
                    Lên đầu
                    <br />
                    trang
                </Typography>
            </Box>
        </Box>
    );
};

export default MobileBottomBar;
