import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroBanner: React.FC = () => {
    return (
        <Box
            sx={{
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
            }}
        >
            <Box
                // className="container"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start', // Changed from 'center' to 'flex-start' to align left
                    height: '100%',
                    padding: { xs: '20px 16px', sm: '30px 24px', md: '0 150px' },
                }}
            >
                {/* Content Box - Left aligned */}
                <Box
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: { xs: '16px', md: '16px' },
                        padding: { xs: '24px 20px', sm: '28px 24px', md: '32px 40px' },
                        maxWidth: { xs: '100%', sm: '90%', md: '480px' },
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        textAlign: { xs: 'center', md: 'left' },
                        marginLeft: { xs: 0, md: 0 } // Ensure it starts from the left edge
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '18px', sm: '20px', md: '24px' },
                            lineHeight: 1.2,
                            margin: '0 0 12px 0',
                            color: '#000'
                        }}
                    >
                        SỐNG THÀNH THƠI CÙNG{' '}
                        <Box component="span" sx={{ color: '#f58220' }}>
                            HUGOX
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: '11px', sm: '12px', md: '13px' },
                            fontWeight: 600,
                            margin: '0 0 24px 0',
                            lineHeight: 1.3,
                            color: '#222'
                        }}
                    >
                        Tại HUGOX, chúng tôi theo đuổi những tiêu chuẩn cao nhất về chất lượng sản phẩm,
                        đặt an toàn và lợi ích của người tiêu dùng lên hàng đầu.
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
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
                        }}
                    >
                        Mua ngay
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default HeroBanner;
