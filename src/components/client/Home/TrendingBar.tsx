import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TrendingBar: React.FC = () => {
    const trendingKeywords = [
        'Máy giặt',
        'Đèn bắt muỗi',
        'Máy lọc không khí',
        'Bếp từ',
        'Quạt cầm tay',
        'Quạt không cánh',
        'Quạt tích điện',
        'Vợt muỗi'
    ];

    return (
        <Box
            className="container"
            sx={{
                backgroundColor: '#fff',
                padding: '6px 0',
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 1,
                fontSize: '12px',
                color: '#666666'
            }}
        >
            <Typography variant="body2" sx={{ fontSize: '12px', color: '#666666' }}>
                Từ khoá xu hướng:
            </Typography>
            {trendingKeywords.map((keyword, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                        sx={{
                            width: 6,
                            height: 6,
                            backgroundColor: '#f58220',
                            borderRadius: '50%',
                            display: 'inline-block'
                        }}
                    />
                    <Link to={`/search?q=${keyword}`} style={{ fontSize: '12px', color: '#666666' }}>
                        {keyword}
                    </Link>
                </Box>
            ))}
        </Box>
    );
};

export default TrendingBar;
