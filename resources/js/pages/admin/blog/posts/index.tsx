import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
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
import { type BlogPost, createColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog Posts', href: '/admin/blog/posts' },
];

interface Props {
    posts: {
        data: BlogPost[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function BlogPostsIndex({ posts }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    function handleDelete() {
        if (!deletingId) return;
        router.delete(`/admin/blog/posts/${deletingId}`, {
            onSuccess: () => {
                toast.success('Post deleted.');
                setDeletingId(null);
            },
        });
    }

    const columns = createColumns(setDeletingId);

    const pagination: PaginationData = {
        currentPage: posts.current_page,
        lastPage: posts.last_page,
        total: posts.total,
        showingCount: posts.data.length,
        links: posts.links,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Posts" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Blog Posts</h1>
                        <p className="text-sm text-muted-foreground">{posts.total} total posts</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/blog/posts/create">
                            <Plus className="mr-1.5 h-4 w-4" /> New Post
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card">
                    <DataTable columns={columns} data={posts.data} pagination={pagination} />
                </div>
            </div>

            <Dialog open={deletingId !== null} onOpenChange={() => setDeletingId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
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
