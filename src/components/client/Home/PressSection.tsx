import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CircularProgress, Alert, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { get_featured_news, NewsArticle } from '../../../api/client/news';

interface PressArticleProps {
    article: NewsArticle;
}

const PressArticle: React.FC<PressArticleProps> = ({ article }) => {
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
                image={article.featuredImage || '/placeholder.jpg'}
                alt={article.title}
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
                    {article.category}
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
                    {article.title}
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
                    {article.excerpt}
                </Typography>

                <Button
                    component={Link}
                    to={`/news/${article.slug}`}
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
                >
                    Xem chi tiết
                </Button>
            </CardContent>
        </Card>
    );
};

const PressSection: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    useEffect(() => {
        loadFeaturedNews();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setItemsPerView(1);
            } else if (window.innerWidth < 960) {
                setItemsPerView(2);
            } else {
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
        } catch (error) {
            console.error('Error loading featured news:', error);
            setError('Lỗi tải tin tức nổi bật');
            setArticles([]);
        } finally {
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

    const goToSlide = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
    };

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

                {/* Articles Slider */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                ) : articles.length > 0 ? (
                    <Box sx={{ position: 'relative' }}>
                        {/* Navigation Buttons */}
                        <IconButton
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            sx={{
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
                            }}
                        >
                            <ChevronLeft />
                        </IconButton>

                        <IconButton
                            onClick={nextSlide}
                            disabled={currentSlide === maxSlides}
                            sx={{
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
                            }}
                        >
                            <ChevronRight />
                        </IconButton>

                        {/* Slider Container */}
                        <Box
                            sx={{
                                overflow: 'hidden',
                                borderRadius: '12px',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            >
                                {Array.from({ length: maxSlides + 1 }, (_, slideIndex) => (
                                    <Box
                                        key={slideIndex}
                                        sx={{
                                            minWidth: '100%',
                                            display: 'flex',
                                            gap: { xs: 2, sm: 3, md: 4 },
                                            padding: { xs: '0 16px', sm: '0 24px' },
                                        }}
                                    >
                                        {articles
                                            .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                                            .map((article) => (
                                                <Box
                                                    key={article._id}
                                                    sx={{
                                                        flex: `0 0 ${100 / itemsPerView}%`,
                                                        maxWidth: `${100 / itemsPerView}%`,
                                                    }}
                                                >
                                                    <PressArticle article={article} />
                                                </Box>
                                            ))}
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Dots Indicator */}
                        {maxSlides > 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 1,
                                    mt: 3,
                                }}
                            >
                                {Array.from({ length: maxSlides + 1 }, (_, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: currentSlide === index ? '#f58220' : '#ddd',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: currentSlide === index ? '#e6731a' : '#bbb',
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            Chưa có tin tức nổi bật nào
                        </Typography>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default PressSection;
