import { Link } from '@inertiajs/react';
import { ArrowRight, Award, Clock, Heart, Users } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

const coreValues = [
    {
        icon: Heart,
        title: 'Compassion',
        text: 'Every interaction is guided by empathy, kindness, and genuine care for our residents\u2019 wellbeing.',
    },
    {
        icon: Award,
        title: 'Dignity',
        text: 'We honor each resident\u2019s life story, preferences, and individual needs with the utmost respect.',
    },
    {
        icon: Users,
        title: 'Family',
        text: 'We create an environment where residents, families, and staff form meaningful, lasting relationships.',
    },
    {
        icon: Clock,
        title: 'Excellence',
        text: 'We continuously strive to provide the highest quality care and maintain the safest environment.',
    },
];

export default function About() {
    return (
        <PublicLayout
            title="About Us"
            description="Learn about our mission, values, and the compassionate team behind St. Joseph Eldercare Residences."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">About Us</p>
                        <h1 className="heading-large mb-4">St. Joseph Eldecare Residences</h1>
                        <p className="mx-auto mb-4 max-w-3xl text-xl font-medium text-primary/80" style={{ fontFamily: 'var(--font-heading)' }}>
                            A Life of Comfort, Dignity, and Care
                        </p>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl leading-relaxed">
                            We&apos;re an eldercare residence that offers housing designed to support older adults who
                            need assistance with daily activities or companionship. We offer a caring, safe, comfortable
                            environment where our clients can live semi-independently while receiving assistance with
                            personal care, taking medications, meal preparation, and many more.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-soft-white py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
                        <div>
                            <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Who We Are</p>
                            <h2 className="heading-medium mb-8">Our Mission &amp; Vision</h2>
                            <div className="space-y-6">
                                <div className="card-warm border-l-4 border-l-primary">
                                    <h3 className="heading-small mb-3 text-primary">Mission</h3>
                                    <p className="text-senior text-muted-foreground">
                                        To provide high-quality, compassionate care rooted in Christian values, ensuring
                                        dignity and enhancing the quality of life for elderly residents.
                                    </p>
                                </div>
                                <div className="card-warm border-l-4 border-l-accent">
                                    <h3 className="heading-small mb-3 text-accent-foreground">Vision</h3>
                                    <p className="text-senior text-muted-foreground">
                                        To be a leading provider of comprehensive elder care, fostering a community where
                                        residents live with dignity and receive innovative, compassionate care that meets
                                        their unique needs.
                                    </p>
                                </div>
                                <p className="text-senior text-muted-foreground">
                                    Named after Saint Joseph — patron saint of families and workers — our residence
                                    embodies the same virtues of protection, care, and unwavering devotion. Every senior
                                    deserves to live their golden years with respect, comfort, and joy.
                                </p>
                            </div>
                        </div>

                        <div>
                            <img
                                src="/images/caregiver-assistance.jpg"
                                alt="Professional caregiver providing compassionate care"
                                className="w-full rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-cream py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Our Foundation</p>
                        <h2 className="heading-large mb-6">Our Core Values</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            These principles guide everything we do and shape the caring environment that makes St.
                            Joseph Eldercare Residences feel like home.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {coreValues.map(({ icon: Icon, title, text }) => (
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

            {/* Meet Our Team */}
            <section className="bg-soft-white py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
                        <div>
                            <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Our Team</p>
                            <h2 className="heading-medium mb-6">The People Behind the Care</h2>
                            <p className="text-senior text-muted-foreground mb-8">
                                From our experienced leadership to our frontline caregivers and nursing staff, every member of our
                                team shares a deep commitment to compassionate, dignified elder care. We invest in our people so
                                they can give their very best to your loved ones.
                            </p>
                            <Link href="/team" className="btn-secondary inline-flex">
                                Meet Our Full Team
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { initials: 'MS', name: 'Maria Santos', role: 'Founder & Executive Director' },
                                { initials: 'DR', name: 'Dr. Robert Chen', role: 'Medical Director' },
                                { initials: 'AJ', name: 'Angela Johnson', role: 'Director of Care' },
                                { initials: '+', name: 'And many more', role: 'Caregivers & Nursing Staff' },
                            ].map(({ initials, name, role }) => (
                                <div key={name} className="card-warm text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                                        <span className="text-xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                                            {initials}
                                        </span>
                                    </div>
                                    <p className="font-semibold text-foreground">{name}</p>
                                    <p className="text-sm text-muted-foreground">{role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-warm py-24 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Come See for Yourself
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-soft-white/90">
                        We&apos;d love to welcome you and your family. Schedule a visit and experience firsthand the warmth,
                        comfort, and care that define life at St. Joseph Eldercare Residences.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] bg-soft-white px-10 py-4 text-xl font-semibold text-forest-green shadow-lg transition-all hover:bg-soft-white/90"
                        >
                            Schedule a Visit
                        </Link>
                        <Link
                            href="/services"
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] border-2 border-soft-white/50 bg-soft-white/15 px-10 py-4 text-xl font-semibold text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green"
                        >
                            Explore Our Services
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
