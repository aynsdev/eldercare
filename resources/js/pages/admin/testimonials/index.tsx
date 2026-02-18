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
import { type Testimonial, createColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Testimonials', href: '/admin/testimonials' },
];

interface Props {
    testimonials: {
        data: Testimonial[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function TestimonialsIndex({ testimonials }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    function handleDelete() {
        if (!deletingId) return;
        router.delete(`/admin/testimonials/${deletingId}`, {
            onSuccess: () => {
                toast.success('Testimonial deleted.');
                setDeletingId(null);
            },
        });
    }

    function handleApprove(id: number) {
        router.patch(`/admin/testimonials/${id}/approve`, {}, {
            onSuccess: () => toast.success('Testimonial approved.'),
        });
    }

    function handleReject(id: number) {
        router.patch(`/admin/testimonials/${id}/reject`, {}, {
            onSuccess: () => toast.success('Testimonial rejected.'),
        });
    }

    const columns = createColumns({ setDeletingId, handleApprove, handleReject });

    const pagination: PaginationData = {
        currentPage: testimonials.current_page,
        lastPage: testimonials.last_page,
        total: testimonials.total,
        showingCount: testimonials.data.length,
        links: testimonials.links,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Testimonials" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Testimonials</h1>
                    <p className="text-sm text-muted-foreground">{testimonials.total} total</p>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card">
                    <DataTable columns={columns} data={testimonials.data} pagination={pagination} />
                </div>
            </div>

            <Dialog open={deletingId !== null} onOpenChange={() => setDeletingId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Testimonial</DialogTitle>
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
