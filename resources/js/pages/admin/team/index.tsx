import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
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
import { type TeamMember, createColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Team', href: '/admin/team' },
];

interface Props {
    members: TeamMember[];
}

export default function TeamIndex({ members }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    function handleDelete() {
        if (!deletingId) return;
        router.delete(`/admin/team/${deletingId}`, {
            onSuccess: () => {
                toast.success('Team member deleted.');
                setDeletingId(null);
            },
        });
    }

    const columns = createColumns(setDeletingId);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Team Members</h1>
                        <p className="text-sm text-muted-foreground">{members.length} members</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/team/create">
                            <Plus className="mr-1.5 h-4 w-4" /> Add Member
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card">
                    <DataTable columns={columns} data={members} />
                </div>
            </div>

            <Dialog open={deletingId !== null} onOpenChange={() => setDeletingId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Team Member</DialogTitle>
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
