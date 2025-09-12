import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Box, Typography, Paper, Grid, TextField, Button, Chip, MenuItem, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { get_admin_contact, update_admin_contact_status, add_admin_contact_notes, AdminContact } from '../../../api/contacts';

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState<AdminContact | null>(null);
    const [notes, setNotes] = useState('');
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        if (id) {
            loadContact();
        }
    }, [id]);

    const loadContact = async () => {
        try {
            const contactData = await get_admin_contact(id!);
            setContact(contactData);
            setNotes(contactData.notes || '');
        } catch (error) {
            console.error('Error loading contact:', error);
            setToast({ open: true, message: 'Lỗi tải thông tin liên hệ', severity: 'error' });
        }
    };

    const handleStatusChange = async (newStatus: AdminContact['status']) => {
        if (!contact) return;
        try {
            await update_admin_contact_status(contact._id, newStatus);
            setToast({ open: true, message: 'Cập nhật trạng thái thành công', severity: 'success' });
            loadContact();
        } catch (error) {
            setToast({ open: true, message: 'Lỗi cập nhật trạng thái', severity: 'error' });
        }
    };

    const handleSaveNotes = async () => {
        if (!contact) return;
        try {
            await add_admin_contact_notes(contact._id, notes);
            setToast({ open: true, message: 'Lưu ghi chú thành công', severity: 'success' });
            loadContact();
        } catch (error) {
            setToast({ open: true, message: 'Lỗi lưu ghi chú', severity: 'error' });
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

    if (!contact) {
        return (
            <AdminLayout title="Chi tiết liên hệ">
                <Typography>Đang tải...</Typography>
            </AdminLayout>
        );
    }
    return (
        <AdminLayout title="Chi tiết liên hệ">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Chi tiết liên hệ</Typography>
                <Button variant="outlined" onClick={() => navigate('/admin/customers')}>
                    Quay lại
                </Button>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Thông tin liên hệ</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: 1.5 }}>
                            <Typography sx={{ color: '#666' }}>Tên</Typography>
                            <Typography>{contact.name}</Typography>
                            <Typography sx={{ color: '#666' }}>SĐT</Typography>
                            <Typography>{contact.phone}</Typography>
                            <Typography sx={{ color: '#666' }}>Email</Typography>
                            <Typography>{contact.email}</Typography>
                            <Typography sx={{ color: '#666' }}>Chủ đề</Typography>
                            <Typography>{contact.subject}</Typography>
                            <Typography sx={{ color: '#666' }}>Nội dung</Typography>
                            <Typography>{contact.content}</Typography>
                            <Typography sx={{ color: '#666' }}>Trạng thái</Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Chip
                                    size="small"
                                    color={getStatusColor(contact.status) as any}
                                    label={getStatusLabel(contact.status)}
                                />
                                <TextField
                                    select
                                    size="small"
                                    value={contact.status}
                                    onChange={(e) => handleStatusChange(e.target.value as AdminContact['status'])}
                                    sx={{ minWidth: 120 }}
                                >
                                    <MenuItem value="new">Mới</MenuItem>
                                    <MenuItem value="contacted">Đã liên hệ</MenuItem>
                                    <MenuItem value="resolved">Đã giải quyết</MenuItem>
                                    <MenuItem value="closed">Đã đóng</MenuItem>
                                </TextField>
                            </Box>
                            <Typography sx={{ color: '#666' }}>Ưu tiên</Typography>
                            <Chip
                                size="small"
                                label={contact.priority === 'high' ? 'Cao' : contact.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                                color={contact.priority === 'high' ? 'error' : contact.priority === 'medium' ? 'warning' : 'default'}
                            />
                            <Typography sx={{ color: '#666' }}>Nguồn</Typography>
                            <Typography>{contact.source}</Typography>
                            <Typography sx={{ color: '#666' }}>Thời gian</Typography>
                            <Typography>{new Date(contact.createdAt).toLocaleString('vi-VN')}</Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 2 }}>Ghi chú nội bộ</Typography>
                        <TextField
                            fullWidth
                            multiline
                            minRows={6}
                            placeholder="Thêm ghi chú chăm sóc khách hàng..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="contained"
                                onClick={handleSaveNotes}
                                sx={{ backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }}
                            >
                                Lưu ghi chú
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

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

export default CustomerDetailPage;
