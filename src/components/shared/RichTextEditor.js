import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useCallback, useState } from 'react';
import { Box, IconButton, Divider, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tabs, Tab, Typography, CircularProgress } from '@mui/material';
import { FormatBold as BoldIcon, FormatItalic as ItalicIcon, FormatUnderlined as UnderlineIcon, FormatListBulleted as BulletListIcon, FormatListNumbered as NumberListIcon, FormatAlignLeft as AlignLeftIcon, FormatAlignCenter as AlignCenterIcon, Link as LinkIcon, Image as ImageIcon, CloudUpload as UploadIcon } from '@mui/icons-material';
const RichTextEditor = ({ value, onChange, placeholder = 'Nhập nội dung...', minHeight = 150, onImageUpload }) => {
    const editorRef = useRef(null);
    // Image dialog state
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [imageMode, setImageMode] = useState('url');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [uploading, setUploading] = useState(false);
    const savedRangeRef = useRef(null);
    const executeCommand = useCallback((command, value) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    }, [onChange]);
    const handleInput = useCallback(() => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    }, [onChange]);
    const insertLink = useCallback(() => {
        const url = prompt('Nhập URL:');
        if (url) {
            executeCommand('createLink', url);
        }
    }, [executeCommand]);
    const openImageDialog = useCallback(() => {
        // Save current selection
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            savedRangeRef.current = selection.getRangeAt(0).cloneRange();
        }
        setImageDialogOpen(true);
        setImageUrl('');
        setImageAlt('');
        setImageMode('url');
    }, []);
    const insertImage = useCallback((url, alt = '') => {
        console.log('insertImage called with URL:', url, 'alt:', alt); // Debug log
        if (editorRef.current) {
            // Focus the editor first
            editorRef.current.focus();
            // Restore saved range if available
            if (savedRangeRef.current) {
                const selection = window.getSelection();
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(savedRangeRef.current);
                }
            }
            try {
                // Try using execCommand first
                const success = document.execCommand('insertImage', false, url);
                console.log('execCommand insertImage success:', success); // Debug log
                if (success) {
                    // Find the inserted image and apply styles
                    const images = editorRef.current.querySelectorAll('img');
                    const lastImg = images[images.length - 1];
                    if (lastImg && lastImg.src === url) {
                        lastImg.alt = alt;
                        lastImg.style.maxWidth = '100%';
                        lastImg.style.height = 'auto';
                        lastImg.style.margin = '8px 0';
                        lastImg.style.borderRadius = '4px';
                        lastImg.style.display = 'block';
                        console.log('Applied styles to inserted image'); // Debug log
                    }
                }
                else {
                    // Fallback to manual insertion
                    console.log('execCommand failed, using manual insertion'); // Debug log
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = alt;
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                    img.style.margin = '8px 0';
                    img.style.borderRadius = '4px';
                    img.style.display = 'block';
                    // Use saved range or current selection
                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        range.deleteContents();
                        range.insertNode(img);
                        // Move cursor after image
                        range.setStartAfter(img);
                        range.setEndAfter(img);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                    else {
                        editorRef.current.appendChild(img);
                    }
                }
                // Clear saved range
                savedRangeRef.current = null;
                console.log('Editor HTML after insert:', editorRef.current.innerHTML); // Debug log
                onChange(editorRef.current.innerHTML);
            }
            catch (error) {
                console.error('Error inserting image:', error);
            }
        }
    }, [onChange]);
    const handleImageInsert = useCallback(async () => {
        if (!imageUrl.trim())
            return;
        insertImage(imageUrl, imageAlt);
        setImageDialogOpen(false);
        setImageUrl('');
        setImageAlt('');
    }, [imageUrl, imageAlt, insertImage]);
    const handleImageUpload = useCallback(async (file) => {
        if (!onImageUpload)
            return;
        try {
            setUploading(true);
            const url = await onImageUpload(file);
            console.log('Upload success, URL:', url); // Debug log
            insertImage(url, imageAlt || file.name);
            setImageDialogOpen(false);
            setImageUrl('');
            setImageAlt('');
        }
        catch (error) {
            console.error('Image upload failed:', error);
            alert('Upload ảnh thất bại. Vui lòng thử lại.');
        }
        finally {
            setUploading(false);
        }
    }, [onImageUpload, imageAlt, insertImage]);
    // Set initial content
    React.useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);
    return (_jsxs(Box, { sx: {
            border: '1px solid #ddd',
            borderRadius: 1,
            backgroundColor: '#fff'
        }, children: [_jsxs(Toolbar, { variant: "dense", sx: {
                    backgroundColor: '#f5f5f5',
                    borderBottom: '1px solid #ddd',
                    minHeight: '48px !important',
                    gap: 0.5
                }, children: [_jsx(IconButton, { size: "small", onClick: () => executeCommand('bold'), title: "Bold", children: _jsx(BoldIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('italic'), title: "Italic", children: _jsx(ItalicIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('underline'), title: "Underline", children: _jsx(UnderlineIcon, { fontSize: "small" }) }), _jsx(Divider, { orientation: "vertical", flexItem: true, sx: { mx: 1 } }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('insertUnorderedList'), title: "Bullet List", children: _jsx(BulletListIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('insertOrderedList'), title: "Numbered List", children: _jsx(NumberListIcon, { fontSize: "small" }) }), _jsx(Divider, { orientation: "vertical", flexItem: true, sx: { mx: 1 } }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('justifyLeft'), title: "Align Left", children: _jsx(AlignLeftIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('justifyCenter'), title: "Center", children: _jsx(AlignCenterIcon, { fontSize: "small" }) }), _jsx(Divider, { orientation: "vertical", flexItem: true, sx: { mx: 1 } }), _jsx(IconButton, { size: "small", onClick: insertLink, title: "Insert Link", children: _jsx(LinkIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: openImageDialog, title: "Insert Image", children: _jsx(ImageIcon, { fontSize: "small" }) })] }), _jsx(Box, { ref: editorRef, contentEditable: true, onInput: handleInput, suppressContentEditableWarning: true, sx: {
                    minHeight: `${minHeight}px`,
                    padding: 2,
                    fontSize: '14px',
                    lineHeight: 1.6,
                    outline: 'none',
                    textAlign: 'left',
                    '&:empty::before': {
                        content: `"${placeholder}"`,
                        color: '#999',
                        fontStyle: 'italic'
                    },
                    '& p': {
                        margin: '0 0 16px 0'
                    },
                    '& ul, & ol': {
                        margin: '0 0 16px 0',
                        paddingLeft: '24px'
                    },
                    '& li': {
                        margin: '4px 0'
                    },
                    '& strong, & b': {
                        fontWeight: 600
                    },
                    '& a': {
                        color: '#1976d2',
                        textDecoration: 'underline'
                    },
                    '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                        margin: '8px 0',
                        borderRadius: '4px',
                        display: 'block'
                    }
                } }), _jsxs(Dialog, { open: imageDialogOpen, onClose: () => setImageDialogOpen(false), maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: "Ch\u00E8n \u1EA3nh" }), _jsxs(DialogContent, { children: [_jsxs(Tabs, { value: imageMode, onChange: (_, value) => setImageMode(value), sx: { mb: 2 }, children: [_jsx(Tab, { label: "URL \u1EA3nh", value: "url" }), onImageUpload && _jsx(Tab, { label: "Upload \u1EA3nh", value: "upload" })] }), imageMode === 'url' ? (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: [_jsx(TextField, { label: "URL \u1EA3nh", fullWidth: true, value: imageUrl, onChange: (e) => setImageUrl(e.target.value), placeholder: "https://example.com/image.jpg" }), _jsx(TextField, { label: "M\u00F4 t\u1EA3 \u1EA3nh (Alt text)", fullWidth: true, value: imageAlt, onChange: (e) => setImageAlt(e.target.value), placeholder: "M\u00F4 t\u1EA3 ng\u1EAFn g\u1ECDn v\u1EC1 \u1EA3nh" })] })) : (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: [_jsx(TextField, { label: "M\u00F4 t\u1EA3 \u1EA3nh (Alt text)", fullWidth: true, value: imageAlt, onChange: (e) => setImageAlt(e.target.value), placeholder: "M\u00F4 t\u1EA3 ng\u1EAFn g\u1ECDn v\u1EC1 \u1EA3nh" }), _jsxs(Box, { sx: {
                                            border: '2px dashed #ddd',
                                            borderRadius: 1,
                                            padding: 3,
                                            textAlign: 'center',
                                            position: 'relative'
                                        }, children: [_jsx("input", { type: "file", accept: "image/*", onChange: (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file)
                                                        handleImageUpload(file);
                                                }, style: {
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    opacity: 0,
                                                    cursor: 'pointer'
                                                }, disabled: uploading }), _jsx(UploadIcon, { sx: { fontSize: 48, color: '#666', mb: 1 } }), _jsx(Typography, { variant: "body1", sx: { color: '#666' }, children: uploading ? 'Đang upload...' : 'Click để chọn ảnh' }), uploading && (_jsx(CircularProgress, { size: 24, sx: { mt: 1 } }))] })] }))] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setImageDialogOpen(false), children: "H\u1EE7y" }), imageMode === 'url' && (_jsx(Button, { onClick: handleImageInsert, variant: "contained", disabled: !imageUrl.trim(), children: "Ch\u00E8n \u1EA3nh" }))] })] })] }));
};
export default RichTextEditor;
