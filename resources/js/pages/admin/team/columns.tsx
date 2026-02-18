import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/data-table';

export interface TeamMember {
    id: number;
    name: string;
    position: string;
    photo?: string;
    order: number;
    is_active: boolean;
}

export function createColumns(setDeletingId: (id: number) => void): ColumnDef<TeamMember>[] {
    return [
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Member" />,
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    {row.original.photo ? (
                        <img
                            src={`/storage/${row.original.photo}`}
                            alt={row.original.name}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                            {row.original.name[0]}
                        </div>
                    )}
                    <span className="font-medium text-foreground">{row.original.name}</span>
                </div>
            ),
        },
        {
            accessorKey: 'position',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Position" />,
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.position}</span>,
        },
        {
            accessorKey: 'order',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.order}</span>,
        },
        {
            accessorKey: 'is_active',
            header: 'Active',
            cell: ({ row }) => (
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${row.original.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {row.original.is_active ? 'Active' : 'Inactive'}
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
                        <Link href={`/admin/team/${row.original.id}/edit`}>
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
