import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, Button, MenuItem, Pagination, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { get_admin_contacts, delete_admin_contact, update_admin_contact_status, AdminContact } from '../../../api/contacts';

const CustomerListPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<AdminContact[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

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
        } catch (error) {
            console.error('Error loading contacts:', error);
            setToast({ open: true, message: 'Lỗi tải danh sách liên hệ', severity: 'error' });
        }
    };

    const handleStatusChange = async (id: string, newStatus: AdminContact['status']) => {
        try {
            await update_admin_contact_status(id, newStatus);
            setToast({ open: true, message: 'Cập nhật trạng thái thành công', severity: 'success' });
            loadContacts();
        } catch (error) {
            setToast({ open: true, message: 'Lỗi cập nhật trạng thái', severity: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa liên hệ này?')) {
            try {
                await delete_admin_contact(id);
                setToast({ open: true, message: 'Xóa liên hệ thành công', severity: 'success' });
                loadContacts();
            } catch (error) {
                setToast({ open: true, message: 'Lỗi xóa liên hệ', severity: 'error' });
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'primary';
            case 'contacted': return 'warning';
            case 'resolved': return 'success';
            case 'closed': return 'default';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'new': return 'Mới';
            case 'contacted': return 'Đã liên hệ';
            case 'resolved': return 'Đã giải quyết';
            case 'closed': return 'Đã đóng';
            default: return status;
        }
    };

    return (
        <AdminLayout title="Khách hàng (Leads)">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Danh sách liên hệ</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    placeholder="Tìm theo tên, email, SĐT..."
                    size="small"
                    sx={{ width: 420 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TextField
                    select
                    placeholder="Trạng thái"
                    size="small"
                    sx={{ width: 200 }}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    <MenuItem value="new">Mới</MenuItem>
                    <MenuItem value="contacted">Đã liên hệ</MenuItem>
                    <MenuItem value="resolved">Đã giải quyết</MenuItem>
                    <MenuItem value="closed">Đã đóng</MenuItem>
                </TextField>
            </Box>

            <Paper elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên</TableCell>
                            <TableCell>SĐT</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Chủ đề</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Ưu tiên</TableCell>
                            <TableCell>Thời gian</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((contact) => (
                            <TableRow key={contact._id} hover>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.subject}</TableCell>
                                <TableCell>
                                    <Chip
                                        size="small"
                                        label={getStatusLabel(contact.status)}
                                        color={getStatusColor(contact.status) as any}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        size="small"
                                        label={contact.priority === 'high' ? 'Cao' : contact.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                                        color={contact.priority === 'high' ? 'error' : contact.priority === 'medium' ? 'warning' : 'default'}
                                    />
                                </TableCell>
                                <TableCell>{new Date(contact.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => navigate(`/admin/customers/${contact._id}`)}>
                                        Xem
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(contact._id)}
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={pages} page={page} onChange={(_, p) => setPage(p)} />
            </Box>

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={toast.severity} variant="filled" onClose={() => setToast({ ...toast, open: false })}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </AdminLayout>
    );
};

export default CustomerListPage;
