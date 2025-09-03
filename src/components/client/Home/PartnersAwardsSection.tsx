import React from 'react';
import { Box, Typography } from '@mui/material';

const PartnersAwardsSection: React.FC = () => {
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

    return (
        <div className='partners-awards-section' style={{ backgroundColor: '#FFFFFF', padding: '60px 0' }}>
            <Box className="container" sx={{ padding: { xs: '60px 0', md: '80px 0' } }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: '1fr 1px 1fr',
                        },
                        gap: { xs: 4, md: 6 },
                        alignItems: 'start',
                    }}
                >
                    {/* Partners Section */}
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '28px', md: '38px' },
                                color: '#333',
                                marginBottom: 4,
                                textAlign: 'center',
                            }}
                        >
                            Đối tác
                        </Typography>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(2, 1fr)',
                                    sm: 'repeat(3, 1fr)',
                                },
                                gap: 3,
                            }}
                        >
                            {partners.map((partner, index) => (
                                <Box
                                    key={index}
                                    sx={{
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
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={partner.logo}
                                        alt={partner.name}
                                        sx={{
                                            height: '60px',
                                            objectFit: 'contain',
                                            marginBottom: 2,
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            color: '#333',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {partner.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Divider */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            width: '1px',
                            backgroundColor: '#e0e0e0',
                            height: '100%',
                            minHeight: '400px',
                        }}
                    />

                    {/* Awards Section */}
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '28px', md: '38px' },
                                color: '#333',
                                marginBottom: 4,
                                textAlign: 'center',
                            }}
                        >
                            Giải thưởng
                        </Typography>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(3, 1fr)',
                                },
                                gap: 3,
                            }}
                        >
                            {awards.map((award, index) => (
                                <Box
                                    key={index}
                                    sx={{
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
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={award.image}
                                        alt={award.name}
                                        sx={{
                                            height: '120px',
                                            objectFit: 'contain',
                                            marginBottom: 2,
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            color: '#333',
                                            textAlign: 'center',
                                            marginBottom: 1,
                                        }}
                                    >
                                        {award.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '12px',
                                            color: '#666',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {award.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default PartnersAwardsSection;
