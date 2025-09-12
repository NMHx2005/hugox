import React from 'react';
import { Box, Typography } from '@mui/material';
import { Phone, ArrowUpward } from '@mui/icons-material';
import { useAppContext } from '../../../hooks/useAppContext';

const ContactBar: React.FC = () => {
    const { contactSettings } = useAppContext();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                right: { xs: '4px', sm: '8px', md: '15px' },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
                fontSize: { xs: '10px', sm: '11px', md: '12px' },
                fontWeight: 700,
                color: '#f58220',
                textAlign: 'center',
                userSelect: 'none',
                overflow: 'hidden',
                zIndex: 1000
            }}
        >
            {/* Hotline */}
            <Box
                sx={{
                    borderBottom: '1px solid #eee',
                    padding: { xs: '6px 8px', sm: '8px 12px' },
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    backgroundColor: '#fff',
                    '&:hover': {
                        backgroundColor: '#f5f5f5'
                    }
                }}
                onClick={() => window.open(`tel:${contactSettings?.phone || '0878784842'}`, '_self')}
            >
                <Phone sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, color: '#f58220' }} />
                <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
                    Hotline
                    <br />
                    mua hàng
                </Typography>
            </Box>

            {/* Zalo */}
            <Box
                sx={{
                    borderBottom: '1px solid #eee',
                    padding: { xs: '6px 8px', sm: '8px 12px' },
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    backgroundColor: '#fff',
                    '&:hover': {
                        backgroundColor: '#f5f5f5'
                    }
                }}
                onClick={() => window.open(`https://zalo.me/${contactSettings?.phone || '0878784842'}`, '_blank')}
            >
                <Box
                    component="img"
                    src="https://storage.googleapis.com/a1aa/image/77d96ffb-317c-48b1-5674-f78b6aef17a2.jpg"
                    alt="Zalo logo"
                    sx={{
                        width: { xs: '16px', sm: '18px', md: '20px' },
                        height: { xs: '16px', sm: '18px', md: '20px' }
                    }}
                />
                <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
                    Zalo
                    <br />
                    mua hàng
                </Typography>
            </Box>

            {/* Scroll to Top */}
            <Box
                onClick={scrollToTop}
                sx={{
                    padding: { xs: '6px 8px', sm: '8px 12px' },
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    backgroundColor: '#fff',
                    color: '#333',
                    '&:hover': {
                        backgroundColor: '#f5f5f5'
                    }
                }}
            >
                <ArrowUpward sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, color: '#333' }} />
                <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
                    Lên đầu
                    <br />
                    trang
                </Typography>
            </Box>
        </Box>
    );
};

export default ContactBar;
