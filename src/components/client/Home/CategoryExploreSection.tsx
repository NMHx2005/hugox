import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

interface CategoryCardProps {
    image: string;
    title: string;
    description: string;
    link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, description, link }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: { xs: '8px', sm: '10px', md: '12px' },
                boxShadow: { xs: '0 2px 8px rgba(0, 0, 0, 0.08)', sm: '0 3px 10px rgba(0, 0, 0, 0.08)', md: '0 4px 12px rgba(0, 0, 0, 0.08)' },
                padding: { xs: '16px', sm: '18px', md: '20px' },
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: { xs: '0 4px 12px rgba(0, 0, 0, 0.12)', sm: '0 5px 14px rgba(0, 0, 0, 0.12)', md: '0 6px 16px rgba(0, 0, 0, 0.12)' },
                },
            }}
        >
            <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                    width: '100%',
                    height: { xs: '140px', sm: '160px', md: '180px' },
                    objectFit: 'cover',
                    borderRadius: { xs: '6px', sm: '7px', md: '8px' },
                    marginBottom: { xs: '12px', sm: '14px', md: '16px' },
                }}
            />
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 700,
                    fontSize: { xs: '16px', sm: '17px', md: '18px' },
                    color: '#000',
                    marginBottom: { xs: '6px', sm: '7px', md: '8px' },
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    fontSize: { xs: '12px', sm: '12.5px', md: '13px' },
                    color: '#666',
                    marginBottom: { xs: '16px', sm: '18px', md: '20px' },
                    flexGrow: 1,
                    lineHeight: 1.4,
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
                    fontSize: { xs: '12px', sm: '12.5px', md: '13px' },
                    padding: { xs: '6px 16px', sm: '7px 18px', md: '8px 20px' },
                    borderRadius: '20px',
                    '&:hover': {
                        backgroundColor: '#333',
                    },
                }}
                href={link}
            >
                Xem thêm
            </Button>
        </Box>
    );
};

const CategoryExploreSection: React.FC = () => {
    const categories = [
        {
            image: 'dien-gia-dung_optimized.jpg',
            title: 'Điện gia dụng',
            description: 'Mang đến sự thoải mái những công nghệ, tính năng vượt trội',
            link: '/categories/appliances',
        },
        {
            image: 'dien-gia-dung_optimized.jpg',
            title: 'Thiết bị nhà bếp',
            description: 'Rảnh tay hơn với thiết bị thông minh, an toàn và tiết kiệm điện',
            link: '/categories/kitchen',
        },
        {
            image: 'dien-gia-dung_optimized.jpg',
            title: 'Quạt',
            description: 'Làm mát hiệu quả với thiết kế hiện đại, đẹp mắt, tiết kiệm điện',
            link: '/categories/fans',
        },
        {
            image: 'dien-gia-dung_optimized.jpg',
            title: 'Máy hút ẩm',
            description: 'Cân bằng độ ẩm hoàn hảo cho ngôi nhà, bảo vệ sức khỏe',
            link: '/categories/dehumidifier',
        },
        {
            image: 'dien-gia-dung_optimized.jpg',
            title: 'Sức khoẻ & làm đẹp',
            description: 'Hơn cả một sản phẩm, là hành trình yêu thương bản thân',
            link: '/categories/health-beauty',
        },
        {
            image: 'dien-gia-dung_optimized.jpg',
            title: 'Máy hút ẩm',
            description: 'Cân bằng độ ẩm hoàn hảo cho ngôi nhà, bảo vệ sức khỏe',
            link: '/categories/dehumidifier',
        },
        {
            image: 'dien-gia-dung_optimized.jpg',
            title: 'Sức khoẻ & làm đẹp',
            description: 'Hơn cả một sản phẩm, là hành trình yêu thương bản thân',
            link: '/categories/health-beauty',
        },
    ];

    return (
        <Box className="container" sx={{ padding: { xs: '40px 0', sm: '50px 0', md: '60px 0', lg: '80px 0' }, backgroundColor: '#F2F4F7' }}>
            {/* Section Title */}
            <Box sx={{ textAlign: 'center', marginBottom: { xs: 4, sm: 5, md: 6 } }}>
                <Typography
                    sx={{
                        fontSize: { xs: '12px', sm: '13px', md: '14px', lg: '16px' },
                        fontWeight: 600,
                        color: '#f58220',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: { xs: 0.8, sm: 0.9, md: 1 },
                    }}
                >
                    KHÁM PHÁ
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: '22px', sm: '26px', md: '32px', lg: '38px' },
                        color: '#000',
                        lineHeight: 1.2,
                    }}
                >
                    Cùng HUGOX
                </Typography>
            </Box>

            {/* Category Cards Carousel */}
            <Box sx={{ position: 'relative', paddingX: { xs: 0, md: 2 } }}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.swiper-button-next-explore',
                        prevEl: '.swiper-button-prev-explore',
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        900: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1500: {
                            slidesPerView: 5,
                            spaceBetween: 24,
                        },
                    }}
                    style={{ paddingBottom: 40 }}
                >
                    {categories.map((category, index) => (
                        <SwiperSlide key={index}>
                            <CategoryCard {...category} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <IconButton
                    className="swiper-button-prev-explore"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: { xs: '0px', md: '-20px' },
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        display: { xs: 'none', md: 'flex' },
                    }}
                >
                    <ArrowBackIos sx={{ fontSize: '20px', color: '#000' }} />
                </IconButton>
                <IconButton
                    className="swiper-button-next-explore"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: { xs: '0px', md: '-20px' },
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        display: { xs: 'none', md: 'flex' },
                    }}
                >
                    <ArrowForwardIos sx={{ fontSize: '20px', color: '#000' }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CategoryExploreSection;
