import type { ColumnDef } from '@tanstack/react-table';
import { Check, Pencil, Star, Trash2, X } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import type { Testimonial } from '@/types';

export type { Testimonial };

const STATUS_BADGE: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
};

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
            ))}
        </div>
    );
}

interface CreateColumnsOptions {
    setDeletingId: (id: number) => void;
    handleApprove: (id: number) => void;
    handleReject: (id: number) => void;
}

export function createColumns({ setDeletingId, handleApprove, handleReject }: CreateColumnsOptions): ColumnDef<Testimonial>[] {
    return [
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
            cell: ({ row }) => (
                <div>
                    <p className="font-medium text-foreground">{row.original.name}</p>
                    <p className="text-xs text-muted-foreground">{row.original.relation}</p>
                </div>
            ),
        },
        {
            accessorKey: 'content',
            header: 'Testimonial',
            cell: ({ row }) => (
                <p className="max-w-xs truncate text-sm text-muted-foreground">{row.original.content}</p>
            ),
        },
        {
            accessorKey: 'rating',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
            cell: ({ row }) => <Stars rating={row.original.rating} />,
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
                    {row.original.status === 'pending' && (
                        <>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700" onClick={() => handleApprove(row.original.id)}>
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleReject(row.original.id)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/testimonials/${row.original.id}/edit`}>
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
