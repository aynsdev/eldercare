import { Link, router, usePage } from '@inertiajs/react';
import { Bell, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { AppNotification } from '@/types';

const NOTIFICATION_LINKS: Record<string, (data: Record<string, unknown>) => string | null> = {
    NewInquiry: (data) => data.inquiry_id ? `/admin/inquiries/${data.inquiry_id}` : '/admin/inquiries',
    NewAdmissionInquiry: (data) => data.inquiry_id ? `/admin/admission-inquiries/${data.inquiry_id}` : '/admin/admission-inquiries',
    NewTestimonial: () => '/admin/testimonials',
};

function getNotificationLink(notification: AppNotification): string | null {
    const handler = NOTIFICATION_LINKS[notification.notification_type];
    return handler ? handler(notification.data) : null;
}

function getNotificationMessage(notification: AppNotification): string {
    return (notification.data.message as string) ?? 'New notification';
}

function handleNotificationClick(notification: AppNotification) {
    const link = getNotificationLink(notification);
    const isUnread = !notification.read_at;

    if (isUnread) {
        router.post(`/notifications/${notification.id}/read`, {}, {
            preserveScroll: !link,
            onSuccess: () => {
                if (link) {
                    router.visit(link);
                }
            },
        });
    } else if (link) {
        router.visit(link);
    }
}

export function HeaderActions() {
    const { unreadNotificationsCount, recentNotifications } = usePage().props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8"
                    title="Notifications"
                >
                    <Bell className="h-4 w-4" />
                    {unreadNotificationsCount > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                            {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-2 py-1.5">
                    <DropdownMenuLabel className="p-0 text-sm font-semibold">
                        Notifications
                    </DropdownMenuLabel>
                    {unreadNotificationsCount > 0 && (
                        <button
                            onClick={() => router.post('/notifications/read-all', {}, { preserveScroll: true })}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                            <CheckCheck className="h-3 w-3" />
                            Mark all read
                        </button>
                    )}
                </div>

                <DropdownMenuSeparator />

                {recentNotifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                        No notifications yet
                    </div>
                ) : (
                    (recentNotifications as AppNotification[]).map((notification) => {
                        const isUnread = !notification.read_at;

                        return (
                            <DropdownMenuItem
                                key={notification.id}
                                className="flex cursor-pointer items-start gap-3 px-3 py-2.5"
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${isUnread ? 'bg-blue-500' : 'bg-transparent'}`} />
                                <div className="min-w-0 flex-1">
                                    <p className={`text-xs leading-snug ${isUnread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                                        {getNotificationMessage(notification)}
                                    </p>
                                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                                        {notification.created_at}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        );
                    })
                )}

                <DropdownMenuSeparator />

                <div className="p-1">
                    <DropdownMenuItem asChild>
                        <Link href="/admin/inquiries" className="w-full justify-center text-xs font-medium">
                            View all inquiries
                        </Link>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
