import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { primaryPhone } from '@/lib/contact';

const aboutDropdown = [
    { name: 'Our Story', href: '/about' },
    { name: 'Our Team', href: '/team' },
];

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about', dropdown: aboutDropdown },
    { name: 'Services & Care', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const { url } = usePage();

    const isActive = (href: string) => (href === '/' ? url === '/' : url.startsWith(href));
    const isAboutActive = url.startsWith('/about') || url.startsWith('/team');

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-soft-white/95 shadow-sm backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img src="/images/logo.png" alt="St. Joseph Eldercare Residences" className="h-12 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-2 lg:flex">
                        {navItems.map((item) =>
                            item.dropdown ? (
                                /* Dropdown item */
                                <div
                                    key={item.href}
                                    className="relative"
                                    onMouseEnter={() => setAboutOpen(true)}
                                    onMouseLeave={() => setAboutOpen(false)}
                                >
                                    <button
                                        className={`relative flex items-center gap-1 px-3 py-2 text-lg font-medium transition-colors duration-200 hover:text-primary ${
                                            isAboutActive ? 'text-primary' : 'text-foreground'
                                        }`}
                                    >
                                        {item.name}
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}
                                        />
                                        {isAboutActive && (
                                            <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                                        )}
                                    </button>

                                    {/* Dropdown panel */}
                                    {aboutOpen && (
                                        <div className="absolute left-0 top-full w-48 rounded-xl border border-border bg-soft-white py-2 shadow-lg">
                                            {item.dropdown.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium transition-colors hover:bg-primary/8 hover:text-primary ${
                                                        isActive(sub.href) ? 'bg-primary/8 text-primary' : 'text-foreground'
                                                    }`}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Regular item */
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-3 py-2 text-lg font-medium transition-colors duration-200 hover:text-primary ${
                                        isActive(item.href) ? 'text-primary' : 'text-foreground'
                                    }`}
                                >
                                    {item.name}
                                    {isActive(item.href) && (
                                        <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                                    )}
                                </Link>
                            ),
                        )}
                        <a href={`tel:${primaryPhone.tel}`} className="btn-primary ml-4 flex items-center gap-2 py-2.5 text-base">
                            <Phone className="h-4 w-4" />
                            Call Us
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <div className="lg:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="border-t border-border py-4 lg:hidden">
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) =>
                                item.dropdown ? (
                                    <div key={item.href}>
                                        <button
                                            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                                            className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-medium transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${
                                                isAboutActive ? 'bg-primary/10 text-primary' : 'text-foreground'
                                            }`}
                                        >
                                            {item.name}
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        {mobileAboutOpen && (
                                            <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-primary/20 pl-3">
                                                {item.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.href}
                                                        href={sub.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-primary/10 hover:text-primary ${
                                                            isActive(sub.href) ? 'bg-primary/8 text-primary' : 'text-foreground'
                                                        }`}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`rounded-lg px-4 py-3 text-lg font-medium transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${
                                            isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-foreground'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ),
                            )}
                            <a
                                href={`tel:${primaryPhone.tel}`}
                                className="btn-primary mt-3 flex items-center justify-center gap-2"
                            >
                                <Phone className="h-5 w-5" />
                                Call {primaryPhone.label}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
