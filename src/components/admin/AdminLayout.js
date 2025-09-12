import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';
const drawerWidth = 240;
const menuItems = [
    { label: 'Dashboard', icon: _jsx(DashboardIcon, {}), to: '/admin/dashboard' },
    { label: 'Sản phẩm', icon: _jsx(ShoppingCartIcon, {}), to: '/admin/products' },
    { label: 'Danh mục', icon: _jsx(CategoryIcon, {}), to: '/admin/categories' },
    // { label: 'Khách hàng', icon: <PeopleIcon />, to: '/admin/customers' },
    { label: 'Tin tức', icon: _jsx(NewspaperIcon, {}), to: '/admin/news' },
    { label: 'Cài đặt', icon: _jsx(SettingsIcon, {}), to: '/admin/settings/general' },
];
const AdminLayout = ({ title, children }) => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const toggleDrawer = () => setOpen(!open);
    return (_jsxs(Box, { sx: { display: 'flex', minHeight: '100vh', backgroundColor: '#f7f7f7' }, children: [_jsx(AppBar, { position: "fixed", sx: { zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#111' }, children: _jsxs(Toolbar, { children: [_jsx(IconButton, { edge: "start", color: "inherit", onClick: toggleDrawer, sx: { mr: 2 }, children: _jsx(MenuIcon, {}) }), _jsx(Typography, { variant: "h6", noWrap: true, component: "div", children: title || 'Admin' })] }) }), _jsxs(Drawer, { variant: "persistent", open: open, sx: {
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
                }, children: [_jsx(Toolbar, {}), _jsx(Divider, {}), _jsx(List, { children: menuItems.map((item) => (_jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { selected: location.pathname.startsWith(item.to), onClick: () => navigate(item.to), children: [_jsx(ListItemIcon, { children: item.icon }), _jsx(ListItemText, { primary: item.label })] }) }, item.to))) })] }), _jsxs(Box, { component: "main", sx: { flexGrow: 1, p: 3 }, children: [_jsx(Toolbar, {}), _jsx(Box, { sx: { maxWidth: 1280, mx: 'auto' }, children: children })] })] }));
};
export default AdminLayout;
