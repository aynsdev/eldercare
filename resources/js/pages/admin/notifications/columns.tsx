import type { ColumnDef } from '@tanstack/react-table';
import { router } from '@inertiajs/react';
import { Bell, ClipboardList, ExternalLink, MessageSquare, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AppNotification } from '@/types';

export type { AppNotification };

const NOTIFICATION_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
    NewInquiry: { label: 'Contact Inquiry', icon: MessageSquare, color: 'text-blue-500 bg-blue-100' },
    NewAdmissionInquiry: { label: 'Admission Inquiry', icon: ClipboardList, color: 'text-purple-500 bg-purple-100' },
    NewTestimonial: { label: 'Testimonial', icon: Quote, color: 'text-amber-500 bg-amber-100' },
};

export function createColumns(): ColumnDef<AppNotification>[] {
    return [
        {
            accessorKey: 'notification_type',
            header: 'Type',
            cell: ({ row }) => {
                const config = NOTIFICATION_CONFIG[row.original.notification_type];
                const Icon = config?.icon ?? Bell;
                const color = config?.color ?? 'text-muted-foreground bg-muted';

                return (
                    <div className="flex items-center gap-2.5">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${color}`}>
                            <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm font-medium text-foreground">
                            {config?.label ?? row.original.notification_type}
                        </span>
                    </div>
                );
            },
        },
        {
            id: 'message',
            header: 'Message',
            cell: ({ row }) => {
                const message = (row.original.data.message as string) ?? 'New notification';
                const isUnread = !row.original.read_at;
                return (
                    <p className={`max-w-md truncate text-sm ${isUnread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {message}
                    </p>
                );
            },
        },
        {
            accessorKey: 'read_at',
            header: 'Status',
            cell: ({ row }) => {
                const isUnread = !row.original.read_at;
                return (
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${isUnread ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {isUnread && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
                        {isUnread ? 'Unread' : 'Read'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Received',
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.original.created_at}</span>
            ),
        },
        {
            id: 'actions',
            header: '',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex items-center justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        title="View"
                        onClick={() => router.post(`/admin/notifications/${row.original.id}/read`)}
                    >
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];
}
