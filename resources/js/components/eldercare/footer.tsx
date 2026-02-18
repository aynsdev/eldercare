import { Link } from '@inertiajs/react';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { address, email, phones, social } from '@/lib/contact';

export default function Footer() {
    return (
        <footer className="bg-forest-green text-soft-white">
            {/* Gold accent stripe */}
            <div className="h-1 bg-gradient-to-r from-warm-gold/60 via-warm-gold to-warm-gold/60" />

            <div className="container mx-auto px-4 pt-14 pb-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <img
                            src="/images/logo.png"
                            alt="St. Joseph Eldercare Residences"
                            className="mb-5 h-14 w-auto brightness-0 invert"
                        />
                        <p className="text-senior mb-6 max-w-sm leading-relaxed text-soft-white/80">
                            Providing compassionate, dignified care for seniors in a warm, family-oriented environment.
                            Your loved ones deserve the best.
                        </p>
                        <div className="inline-flex items-center gap-2.5 rounded-full bg-warm-gold/15 px-4 py-2 ring-1 ring-warm-gold/30">
                            <Heart className="h-4 w-4 fill-warm-gold text-warm-gold" />
                            <span className="text-base font-medium text-warm-gold">Caring with dignity since 2025</span>
                        </div>

                        {/* Social links */}
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href={social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-white/10 text-soft-white/70 ring-1 ring-soft-white/15 transition-all hover:bg-[#1877f2] hover:text-white hover:ring-[#1877f2]"
                            >
                                {/* Facebook icon */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href={social.messenger}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Messenger"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-white/10 text-soft-white/70 ring-1 ring-soft-white/15 transition-all hover:text-white hover:ring-transparent"
                                onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(135deg,#0099ff,#a033ff)')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                            >
                                {/* Messenger icon */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.377 5.504 3.538 7.24V22l3.333-1.803c.975.274 2.01.423 3.129.423 5.523 0 10-4.145 10-9.377C22 6.145 17.523 2 12 2zm1.006 12.617-2.545-2.683-4.97 2.683 5.476-5.96 2.607 2.683 4.908-2.683-5.476 5.96z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-warm-gold">Quick Links</h3>
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
                                        className="text-senior group flex items-center gap-2 text-soft-white/75 transition-colors hover:text-warm-gold"
                                    >
                                        <span className="h-px w-3 bg-soft-white/30 transition-all group-hover:w-4 group-hover:bg-warm-gold" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-warm-gold">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                {phones.map((phone, i) => (
                                    <a
                                        key={phone.tel}
                                        href={`tel:${phone.tel}`}
                                        className="text-senior flex items-center gap-3 text-soft-white/75 transition-colors hover:text-warm-gold"
                                    >
                                        {i === 0 && <Phone className="h-4 w-4 shrink-0 text-warm-gold/70" />}
                                        {i !== 0 && <span className="h-4 w-4 shrink-0" />}
                                        {phone.label}
                                    </a>
                                ))}
                            </div>

                            <a
                                href={`mailto:${email}`}
                                className="text-senior flex items-center gap-3 text-soft-white/75 transition-colors hover:text-warm-gold"
                            >
                                <Mail className="h-4 w-4 shrink-0 text-warm-gold/70" />
                                {email}
                            </a>

                            <div className="text-senior flex items-start gap-3 text-soft-white/75">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-warm-gold/70" />
                                <div>
                                    <p>{address.line1}</p>
                                    <p>{address.line2}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-soft-white/10 pt-8 sm:flex-row">
                    <p className="text-base text-soft-white/50">
                        © {new Date().getFullYear()} St. Joseph Eldercare Residences. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-base">
                        <Link
                            href="/login"
                            className="text-soft-white/40 transition-colors hover:text-soft-white/70"
                        >
                            Staff Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
