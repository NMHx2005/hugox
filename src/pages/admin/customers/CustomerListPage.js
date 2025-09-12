import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, Button, MenuItem, Pagination, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { get_admin_contacts, delete_admin_contact, update_admin_contact_status } from '../../../api/contacts';
const CustomerListPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    useEffect(() => {
        loadContacts();
    }, [page, search, statusFilter]);
    const loadContacts = async () => {
        try {
            const { items: contacts, pagination } = await get_admin_contacts({
                page,
                limit: 12,
                search: search || undefined,
                status: statusFilter || undefined
            });
            setItems(contacts);
            setPages(pagination?.pages || 1);
        }
        catch (error) {
            console.error('Error loading contacts:', error);
            setToast({ open: true, message: 'Lỗi tải danh sách liên hệ', severity: 'error' });
        }
    };
    const handleStatusChange = async (id, newStatus) => {
        try {
            await update_admin_contact_status(id, newStatus);
            setToast({ open: true, message: 'Cập nhật trạng thái thành công', severity: 'success' });
            loadContacts();
        }
        catch (error) {
            setToast({ open: true, message: 'Lỗi cập nhật trạng thái', severity: 'error' });
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa liên hệ này?')) {
            try {
                await delete_admin_contact(id);
                setToast({ open: true, message: 'Xóa liên hệ thành công', severity: 'success' });
                loadContacts();
            }
            catch (error) {
                setToast({ open: true, message: 'Lỗi xóa liên hệ', severity: 'error' });
            }
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
    return (_jsxs(AdminLayout, { title: "Kh\u00E1ch h\u00E0ng (Leads)", children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700, mb: 2 }, children: "Danh s\u00E1ch li\u00EAn h\u1EC7" }), _jsxs(Box, { sx: { display: 'flex', gap: 2, mb: 2 }, children: [_jsx(TextField, { placeholder: "T\u00ECm theo t\u00EAn, email, S\u0110T...", size: "small", sx: { width: 420 }, value: search, onChange: (e) => setSearch(e.target.value) }), _jsxs(TextField, { select: true, placeholder: "Tr\u1EA1ng th\u00E1i", size: "small", sx: { width: 200 }, value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), children: [_jsx(MenuItem, { value: "", children: "T\u1EA5t c\u1EA3" }), _jsx(MenuItem, { value: "new", children: "M\u1EDBi" }), _jsx(MenuItem, { value: "contacted", children: "\u0110\u00E3 li\u00EAn h\u1EC7" }), _jsx(MenuItem, { value: "resolved", children: "\u0110\u00E3 gi\u1EA3i quy\u1EBFt" }), _jsx(MenuItem, { value: "closed", children: "\u0110\u00E3 \u0111\u00F3ng" })] })] }), _jsx(Paper, { elevation: 0, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "T\u00EAn" }), _jsx(TableCell, { children: "S\u0110T" }), _jsx(TableCell, { children: "Email" }), _jsx(TableCell, { children: "Ch\u1EE7 \u0111\u1EC1" }), _jsx(TableCell, { children: "Tr\u1EA1ng th\u00E1i" }), _jsx(TableCell, { children: "\u01AFu ti\u00EAn" }), _jsx(TableCell, { children: "Th\u1EDDi gian" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: items.map((contact) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: contact.name }), _jsx(TableCell, { children: contact.phone }), _jsx(TableCell, { children: contact.email }), _jsx(TableCell, { children: contact.subject }), _jsx(TableCell, { children: _jsx(Chip, { size: "small", label: getStatusLabel(contact.status), color: getStatusColor(contact.status) }) }), _jsx(TableCell, { children: _jsx(Chip, { size: "small", label: contact.priority === 'high' ? 'Cao' : contact.priority === 'medium' ? 'Trung bình' : 'Thấp', color: contact.priority === 'high' ? 'error' : contact.priority === 'medium' ? 'warning' : 'default' }) }), _jsx(TableCell, { children: new Date(contact.createdAt).toLocaleDateString('vi-VN') }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => navigate(`/admin/customers/${contact._id}`), children: "Xem" }), _jsx(Button, { size: "small", color: "error", onClick: () => handleDelete(contact._id), children: "X\u00F3a" })] })] }, contact._id))) })] }) }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', mt: 2 }, children: _jsx(Pagination, { count: pages, page: page, onChange: (_, p) => setPage(p) }) }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 3000, onClose: () => setToast({ ...toast, open: false }), anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, children: _jsx(Alert, { severity: toast.severity, variant: "filled", onClose: () => setToast({ ...toast, open: false }), children: toast.message }) })] }));
};
export default CustomerListPage;
