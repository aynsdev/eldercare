import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Team', href: '/admin/team' },
    { title: 'Add Member', href: '#' },
];

export default function TeamCreate() {
    const photoRef = useRef<HTMLInputElement>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        position: string;
        bio: string;
        photo: File | null;
        order: string;
        is_active: boolean;
    }>({
        name: '',
        position: '',
        bio: '',
        photo: null,
        order: '0',
        is_active: true,
    });

    function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('photo', file);
        setPhotoPreview(URL.createObjectURL(file));
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/team', {
            forceFormData: true,
            onSuccess: () => toast.success('Team member added.'),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Team Member" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/team">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-semibold text-foreground">Add Team Member</h1>
                </div>

                <form onSubmit={submit} className="max-w-xl space-y-5 rounded-xl border border-sidebar-border/70 bg-card p-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="position">Position / Title</Label>
                        <Input id="position" value={data.position} onChange={(e) => setData('position', e.target.value)} placeholder="e.g. Head Nurse" required />
                        <InputError message={errors.position} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                            id="bio"
                            rows={4}
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Short biography..."
                        />
                        <InputError message={errors.bio} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Photo</Label>
                        <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                        <div className="flex items-center gap-5">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={photoPreview ?? undefined} alt="Member photo" className="object-cover" />
                                <AvatarFallback className="text-xl text-muted-foreground">
                                    {data.name ? data.name.charAt(0).toUpperCase() : '?'}
                                </AvatarFallback>
                            </Avatar>
                            <Button type="button" variant="outline" size="sm" onClick={() => photoRef.current?.click()}>
                                {photoPreview ? 'Change photo' : 'Upload photo'}
                            </Button>
                        </div>
                        <InputError message={errors.photo} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="order">Display Order</Label>
                        <Input id="order" type="number" min="0" value={data.order} onChange={(e) => setData('order', e.target.value)} />
                        <InputError message={errors.order} />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="h-4 w-4 rounded border-input"
                        />
                        <Label htmlFor="is_active">Active (visible on website)</Label>
                    </div>

                    <Button type="submit" disabled={processing}>Save Member</Button>
                </form>
            </div>
        </AppLayout>
    );
}
