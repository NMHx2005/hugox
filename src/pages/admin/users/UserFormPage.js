import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const roles = ['Admin', 'Editor', 'Viewer'];
const UserFormPage = () => {
    return (_jsxs(AdminLayout, { title: "Ng\u01B0\u1EDDi d\u00F9ng", children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700, mb: 2 }, children: "Th\u00EAm/S\u1EEDa ng\u01B0\u1EDDi d\u00F9ng" }), _jsx(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "H\u1ECD t\u00EAn", InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "Email", type: "email", InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "M\u1EADt kh\u1EA9u", type: "password", InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { select: true, fullWidth: true, label: "Vai tr\u00F2", defaultValue: "Viewer", InputProps: { sx: { height: 56 } }, children: roles.map((role) => (_jsx(MenuItem, { value: role, children: role }, role))) }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(FormControlLabel, { control: _jsx(Checkbox, { defaultChecked: true }), label: "T\u00E0i kho\u1EA3n ho\u1EA1t \u0111\u1ED9ng" }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsxs(Box, { sx: { display: 'flex', gap: 2, justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "outlined", children: "Hu\u1EF7" }), _jsx(Button, { variant: "contained", sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, children: "L\u01B0u" })] }) })] }) })] }));
};
export default UserFormPage;
