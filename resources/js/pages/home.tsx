import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Heart, Phone, Shield, Star, Users } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

interface Testimonial {
    id: number;
    name: string;
    relation: string;
    content: string;
    rating: number;
}

interface Props {
    testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="mb-2 flex text-warm-gold">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-4 w-4 ${star <= rating ? 'fill-current' : 'text-gray-300'}`} />
            ))}
        </div>
    );
}

export default function Home({ testimonials }: Props) {
    return (
        <PublicLayout
            title="St. Joseph Eldercare Residences — Compassionate Senior Care"
            description="Providing compassionate, dignified senior care in a warm family-oriented environment in Tagbilaran City."
        >
            {/* Hero Section */}
            <section className="relative flex min-h-[80vh] items-center justify-center" style={{ minHeight: '600px' }}>
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/images/residence-exterior.jpg)' }}
                >
                    <div className="absolute inset-0 bg-forest-green/60" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center text-soft-white">
                    <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Welcome to Your New Home
                    </h1>
                    <p className="text-senior mx-auto mb-8 max-w-3xl md:text-2xl">
                        At St. Joseph Eldercare Residences, we provide compassionate care and comfortable living for
                        seniors who deserve dignity, respect, and the warmth of family.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/contact" className="btn-primary justify-center text-xl">
                            <Calendar className="mr-2 h-6 w-6" />
                            Schedule a Visit
                        </Link>
                        <a
                            href="tel:+639153714314"
                            className="flex items-center justify-center gap-2 rounded-lg border border-soft-white bg-soft-white/20 px-10 py-4 text-xl text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green"
                        >
                            <Phone className="h-6 w-6" />
                            Call Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Families Choose Us */}
            <section className="bg-soft-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <h2 className="heading-large mb-6">Why Families Choose Us</h2>
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
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <Icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="heading-small mb-4">{title}</h3>
                                <p className="text-senior text-muted-foreground">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="bg-cream py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="heading-large mb-6">Complete Care for Your Loved Ones</h2>
                            <p className="text-senior text-muted-foreground mb-8">
                                From daily personal care to medication management, nutritious meals to social
                                activities, we provide comprehensive support that allows our residents to maintain their
                                independence while receiving the care they need.
                            </p>

                            <ul className="mb-8 space-y-4">
                                {[
                                    'Personal care and grooming assistance',
                                    'Medication management and reminders',
                                    'Nutritious meals and dietary support',
                                    'Social activities and companionship',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                                        <span className="text-senior">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/services" className="btn-secondary">
                                Learn More About Our Services
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>

                        <div>
                            <img
                                src="/images/seniors-living-room.jpg"
                                alt="Happy seniors in our comfortable living area"
                                className="w-full rounded-xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="bg-soft-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-16 text-center">
                            <h2 className="heading-large mb-6">What Families Say About Us</h2>
                            <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                                Hear from families who have trusted us with their loved ones&apos; care.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.slice(0, 3).map((t) => (
                                <div key={t.id} className="card-warm">
                                    <div className="mb-4">
                                        <StarRating rating={t.rating} />
                                        <p className="text-senior text-muted-foreground italic">&ldquo;{t.content}&rdquo;</p>
                                    </div>
                                    <div className="border-t border-border pt-4">
                                        <p className="font-semibold text-foreground">{t.name}</p>
                                        <p className="text-sm text-muted-foreground">{t.relation}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Call to Action */}
            <section className="bg-gradient-warm py-20 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                        Ready to Learn More?
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl">
                        We&apos;d love to show you our beautiful residence and discuss how we can provide the perfect
                        care solution for your loved one.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 rounded-lg bg-soft-white px-10 py-4 text-xl font-medium text-forest-green transition-all hover:bg-soft-white/90"
                        >
                            <Calendar className="h-6 w-6" />
                            Schedule Your Visit Today
                        </Link>
                        <a
                            href="tel:+639153714314"
                            className="flex items-center justify-center gap-2 rounded-lg border border-soft-white bg-soft-white/20 px-10 py-4 text-xl text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green"
                        >
                            <Phone className="h-6 w-6" />
                            Call +63 915 371 4314
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
