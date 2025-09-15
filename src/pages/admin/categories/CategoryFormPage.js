import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import AdminLayout from '../../../components/admin/AdminLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { CloudUpload, Image } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { create_admin_category, get_admin_category, update_admin_category, get_admin_categories } from '../../../api/categories';
import { upload_category_image } from '../../../api/upload';
import { useParams, useNavigate } from 'react-router-dom';
const parents = [
    { id: '', name: '— Không có —' }
];
const CategoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const [form, setForm] = useState({ name: '', slug: '', parent: '', description: '', status: 'active', image: '' });
    const [parentOptions, setParentOptions] = useState([]);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const [uploading, setUploading] = useState(false);
    const imageInputRef = useRef(null);
    useEffect(() => {
        if (isEdit && id) {
            get_admin_category(id).then((data) => {
                console.log('=== CATEGORY LOAD DEBUG ===');
                console.log('Raw category data:', data);
                console.log('Parent field:', data.parent);
                console.log('Parent type:', typeof data.parent);
                const parentId = typeof data.parent === 'object' && data.parent?._id
                    ? data.parent._id
                    : (typeof data.parent === 'string' ? data.parent : '');
                setForm({
                    name: data.name || '',
                    slug: data.slug || '',
                    parent: parentId,
                    description: data.description || '',
                    status: data.status || 'active',
                    image: data.image || ''
                });
            });
        }
    }, [id]);
    useEffect(() => {
        // load parents for select
        get_admin_categories().then((list) => {
            console.log('=== PARENT OPTIONS DEBUG ===');
            console.log('Categories list:', list);
            // Filter out current category to avoid circular reference
            const filteredList = Array.isArray(list)
                ? list.filter(cat => cat._id !== id)
                : [];
            setParentOptions(filteredList);
        }).catch(() => setParentOptions([]));
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleImageUpload = async (file) => {
        try {
            setUploading(true);
            const response = await upload_category_image(file);
            setForm(prev => ({ ...prev, image: response.data.url }));
            setToast({ open: true, message: 'Upload ảnh thành công', severity: 'success' });
        }
        catch (error) {
            console.error('Upload error:', error);
            setToast({ open: true, message: 'Upload ảnh thất bại', severity: 'error' });
        }
        finally {
            setUploading(false);
        }
    };
    const triggerImageUpload = () => {
        imageInputRef.current?.click();
    };
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };
    const handleSubmit = async () => {
        try {
            // Clean up parent field - convert empty string to null
            const cleanParent = form.parent && form.parent.trim() !== '' ? form.parent : null;
            const payload = {
                name: form.name,
                slug: form.slug || form.name.toLowerCase().trim().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, ''),
                description: form.description,
                parent: cleanParent,
                status: form.status,
                image: form.image
            };
            // Debug: Log payload to check parent field
            console.log('=== CATEGORY FORM DEBUG ===');
            console.log('Form data:', form);
            console.log('Payload:', payload);
            if (isEdit && id)
                await update_admin_category(id, payload);
            else
                await create_admin_category(payload);
            setToast({ open: true, message: 'Lưu danh mục thành công', severity: 'success' });
            setTimeout(() => navigate('/admin/categories'), 600);
        }
        catch (e) {
            console.error('Error saving category:', e);
            setToast({ open: true, message: e?.response?.data?.message || 'Lưu danh mục thất bại', severity: 'error' });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(AdminLayout, { title: "Danh m\u1EE5c", children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700, mb: 2 }, children: "Th\u00EAm/S\u1EEDa danh m\u1EE5c" }), _jsx(Paper, { elevation: 0, sx: { p: 3, borderRadius: 2 }, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "T\u00EAn danh m\u1EE5c", name: "name", value: form.name, onChange: handleChange, InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "Slug", placeholder: "tu-dong-sinh", name: "slug", value: form.slug, onChange: handleChange, InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(TextField, { select: true, fullWidth: true, label: "Danh m\u1EE5c cha", name: "parent", value: form.parent, onChange: handleChange, InputProps: { sx: { height: 56 } }, children: [parents.map((p) => (_jsx(MenuItem, { value: p.id, children: p.name }, p.id))), parentOptions.map((p) => (_jsx(MenuItem, { value: p._id, children: p.name }, p._id)))] }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsx(TextField, { fullWidth: true, label: "\u1EA2nh danh m\u1EE5c (URL)", name: "image", value: form.image, onChange: handleChange, InputProps: { sx: { height: 56 } } }) }), _jsx(Grid, { size: { xs: 12, md: 6 }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: [_jsx(Avatar, { src: form.image, sx: { width: 80, height: 80, border: '2px dashed #ddd' }, children: _jsx(Image, {}) }), _jsxs(Box, { children: [_jsx(Button, { variant: "outlined", startIcon: _jsx(CloudUpload, {}), onClick: triggerImageUpload, disabled: uploading, sx: { mb: 1 }, children: uploading ? 'Đang upload...' : 'Upload ảnh' }), _jsx("input", { ref: imageInputRef, type: "file", accept: "image/*", onChange: handleImageChange, style: { display: 'none' } })] })] }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsx(TextField, { fullWidth: true, label: "M\u00F4 t\u1EA3", name: "description", value: form.description, onChange: handleChange, multiline: true, minRows: 4 }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsxs(Box, { sx: { display: 'flex', gap: 2, justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "outlined", onClick: () => navigate('/admin/categories'), children: "Hu\u1EF7" }), _jsx(Button, { onClick: handleSubmit, variant: "contained", sx: { backgroundColor: '#111', '&:hover': { backgroundColor: '#222' } }, children: "L\u01B0u" })] }) })] }) })] }), _jsx(Snackbar, { open: toast.open, autoHideDuration: 3000, onClose: () => setToast({ ...toast, open: false }), anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, children: _jsx(Alert, { onClose: () => setToast({ ...toast, open: false }), severity: toast.severity, variant: "filled", sx: { width: '100%' }, children: toast.message }) })] }));
};
export default CategoryFormPage;
