import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contact Inquiries', href: '/admin/inquiries' },
    { title: 'View Inquiry', href: '#' },
];

interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone?: string;
    preferred_contact?: string;
    message: string;
    status: string;
    created_at: string;
}

interface Props {
    inquiry: Inquiry;
}

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function InquiryShow({ inquiry }: Props) {
    function markRead() {
        router.patch(`/admin/inquiries/${inquiry.id}/read`, {}, {
            onSuccess: () => toast.success('Marked as read.'),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Inquiry" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/inquiries">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-semibold text-foreground">Inquiry from {inquiry.name}</h1>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6">
                        <h2 className="mb-4 font-semibold text-foreground">Message</h2>
                        <p className="whitespace-pre-wrap text-muted-foreground">{inquiry.message}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-6">
                            <h2 className="mb-4 font-semibold text-foreground">Contact Details</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">{inquiry.email}</a>
                                </div>
                                {inquiry.phone && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        <span>{inquiry.phone}</span>
                                    </div>
                                )}
                                {inquiry.preferred_contact && (
                                    <div>
                                        <span className="text-xs text-muted-foreground">Preferred contact: </span>
                                        <span className="capitalize">{inquiry.preferred_contact}</span>
                                    </div>
                                )}
                                <div>
                                    <span className="text-xs text-muted-foreground">Received: </span>
                                    <span>{formatDate(inquiry.created_at)}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground">Status: </span>
                                    <span className="capitalize font-medium">{inquiry.status}</span>
                                </div>
                            </div>
                        </div>

                        {inquiry.status === 'new' && (
                            <Button className="w-full" onClick={markRead}>
                                Mark as Read
                            </Button>
                        )}

                        <Button variant="outline" className="w-full" asChild>
                            <a href={`mailto:${inquiry.email}?subject=Re: Your inquiry to St. Joseph Eldercare`}>
                                Reply via Email
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
