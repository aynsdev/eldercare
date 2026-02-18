import { Heart, Shield, Star } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

const leadership = [
    {
        initials: 'MS',
        name: 'Maria Santos',
        role: 'Founder & Executive Director',
        bio: "With over 30 years in senior care, Maria's vision continues to guide our mission of providing dignified, family-centered care.",
    },
    {
        initials: 'DR',
        name: 'Dr. Robert Chen',
        role: 'Medical Director',
        bio: 'Board-certified geriatrician who ensures our medical care protocols meet the highest standards of senior healthcare.',
    },
    {
        initials: 'AJ',
        name: 'Angela Johnson',
        role: 'Director of Care',
        bio: 'Licensed RN with 15 years of experience, Angela oversees all aspects of resident care and staff training.',
    },
];

const caregivers = [
    { initials: 'JR', name: 'Juan Reyes', role: 'Senior Caregiver' },
    { initials: 'LP', name: 'Liza Perez', role: 'Caregiver' },
    { initials: 'MC', name: 'Mark Cruz', role: 'Caregiver' },
    { initials: 'SR', name: 'Sofia Ramos', role: 'Caregiver' },
    { initials: 'BT', name: 'Benito Torres', role: 'Caregiver' },
    { initials: 'GD', name: 'Grace De Leon', role: 'Caregiver' },
];

const nursingStaff = [
    { initials: 'NM', name: 'Nurse Maria', role: 'Head Nurse' },
    { initials: 'RG', name: 'Nurse Ricardo', role: 'Registered Nurse' },
    { initials: 'EL', name: 'Nurse Elena', role: 'Registered Nurse' },
];

export default function Team() {
    return (
        <PublicLayout
            title="Our Team"
            description="Meet the dedicated professionals behind St. Joseph Eldercare Residences who provide compassionate care every day."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Our Team</p>
                        <h1 className="heading-large mb-4">People Behind the Care</h1>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl leading-relaxed">
                            Our team of compassionate professionals is committed to making every resident feel safe, valued, and at
                            home. From our leadership to our frontline caregivers, everyone here shares a deep dedication to
                            dignified elder care.
                        </p>
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="bg-soft-white py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Leadership</p>
                        <h2 className="heading-large mb-6">Our Leadership Team</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            Meet the dedicated professionals who set the vision and standards for exceptional care at St. Joseph
                            Eldercare Residences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {leadership.map(({ initials, name, role, bio }) => (
                            <div key={name} className="card-warm text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                                    <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {initials}
                                    </span>
                                </div>
                                <h3 className="heading-small mb-2">{name}</h3>
                                <p className="mb-4 font-semibold text-warm-gold">{role}</p>
                                <p className="text-senior text-muted-foreground">{bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Caregiving Staff */}
            <section className="bg-cream py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Caregiving Staff</p>
                        <h2 className="heading-large mb-6">Our Caregivers</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            Our caregivers are the heart of St. Joseph. They provide hands-on, day-to-day assistance with warmth,
                            patience, and genuine compassion.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                        {caregivers.map(({ initials, name, role }) => (
                            <div key={name} className="card-warm text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                                    <span className="text-lg font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {initials}
                                    </span>
                                </div>
                                <p className="font-semibold text-foreground">{name}</p>
                                <p className="text-sm text-muted-foreground">{role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nursing Staff */}
            <section className="bg-soft-white py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Nursing</p>
                        <h2 className="heading-large mb-6">Our Nursing Staff</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            Our licensed nurses ensure residents receive proper medical monitoring, medication management, and
                            clinical care around the clock.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {nursingStaff.map(({ initials, name, role }) => (
                            <div key={name} className="card-warm text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                                    <span className="text-xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {initials}
                                    </span>
                                </div>
                                <h3 className="heading-small mb-2">{name}</h3>
                                <p className="font-semibold text-warm-gold">{role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values banner */}
            <section className="bg-gradient-warm py-24 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        United by One Purpose
                    </h2>
                    <p className="mx-auto mb-14 max-w-3xl text-xl leading-relaxed text-soft-white/90">
                        Every member of our team — from leadership to caregivers — is united by the same commitment: to provide
                        the most compassionate, dignified care possible for every resident.
                    </p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {[
                            { icon: Heart, title: 'Compassion First', detail: 'Every interaction is guided by empathy and genuine care.' },
                            { icon: Shield, title: 'Professionally Trained', detail: 'All staff undergo rigorous training and background checks.' },
                            { icon: Star, title: 'Always Improving', detail: 'We continuously invest in education and best practices.' },
                        ].map(({ icon: Icon, title, detail }) => (
                            <div key={title} className="rounded-2xl bg-soft-white/10 p-8 text-center backdrop-blur-sm">
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-warm-gold/20">
                                    <Icon className="h-8 w-8 text-warm-gold" />
                                </div>
                                <h3 className="heading-small mb-3 text-soft-white">{title}</h3>
                                <p className="text-senior text-soft-white/85">{detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
