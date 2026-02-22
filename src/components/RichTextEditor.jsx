import React, { useRef, useEffect, useCallback } from 'react';
import {
    Bold, Italic, Underline, Heading2, Heading3,
    List, ListOrdered, Link, Quote, Minus, Undo, Redo,
} from 'lucide-react';

const ToolbarBtn = ({ title, onClick, active, children }) => (
    <button
        type="button"
        title={title}
        onMouseDown={e => { e.preventDefault(); onClick(); }}
        style={{
            padding: '6px 8px', borderRadius: 6, border: 'none', cursor: 'pointer',
            background: active ? 'rgba(245,197,24,0.2)' : 'transparent',
            color: active ? '#f5c518' : 'rgba(255,255,255,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; } }}
        onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
    >
        {children}
    </button>
);

const Divider = () => (
    <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
);

export default function RichTextEditor({ value, onChange, placeholder = 'Tulis konten artikel di sini...' }) {
    const editorRef = useRef(null);
    const isInternalChange = useRef(false);

    // Sync external value → editor (on first render / reset only)
    useEffect(() => {
        if (editorRef.current && !isInternalChange.current) {
            if (editorRef.current.innerHTML !== value) {
                editorRef.current.innerHTML = value || '';
            }
        }
        isInternalChange.current = false;
    }, [value]);

    const handleInput = useCallback(() => {
        isInternalChange.current = true;
        onChange(editorRef.current?.innerHTML || '');
    }, [onChange]);

    const exec = (cmd, val = null) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, val);
        handleInput();
    };

    const insertHeading = (tag) => {
        editorRef.current?.focus();
        const sel = window.getSelection();
        if (!sel.rangeCount) return;
        const range = sel.getRangeAt(0);
        let block = range.commonAncestorContainer;
        if (block.nodeType === 3) block = block.parentElement;
        // Find closest block
        while (block && !['P', 'H1', 'H2', 'H3', 'H4', 'DIV', 'LI'].includes(block.tagName)) {
            block = block.parentElement;
        }
        if (block && block !== editorRef.current) {
            const newEl = document.createElement(tag);
            newEl.innerHTML = block.innerHTML || '<br>';
            block.replaceWith(newEl);
            // Move cursor inside
            const newRange = document.createRange();
            newRange.selectNodeContents(newEl);
            newRange.collapse(false);
            sel.removeAllRanges();
            sel.addRange(newRange);
            handleInput();
        } else {
            document.execCommand('formatBlock', false, tag);
            handleInput();
        }
    };

    const insertLink = () => {
        const url = prompt('Masukkan URL link:');
        if (url) exec('createLink', url);
    };

    const insertDivider = () => {
        editorRef.current?.focus();
        document.execCommand('insertHTML', false, '<hr><p><br></p>');
        handleInput();
    };

    const queryCmd = (cmd) => {
        try { return document.queryCommandState(cmd); } catch { return false; }
    };

    return (
        <div style={{
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
            background: 'rgba(255,255,255,0.03)', overflow: 'hidden',
            transition: 'border-color 0.2s',
        }}
            onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(245,197,24,0.4)'}
            onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
            {/* Toolbar */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 2, padding: '8px 12px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                flexWrap: 'wrap', background: 'rgba(255,255,255,0.02)',
            }}>
                <ToolbarBtn title="Undo (Ctrl+Z)" onClick={() => exec('undo')}><Undo size={15} /></ToolbarBtn>
                <ToolbarBtn title="Redo (Ctrl+Y)" onClick={() => exec('redo')}><Redo size={15} /></ToolbarBtn>
                <Divider />
                <ToolbarBtn title="Heading 2" onClick={() => insertHeading('h2')}><Heading2 size={16} /></ToolbarBtn>
                <ToolbarBtn title="Heading 3" onClick={() => insertHeading('h3')}><Heading3 size={16} /></ToolbarBtn>
                <Divider />
                <ToolbarBtn title="Bold (Ctrl+B)" onClick={() => exec('bold')} active={queryCmd('bold')}><Bold size={15} /></ToolbarBtn>
                <ToolbarBtn title="Italic (Ctrl+I)" onClick={() => exec('italic')} active={queryCmd('italic')}><Italic size={15} /></ToolbarBtn>
                <ToolbarBtn title="Underline (Ctrl+U)" onClick={() => exec('underline')} active={queryCmd('underline')}><Underline size={15} /></ToolbarBtn>
                <Divider />
                <ToolbarBtn title="Bullet List" onClick={() => exec('insertUnorderedList')}><List size={15} /></ToolbarBtn>
                <ToolbarBtn title="Numbered List" onClick={() => exec('insertOrderedList')}><ListOrdered size={15} /></ToolbarBtn>
                <ToolbarBtn title="Blockquote" onClick={() => exec('formatBlock', 'blockquote')}><Quote size={15} /></ToolbarBtn>
                <Divider />
                <ToolbarBtn title="Insert Link" onClick={insertLink}><Link size={15} /></ToolbarBtn>
                <ToolbarBtn title="Horizontal Line" onClick={insertDivider}><Minus size={15} /></ToolbarBtn>
            </div>

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyDown={e => {
                    // Enter in h2/h3 → switch to paragraph
                    if (e.key === 'Enter' && !e.shiftKey) {
                        const sel = window.getSelection();
                        if (sel.rangeCount) {
                            let block = sel.getRangeAt(0).commonAncestorContainer;
                            if (block.nodeType === 3) block = block.parentElement;
                            if (['H2', 'H3'].includes(block?.tagName)) {
                                setTimeout(() => {
                                    document.execCommand('formatBlock', false, 'p');
                                }, 0);
                            }
                        }
                    }
                }}
                data-placeholder={placeholder}
                style={{
                    minHeight: 380, padding: '20px 22px', outline: 'none',
                    color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.85,
                    fontFamily: 'Inter, sans-serif',
                }}
            />

            {/* CSS for placeholder and content styling */}
            <style>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: rgba(255,255,255,0.25);
                    pointer-events: none;
                }
                [contenteditable] h2 {
                    font-size: 1.35rem; font-weight: 700; margin: 1.4em 0 0.5em;
                    color: #fff; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 6px;
                }
                [contenteditable] h3 {
                    font-size: 1.1rem; font-weight: 600; margin: 1.2em 0 0.4em; color: #eee;
                }
                [contenteditable] p { margin: 0 0 0.85em; }
                [contenteditable] ul, [contenteditable] ol { margin: 0.5em 0 0.85em 1.4em; }
                [contenteditable] li { margin-bottom: 4px; }
                [contenteditable] strong { color: #fff; font-weight: 700; }
                [contenteditable] em { color: rgba(255,255,255,0.8); }
                [contenteditable] a { color: #f5c518; text-decoration: underline; }
                [contenteditable] blockquote {
                    border-left: 3px solid #f5c518; margin: 1em 0;
                    padding: 8px 16px; background: rgba(245,197,24,0.05);
                    color: rgba(255,255,255,0.7); border-radius: 0 8px 8px 0;
                }
                [contenteditable] hr {
                    border: none; border-top: 1px solid rgba(255,255,255,0.12); margin: 1.5em 0;
                }
                [contenteditable] u { text-decoration: underline; }
            `}</style>
        </div>
    );
}
