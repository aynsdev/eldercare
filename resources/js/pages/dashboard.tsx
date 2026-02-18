import { Head, Link } from '@inertiajs/react';
import { BookOpen, ClipboardList, MessageSquare, Quote, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

interface Stats {
    contactInquiries: number;
    newContactInquiries: number;
    admissionInquiries: number;
    newAdmissionInquiries: number;
    blogPosts: number;
    publishedPosts: number;
    testimonials: number;
    pendingTestimonials: number;
    teamMembers: number;
}

interface Props {
    stats: Stats;
}

interface StatCardProps {
    title: string;
    total: number;
    badge?: number;
    badgeLabel?: string;
    icon: React.ReactNode;
    href: string;
    color: string;
}

function StatCard({ title, total, badge, badgeLabel, icon, href, color }: StatCardProps) {
    return (
        <Link href={href} className="group block">
            <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 transition-shadow hover:shadow-md">
                <div className={`absolute right-0 top-0 h-full w-1 ${color}`} />
                <div className="mb-4 flex items-start justify-between">
                    <div className={`rounded-lg p-2.5 ${color.replace('bg-', 'bg-').replace('500', '100').replace('600', '100')}`}>
                        {icon}
                    </div>
                    {badge !== undefined && badge > 0 && (
                        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                            {badge} {badgeLabel}
                        </span>
                    )}
                </div>
                <p className="text-3xl font-bold text-foreground">{total}</p>
                <p className="mt-1 text-sm text-muted-foreground">{title}</p>
            </div>
        </Link>
    );
}

export default function Dashboard({ stats }: Props) {
    const cards: StatCardProps[] = [
        {
            title: 'Contact Inquiries',
            total: stats.contactInquiries,
            badge: stats.newContactInquiries,
            badgeLabel: 'new',
            icon: <MessageSquare className="h-5 w-5 text-blue-600" />,
            href: '/admin/inquiries',
            color: 'bg-blue-500',
        },
        {
            title: 'Admission Inquiries',
            total: stats.admissionInquiries,
            badge: stats.newAdmissionInquiries,
            badgeLabel: 'new',
            icon: <ClipboardList className="h-5 w-5 text-emerald-600" />,
            href: '/admin/admission-inquiries',
            color: 'bg-emerald-500',
        },
        {
            title: 'Blog Posts',
            total: stats.blogPosts,
            badge: stats.publishedPosts,
            badgeLabel: 'published',
            icon: <BookOpen className="h-5 w-5 text-purple-600" />,
            href: '/admin/blog/posts',
            color: 'bg-purple-500',
        },
        {
            title: 'Testimonials',
            total: stats.testimonials,
            badge: stats.pendingTestimonials,
            badgeLabel: 'pending',
            icon: <Quote className="h-5 w-5 text-amber-600" />,
            href: '/admin/testimonials',
            color: 'bg-amber-500',
        },
        {
            title: 'Team Members',
            total: stats.teamMembers,
            icon: <Users className="h-5 w-5 text-rose-600" />,
            href: '/admin/team',
            color: 'bg-rose-500',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Overview of your eldercare facility content</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {cards.map((card) => (
                        <StatCard key={card.title} {...card} />
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Recent Contact Inquiries */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-semibold text-foreground">Quick Links</h2>
                        </div>
                        <div className="space-y-2">
                            {[
                                { label: 'Add new blog post', href: '/admin/blog/posts/create' },
                                { label: 'View new contact inquiries', href: '/admin/inquiries' },
                                { label: 'Review admission inquiries', href: '/admin/admission-inquiries' },
                                { label: 'Manage testimonials', href: '/admin/testimonials' },
                                { label: 'Update team members', href: '/admin/team' },
                                { label: 'Manage blog categories', href: '/admin/blog/categories' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
