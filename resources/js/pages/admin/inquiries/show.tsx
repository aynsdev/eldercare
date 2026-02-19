import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Circle, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { BreadcrumbItem, Inquiry } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contact Inquiries', href: '/admin/inquiries' },
    { title: 'View Inquiry', href: '#' },
];

const STATUSES: { value: Inquiry['status']; label: string; className: string }[] = [
    { value: 'new', label: 'New', className: 'bg-blue-100 text-blue-700' },
    { value: 'read', label: 'Read', className: 'bg-gray-100 text-gray-600' },
    { value: 'replied', label: 'Replied', className: 'bg-green-100 text-green-700' },
    { value: 'closed', label: 'Closed', className: 'bg-slate-100 text-slate-500' },
];

interface Props {
    inquiry: Inquiry;
}

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatTimestamp(d: string | null) {
    if (!d) return null;
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function InquiryShow({ inquiry }: Props) {
    const currentStatus = STATUSES.find((s) => s.value === inquiry.status);

    function changeStatus(status: string) {
        router.patch(`/admin/inquiries/${inquiry.id}/status`, { status }, {
            onSuccess: () => toast.success('Status updated.'),
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
                            </div>
                        </div>

                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 space-y-3">
                            <h2 className="font-semibold text-foreground">Status</h2>
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${currentStatus?.className ?? 'bg-gray-100 text-gray-600'}`}>
                                {currentStatus?.label ?? inquiry.status}
                            </span>
                            <Select value={inquiry.status} onValueChange={changeStatus}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUSES.map((s) => (
                                        <SelectItem key={s.value} value={s.value}>
                                            {s.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-6">
                            <h2 className="mb-4 font-semibold text-foreground">Timeline</h2>
                            <ol className="space-y-3">
                                {[
                                    { label: 'Received', timestamp: inquiry.created_at, always: true },
                                    { label: 'Read', timestamp: inquiry.read_at },
                                    { label: 'Replied', timestamp: inquiry.replied_at },
                                    { label: 'Closed', timestamp: inquiry.closed_at },
                                ].map(({ label, timestamp, always }) => {
                                    const done = always || !!timestamp;
                                    return (
                                        <li key={label} className="flex items-start gap-3">
                                            {done
                                                ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/30" />
                                            }
                                            <div>
                                                <p className={`text-sm font-medium ${done ? 'text-foreground' : 'text-muted-foreground/50'}`}>{label}</p>
                                                {timestamp && (
                                                    <p className="text-xs text-muted-foreground">{formatTimestamp(timestamp)}</p>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>

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
