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
import PeopleIcon from '@mui/icons-material/People';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

type AdminLayoutProps = {
    title?: string;
    children: React.ReactNode;
};

const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, to: '/admin/dashboard' },
    { label: 'Sản phẩm', icon: <ShoppingCartIcon />, to: '/admin/products' },
    { label: 'Danh mục', icon: <CategoryIcon />, to: '/admin/categories' },
    { label: 'Khách hàng', icon: <PeopleIcon />, to: '/admin/customers' },
    { label: 'Tin tức', icon: <NewspaperIcon />, to: '/admin/news' },
    { label: 'Cài đặt', icon: <SettingsIcon />, to: '/admin/settings/general' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDrawer = () => setOpen(!open);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#111' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title || 'Admin'}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="persistent" open={open} sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
            }}>
                <Toolbar />
                <Divider />
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.to} disablePadding>
                            <ListItemButton
                                selected={location.pathname.startsWith(item.to)}
                                onClick={() => navigate(item.to)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;
