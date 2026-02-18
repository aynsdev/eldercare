import { Head, router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
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
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { type Category, createColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog Categories', href: '/admin/blog/categories' },
];

interface Props {
    categories: Category[];
}

export default function BlogCategoriesIndex({ categories }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');

    const createForm = useForm({ name: '' });

    function handleCreate(e: React.SyntheticEvent) {
        e.preventDefault();
        createForm.post('/admin/blog/categories', {
            onSuccess: () => {
                toast.success('Category created.');
                createForm.reset();
            },
        });
    }

    function handleUpdate(id: number) {
        router.put(`/admin/blog/categories/${id}`, { name: editName }, {
            onSuccess: () => {
                toast.success('Category updated.');
                setEditingId(null);
            },
        });
    }

    function handleDelete() {
        if (!deletingId) return;
        router.delete(`/admin/blog/categories/${deletingId}`, {
            onSuccess: () => {
                toast.success('Category deleted.');
                setDeletingId(null);
            },
        });
    }

    const columns = createColumns({ editingId, setEditingId, editName, setEditName, handleUpdate, setDeletingId });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Categories" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Blog Categories</h1>
                    <p className="text-sm text-muted-foreground">{categories.length} categories</p>
                </div>

                <form onSubmit={handleCreate} className="flex max-w-md gap-2">
                    <div className="flex-1">
                        <Input
                            value={createForm.data.name}
                            onChange={(e) => createForm.setData('name', e.target.value)}
                            placeholder="New category name..."
                            required
                        />
                        <InputError message={createForm.errors.name} className="mt-1" />
                    </div>
                    <Button type="submit" disabled={createForm.processing}>
                        <Plus className="mr-1.5 h-4 w-4" /> Add
                    </Button>
                </form>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card">
                    <DataTable columns={columns} data={categories} />
                </div>
            </div>

            <Dialog open={deletingId !== null} onOpenChange={() => setDeletingId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
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
