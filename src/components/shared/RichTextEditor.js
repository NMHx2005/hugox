import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useCallback } from 'react';
import { Box, IconButton, Divider, Toolbar } from '@mui/material';
import { FormatBold as BoldIcon, FormatItalic as ItalicIcon, FormatUnderlined as UnderlineIcon, FormatListBulleted as BulletListIcon, FormatListNumbered as NumberListIcon, FormatAlignLeft as AlignLeftIcon, FormatAlignCenter as AlignCenterIcon, Link as LinkIcon } from '@mui/icons-material';
const RichTextEditor = ({ value, onChange, placeholder = 'Nhập nội dung...', minHeight = 150 }) => {
    const editorRef = useRef(null);
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
                }, children: [_jsx(IconButton, { size: "small", onClick: () => executeCommand('bold'), title: "Bold", children: _jsx(BoldIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('italic'), title: "Italic", children: _jsx(ItalicIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('underline'), title: "Underline", children: _jsx(UnderlineIcon, { fontSize: "small" }) }), _jsx(Divider, { orientation: "vertical", flexItem: true, sx: { mx: 1 } }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('insertUnorderedList'), title: "Bullet List", children: _jsx(BulletListIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('insertOrderedList'), title: "Numbered List", children: _jsx(NumberListIcon, { fontSize: "small" }) }), _jsx(Divider, { orientation: "vertical", flexItem: true, sx: { mx: 1 } }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('justifyLeft'), title: "Align Left", children: _jsx(AlignLeftIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", onClick: () => executeCommand('justifyCenter'), title: "Center", children: _jsx(AlignCenterIcon, { fontSize: "small" }) }), _jsx(Divider, { orientation: "vertical", flexItem: true, sx: { mx: 1 } }), _jsx(IconButton, { size: "small", onClick: insertLink, title: "Insert Link", children: _jsx(LinkIcon, { fontSize: "small" }) })] }), _jsx(Box, { ref: editorRef, contentEditable: true, onInput: handleInput, suppressContentEditableWarning: true, sx: {
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
                    }
                } })] }));
};
export default RichTextEditor;
