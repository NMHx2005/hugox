import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutSection: React.FC = () => {
    return (
        <div className='about-section' style={{ backgroundColor: '#F2F4F7' }}>
            <Box className="container" sx={{ padding: { xs: '40px 0', sm: '50px 0', md: '60px 0', lg: '80px 0' } }}>
                {/* Text Content */}
                <Box sx={{ textAlign: 'center', marginBottom: { xs: 3, sm: 3.5, md: 4 } }}>
                    <Typography
                        sx={{
                            fontSize: { xs: '12px', sm: '13px', md: '14px', lg: '16px' },
                            fontWeight: 600,
                            color: '#f58220',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: { xs: 1.5, sm: 1.8, md: 2 }
                        }}
                    >
                        BẮT ĐẦU TRẢI NGHIỆM
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '22px', sm: '26px', md: '32px', lg: '40px' },
                            color: '#333',
                            marginBottom: { xs: 2, sm: 2.5, md: 3 },
                            lineHeight: 1.2
                        }}
                    >
                        Không gian sống hiện đại
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: '14px', sm: '15px', md: '16px', lg: '18px' },
                            color: '#666',
                            lineHeight: 1.6,
                            maxWidth: { xs: '100%', sm: '90%', md: '800px' },
                            margin: '0 auto',
                            marginBottom: { xs: 3, sm: 3.5, md: 4 },
                            paddingX: { xs: 2, sm: 1, md: 0 }
                        }}
                    >
                        Thay áo mới cho tổ ấm bằng sự kết hợp hoàn hảo giữa ánh sáng và nội thất,
                        trải nghiệm trọn vẹn cảm giác thư giãn, bình yên trong chính ngôi nhà của bạn.
                    </Typography>

                    {/* LUMIAS Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 1.5, sm: 2 } }}>
                        <Box
                            sx={{
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
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '32px' },
                                fontWeight: 700,
                                color: '#333',
                                fontFamily: 'Orbitron, sans-serif',
                                letterSpacing: '0.1em'
                            }}
                        >
                            HUGOX
                        </Typography>
                    </Box>
                </Box>

                {/* Banner Image */}
                <Box
                    sx={{
                        width: '100%',
                        height: { xs: '250px', sm: '320px', md: '400px', lg: '500px', xl: '600px' },
                        borderRadius: { xs: '8px', sm: '10px', md: '12px' },
                        overflow: 'hidden',
                        boxShadow: { xs: '0 4px 16px rgba(0,0,0,0.1)', sm: '0 6px 24px rgba(0,0,0,0.1)', md: '0 8px 32px rgba(0,0,0,0.1)' },
                        position: 'relative'
                    }}
                >
                    <Box
                        component="img"
                        src="/Banner-web-1.jpg"
                        alt="Không gian sống hiện đại với các sản phẩm HUGOX"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default AboutSection;
