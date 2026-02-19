import Image from '@tiptap/extension-image';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { useRef } from 'react';

interface ResizableImageViewProps {
    node: {
        attrs: {
            src: string;
            alt?: string;
            title?: string;
            width?: number | null;
        };
    };
    updateAttributes: (attrs: Record<string, unknown>) => void;
    selected: boolean;
}

function ResizableImageView({ node, updateAttributes, selected }: ResizableImageViewProps) {
    const { src, alt, width } = node.attrs;
    const imgRef = useRef<HTMLImageElement>(null);
    const startX = useRef(0);
    const startWidth = useRef(0);

    function handleMouseDown(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        startX.current = e.clientX;
        startWidth.current = imgRef.current?.offsetWidth ?? 300;

        function onMouseMove(ev: MouseEvent) {
            const newWidth = Math.max(80, startWidth.current + (ev.clientX - startX.current));
            updateAttributes({ width: newWidth });
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    return (
        <NodeViewWrapper as="div" className="relative my-3 inline-block max-w-full">
            <img
                ref={imgRef}
                src={src}
                alt={alt ?? ''}
                draggable={false}
                className={`block rounded-lg ${selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                style={{ width: width ? `${width}px` : '100%', maxWidth: '100%' }}
            />
            {selected && (
                <div
                    onMouseDown={handleMouseDown}
                    title="Drag to resize"
                    className="absolute -right-1.5 top-1/2 flex h-8 w-3 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-blue-500 shadow-md"
                >
                    <div className="h-3 w-0.5 rounded-full bg-white opacity-80" />
                </div>
            )}
        </NodeViewWrapper>
    );
}

export const ResizableImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                parseHTML: (element) => {
                    const w = element.getAttribute('width') ?? element.style.width;
                    return w ? parseInt(w, 10) : null;
                },
                renderHTML: (attributes) => {
                    if (!attributes.width) return {};
                    return { width: attributes.width, style: `width: ${attributes.width}px; max-width: 100%` };
                },
            },
        };
    },
    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageView);
    },
});
