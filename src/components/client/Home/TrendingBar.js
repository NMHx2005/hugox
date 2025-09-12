import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const TrendingBar = () => {
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
    return (_jsxs(Box, { className: "container", sx: {
            backgroundColor: '#fff',
            padding: '6px 0',
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1,
            fontSize: '12px',
            color: '#666666'
        }, children: [_jsx(Typography, { variant: "body2", sx: { fontSize: '12px', color: '#666666' }, children: "T\u1EEB kho\u00E1 xu h\u01B0\u1EDBng:" }), trendingKeywords.map((keyword, index) => (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 0.5 }, children: [_jsx(Box, { sx: {
                            width: 6,
                            height: 6,
                            backgroundColor: '#f58220',
                            borderRadius: '50%',
                            display: 'inline-block'
                        } }), _jsx(Link, { to: `/search?q=${keyword}`, style: { fontSize: '12px', color: '#666666' }, children: keyword })] }, index)))] }));
};
export default TrendingBar;
