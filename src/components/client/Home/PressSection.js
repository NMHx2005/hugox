import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CircularProgress, Alert, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { get_featured_news } from '../../../api/client/news';
const PressArticle = ({ article }) => {
    return (_jsxs(Card, { sx: {
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
        }, children: [_jsx(CardMedia, { component: "img", height: "200", image: article.featuredImage || '/placeholder.jpg', alt: article.title, sx: {
                    objectFit: 'cover',
                } }), _jsxs(CardContent, { sx: { padding: { xs: 2, sm: 2.5, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }, children: [_jsx(Typography, { sx: {
                            fontSize: { xs: '10px', sm: '11px', md: '12px' },
                            fontWeight: 600,
                            color: '#f58220',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: { xs: 1.5, sm: 1.8, md: 2 },
                        }, children: article.category }), _jsx(Typography, { variant: "h6", sx: {
                            fontWeight: 700,
                            fontSize: { xs: '16px', sm: '17px', md: '18px' },
                            color: '#333',
                            marginBottom: { xs: 1.5, sm: 1.8, md: 2 },
                            lineHeight: 1.3,
                            flexGrow: 1,
                        }, children: article.title }), _jsx(Typography, { sx: {
                            fontSize: { xs: '13px', sm: '13.5px', md: '14px' },
                            color: '#666',
                            lineHeight: 1.5,
                            marginBottom: { xs: 2.5, sm: 2.8, md: 3 },
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }, children: article.excerpt }), _jsx(Button, { component: Link, to: `/news/${article.slug}`, variant: "contained", sx: {
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
                        }, children: "Xem chi ti\u1EBFt" })] })] }));
};
const PressSection = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    useEffect(() => {
        loadFeaturedNews();
    }, []);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setItemsPerView(1);
            }
            else if (window.innerWidth < 960) {
                setItemsPerView(2);
            }
            else {
                setItemsPerView(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const loadFeaturedNews = async () => {
        try {
            setLoading(true);
            const data = await get_featured_news(6); // Load 6 featured news articles
            // get_featured_news already returns an array, so we can use it directly
            setArticles(data);
        }
        catch (error) {
            console.error('Error loading featured news:', error);
            setError('Lỗi tải tin tức nổi bật');
            setArticles([]);
        }
        finally {
            setLoading(false);
        }
    };
    const maxSlides = Math.max(0, Math.ceil(articles.length / itemsPerView) - 1);
    const nextSlide = () => {
        setCurrentSlide(prev => Math.min(prev + 1, maxSlides));
    };
    const prevSlide = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
    };
    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
    };
    return (_jsx("div", { className: 'press-section', style: { backgroundColor: '#FFFFFF', padding: '60px 0' }, children: _jsxs(Box, { className: "container", sx: { padding: { xs: '40px 0', sm: '50px 0', md: '60px 0', lg: '80px 0' } }, children: [_jsxs(Box, { sx: { textAlign: 'center', marginBottom: { xs: 4, sm: 5, md: 6 } }, children: [_jsx(Typography, { variant: "h3", sx: {
                                fontWeight: 700,
                                fontSize: { xs: '22px', sm: '26px', md: '32px', lg: '38px' },
                                color: '#333',
                                marginBottom: { xs: 1.5, sm: 1.8, md: 2 },
                                lineHeight: 1.2,
                            }, children: "B\u00C1O CH\u00CD" }), _jsx(Typography, { variant: "h4", sx: {
                                fontWeight: 700,
                                fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '24px' },
                                color: '#333',
                                lineHeight: 1.2,
                            }, children: "B\u00E1o ch\u00ED n\u00F3i g\u00EC v\u1EC1 ch\u00FAng t\u00F4i?" })] }), loading ? (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }, children: _jsx(CircularProgress, {}) })) : error ? (_jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error })) : articles.length > 0 ? (_jsxs(Box, { sx: { position: 'relative' }, children: [_jsx(IconButton, { onClick: prevSlide, disabled: currentSlide === 0, sx: {
                                position: 'absolute',
                                left: { xs: -10, sm: -20 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                },
                                '&:disabled': {
                                    opacity: 0.3,
                                },
                            }, children: _jsx(ChevronLeft, {}) }), _jsx(IconButton, { onClick: nextSlide, disabled: currentSlide === maxSlides, sx: {
                                position: 'absolute',
                                right: { xs: -10, sm: -20 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                },
                                '&:disabled': {
                                    opacity: 0.3,
                                },
                            }, children: _jsx(ChevronRight, {}) }), _jsx(Box, { sx: {
                                overflow: 'hidden',
                                borderRadius: '12px',
                            }, children: _jsx(Box, { sx: {
                                    display: 'flex',
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                    transition: 'transform 0.3s ease-in-out',
                                }, children: Array.from({ length: maxSlides + 1 }, (_, slideIndex) => (_jsx(Box, { sx: {
                                        minWidth: '100%',
                                        display: 'flex',
                                        gap: { xs: 2, sm: 3, md: 4 },
                                        padding: { xs: '0 16px', sm: '0 24px' },
                                    }, children: articles
                                        .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                                        .map((article) => (_jsx(Box, { sx: {
                                            flex: `0 0 ${100 / itemsPerView}%`,
                                            maxWidth: `${100 / itemsPerView}%`,
                                        }, children: _jsx(PressArticle, { article: article }) }, article._id))) }, slideIndex))) }) }), maxSlides > 0 && (_jsx(Box, { sx: {
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 1,
                                mt: 3,
                            }, children: Array.from({ length: maxSlides + 1 }, (_, index) => (_jsx(Box, { onClick: () => goToSlide(index), sx: {
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: currentSlide === index ? '#f58220' : '#ddd',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: currentSlide === index ? '#e6731a' : '#bbb',
                                    },
                                } }, index))) }))] })) : (_jsx(Box, { sx: { textAlign: 'center', py: 4 }, children: _jsx(Typography, { variant: "h6", color: "text.secondary", children: "Ch\u01B0a c\u00F3 tin t\u1EE9c n\u1ED5i b\u1EADt n\u00E0o" }) }))] }) }));
};
export default PressSection;
