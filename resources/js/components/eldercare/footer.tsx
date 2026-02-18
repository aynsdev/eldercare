import { Link } from '@inertiajs/react';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-forest-green text-soft-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo and Mission */}
                    <div className="lg:col-span-2">
                        <img
                            src="/images/logo.png"
                            alt="St. Joseph Eldercare Residences"
                            className="mb-4 h-16 w-auto brightness-0 invert"
                        />
                        <p className="text-senior mb-4 max-w-md text-soft-white/90">
                            Providing compassionate, dignified care for seniors in a warm, family-oriented environment.
                            Your loved ones deserve the best, and we&apos;re here to provide it.
                        </p>
                        <div className="flex items-center gap-2 text-warm-gold">
                            <Heart className="h-5 w-5" />
                            <span className="text-senior">Caring with dignity since 2025</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="heading-small mb-4 text-warm-gold">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Services & Care', href: '/services' },
                                { label: 'Blog', href: '/blog' },
                                { label: 'FAQs', href: '/faqs' },
                                { label: 'Contact', href: '/contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-senior text-soft-white/90 transition-colors hover:text-warm-gold"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="heading-small mb-4 text-warm-gold">Contact Us</h3>
                        <div className="space-y-3">
                            {[
                                { number: '+63 915 371 4314', tel: '+639153714314' },
                                { number: '+63 935 794 3648', tel: '+639357943648' },
                                { number: '(038) 412-8270', tel: '03841282170' },
                            ].map((phone) => (
                                <a
                                    key={phone.tel}
                                    href={`tel:${phone.tel}`}
                                    className="text-senior flex items-center gap-3 text-soft-white/90 transition-colors hover:text-warm-gold"
                                >
                                    <Phone className="h-5 w-5 shrink-0" />
                                    <span>{phone.number}</span>
                                </a>
                            ))}
                            <a
                                href="mailto:stjosepheldecareresidences@gmail.com"
                                className="text-senior flex items-start gap-3 text-soft-white/90 transition-colors hover:text-warm-gold"
                            >
                                <Mail className="mt-1 h-5 w-5 shrink-0" />
                                <span>stjosepheldecareresidences@gmail.com</span>
                            </a>
                            <div className="text-senior flex items-start gap-3 text-soft-white/90">
                                <MapPin className="mt-1 h-5 w-5 shrink-0" />
                                <div>
                                    <p>5th Floor of Holy Name Medical Center Inc</p>
                                    <p>Tagbilaran City</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-soft-white/20 pt-8 text-center">
                    <p className="text-senior text-soft-white/80">
                        © {new Date().getFullYear()} St. Joseph Eldercare Residences. All rights reserved. |{' '}
                        <span className="text-warm-gold">Licensed Care Facility</span> |{' '}
                        <Link href="/login" className="text-sm text-soft-white/60 transition-colors hover:text-warm-gold">
                            Staff Login
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
