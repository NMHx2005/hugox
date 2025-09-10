import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../components/shared/Layout';

const AboutPage: React.FC = () => {
    return (
        <Layout>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" component="h1">
                    Giới thiệu về HUGOX
                </Typography>
                <Typography variant="body1">
                    HUGOX - Thương hiệu hàng đầu cung cấp hệ sinh thái đầy đủ sản phẩm về gia dụng thông minh
                </Typography>
                {/* Company Info */}
                {/* Mission & Vision */}
                {/* History */}
                {/* Awards */}
            </Box>
        </Layout>
    );
};

export default AboutPage;
