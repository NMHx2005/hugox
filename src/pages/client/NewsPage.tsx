import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { get_news, get_news_categories, NewsArticle } from '../../api/client/news';

const NewsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '-publishedAt');

  useEffect(() => {
    loadNews();
  }, [searchParams]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: Number(searchParams.get('page')) || 1,
        limit: 12,
        category: searchParams.get('category') || undefined,
        search: searchParams.get('search') || undefined,
        sort: searchParams.get('sort') || '-publishedAt'
      };

      const response = await get_news(params);
      setNews(response.data.news);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Error loading news:', err);
      setError('Không thể tải danh sách tin tức');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await get_news_categories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams();
    if (search) newParams.set('search', search);
    if (category) newParams.set('category', category);
    if (sort !== '-publishedAt') newParams.set('sort', sort);
    newParams.set('page', '1');

    setSearchParams(newParams);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const newParams = new URLSearchParams(searchParams);
    if (newCategory) {
      newParams.set('category', newCategory);
    } else {
      newParams.delete('category');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newSort);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', value.toString());
    setSearchParams(newParams);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  if (error) {
    return (
      <Layout>
        <Box className="container" sx={{ mt: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
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
          <Typography color="text.primary">Tin tức</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            Tin tức & Sự kiện
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Cập nhật những tin tức mới nhất về sản phẩm, công nghệ và sự kiện của chúng tôi
          </Typography>
        </Box>

        {/* Filters */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Tìm kiếm tin tức..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              label="Danh mục"
            >
              <MenuItem value="">Tất cả</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sắp xếp</InputLabel>
            <Select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              label="Sắp xếp"
            >
              <MenuItem value="-publishedAt">Mới nhất</MenuItem>
              <MenuItem value="publishedAt">Cũ nhất</MenuItem>
              <MenuItem value="-views">Xem nhiều</MenuItem>
              <MenuItem value="views">Ít xem</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ ml: 'auto' }}>
            <Typography variant="body2" color="text.secondary">
              {pagination.total} bài viết
            </Typography>
          </Box>
        </Box>

        {/* News Grid */}
        {news.length > 0 ? (
          <>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
              {news.map((article) => (
                <Box key={article._id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    {article.featuredImage && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={article.featuredImage}
                        alt={article.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}

                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={article.category}
                          size="small"
                          sx={{
                            backgroundColor: '#f58220',
                            color: 'white',
                            fontWeight: 600,
                            mb: 1
                          }}
                        />
                        {article.featured && (
                          <Chip
                            label="Nổi bật"
                            size="small"
                            color="secondary"
                            sx={{ ml: 1, mb: 1 }}
                          />
                        )}
                      </Box>

                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '3.2em'
                        }}
                      >
                        <Link
                          to={`/news/${article._id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {article.title}
                        </Link>
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          flexGrow: 1
                        }}
                      >
                        {article.excerpt || article.content.substring(0, 150) + '...'}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {article.author.name}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(article.publishedAt || article.createdAt)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {article.views}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={pagination.pages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              Không tìm thấy tin tức nào
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default NewsPage;