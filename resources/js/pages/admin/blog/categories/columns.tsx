import type { ColumnDef } from '@tanstack/react-table';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import type { BlogCategory } from '@/types';

export type Category = BlogCategory & { posts_count: number };

interface CreateColumnsOptions {
    editingId: number | null;
    setEditingId: (id: number | null) => void;
    editName: string;
    setEditName: (name: string) => void;
    handleUpdate: (id: number) => void;
    setDeletingId: (id: number) => void;
}

export function createColumns({
    editingId,
    setEditingId,
    editName,
    setEditName,
    handleUpdate,
    setDeletingId,
}: CreateColumnsOptions): ColumnDef<Category>[] {
    return [
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
            cell: ({ row }) =>
                editingId === row.original.id ? (
                    <div className="flex items-center gap-2">
                        <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-8 w-48"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdate(row.original.id)}
                        />
                        <Button size="sm" variant="ghost" className="text-green-600" onClick={() => handleUpdate(row.original.id)}>
                            <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <span className="font-medium text-foreground">{row.original.name}</span>
                ),
        },
        {
            accessorKey: 'slug',
            header: 'Slug',
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.slug}</span>,
        },
        {
            accessorKey: 'posts_count',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Posts" />,
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.posts_count}</span>,
        },
        {
            id: 'actions',
            header: '',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setEditingId(row.original.id); setEditName(row.original.name); }}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeletingId(row.original.id)}
                        disabled={row.original.posts_count > 0}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];
}
