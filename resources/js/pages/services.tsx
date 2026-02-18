import { Link } from '@inertiajs/react';
import { Calendar, Clock, Heart, Home, Pill, Stethoscope, Utensils, Users } from 'lucide-react';
import { primaryPhone } from '@/lib/contact';
import PublicLayout from '@/layouts/public-layout';

const facilityFeatures = [
    {
        icon: Home,
        title: 'Private Bedrooms',
        text: 'Private, fully air-conditioned bedrooms with comfortable furnishings and personal space for belongings.',
    },
    {
        icon: Home,
        title: 'Private Bathrooms',
        text: 'Each room includes a private bathroom with safety features and accessibility considerations.',
    },
    {
        icon: Heart,
        title: 'Complete Linens',
        text: 'Fresh bed linens and towels provided and maintained through our housekeeping services.',
    },
    {
        icon: Clock,
        title: '24/7 Security',
        text: 'Round-the-clock security and monitoring systems ensure safety and peace of mind.',
    },
    {
        icon: Calendar,
        title: 'Transportation',
        text: 'Scheduled transportation to medical appointments, shopping, and recreational events.',
    },
    {
        icon: Home,
        title: 'Modern Amenities',
        text: 'Elevator access, Wi-Fi connectivity, accessible city location, and kitchen facilities for suite rooms.',
    },
    {
        icon: Heart,
        title: 'Chapel',
        text: 'On-site chapel for spiritual comfort and faith-based activities in a peaceful setting.',
    },
];

const careServices = [
    {
        icon: Heart,
        title: '24/7 Caregiver',
        text: 'Professional caregivers available around the clock to provide assistance and ensure resident safety.',
    },
    {
        icon: Pill,
        title: 'Nursing Services',
        text: 'Regular nursing rounds with medication management and administration by licensed professionals.',
    },
    {
        icon: Utensils,
        title: 'Nutritious Meals',
        text: 'Delicious, healthy meals including breakfast, lunch, dinner, and snacks prepared fresh daily.',
    },
    {
        icon: Home,
        title: 'Maintenance & Utilities',
        text: 'Complete maintenance services and utilities including electrical, water, and cable TV.',
    },
    {
        icon: Users,
        title: 'Social Activities',
        text: 'Daily supervised exercises, board games, bingo, cards, and group programs for social engagement.',
    },
    {
        icon: Heart,
        title: 'Housekeeping & Laundry',
        text: 'Regular housekeeping and laundry services to maintain clean, comfortable living spaces.',
    },
    {
        icon: Heart,
        title: 'Spiritual Activities',
        text: 'Faith-related activities with caregiver assistance to attend spiritual services and programs.',
    },
    {
        icon: Stethoscope,
        title: 'Hospital Access',
        text: 'Quick and full access to hospital care through our strategic location within the medical center.',
    },
];

const additionalServices = [
    {
        icon: Stethoscope,
        title: 'Full Time Medical Assistance',
        text: 'Dedicated medical professional for continuous monitoring and immediate medical care.',
    },
    {
        icon: Heart,
        title: 'Physical/Occupational Therapy',
        text: 'Specialized therapy services to maintain or improve physical function and mobility.',
    },
    {
        icon: Utensils,
        title: 'Special Diet Accommodations',
        text: 'Custom meal plans with nutritionist and dietician consultations for specific dietary needs.',
    },
    {
        icon: Calendar,
        title: 'Personal Doctor Appointments',
        text: 'Scheduled appointments with personal physicians for individualized medical care.',
    },
    {
        icon: Heart,
        title: 'Personal Grooming Services',
        text: 'Enhanced grooming and beauty services for personal care and wellness.',
    },
    {
        icon: Home,
        title: 'Bed Upgrade',
        text: 'Premium bedding and room upgrades for enhanced comfort and luxury.',
    },
];

export default function Services() {
    return (
        <PublicLayout
            title="Services & Care"
            description="Comprehensive accommodation and care services designed to help seniors live comfortably and safely."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">What We Offer</p>
                        <h1 className="heading-large mb-6">Accommodation &amp; Care Services</h1>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl leading-relaxed">
                            We provide comprehensive accommodation and care services designed to help seniors live
                            comfortably and safely while maintaining their independence in a warm, supportive
                            environment.
                        </p>
                    </div>
                </div>
            </section>

            {/* Room & Facility Features */}
            <section className="bg-soft-white py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Accommodations</p>
                        <h2 className="heading-large mb-6">Room &amp; Facility Features</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            Our modern, comfortable accommodations are designed with seniors in mind, providing privacy,
                            safety, and convenience in every detail.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {facilityFeatures.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="card-warm">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/8">
                                    <Icon className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="heading-small mb-3">{title}</h3>
                                <p className="text-senior text-muted-foreground">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Care Services */}
            <section className="bg-cream py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Included Care</p>
                        <h2 className="heading-large mb-6">Comprehensive Care Services</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            Our professional care team provides round-the-clock support to ensure residents receive the
                            assistance they need while maintaining their dignity and independence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {careServices.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="card-warm">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/8">
                                    <Icon className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="heading-small mb-3">{title}</h3>
                                <p className="text-senior text-muted-foreground">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Customizable Services */}
            <section className="bg-soft-white py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-accent-foreground">Premium Add-Ons</p>
                        <h2 className="heading-large mb-6">Additional Customizable Services</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            These premium services are available for additional charges on top of regular rates. We&apos;ll
                            discuss these options with you in advance to customize care to your loved one&apos;s specific
                            needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {additionalServices.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="card-warm border-2 border-accent/30">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 to-accent/10">
                                    <Icon className="h-7 w-7 text-accent-foreground" />
                                </div>
                                <h3 className="heading-small mb-3">{title}</h3>
                                <p className="text-senior text-muted-foreground">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Important Notice */}
            <section className="bg-cream py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <div className="card-warm border-l-4 border-l-accent">
                            <h3 className="heading-medium mb-4 text-accent-foreground">Important Note</h3>
                            <p className="text-senior text-muted-foreground leading-relaxed">
                                Our comprehensive care package does not include the cost of medical supplies, medicines,
                                physical therapy, additional doctor visits, or laboratory tests. These services will be
                                billed separately as needed, and we&apos;ll always discuss any additional costs with you
                                in advance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-warm py-24 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Experience Our Comprehensive Care
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-soft-white/90">
                        Schedule a tour to see our modern facilities and learn more about how our comprehensive
                        accommodation and care services can benefit your loved one.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] bg-soft-white px-10 py-4 text-xl font-semibold text-forest-green shadow-lg transition-all hover:bg-soft-white/90"
                        >
                            Schedule a Visit
                        </Link>
                        <a
                            href={`tel:${primaryPhone.tel}`}
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] border-2 border-soft-white/50 bg-soft-white/15 px-10 py-4 text-xl font-semibold text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green"
                        >
                            Call Us Now
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
