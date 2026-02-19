import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { BreadcrumbItem, Testimonial } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Testimonials', href: '/admin/testimonials' },
    { title: 'Edit', href: '#' },
];

interface Props {
    testimonial: Testimonial;
}

export default function TestimonialEdit({ testimonial }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: testimonial.name,
        relation: testimonial.relation,
        content: testimonial.content,
        rating: String(testimonial.rating),
        status: testimonial.status,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/testimonials/${testimonial.id}`, {
            onSuccess: () => toast.success('Testimonial updated.'),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Testimonial" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/testimonials">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-semibold text-foreground">Edit Testimonial</h1>
                </div>

                <form onSubmit={submit} className="max-w-xl space-y-5 rounded-xl border border-sidebar-border/70 bg-card p-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="relation">Relation</Label>
                        <Input id="relation" value={data.relation} onChange={(e) => setData('relation', e.target.value)} required />
                        <InputError message={errors.relation} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">Testimonial</Label>
                        <textarea
                            id="content"
                            rows={4}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            required
                        />
                        <InputError message={errors.content} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Rating</Label>
                        <Select value={data.rating} onValueChange={(v) => setData('rating', v)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 4, 3, 2, 1].map((n) => (
                                    <SelectItem key={n} value={String(n)}>{n} Stars</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.rating} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>

                    <Button type="submit" disabled={processing}>Update Testimonial</Button>
                </form>
            </div>
        </AppLayout>
    );
}
