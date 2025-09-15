import React, { useRef, useCallback } from 'react';
import { Box, IconButton, Divider, Toolbar } from '@mui/material';
import {
    FormatBold as BoldIcon,
    FormatItalic as ItalicIcon,
    FormatUnderlined as UnderlineIcon,
    FormatListBulleted as BulletListIcon,
    FormatListNumbered as NumberListIcon,
    FormatAlignLeft as AlignLeftIcon,
    FormatAlignCenter as AlignCenterIcon,
    Link as LinkIcon
} from '@mui/icons-material';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = 'Nhập nội dung...',
    minHeight = 150
}) => {
    const editorRef = useRef<HTMLDivElement>(null);

    const executeCommand = useCallback((command: string, value?: string) => {
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

    return (
        <Box sx={{
            border: '1px solid #ddd',
            borderRadius: 1,
            backgroundColor: '#fff'
        }}>
            {/* Toolbar */}
            <Toolbar variant="dense" sx={{
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #ddd',
                minHeight: '48px !important',
                gap: 0.5
            }}>
                <IconButton
                    size="small"
                    onClick={() => executeCommand('bold')}
                    title="Bold"
                >
                    <BoldIcon fontSize="small" />
                </IconButton>

                <IconButton
                    size="small"
                    onClick={() => executeCommand('italic')}
                    title="Italic"
                >
                    <ItalicIcon fontSize="small" />
                </IconButton>

                <IconButton
                    size="small"
                    onClick={() => executeCommand('underline')}
                    title="Underline"
                >
                    <UnderlineIcon fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                <IconButton
                    size="small"
                    onClick={() => executeCommand('insertUnorderedList')}
                    title="Bullet List"
                >
                    <BulletListIcon fontSize="small" />
                </IconButton>

                <IconButton
                    size="small"
                    onClick={() => executeCommand('insertOrderedList')}
                    title="Numbered List"
                >
                    <NumberListIcon fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                <IconButton
                    size="small"
                    onClick={() => executeCommand('justifyLeft')}
                    title="Align Left"
                >
                    <AlignLeftIcon fontSize="small" />
                </IconButton>

                <IconButton
                    size="small"
                    onClick={() => executeCommand('justifyCenter')}
                    title="Center"
                >
                    <AlignCenterIcon fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                <IconButton
                    size="small"
                    onClick={insertLink}
                    title="Insert Link"
                >
                    <LinkIcon fontSize="small" />
                </IconButton>
            </Toolbar>

            {/* Editor */}
            <Box
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                suppressContentEditableWarning={true}
                sx={{
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
                }}
            />
        </Box>
    );
};

export default RichTextEditor;