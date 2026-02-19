import { Head, router } from '@inertiajs/react';
import { CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable, type PaginationData } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import type { AppNotification, BreadcrumbItem } from '@/types';
import { createColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Notifications', href: '/admin/notifications' },
];

interface Props {
    notifications: {
        data: AppNotification[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function NotificationsIndex({ notifications }: Props) {
    const unreadCount = notifications.data.filter((n) => !n.read_at).length;
    const columns = createColumns();

    const pagination: PaginationData = {
        currentPage: notifications.current_page,
        lastPage: notifications.last_page,
        total: notifications.total,
        showingCount: notifications.data.length,
        links: notifications.links,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
                        <p className="text-sm text-muted-foreground">{notifications.total} total notifications</p>
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.post('/admin/notifications/read-all', {}, { preserveScroll: true })}
                            className="gap-1.5"
                        >
                            <CheckCheck className="h-4 w-4" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card">
                    <DataTable
                        columns={columns}
                        data={notifications.data}
                        pagination={pagination}
                        showColumnToggle={false}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
