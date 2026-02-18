import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services & Care', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    const isActive = (href: string) => (href === '/' ? url === '/' : url.startsWith(href));

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-soft-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img src="/images/logo.png" alt="St. Joseph Eldercare Residences" className="h-12 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center space-x-8 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-senior font-medium transition-colors duration-200 hover:text-primary ${
                                    isActive(item.href) ? 'text-primary' : 'text-foreground'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <a href="tel:+639153714314" className="btn-primary flex items-center gap-2 py-2 text-base">
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
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-senior py-2 font-medium transition-colors duration-200 hover:text-primary ${
                                        isActive(item.href) ? 'text-primary' : 'text-foreground'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <a
                                href="tel:+639153714314"
                                className="btn-primary mt-4 flex items-center justify-center gap-2"
                            >
                                <Phone className="h-5 w-5" />
                                Call +63 915 371 4314
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
