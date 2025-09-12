import React from 'react';
import { Box, Typography } from '@mui/material';
import {
    Phone,
    LocationOn,
    Email,
    ArrowUpward,
} from '@mui/icons-material';
import { useAppContext } from '../../hooks/useAppContext';


const Footer: React.FC = () => {
    const { categories, generalSettings, contactSettings, loading } = useAppContext();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const customerSupport = [
        'Giới thiệu',
        'Tin tức',
        'Liên hệ',
        'Reviews sản phẩm',
        'CTV bán hàng',
        'Chính sách bảo mật',
        'Chính sách huỷ, đổi trả, hoàn tiền',
        'Chính sách vận chuyển'
    ];


    return (
        <Box
            component="footer"
            sx={{
                // backgroundColor: '#0a0a0a',
                background: 'linear-gradient(0deg, #2b2c2b 0%, #000000 100%)',
                color: '#fff',
                position: 'relative',
                paddingTop: "40px",
                marginBottom: { xs: '90px', md: '0' }
            }}
        >
            {/* Main Footer Content */}
            <Box
                className="container"
                sx={{
                    padding: { xs: '30px 0 15px 0', md: '40px 0 20px 0' },
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: { xs: '30px', md: '40px' },
                    borderBottom: '1px solid #fff0',
                    // borderBottom: 'linear-gradient(to right, #fff0 5%, #d9d9d9 50%, #d9d9d9 50%, #fff0 95%)'
                }}
            >
                {/* Left Section - Company Info */}
                <Box
                    sx={{
                        flex: { xs: '1 1 100%', md: '1 1 280px' },
                        minWidth: { xs: '100%', md: '280px' }
                    }}
                >
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, marginBottom: 1.5 }}>
                        <Box
                            component="img"
                            src={generalSettings?.logo || "/logo-removebg-preview.png"}
                            alt={generalSettings?.siteName || "Lumias logo"}
                            sx={{ height: 70, textAlign: 'center' }}
                        />
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 500,
                                fontSize: '28px',
                                color: '#fff',
                                fontFamily: 'Roboto, sans-serif'
                            }}
                        >
                            {/* {generalSettings?.siteName || ''} */}
                        </Typography>
                    </Box>


                    {/* Brand Logos */}
                    {/* <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: { xs: '15px 20px', md: '20px 30px' },
                            marginBottom: 2.5
                        }}
                    >
                        {brandLogos.map((logo, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={logo.src}
                                alt={logo.alt}
                                sx={{ height: 28, objectFit: 'contain' }}
                            />
                        ))}
                    </Box> */}

                    {/* Social Media */}
                    {/* <Box
                        sx={{
                            display: 'flex',
                            gap: 2.5,
                            alignItems: 'center',
                            fontSize: '14px',
                            marginBottom: 2.5,
                            flexWrap: 'wrap'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#fff' }}>
                            <Facebook sx={{ fontSize: '18px' }} />
                            <Typography sx={{ fontSize: '14px', color: '#fff' }}>11.866 Fan</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#fff' }}>
                            <YouTube sx={{ fontSize: '18px' }} />
                            <Typography sx={{ fontSize: '14px', color: '#fff' }}>3868k Đăng ký</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#fff' }}>
                            <Box
                                component="img"
                                src="/zalo.jpg"
                                alt="Zalo app icon"
                                sx={{ width: 18, height: 18 }}
                            />
                            <Typography sx={{ fontSize: '14px', color: '#fff' }}>Zalo mua hàng</Typography>
                        </Box>
                    </Box> */}

                    {/* Certifications */}
                    {/* <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'nowrap' }}>
                        <Box
                            component="img"
                            src="https://storage.googleapis.com/a1aa/image/1e3bc2c5-664a-4176-5d31-c3a083f09ae6.jpg"
                            alt="Đã thông báo Bộ Công Thương"
                            sx={{ height: 40, objectFit: 'contain' }}
                        />
                        <Box
                            component="img"
                            src="https://storage.googleapis.com/a1aa/image/f834a4a5-6c09-4bf8-3179-c47c66c0781d.jpg"
                            alt="DMCA protected"
                            sx={{ height: 40, objectFit: 'contain' }}
                        />
                    </Box> */}
                </Box>

                {/* Featured Categories */}
                <Box
                    sx={{
                        flex: { xs: '1 1 100%', md: '1 1 180px' },
                        minWidth: { xs: '100%', md: '180px' }
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontSize: '18px',
                            marginBottom: 2.5,
                            color: '#fff'
                        }}
                    >
                        Danh mục nổi bật
                    </Typography>
                    <Box component="ul" sx={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {!loading && categories.map((category) => (
                            <Box
                                key={category._id}
                                component="li"
                                sx={{
                                    marginBottom: 1.75,
                                    fontSize: '14px',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    '&:hover': { color: '#f58220' }
                                }}
                            >
                                {category.name}
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Customer Support */}
                <Box
                    sx={{
                        flex: { xs: '1 1 100%', md: '1 1 180px' },
                        minWidth: { xs: '100%', md: '180px' }
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontSize: '18px',
                            marginBottom: 2.5,
                            color: '#fff'
                        }}
                    >
                        Hỗ trợ khách hàng
                    </Typography>
                    <Box component="ul" sx={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {customerSupport.map((item, index) => (
                            <Box
                                key={index}
                                component="li"
                                sx={{
                                    marginBottom: 1.75,
                                    fontSize: '14px',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    '&:hover': { color: '#f58220' }
                                }}
                            >
                                {item}
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Contact Information */}
                <Box
                    sx={{
                        flex: { xs: '1 1 100%', md: '1 1 320px' },
                        minWidth: { xs: '100%', md: '320px' },
                        fontSize: '14px',
                        color: '#fff'
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontSize: '18px',
                            marginBottom: 2.5,
                            color: '#fff'
                        }}
                    >
                        Thông tin liên hệ
                    </Typography>

                    <Typography sx={{ margin: '0 0 16px 0', lineHeight: 1.5, color: '#fff' }}>
                        {generalSettings?.siteDescription || 'HUGOX – Thương hiệu hàng đầu cung cấp hệ sinh thái đầy đủ sản phẩm về gia dụng thông minh, không dây và không giới hạn.'}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, color: '#fff' }}>
                        <LocationOn sx={{ marginRight: 1, fontSize: '16px' }} />
                        <Typography sx={{ fontSize: '14px', color: '#fff' }}>
                            Địa chỉ: {contactSettings?.address || '27 Đoàn Thị Điểm - Phường Sông Cầu - Dăk Lăk'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, color: '#fff' }}>
                        <Phone sx={{ marginRight: 1, fontSize: '16px' }} />
                        <Typography sx={{ fontSize: '14px', color: '#fff' }}>
                            Hotline mua hàng: {contactSettings?.phone || '08.7878.4842'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, color: '#fff' }}>
                        <Box
                            component="img"
                            src="/zalo_logo.jpg"
                            alt="Zalo"
                            sx={{ width: 20, height: 20 }}
                        />
                        <Typography sx={{ fontSize: '14px', color: '#fff', marginLeft: 1 }}>
                            Zalo mua hàng: {contactSettings?.phone || '08.7878.4842'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, color: '#fff' }}>
                        <Box
                            component="img"
                            src="/zalo_logo.jpg"
                            alt="Zalo"
                            sx={{ width: 20, height: 20 }}
                        />
                        <Typography sx={{ fontSize: '14px', color: '#fff', marginLeft: 1 }}>
                            Zalo bảo hành: {contactSettings?.phone || '0876.83.63.43'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
                        <Email sx={{ marginRight: 1, fontSize: '16px' }} />
                        <Typography sx={{ fontSize: '14px', color: '#fff' }}>
                            Email: {contactSettings?.email || 'Hugodigital2003@gmail.com'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Fixed Right Contact Bar */}
            <Box
                sx={{
                    position: 'fixed',
                    right: { xs: '4px', sm: '8px', md: '10px' },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)',
                    width: '72px',
                    fontSize: '12px',
                    color: '#000',
                    fontWeight: 600,
                    // textAlign: 'center',
                    userSelect: 'none',
                    zIndex: 1000,
                    display: { xs: 'none', lg: 'block' }
                }}
            >
                {/* Hotline */}
                <Box
                    sx={{
                        borderBottom: '1px solid #ddd',
                        padding: '10px 6px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                    }}
                    onClick={() => window.open(`tel:${contactSettings?.phone || '0878784842'}`, '_self')}
                >
                    <Phone sx={{ fontSize: '24px', marginBottom: 0.5, color: '#f58220' }} />
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                        Hotline
                        <br />
                        mua hàng
                    </Typography>
                </Box>

                {/* Zalo */}
                <Box
                    sx={{
                        borderBottom: '1px solid #ddd',
                        padding: '10px 6px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                    }}
                    onClick={() => window.open(`https://zalo.me/${contactSettings?.phone || '0878784842'}`, '_blank')}
                >
                    <Box
                        component="img"
                        src="/zalo_logo.jpg"
                        alt="Zalo"
                        sx={{ width: 20, height: 20 }}
                    />
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#000', marginTop: 0.5 }}>
                        Zalo mua
                        <br />
                        hàng
                    </Typography>
                </Box>

                {/* Scroll to Top */}
                <Box
                    onClick={scrollToTop}
                    sx={{
                        padding: '10px 6px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                    }}
                >
                    <ArrowUpward sx={{ fontSize: '24px', marginBottom: 0.5, color: '#333' }} />
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                        Lên đầu
                        <br />
                        trang
                    </Typography>
                </Box>
            </Box>

            {/* Copyright */}
            <Box
                className="container"
                sx={{
                    textAlign: 'center',
                    padding: '16px 0',
                    fontSize: '14px',
                    color: '#999',
                }}
            >
                <Typography sx={{ fontSize: '14px', color: '#999' }}>
                    Copyright 2025 © HungDan
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
