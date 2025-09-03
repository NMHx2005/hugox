import React, { useState } from 'react';
import { Box, Typography, Button, Tabs, Tab, Card, CardMedia, CardContent, Rating } from '@mui/material';
// import { ArrowUpward } from '@mui/icons-material';

interface Product {
    id: number;
    name: string;
    image: string;
    originalPrice?: number;
    salePrice: number;
    rating: number;
    sold: number;
    isFromPrice?: boolean;
}

const ProductSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const categories = [
        'Thiết bị nhà bếp',
        'Quạt',
        'Điện gia dụng',
        'Máy hút ẩm',
        'Sức khoẻ & Làm đẹp'
    ];

    const products: Product[] = [
        {
            id: 1,
            name: 'Máy làm sữa hạt 1.2L Lumias M120',
            image: 'https://lumias.vn/wp-content/uploads/2024/12/may-lam-sua-hat-1-2l-lumias-m12o-405x405.jpg',
            originalPrice: 1190000,
            salePrice: 849000,
            rating: 4.8,
            sold: 498
        },
        {
            id: 2,
            name: 'Máy xay sinh tố mini Lumias M200',
            image: 'https://lumias.vn/wp-content/uploads/2024/12/may-lam-sua-hat-1-2l-lumias-m12o-405x405.jpg',
            originalPrice: 890000,
            salePrice: 599000,
            rating: 4.7,
            sold: 324
        },
        {
            id: 3,
            name: 'Nồi lẩu điện đa năng Lumias LM-PM605 1.5L',
            image: 'https://lumias.vn/wp-content/uploads/2024/12/may-lam-sua-hat-1-2l-lumias-m12o-405x405.jpg',
            salePrice: 490000,
            rating: 4.9,
            sold: 756,
            isFromPrice: true
        },
        {
            id: 4,
            name: 'Nồi nhôm hợp kim Lumias AL-800',
            image: 'https://lumias.vn/wp-content/uploads/2024/12/may-lam-sua-hat-1-2l-lumias-m12o-405x405.jpg',
            originalPrice: 750000,
            salePrice: 520000,
            rating: 4.6,
            sold: 189
        },
        {
            id: 5,
            name: 'Bếp từ đơn Lumias IH-1000',
            image: 'https://lumias.vn/wp-content/uploads/2024/12/may-lam-sua-hat-1-2l-lumias-m12o-405x405.jpg',
            originalPrice: 1200000,
            salePrice: 899000,
            rating: 4.8,
            sold: 267
        },
        {
            id: 6,
            name: 'Máy ép chậm Lumias SJ-300',
            image: 'https://lumias.vn/wp-content/uploads/2024/12/may-lam-sua-hat-1-2l-lumias-m12o-405x405.jpg',
            originalPrice: 1500000,
            salePrice: 1099000,
            rating: 4.9,
            sold: 445
        },
        {
            id: 7,
            name: 'Ấm đun nước điện Lumias K-1500',
            image: 'https://lumias.vn/wp-content/uploads/2024/12/may-lam-sua-hat-1-2l-lumias-m12o-405x405.jpg',
            originalPrice: 650000,
            salePrice: 450000,
            rating: 4.7,
            sold: 312
        },
        {
            id: 8,
            name: 'Máy làm bánh mì Lumias BM-500',
            image: 'https://lumias.vn/wp-content/uploads/2024/12/may-lam-sua-hat-1-2l-lumias-m12o-405x405.jpg',
            originalPrice: 1800000,
            salePrice: 1299000,
            rating: 4.8,
            sold: 156
        }
    ];

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price).replace('₫', '₫');
    };



    return (
        <div className='product-section'>
            <Box className="container" sx={{ padding: { xs: '40px 0', sm: '50px 0', md: '60px 0' } }}>
                <Box sx={{
                    display: 'flex',
                    gap: { xs: 0, md: 4 },
                    margin: { xs: '0 0 30px 0', sm: '0 0 35px 0', md: '0' },
                    flexDirection: { xs: 'column', lg: 'row' }
                }}>
                    {/* Left Content */}
                    <Box sx={{
                        flex: { xs: '1', lg: '0 0 300px' },
                        marginBottom: { xs: 3, sm: 4, lg: 0 },
                        textAlign: "left"
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '32px' },
                                color: '#333',
                                marginBottom: { xs: 2, sm: 2.5, md: 3 },
                                lineHeight: 1.2,
                                textAlign: "left"
                            }}
                        >
                            Sản phẩm đa dạng và chất lượng
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: { xs: '14px', sm: '15px', md: '16px' },
                                color: '#666',
                                lineHeight: 1.6,
                                marginBottom: { xs: 2.5, sm: 3, md: 3 },
                                textAlign: "left"
                            }}
                        >
                            Lumias là thương hiệu hàng đầu cung cấp hệ sinh thái đầy đủ sản phẩm về gia dụng thông minh,
                            không dây và không giới hạn. Với uy tín và chất lượng được khẳng định trên thị trường
                            thương mại điện tử Hàn Quốc, Lumias đã mở rộng phân phối tại các thị trường quốc tế,
                            đặc biệt là Việt Nam thông qua Hoplongtech.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#000',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: { xs: '13px', sm: '14px' },
                                padding: { xs: '10px 20px', sm: '12px 24px' },
                                borderRadius: '4px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#333'
                                },
                                textAlign: "left"
                            }}
                        >
                            Xem thêm sản phẩm
                        </Button>
                    </Box>

                    {/* Center Product Grid */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Category Tabs */}
                        <Box sx={{ marginBottom: { xs: 3, sm: 3.5, md: 4 } }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{
                                    '& .MuiTabs-indicator': {
                                        display: 'none'
                                    },
                                    '& .MuiTab-root': {
                                        minHeight: { xs: '40px', sm: '44px', md: '48px' },
                                        padding: { xs: '8px 12px', sm: '10px 16px', md: '12px 20px' },
                                        marginRight: { xs: '6px', sm: '8px', md: '10px' },
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e0e0',
                                        borderBottom: 'none',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        fontSize: { xs: '12px', sm: '13px', md: '14px' },
                                        color: '#666',
                                        '&:first-of-type': {
                                            borderTopLeftRadius: '8px'
                                        },
                                        '&:last-of-type': {
                                            borderTopRightRadius: '8px',
                                            marginRight: 0
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: '#f58220',
                                            color: '#fff',
                                            borderColor: '#f58220'
                                        }
                                    }
                                }}
                            >
                                {categories.map((category, index) => (
                                    <Tab key={index} label={category} />
                                ))}
                            </Tabs>
                        </Box>

                        {/* Product Grid */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(2, 1fr)',
                                    sm: 'repeat(3, 1fr)',
                                    md: 'repeat(4, 1fr)'
                                },
                                gap: { xs: 2, sm: 2.5, md: 3 }
                            }}
                        >
                            {products.map((product) => (
                                <Card
                                    key={product.id}
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                                        }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            height: { xs: 160, sm: 180, md: 200 },
                                            objectFit: 'contain',
                                            padding: { xs: 1.5, sm: 1.8, md: 2 },
                                            backgroundColor: '#fafafa'
                                        }}
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <CardContent sx={{ padding: { xs: 1.5, sm: 1.8, md: 2 } }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: '12px', sm: '13px', md: '14px' },
                                                fontWeight: 500,
                                                color: '#333',
                                                marginBottom: { xs: 1, sm: 1.2, md: 1.5 },
                                                lineHeight: 1.4,
                                                height: { xs: '32px', sm: '36px', md: '40px' },
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}
                                        >
                                            {product.name}
                                        </Typography>

                                        <Box sx={{ marginBottom: { xs: 1, sm: 1.2, md: 1.5 } }}>
                                            {product.originalPrice && (
                                                <Typography
                                                    sx={{
                                                        fontSize: { xs: '11px', sm: '12px', md: '13px' },
                                                        color: '#999',
                                                        textDecoration: 'line-through',
                                                        display: 'inline-block',
                                                        marginRight: 1
                                                    }}
                                                >
                                                    {formatPrice(product.originalPrice)}
                                                </Typography>
                                            )}
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: '14px', sm: '15px', md: '16px' },
                                                    fontWeight: 700,
                                                    color: '#f58220',
                                                    display: 'inline-block'
                                                }}
                                            >
                                                {product.isFromPrice ? 'Chỉ từ: ' : ''}{formatPrice(product.salePrice)}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.8, md: 1 } }}>
                                            <Rating
                                                value={product.rating}
                                                precision={0.1}
                                                size="small"
                                                readOnly
                                                sx={{
                                                    '& .MuiRating-iconFilled': { color: '#ffc107' },
                                                    fontSize: { xs: '16px', sm: '18px', md: '20px' }
                                                }}
                                            />
                                            <Typography sx={{ fontSize: { xs: '10px', sm: '11px', md: '12px' }, color: '#666' }}>
                                                {product.rating}
                                            </Typography>
                                            <Typography sx={{ fontSize: { xs: '10px', sm: '11px', md: '12px' }, color: '#999' }}>
                                                Đã bán: {product.sold}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default ProductSection;
