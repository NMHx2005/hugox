import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Breadcrumbs,
    Link as MuiLink,
    Card,
    CardContent,
    Rating,
    // Divider
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Star as StarIcon,
    // ShoppingCart as ShoppingCartIcon,
    Support as SupportIcon,
    Business as BusinessIcon
} from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { getProductById, MOCK_PRODUCTS } from '../../data/mockProducts';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = id ? getProductById(parseInt(id)) : null;
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
        return (
            <Layout>
                <Box className="container" sx={{ mt: 3 }}>
                    <Typography variant="h4" component="h1">
                        Sản phẩm không tồn tại
                    </Typography>
                    <Typography>
                        Vui lòng kiểm tra lại đường dẫn.
                    </Typography>
                </Box>
            </Layout>
        );
    }

    // Mock data for product details
    const productImages = [
        product.image,
        product.image, // In real app, these would be different images
        product.image
    ];

    const productAttributes = [
        { label: 'Màu sắc', value: 'Bạc' },
        { label: 'Dung tích', value: '20L' },
        { label: 'Chất liệu', value: 'Thép, nhựa PP' },
        { label: 'Tiện ích', value: 'Đóng mở 90° không gây ồn' }
    ];

    const qualityMetrics = [
        { label: 'Chất lượng sản phẩm', rating: 5.0 },
        { label: 'Tốc độ giao hàng', rating: 5.0 },
        { label: 'Bảo hành dịch vụ', rating: 5.0 }
    ];

    const relatedProducts = MOCK_PRODUCTS.slice(0, 5);

    return (
        <Layout>
            <Box className="container" sx={{ mt: 3 }}>
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ mb: 3 }}>
                    <MuiLink component={Link} to="/" color="inherit">
                        Trang chủ
                    </MuiLink>
                    <MuiLink component={Link} to="/categories" color="inherit">
                        Thiết bị khác
                    </MuiLink>
                    <Typography color="text.primary">{product.name}</Typography>
                </Breadcrumbs>

                <Box sx={{
                    display: 'flex',
                    gap: 4,
                    flexDirection: { xs: 'column', md: 'row' }
                }}>
                    {/* Left Column - Product Images */}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ position: 'relative' }}>
                            {/* Main Image */}
                            <Box
                                component="img"
                                src={productImages[selectedImage]}
                                alt={product.name}
                                sx={{
                                    width: '100%',
                                    maxHeight: 500,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    mb: 2
                                }}
                            />

                            {/* Thumbnail Images */}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {productImages.map((img, index) => (
                                    <Box
                                        key={index}
                                        component="img"
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                        onClick={() => setSelectedImage(index)}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                            cursor: 'pointer',
                                            border: selectedImage === index ? '2px solid #f58220' : '1px solid #ddd',
                                            '&:hover': {
                                                borderColor: '#f58220'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Column - Product Info */}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ pl: { xs: 0, md: 2 } }}>
                            {/* Rating & Sales */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <StarIcon sx={{ color: '#ffb400', fontSize: 20 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {product.rating}
                                </Typography>
                                <Typography sx={{ color: '#666' }}>•</Typography>
                                <Typography sx={{ color: '#666' }}>Đã bán: {product.sold}</Typography>
                            </Box>

                            {/* Product Title */}
                            <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
                                {product.name}
                            </Typography>

                            {/* Quality Metrics */}
                            <Box sx={{ mb: 3 }}>
                                {qualityMetrics.map((metric, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Typography sx={{ minWidth: 120, fontSize: 14 }}>
                                            {metric.label}
                                        </Typography>
                                        <Rating value={metric.rating} readOnly size="small" />
                                        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                                            {metric.rating}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* Pricing */}
                            <Box sx={{ mb: 3 }}>
                                {product.priceOriginal && (
                                    <Typography
                                        sx={{
                                            color: '#999',
                                            textDecoration: 'line-through',
                                            fontSize: 18,
                                            mb: 1
                                        }}
                                    >
                                        {product.priceOriginal}₫
                                    </Typography>
                                )}
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: '#f58220',
                                        fontWeight: 700,
                                        mb: 2
                                    }}
                                >
                                    {product.priceCurrent === 'Liên hệ' ? product.priceCurrent : `${product.priceCurrent}₫`}
                                </Typography>
                            </Box>

                            {/* Product Attributes */}
                            <Box sx={{ mb: 3 }}>
                                {productAttributes.map((attr, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Typography sx={{ minWidth: 100, fontSize: 14, fontWeight: 600 }}>
                                            {attr.label}:
                                        </Typography>
                                        <Chip
                                            label={attr.value}
                                            size="small"
                                            sx={{
                                                backgroundColor: '#f5f5f5',
                                                color: '#333',
                                                fontWeight: 500
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>

                            {/* Purchase Options */}
                            <Box sx={{ mb: 3 }}>
                                <Typography sx={{ mb: 2, fontWeight: 600 }}>Mua hàng tại:</Typography>
                                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: '#f58220',
                                            color: '#f58220',
                                            '&:hover': {
                                                borderColor: '#f58220',
                                                backgroundColor: '#fff5f0'
                                            }
                                        }}
                                    >
                                        Shopee
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: '#f58220',
                                            color: '#f58220',
                                            '&:hover': {
                                                borderColor: '#f58220',
                                                backgroundColor: '#fff5f0'
                                            }
                                        }}
                                    >
                                        TikTok
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: '#f58220',
                                            color: '#f58220',
                                            '&:hover': {
                                                borderColor: '#f58220',
                                                backgroundColor: '#fff5f0'
                                            }
                                        }}
                                    >
                                        GIGA.vn
                                    </Button>
                                </Box>
                            </Box>

                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<BusinessIcon />}
                                    sx={{
                                        backgroundColor: '#f58220',
                                        '&:hover': {
                                            backgroundColor: '#e6731a'
                                        },
                                        px: 3,
                                        py: 1.5
                                    }}
                                    onClick={() => window.open('https://zalo.me/0878784842', '_blank')}
                                >
                                    MUA HÀNG
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<SupportIcon />}
                                    sx={{
                                        borderColor: '#f58220',
                                        color: '#f58220',
                                        '&:hover': {
                                            borderColor: '#f58220',
                                            backgroundColor: '#fff5f0'
                                        },
                                        px: 3,
                                        py: 1.5
                                    }}
                                    onClick={() => window.open('tel:0878784842', '_self')}
                                >
                                    HỖ TRỢ KHÁCH HÀNG
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Product Description & Technical Specs */}
                <Box sx={{ mt: 6 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#f58220',
                                '&:hover': { backgroundColor: '#e6731a' }
                            }}
                        >
                            Mô tả sản phẩm
                        </Button>
                        <Button variant="outlined">Thông số kỹ thuật</Button>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                            Mô tả sản phẩm
                        </Typography>
                        <Typography sx={{ lineHeight: 1.8, color: '#666' }}>
                            {product.name} là sản phẩm chất lượng cao với thiết kế hiện đại và tiện ích vượt trội.
                            Sản phẩm được làm từ chất liệu thép và nhựa PP cao cấp, đảm bảo độ bền và an toàn cho người sử dụng.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                            Thông số kỹ thuật
                        </Typography>
                        <Box sx={{
                            border: '1px solid #ddd',
                            borderRadius: 1,
                            overflow: 'hidden'
                        }}>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                '& > *': {
                                    borderBottom: '1px solid #eee',
                                    p: 2,
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: '#f9f9f9',
                                        fontWeight: 600
                                    }
                                }
                            }}>
                                <Box>Tên sản phẩm</Box>
                                <Box>{product.name}</Box>
                                <Box>Model</Box>
                                <Box>LTC-20L</Box>
                                <Box>Màu sắc</Box>
                                <Box>Bạc kim loại</Box>
                                <Box>Chất liệu</Box>
                                <Box>Thép, nhựa PP</Box>
                                <Box>Dung tích</Box>
                                <Box>20L</Box>
                                <Box>Khối lượng</Box>
                                <Box>2.6kg</Box>
                                <Box>Kích thước sản phẩm</Box>
                                <Box>340 x 285 x 404mm</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Expandable Sections */}
                <Box sx={{ mb: 4 }}>
                    {[
                        'Trong hộp có gì?',
                        'Thông số kỹ thuật',
                        'Hướng dẫn sử dụng',
                        'Bảo dưỡng vệ sinh và lưu ý',
                        'Tài liệu sử dụng'
                    ].map((title, index) => (
                        <Accordion key={index} sx={{ mb: 1 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nội dung chi tiết cho {title.toLowerCase()} sẽ được cập nhật...
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

                {/* Related Products */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                        Sản phẩm liên quan
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(5, 1fr)'
                        },
                        gap: 2
                    }}>
                        {relatedProducts.map((relatedProduct) => (
                            <Card
                                key={relatedProduct.id}
                                sx={{
                                    height: '100%',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 3
                                    },
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => window.location.href = `/products/${relatedProduct.id}`}
                            >
                                <Box
                                    component="img"
                                    src={relatedProduct.image}
                                    alt={relatedProduct.name}
                                    sx={{
                                        width: '100%',
                                        height: 150,
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        }
                                    }}
                                />
                                <CardContent sx={{ p: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            minHeight: '2.8em'
                                        }}
                                    >
                                        {relatedProduct.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <StarIcon sx={{ color: '#ffb400', fontSize: 16 }} />
                                        <Typography variant="body2">{relatedProduct.rating}</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Đã bán: {relatedProduct.sold}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: '#f58220',
                                            fontWeight: 700,
                                            fontSize: 16
                                        }}
                                    >
                                        {relatedProduct.priceCurrent === 'Liên hệ'
                                            ? relatedProduct.priceCurrent
                                            : `${relatedProduct.priceCurrent}₫`
                                        }
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default ProductDetailPage;
