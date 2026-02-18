import { Link, usePage } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

type NavSection = {
    label: string;
    items: NavItem[];
};

export function NavMain({ sections = [] }: { sections: NavSection[] }) {
    const page = usePage();

    return (
        <>
            {sections.map((section) => (
                <SidebarGroup key={section.label} className="px-2 py-0">
                    <SidebarGroupLabel className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        {section.label}
                    </SidebarGroupLabel>
                    <SidebarMenu className="gap-0.5">
                        {section.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.url.startsWith(toUrl(item.href))}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon className="h-[18px] w-[18px]" />}
                                        <span className="font-medium">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
