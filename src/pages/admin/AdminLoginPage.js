import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const AdminLoginPage = () => {
    return (_jsx(Box, { sx: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }, children: _jsxs(Paper, { elevation: 0, sx: { p: 4, width: 380, borderRadius: 2 }, children: [_jsx(Typography, { variant: "h5", sx: { fontWeight: 700, mb: 3, textAlign: 'center' }, children: "\u0110\u0103ng nh\u1EADp Admin" }), _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: [_jsx(TextField, { label: "Email", type: "email", fullWidth: true, InputProps: { sx: { height: 56 } } }), _jsx(TextField, { label: "M\u1EADt kh\u1EA9u", type: "password", fullWidth: true, InputProps: { sx: { height: 56 } } }), _jsx(Button, { variant: "contained", fullWidth: true, sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' }, py: 1.25 }, children: "\u0110\u0103ng nh\u1EADp" }), _jsx(Button, { variant: "text", sx: { color: '#111' }, children: "Qu\u00EAn m\u1EADt kh\u1EA9u?" })] })] }) }));
};
export default AdminLoginPage;
