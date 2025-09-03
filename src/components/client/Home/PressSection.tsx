import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';

interface PressArticleProps {
    source: string;
    title: string;
    description: string;
    image: string;
    link: string;
}

const PressArticle: React.FC<PressArticleProps> = ({ source, title, description, image, link }) => {
    return (
        <Card
            sx={{
                backgroundColor: '#fff',
                borderRadius: { xs: '8px', sm: '10px', md: '12px' },
                boxShadow: { xs: '0 2px 8px rgba(0, 0, 0, 0.08)', sm: '0 3px 10px rgba(0, 0, 0, 0.08)', md: '0 4px 12px rgba(0, 0, 0, 0.08)' },
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: { xs: '0 4px 16px rgba(0, 0, 0, 0.15)', sm: '0 6px 20px rgba(0, 0, 0, 0.15)', md: '0 8px 25px rgba(0, 0, 0, 0.15)' },
                },
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={image}
                alt={title}
                sx={{
                    objectFit: 'cover',
                }}
            />
            <CardContent sx={{ padding: { xs: 2, sm: 2.5, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                    sx={{
                        fontSize: { xs: '10px', sm: '11px', md: '12px' },
                        fontWeight: 600,
                        color: '#f58220',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: { xs: 1.5, sm: 1.8, md: 2 },
                    }}
                >
                    {source}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: '16px', sm: '17px', md: '18px' },
                        color: '#333',
                        marginBottom: { xs: 1.5, sm: 1.8, md: 2 },
                        lineHeight: 1.3,
                        flexGrow: 1,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: '13px', sm: '13.5px', md: '14px' },
                        color: '#666',
                        lineHeight: 1.5,
                        marginBottom: { xs: 2.5, sm: 2.8, md: 3 },
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {description}
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: { xs: '13px', sm: '13.5px', md: '14px' },
                        padding: { xs: '8px 20px', sm: '9px 22px', md: '10px 24px' },
                        borderRadius: '6px',
                        textTransform: 'none',
                        alignSelf: 'flex-start',
                        '&:hover': {
                            backgroundColor: '#333',
                        },
                    }}
                    href={link}
                >
                    Xem chi tiết
                </Button>
            </CardContent>
        </Card>
    );
};

const PressSection: React.FC = () => {
    const articles = [
        {
            source: 'VNEXPRESS',
            title: 'Lumias - máy hút ẩm gia đình hiệu suất cao',
            description: 'Chuyên gia công nghệ đánh giá máy hút ẩm Lumias có hiệu suất tốt so với tầm giá cùng bình chứa dung tích lớn, độ ồn không quá 56 dB, ít ảnh hưởng giấc ngủ.',
            image: '/bao-vnexpress-1.jpg',
            link: '#',
        },
        {
            source: 'ONLINE / VTV.vn',
            title: 'Hợp Long trở thành nhà phân phối độc quyền máy hút ẩm NWT và thương hiệu Lumias ở Việt Nam',
            description: 'VTV.vn - Từ nay, người dùng Việt có thể chọn mua máy hút ẩm NWT và các sản phẩm Lumias qua hệ thống phân phối độc quyền của Hợp Long (gigadigital.vn)',
            image: '/bao-vnexpress-1.jpg',
            link: '#',
        },
        {
            source: 'Tinhte.vn',
            title: 'Review nhanh máy hút ẩm Lumias LMD-20L',
            description: 'Trong bài viết này, mình sẽ chia sẻ về máy hút ẩm Lumias LMD-20L, từ thiết kế, tính năng, cho đến hiệu suất hoạt động thực tế...',
            image: '/bao-vnexpress-1.jpg',
            link: '#',
        },
    ];

    return (
        <div className='press-section' style={{ backgroundColor: '#FFFFFF', padding: '60px 0' }}>
            <Box className="container" sx={{ padding: { xs: '40px 0', sm: '50px 0', md: '60px 0', lg: '80px 0' } }}>
                {/* Section Title */}
                <Box sx={{ textAlign: 'center', marginBottom: { xs: 4, sm: 5, md: 6 } }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '22px', sm: '26px', md: '32px', lg: '38px' },
                            color: '#333',
                            marginBottom: { xs: 1.5, sm: 1.8, md: 2 },
                            lineHeight: 1.2,
                        }}
                    >
                        BÁO CHÍ
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '24px' },
                            color: '#333',
                            lineHeight: 1.2,
                        }}
                    >
                        Báo chí nói gì về chúng tôi?
                    </Typography>
                </Box>

                {/* Articles Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: { xs: 3, sm: 3.5, md: 4 },
                    }}
                >
                    {articles.map((article, index) => (
                        <PressArticle key={index} {...article} />
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default PressSection;
