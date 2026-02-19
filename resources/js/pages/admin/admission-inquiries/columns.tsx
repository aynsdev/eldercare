import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import type { AdmissionInquiry } from '@/types';

export type { AdmissionInquiry };

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    new: { label: 'New', className: 'bg-blue-100 text-blue-700' },
    read: { label: 'Read', className: 'bg-gray-100 text-gray-600' },
    in_progress: { label: 'In Progress', className: 'bg-amber-100 text-amber-700' },
    tour_scheduled: { label: 'Tour Scheduled', className: 'bg-purple-100 text-purple-700' },
    admitted: { label: 'Admitted', className: 'bg-green-100 text-green-700' },
    declined: { label: 'Declined', className: 'bg-red-100 text-red-600' },
    closed: { label: 'Closed', className: 'bg-slate-100 text-slate-500' },
};

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function createColumns(setDeletingId: (id: number) => void): ColumnDef<AdmissionInquiry>[] {
    return [
        {
            accessorKey: 'first_name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Inquirer" />,
            cell: ({ row }) => (
                <div>
                    <p className="font-medium text-foreground">
                        {row.original.first_name} {row.original.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">{row.original.email}</p>
                </div>
            ),
        },
        {
            accessorKey: 'resident_name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Resident" />,
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.resident_name}</span>,
        },
        {
            accessorKey: 'care_service',
            header: 'Service',
            cell: ({ row }) => (
                <span className="text-sm capitalize text-muted-foreground">
                    {row.original.care_service?.replace(/_/g, ' ') ?? '—'}
                </span>
            ),
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{formatDate(row.original.created_at)}</span>,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const cfg = STATUS_CONFIG[row.original.status];
                return (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg?.className ?? 'bg-gray-100 text-gray-600'}`}>
                        {cfg?.label ?? row.original.status}
                    </span>
                );
            },
        },
        {
            id: 'actions',
            header: '',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/admission-inquiries/${row.original.id}`}>
                            <Eye className="h-4 w-4" />
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
