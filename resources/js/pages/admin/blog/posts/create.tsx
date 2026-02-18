import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ImageIcon, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { RichEditor } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog Posts', href: '/admin/blog/posts' },
    { title: 'New Post', href: '#' },
];

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function BlogPostCreate({ categories }: Props) {
    const featuredImageRef = useRef<HTMLInputElement>(null);
    const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        category_id: string;
        excerpt: string;
        content: string;
        featured_image: File | null;
        status: string;
        published_at: string;
    }>({
        title: '',
        category_id: '',
        excerpt: '',
        content: '',
        featured_image: null,
        status: 'draft',
        published_at: '',
    });

    function handleFeaturedImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('featured_image', file);
        setFeaturedImagePreview(URL.createObjectURL(file));
    }

    function removeFeaturedImage() {
        setData('featured_image', null);
        setFeaturedImagePreview(null);
        if (featuredImageRef.current) {
            featuredImageRef.current.value = '';
        }
    }

    function submit(e: React.SyntheticEvent) {
        e.preventDefault();
        post('/admin/blog/posts', {
            forceFormData: true,
            onSuccess: () => toast.success('Post created.'),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Blog Post" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/blog/posts">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-semibold text-foreground">New Blog Post</h1>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_300px]">
                    <div className="space-y-5 rounded-xl border border-sidebar-border/70 bg-card p-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Post title" required />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <textarea
                                id="excerpt"
                                rows={3}
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Short summary of the post..."
                                required
                            />
                            <InputError message={errors.excerpt} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Content</Label>
                            <RichEditor
                                value={data.content}
                                onChange={(v) => setData('content', v)}
                                placeholder="Write your post content..."
                            />
                            <InputError message={errors.content} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Featured Image</Label>
                            <input
                                ref={featuredImageRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFeaturedImageChange}
                            />
                            {featuredImagePreview ? (
                                <div className="relative w-full overflow-hidden rounded-lg border border-input">
                                    <img src={featuredImagePreview} alt="Featured image preview" className="h-48 w-full object-cover" />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute right-2 top-2 h-7 w-7 p-0"
                                        onClick={removeFeaturedImage}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => featuredImageRef.current?.click()}
                                    className="flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50"
                                >
                                    <ImageIcon className="h-8 w-8" />
                                    <span className="text-sm">Click to upload featured image</span>
                                </button>
                            )}
                            {featuredImagePreview && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-fit"
                                    onClick={() => featuredImageRef.current?.click()}
                                >
                                    Change image
                                </Button>
                            )}
                            <InputError message={errors.featured_image} />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-4 rounded-xl border border-sidebar-border/70 bg-card p-5">
                            <div className="grid gap-2">
                                <Label>Category</Label>
                                <Select value={data.category_id} onValueChange={(v) => setData('category_id', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>

                            {data.status === 'published' && (
                                <div className="grid gap-2">
                                    <Label htmlFor="published_at">Publish Date</Label>
                                    <Input
                                        id="published_at"
                                        type="datetime-local"
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                    />
                                    <InputError message={errors.published_at} />
                                </div>
                            )}

                            <Button type="submit" disabled={processing} className="w-full">
                                Create Post
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
