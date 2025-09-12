import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  Avatar,
  Button,
  TextField
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  Share as ShareIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon
} from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_news_article, get_news, NewsArticle } from '../../api/client/news';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadArticle();
    }
  }, [id]);

  const loadArticle = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await get_news_article(id);
      setArticle(response.data.article);

      // Load related news
      loadRelatedNews(response.data.article.category);
    } catch (err) {
      console.error('Error loading article:', err);
      setError('Không thể tải bài viết');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedNews = async (category: string) => {
    try {
      const response = await get_news({
        category,
        limit: 4,
        page: 1
      });
      setRelatedNews(response.data.news.filter(news => news._id !== id));
    } catch (err) {
      console.error('Error loading related news:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box className="container" sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <Box className="container" sx={{ mt: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'Bài viết không tồn tại'}
          </Alert>
          <Typography variant="h4" component="h1">
            Bài viết không tồn tại
          </Typography>
          <Typography>
            Vui lòng kiểm tra lại đường dẫn.
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box className="container" sx={{ mt: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component={Link} to="/" color="inherit">
            Trang chủ
          </MuiLink>
          <MuiLink component={Link} to="/news" color="inherit">
            Tin tức
          </MuiLink>
          <Typography color="text.primary">{article.title}</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Main Content */}
          <Box sx={{ flex: { xs: 1, md: 2 } }}>
            <Card>
              {/* Featured Image */}
              {article.featuredImage && (
                <CardMedia
                  component="img"
                  height="400"
                  image={article.featuredImage}
                  alt={article.title}
                  sx={{ objectFit: 'cover' }}
                />
              )}

              <CardContent sx={{ p: 4 }}>
                {/* Article Meta */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Chip
                      label={article.category}
                      sx={{
                        backgroundColor: '#f58220',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                    {article.featured && (
                      <Chip
                        label="Nổi bật"
                        color="secondary"
                        size="small"
                      />
                    )}
                  </Box>

                  <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
                    {article.title}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#f58220' }}>
                        <PersonIcon />
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        {article.author.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(article.publishedAt || article.createdAt)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {article.views} lượt xem
                      </Typography>
                    </Box>

                    <Box sx={{ ml: 'auto' }}>
                      <IconButton onClick={handleShare} color="primary">
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />
                </Box>

                {/* Article Content */}
                <Box
                  sx={{
                    '& h2': { fontSize: '1.5rem', fontWeight: 700, mb: 2, mt: 3 },
                    '& h3': { fontSize: '1.25rem', fontWeight: 600, mb: 1.5, mt: 2 },
                    '& p': { mb: 2, lineHeight: 1.8 },
                    '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1, mb: 2 },
                    '& ul, & ol': { pl: 3, mb: 2 },
                    '& li': { mb: 0.5 }
                  }}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Tags:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {article.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ThumbUpIcon />}
                    sx={{ borderColor: '#f58220', color: '#f58220' }}
                  >
                    Thích
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CommentIcon />}
                    sx={{ borderColor: '#f58220', color: '#f58220' }}
                  >
                    Bình luận
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ShareIcon />}
                    onClick={handleShare}
                    sx={{ borderColor: '#f58220', color: '#f58220' }}
                  >
                    Chia sẻ
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Sidebar */}
          <Box sx={{ flex: { xs: 1, md: 1 }, minWidth: { md: '300px' } }}>
            {/* Related News */}
            {relatedNews.length > 0 && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Tin tức liên quan
                  </Typography>
                  {relatedNews.map((news) => (
                    <Box key={news._id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                      <Link
                        to={`/news/${news._id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            '&:hover': { color: '#f58220' }
                          }}
                        >
                          {news.title}
                        </Typography>
                      </Link>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(news.publishedAt || news.createdAt)}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Newsletter Signup */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Đăng ký nhận tin
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Nhận thông báo về tin tức mới nhất từ chúng tôi
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Nhập email của bạn"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#f58220', '&:hover': { backgroundColor: '#e6731a' } }}
                >
                  Đăng ký
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default NewsDetailPage;