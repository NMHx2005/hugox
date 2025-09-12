import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, Paper, Grid, TextField, Button, Chip, MenuItem, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { get_admin_contact, update_admin_contact_status, add_admin_contact_notes } from '../../../api/contacts';
const CustomerDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [notes, setNotes] = useState('');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    useEffect(() => {
        if (id) {
            loadContact();
        }
    }, [id]);
    const loadContact = async () => {
        try {
            const contactData = await get_admin_contact(id);
            setContact(contactData);
            setNotes(contactData.notes || '');
        }
        catch (error) {
            console.error('Error loading contact:', error);
            setToast({ open: true, message: 'Lỗi tải thông tin liên hệ', severity: 'error' });
        }
    };
    const handleStatusChange = async (newStatus) => {
        if (!contact)
            return;
        try {
            await update_admin_contact_status(contact._id, newStatus);
            setToast({ open: true, message: 'Cập nhật trạng thái thành công', severity: 'success' });
            loadContact();
        }
        catch (error) {
            setToast({ open: true, message: 'Lỗi cập nhật trạng thái', severity: 'error' });
        }
    };
    const handleSaveNotes = async () => {
        if (!contact)
            return;
        try {
            await add_admin_contact_notes(contact._id, notes);
            setToast({ open: true, message: 'Lưu ghi chú thành công', severity: 'success' });
            loadContact();
        }
        catch (error) {
            setToast({ open: true, message: 'Lỗi lưu ghi chú', severity: 'error' });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'primary';
            case 'contacted': return 'warning';
            case 'resolved': return 'success';
            case 'closed': return 'default';
            default: return 'default';
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case 'new': return 'Mới';
            case 'contacted': return 'Đã liên hệ';
            case 'resolved': return 'Đã giải quyết';
            case 'closed': return 'Đã đóng';
            default: return status;
        }
    };
    if (!contact) {
        return (_jsx(AdminLayout, { title: "Chi ti\u1EBFt li\u00EAn h\u1EC7", children: _jsx(Typography, { children: "\u0110ang t\u1EA3i..." }) }));
    }
    return (_jsxs(AdminLayout, { title: "Chi ti\u1EBFt li\u00EAn h\u1EC7", children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700 }, children: "Chi ti\u1EBFt li\u00EAn h\u1EC7" }), _jsx(Button, { variant: "outlined", onClick: () => navigate('/admin/customers'), children: "Quay l\u1EA1i" })] }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "Th\u00F4ng tin li\u00EAn h\u1EC7" }), _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: 1.5 }, children: [_jsx(Typography, { sx: { color: '#666' }, children: "T\u00EAn" }), _jsx(Typography, { children: contact.name }), _jsx(Typography, { sx: { color: '#666' }, children: "S\u0110T" }), _jsx(Typography, { children: contact.phone }), _jsx(Typography, { sx: { color: '#666' }, children: "Email" }), _jsx(Typography, { children: contact.email }), _jsx(Typography, { sx: { color: '#666' }, children: "Ch\u1EE7 \u0111\u1EC1" }), _jsx(Typography, { children: contact.subject }), _jsx(Typography, { sx: { color: '#666' }, children: "N\u1ED9i dung" }), _jsx(Typography, { children: contact.content }), _jsx(Typography, { sx: { color: '#666' }, children: "Tr\u1EA1ng th\u00E1i" }), _jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' }, children: [_jsx(Chip, { size: "small", color: getStatusColor(contact.status), label: getStatusLabel(contact.status) }), _jsxs(TextField, { select: true, size: "small", value: contact.status, onChange: (e) => handleStatusChange(e.target.value), sx: { minWidth: 120 }, children: [_jsx(MenuItem, { value: "new", children: "M\u1EDBi" }), _jsx(MenuItem, { value: "contacted", children: "\u0110\u00E3 li\u00EAn h\u1EC7" }), _jsx(MenuItem, { value: "resolved", children: "\u0110\u00E3 gi\u1EA3i quy\u1EBFt" }), _jsx(MenuItem, { value: "closed", children: "\u0110\u00E3 \u0111\u00F3ng" })] })] }), _jsx(Typography, { sx: { color: '#666' }, children: "\u01AFu ti\u00EAn" }), _jsx(Chip, { size: "small", label: contact.priority === 'high' ? 'Cao' : contact.priority === 'medium' ? 'Trung bình' : 'Thấp', color: contact.priority === 'high' ? 'error' : contact.priority === 'medium' ? 'warning' : 'default' }), _jsx(Typography, { sx: { color: '#666' }, children: "Ngu\u1ED3n" }), _jsx(Typography, { children: contact.source }), _jsx(Typography, { sx: { color: '#666' }, children: "Th\u1EDDi gian" }), _jsx(Typography, { children: new Date(contact.createdAt).toLocaleString('vi-VN') })] })] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: [_jsx(Typography, { sx: { fontWeight: 700, mb: 2 }, children: "Ghi ch\u00FA n\u1ED9i b\u1ED9" }), _jsx(TextField, { fullWidth: true, multiline: true, minRows: 6, placeholder: "Th\u00EAm ghi ch\u00FA ch\u0103m s\u00F3c kh\u00E1ch h\u00E0ng...", value: notes, onChange: (e) => setNotes(e.target.value) }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'flex-end', mt: 2 }, children: _jsx(Button, { variant: "contained", onClick: handleSaveNotes, sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, children: "L\u01B0u ghi ch\u00FA" }) })] }) })] }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 3000, onClose: () => setToast({ ...toast, open: false }), anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, children: _jsx(Alert, { severity: toast.severity, variant: "filled", onClose: () => setToast({ ...toast, open: false }), children: toast.message }) })] }));
};
export default CustomerDetailPage;
