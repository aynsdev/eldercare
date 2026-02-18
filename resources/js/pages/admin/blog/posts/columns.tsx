import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/data-table';

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    category: { id: number; name: string };
    status: string;
    published_at?: string;
    created_at: string;
}

const STATUS_BADGE: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600',
    published: 'bg-green-100 text-green-700',
};

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function createColumns(setDeletingId: (id: number) => void): ColumnDef<BlogPost>[] {
    return [
        {
            accessorKey: 'title',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
            cell: ({ row }) => (
                <div>
                    <p className="font-medium text-foreground">{row.original.title}</p>
                    <p className="text-xs text-muted-foreground">/blog/{row.original.slug}</p>
                </div>
            ),
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.original.category?.name}</span>
            ),
        },
        {
            accessorKey: 'published_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Published" />,
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {row.original.published_at ? formatDate(row.original.published_at) : '—'}
                </span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[row.original.status] ?? ''}`}>
                    {row.original.status}
                </span>
            ),
        },
        {
            id: 'actions',
            header: '',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/blog/posts/${row.original.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeletingId(row.original.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];
}
