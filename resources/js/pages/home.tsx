import { Link } from '@inertiajs/react';
import { ArrowDown, ArrowRight, Calendar, Heart, Phone, Shield, Star, Users } from 'lucide-react';
import { primaryPhone } from '@/lib/contact';
import PublicLayout from '@/layouts/public-layout';
import type { Testimonial } from '@/types';

interface Props {
    testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="mb-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-5 w-5 ${star <= rating ? 'fill-warm-gold text-warm-gold' : 'text-border'}`}
                />
            ))}
        </div>
    );
}

const stats = [
    { number: '50+', label: 'Residents Cared For' },
    { number: '24/7', label: 'Professional Care' },
    { number: '5th Flr', label: 'Holy Name Medical Center' },
];

export default function Home({ testimonials }: Props) {
    return (
        <PublicLayout
            title="Home"
            description="Providing compassionate, dignified senior care in a warm family-oriented environment in Tagbilaran City."
        >
            {/* Hero Section */}
            <section className="relative flex flex-col" style={{ minHeight: '580px', height: '72vh' }}>
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-forest-green/75 via-forest-green/60 to-forest-green/80" />
                </div>

                {/* Centered content */}
                <div className="relative z-10 flex flex-1 items-center justify-center px-4">
                    <div className="container mx-auto text-center text-soft-white">
                        {/* Eyebrow */}
                        <div className="mb-5 flex items-center justify-center gap-4 sm:mb-6">
                            <span className="h-px w-10 bg-warm-gold/50 sm:w-14" />
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-warm-gold sm:text-sm">
                                Assisted Living · Tagbilaran City, Bohol
                            </span>
                            <span className="h-px w-10 bg-warm-gold/50 sm:w-14" />
                        </div>

                        <h1 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-heading)' }}>
                            Welcome to Your
                            <br />
                            <span className="text-warm-gold">Home Away from Home</span>
                        </h1>
                        <p className="mx-auto mb-4 text-base font-medium text-soft-white/80 sm:mb-5 sm:text-lg md:text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                            A Life of Comfort, Dignity, and Care
                        </p>
                        <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-soft-white/90 sm:mb-8 sm:text-base md:text-lg">
                            We offer a caring, safe, and comfortable environment where seniors can live
                            semi-independently while receiving compassionate assistance with daily activities,
                            medications, meal preparation, and more.
                        </p>
                        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                            <Link href="/inquire" className="btn-primary justify-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                Submit an Inquiry
                            </Link>
                            <a
                                href={`tel:${primaryPhone.tel}`}
                                className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] border-2 border-soft-white/50 bg-soft-white/15 px-6 py-3.5 font-semibold text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green sm:px-9 sm:text-lg"
                            >
                                <Phone className="h-5 w-5" />
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator — anchored to bottom of section */}
                <div className="relative z-10 flex flex-col items-center gap-1 pb-4 text-soft-white/60">
                    <span className="text-xs font-medium tracking-wide sm:text-sm">Scroll to explore</span>
                    <ArrowDown className="h-4 w-4 animate-bounce sm:h-5 sm:w-5" />
                </div>
            </section>

            {/* Stats Strip */}
            <div className="bg-forest-green">
                <div className="container mx-auto px-4 py-6 md:py-8">
                    <div className="grid grid-cols-3 gap-3 md:gap-6">
                        {stats.map(({ number, label }) => (
                            <div key={label} className="text-center">
                                <div className="mb-1 text-xl font-bold text-warm-gold sm:text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {number}
                                </div>
                                <div className="text-xs leading-snug text-soft-white/80 sm:text-sm md:text-base">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Families Choose Us */}
            <section className="bg-soft-white py-14 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-10 text-center md:mb-16">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Why Choose Us</p>
                        <h2 className="heading-large mb-6">A Family-Oriented Home for Seniors</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            For years, we&apos;ve been providing seniors with the care they need and the dignity they
                            deserve in a warm, family-oriented environment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: Heart,
                                title: 'Compassionate Care',
                                text: 'Our dedicated staff treats every resident like family, providing personalized care with warmth and respect.',
                            },
                            {
                                icon: Shield,
                                title: 'Safe & Secure',
                                text: '24/7 professional care in a secure environment, giving families peace of mind and residents confidence.',
                            },
                            {
                                icon: Users,
                                title: 'Community Living',
                                text: 'Social activities, shared meals, and meaningful relationships that make every day brighter and more fulfilling.',
                            },
                        ].map(({ icon: Icon, title, text }) => (
                            <div key={title} className="card-warm text-center">
                                <div className="mx-auto mb-6 flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/8">
                                    <Icon className="h-9 w-9 text-primary" />
                                </div>
                                <h3 className="heading-small mb-4">{title}</h3>
                                <p className="text-senior text-muted-foreground">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="bg-cream py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
                        <div>
                            <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Our Services</p>
                            <h2 className="heading-large mb-6">Complete Care for Your Loved Ones</h2>
                            <p className="text-senior text-muted-foreground mb-8">
                                From daily personal care to medication management, nutritious meals to social
                                activities, we provide comprehensive support that allows our residents to maintain their
                                independence while receiving the care they need.
                            </p>

                            <ul className="mb-10 space-y-4">
                                {[
                                    'Personal care and grooming assistance',
                                    'Medication management and reminders',
                                    'Nutritious meals and dietary support',
                                    'Social activities and companionship',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-4">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                                            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                                        </div>
                                        <span className="text-senior">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/services" className="btn-secondary">
                                Learn More About Our Services
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>

                        <div className="relative">
                            <img
                                src="/images/model-cg.jpeg"
                                alt="Happy seniors in our comfortable living area"
                                className="w-full rounded-2xl shadow-2xl"
                            />
                            {/* Floating accent */}
                            <div className="absolute -bottom-4 -left-4 rounded-xl bg-forest-green px-6 py-4 text-soft-white shadow-lg">
                                <div className="text-2xl font-bold text-warm-gold" style={{ fontFamily: 'var(--font-heading)' }}>24/7</div>
                                <div className="text-sm text-soft-white/90">Care Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="bg-soft-white py-24">
                    <div className="container mx-auto px-4">
                        <div className="mb-16 text-center">
                            <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Testimonials</p>
                            <h2 className="heading-large mb-6">What Families Say About Us</h2>
                            <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                                Hear from families who have trusted us with their loved ones&apos; care.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.slice(0, 3).map((t) => (
                                <div key={t.id} className="card-warm flex flex-col">
                                    <StarRating rating={t.rating} />
                                    <p className="text-senior text-muted-foreground mb-6 flex-1 italic">
                                        &ldquo;{t.content}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3 border-t border-border pt-5">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{t.name}</p>
                                            <p className="text-sm text-muted-foreground">{t.relation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Call to Action */}
            <section className="bg-gradient-warm py-24 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Ready to Learn More?
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-soft-white/95">
                        We&apos;d love to show you our beautiful residence and discuss how we can provide the perfect
                        care solution for your loved one.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/inquire"
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] bg-soft-white px-10 py-4 text-xl font-semibold text-forest-green shadow-lg transition-all hover:bg-soft-white/90"
                        >
                            <Calendar className="h-6 w-6" />
                            Submit an Inquiry
                        </Link>
                        <a
                            href={`tel:${primaryPhone.tel}`}
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] border-2 border-soft-white/50 bg-soft-white/15 px-10 py-4 text-xl font-semibold text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green"
                        >
                            <Phone className="h-6 w-6" />
                            Call {primaryPhone.label}
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
