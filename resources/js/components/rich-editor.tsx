import { EditorContent, useEditor } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Code,
    Code2,
    Heading2,
    Heading3,
    ImageIcon,
    Italic,
    Link2,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo,
    Undo,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RichEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

interface ToolbarButtonProps {
    onClick: () => void;
    isActive?: boolean;
    title: string;
    disabled?: boolean;
    children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive, title, disabled, children }: ToolbarButtonProps) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            title={title}
            disabled={disabled}
            onClick={onClick}
            className={cn('h-8 w-8 p-0', isActive && 'bg-accent text-accent-foreground')}
        >
            {children}
        </Button>
    );
}

function ToolbarDivider() {
    return <div className="mx-1 h-5 w-px bg-border" />;
}

export function RichEditor({ value, onChange, placeholder, className }: RichEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder ?? 'Start writing...',
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
            }),
            Image.configure({
                HTMLAttributes: { class: 'rounded-lg max-w-full' },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Sync external value changes (e.g. form reset)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false);
        }
    }, [value, editor]);

    if (!editor) return null;

    function setLink() {
        const url = window.prompt('Enter URL', editor?.getAttributes('link').href ?? '');
        if (url === null) return;
        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        const csrfMeta = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
        const response = await fetch('/admin/media', {
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': csrfMeta?.content ?? '' },
            body: formData,
        });

        if (response.ok) {
            const { url } = await response.json() as { url: string };
            editor?.chain().focus().setImage({ src: url }).run();
        }

        // Reset input so the same file can be re-uploaded
        e.target.value = '';
    }

    return (
        <div className={cn('overflow-hidden rounded-md border border-input bg-background', className)}>
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
            />

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/30 px-2 py-1.5">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive('code')}
                    title="Inline code"
                >
                    <Code className="h-4 w-4" />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                >
                    <Heading2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    title="Heading 3"
                >
                    <Heading3 className="h-4 w-4" />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Bullet list"
                >
                    <List className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Ordered list"
                >
                    <ListOrdered className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Blockquote"
                >
                    <Quote className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive('codeBlock')}
                    title="Code block"
                >
                    <Code2 className="h-4 w-4" />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} title="Link">
                    <Link2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => fileInputRef.current?.click()}
                    title="Insert image"
                >
                    <ImageIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal rule"
                >
                    <Minus className="h-4 w-4" />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo className="h-4 w-4" />
                </ToolbarButton>
            </div>

            {/* Editor area */}
            <div className="rich-editor-content">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
