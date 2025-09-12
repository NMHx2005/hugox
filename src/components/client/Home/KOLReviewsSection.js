import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, PlayArrow } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
const VideoReview = ({ thumbnail, title, profileImage, profileName }) => {
    return (_jsxs(Box, { sx: {
            position: 'relative',
            borderRadius: { xs: '8px', sm: '10px', md: '12px' },
            overflow: 'hidden',
            boxShadow: { xs: '0 2px 8px rgba(0, 0, 0, 0.08)', sm: '0 3px 10px rgba(0, 0, 0, 0.08)', md: '0 4px 12px rgba(0, 0, 0, 0.08)' },
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: { xs: '0 4px 16px rgba(0, 0, 0, 0.15)', sm: '0 6px 20px rgba(0, 0, 0, 0.15)', md: '0 8px 25px rgba(0, 0, 0, 0.15)' },
            },
        }, children: [_jsxs(Box, { sx: {
                    position: 'relative',
                    width: '100%',
                    height: { xs: '160px', sm: '180px', md: '200px' },
                    overflow: 'hidden',
                }, children: [_jsx(Box, { component: "img", src: thumbnail, alt: title, sx: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        } }), _jsx(Box, { sx: {
                            position: 'absolute',
                            top: { xs: 8, sm: 10, md: 12 },
                            left: { xs: 8, sm: 10, md: 12 },
                            width: { xs: 32, sm: 36, md: 40 },
                            height: { xs: 32, sm: 36, md: 40 },
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2px solid #fff',
                        }, children: _jsx(Box, { component: "img", src: profileImage, alt: profileName, sx: {
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            } }) }), _jsx(Box, { sx: {
                            position: 'absolute',
                            bottom: { xs: 8, sm: 10, md: 12 },
                            left: { xs: 8, sm: 10, md: 12 },
                            width: { xs: 40, sm: 44, md: 48 },
                            height: { xs: 40, sm: 44, md: 48 },
                            backgroundColor: 'rgba(255, 0, 0, 0.9)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }, children: _jsx(PlayArrow, { sx: { color: '#fff', fontSize: { xs: '20px', sm: '22px', md: '24px' } } }) })] }), _jsx(Box, { sx: { padding: { xs: 1.5, sm: 1.8, md: 2 } }, children: _jsx(Typography, { sx: {
                        fontSize: { xs: '12px', sm: '13px', md: '14px' },
                        fontWeight: 600,
                        color: '#333',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }, children: title }) })] }));
};
const KOLReviewsSection = () => {
    const videoReviews = [
        {
            thumbnail: '/maxresdefault.webp',
            title: 'Đánh giá Máy hút ẩm thông minh Lumias NWT D3 - NỒM ẨM ẢNH MIỀN BẮC',
            profileImage: '/channels4_profile.jpg',
            profileName: 'Tech Reviewer 1',
            videoId: 'video1',
        },
        {
            thumbnail: '/maxresdefault.webp',
            title: 'Máy lọc không khí NHỎ GỌN để lên bàn làm việc - LUMIAS BULMA CHO PHÒNG 40M2',
            profileImage: '/channels4_profile.jpg',
            profileName: 'Tech Reviewer 2',
            videoId: 'video2',
        },
        {
            thumbnail: '/maxresdefault.webp',
            title: 'Review máy khử ẩm Lumias D3T Pro: Hiệu quả cao, thiết kế đẹp',
            profileImage: '/channels4_profile.jpg',
            profileName: 'Tech Reviewer 3',
            videoId: 'video3',
        },
    ];
    return (_jsx("div", { className: 'kol-reviews-section', style: { backgroundColor: '#FFFFFF', padding: '60px 0' }, children: _jsxs(Box, { className: "container", sx: { padding: { xs: '40px 0', sm: '50px 0', md: '60px 0', lg: '80px 0' } }, children: [_jsx(Box, { sx: { textAlign: 'center', marginBottom: { xs: 4, sm: 5, md: 6 } }, children: _jsx(Typography, { variant: "h3", sx: {
                            fontWeight: 700,
                            fontSize: { xs: '22px', sm: '26px', md: '32px', lg: '38px' },
                            color: '#333',
                            lineHeight: 1.2,
                        }, children: "KOL reviews s\u1EA3n ph\u1EA9m" }) }), _jsxs(Box, { sx: { position: 'relative', paddingX: { xs: 0, md: 2 } }, children: [_jsx(Swiper, { modules: [Navigation], spaceBetween: 16, slidesPerView: 1, navigation: {
                                nextEl: '.swiper-button-next-kol',
                                prevEl: '.swiper-button-prev-kol',
                            }, breakpoints: {
                                600: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                900: {
                                    slidesPerView: 3,
                                    spaceBetween: 24,
                                },
                            }, children: videoReviews.map((review, index) => (_jsx(SwiperSlide, { children: _jsx(VideoReview, { ...review }) }, index))) }), _jsx(IconButton, { className: "swiper-button-prev-kol", sx: {
                                position: 'absolute',
                                top: '50%',
                                left: { xs: '0px', md: '-20px' },
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                                zIndex: 10,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                display: { xs: 'none', md: 'flex' },
                            }, children: _jsx(ArrowBackIos, { sx: { fontSize: '20px', color: '#000' } }) }), _jsx(IconButton, { className: "swiper-button-next-kol", sx: {
                                position: 'absolute',
                                top: '50%',
                                right: { xs: '0px', md: '-20px' },
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                                zIndex: 10,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                display: { xs: 'none', md: 'flex' },
                            }, children: _jsx(ArrowForwardIos, { sx: { fontSize: '20px', color: '#000' } }) })] })] }) }));
};
export default KOLReviewsSection;
