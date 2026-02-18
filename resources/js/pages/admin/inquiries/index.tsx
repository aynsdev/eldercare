import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DataTable, type PaginationData } from '@/components/ui/data-table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { type Inquiry, createColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contact Inquiries', href: '/admin/inquiries' },
];

interface Props {
    inquiries: {
        data: Inquiry[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function InquiriesIndex({ inquiries }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    function handleDelete() {
        if (!deletingId) return;
        router.delete(`/admin/inquiries/${deletingId}`, {
            onSuccess: () => {
                toast.success('Inquiry deleted.');
                setDeletingId(null);
            },
        });
    }

    const columns = createColumns(setDeletingId);

    const pagination: PaginationData = {
        currentPage: inquiries.current_page,
        lastPage: inquiries.last_page,
        total: inquiries.total,
        showingCount: inquiries.data.length,
        links: inquiries.links,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Inquiries" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Contact Inquiries</h1>
                    <p className="text-sm text-muted-foreground">{inquiries.total} total inquiries</p>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card">
                    <DataTable columns={columns} data={inquiries.data} pagination={pagination} />
                </div>
            </div>

            <Dialog open={deletingId !== null} onOpenChange={() => setDeletingId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Inquiry</DialogTitle>
                        <DialogDescription>Are you sure? This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeletingId(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
