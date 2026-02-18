import { Link } from '@inertiajs/react';
import {
    BookOpen,
    ClipboardList,
    FileText,
    LayoutGrid,
    MessageSquare,
    Quote,
    Settings,
    Users,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import AppLogo from './app-logo';
import { dashboard } from '@/routes';

const navSections = [
    {
        label: 'Overview',
        items: [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        label: 'Content',
        items: [
            {
                title: 'Blog Posts',
                href: '/admin/blog/posts',
                icon: FileText,
            },
            {
                title: 'Blog Categories',
                href: '/admin/blog/categories',
                icon: BookOpen,
            },
            {
                title: 'Testimonials',
                href: '/admin/testimonials',
                icon: Quote,
            },
            {
                title: 'Team',
                href: '/admin/team',
                icon: Users,
            },
        ],
    },
    {
        label: 'Inquiries',
        items: [
            {
                title: 'Contact Inquiries',
                href: '/admin/inquiries',
                icon: MessageSquare,
            },
            {
                title: 'Admission Inquiries',
                href: '/admin/admission-inquiries',
                icon: ClipboardList,
            },
        ],
    },
    {
        label: 'Settings',
        items: [
            {
                title: 'Profile',
                href: '/settings/profile',
                icon: Settings,
            },
        ],
    },
];

const footerNavItems: never[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain sections={navSections} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
