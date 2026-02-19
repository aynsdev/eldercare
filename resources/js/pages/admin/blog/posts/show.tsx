import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, ExternalLink, Pencil, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog Posts', href: '/admin/blog/posts' },
    { title: 'View Post', href: '#' },
];

interface Category {
    id: number;
    name: string;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    status: string;
    published_at?: string;
    created_at: string;
    updated_at: string;
    category: Category;
}

interface Props {
    post: BlogPost;
}

const STATUS_BADGE: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600',
    published: 'bg-green-100 text-green-700',
};

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function BlogPostShow({ post }: Props) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    function handleDelete() {
        router.delete(`/admin/blog/posts/${post.id}`, {
            onSuccess: () => toast.success('Post deleted.'),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={post.title} />
            <div className="flex flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/blog/posts">
                                <ArrowLeft className="mr-1 h-4 w-4" /> Back
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-semibold text-foreground">{post.title}</h1>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[post.status] ?? 'bg-gray-100 text-gray-600'}`}>
                            {post.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {post.status === 'published' && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-1 h-4 w-4" /> View live
                                </a>
                            </Button>
                        )}
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/blog/posts/${post.id}/edit`}>
                                <Pencil className="mr-1 h-4 w-4" /> Edit
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => setConfirmDelete(true)}>
                            <Trash2 className="mr-1 h-4 w-4" /> Delete
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                    {/* Main content */}
                    <div className="space-y-6">
                        {/* Featured image */}
                        {post.featured_image && (
                            <div className="overflow-hidden rounded-xl border border-sidebar-border/70">
                                <img
                                    src={`/storage/${post.featured_image}`}
                                    alt={post.title}
                                    className="h-72 w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Excerpt */}
                        <div className="rounded-xl border border-sidebar-border/70 bg-muted/30 p-5">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Excerpt</p>
                            <p className="text-base text-foreground">{post.excerpt}</p>
                        </div>

                        {/* Content */}
                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-6">
                            <p className="text-sm font-medium text-muted-foreground mb-4">Content</p>
                            <div
                                className="rich-editor-content prose-content"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </div>

                    {/* Sidebar meta */}
                    <div className="space-y-4">
                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 space-y-4">
                            <p className="text-sm font-semibold text-foreground">Post Details</p>

                            <div className="flex items-start gap-2.5 text-sm">
                                <Tag className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground mb-0.5">Category</p>
                                    <p className="font-medium text-foreground">{post.category.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5 text-sm">
                                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground mb-0.5">Slug</p>
                                    <p className="break-all font-mono text-xs text-foreground">/blog/{post.slug}</p>
                                </div>
                            </div>

                            {post.published_at && (
                                <div className="flex items-start gap-2.5 text-sm">
                                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-0.5">Published</p>
                                        <p className="text-foreground">{formatDate(post.published_at)}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-2.5 text-sm">
                                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground mb-0.5">Last updated</p>
                                    <p className="text-foreground">{formatDate(post.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete &ldquo;{post.title}&rdquo;? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
