import { Award, Clock, Heart, Users } from 'lucide-react';
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
            title="About Us — St. Joseph Eldercare Residences"
            description="Learn about our mission, values, and the compassionate team behind St. Joseph Eldercare Residences."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="heading-large mb-6">Our Story of Compassionate Care</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            We&apos;re an eldercare residence that offers housing designed to support older adults who
                            need assistance with daily activities or companionship. We offer a caring, safe, comfortable
                            environment where our clients can live semi-independently while receiving assistance with
                            personal care, taking medications, meal preparation and many more.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-soft-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="heading-medium mb-6">Our Mission &amp; Vision</h2>
                            <div className="text-senior space-y-6 text-muted-foreground">
                                <div>
                                    <h3 className="heading-small mb-3 text-primary">Mission</h3>
                                    <p>
                                        To provide high-quality, compassionate care rooted in Christian values, ensuring
                                        dignity and enhancing the quality of life for elderly residents.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="heading-small mb-3 text-primary">Vision</h3>
                                    <p>
                                        To be a leading provider of comprehensive elder care, fostering a community where
                                        residents live with dignity and receive innovative, compassionate care that meets
                                        their unique needs.
                                    </p>
                                </div>
                                <p>
                                    Named after Saint Joseph, the patron saint of families and workers, our residence
                                    embodies the same virtues of protection, care, and unwavering devotion. We believe
                                    that every senior deserves to live their golden years with respect, comfort, and joy.
                                </p>
                            </div>
                        </div>

                        <div>
                            <img
                                src="/images/caregiver-assistance.jpg"
                                alt="Professional caregiver providing compassionate care"
                                className="w-full rounded-xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-cream py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <h2 className="heading-large mb-6">Our Core Values</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            These principles guide everything we do and shape the caring environment that makes St.
                            Joseph Eldercare Residences feel like home.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {coreValues.map(({ icon: Icon, title, text }) => (
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

            {/* Leadership */}
            <section className="bg-soft-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <h2 className="heading-large mb-6">Our Leadership Team</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl">
                            Meet the dedicated professionals who ensure every day at St. Joseph Eldercare Residences is
                            filled with exceptional care and genuine warmth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                initials: 'MS',
                                name: 'Maria Santos',
                                role: 'Founder & Executive Director',
                                bio: 'With over 30 years in senior care, Maria\u2019s vision continues to guide our mission of providing dignified, family-centered care.',
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
                        ].map(({ initials, name, role, bio }) => (
                            <div key={name} className="card-warm text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                                    <span className="text-2xl font-bold text-primary">{initials}</span>
                                </div>
                                <h3 className="heading-small mb-2">{name}</h3>
                                <p className="mb-4 font-medium text-warm-gold">{role}</p>
                                <p className="text-senior text-muted-foreground">{bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Licensed & Certified */}
            <section className="bg-gradient-warm py-20 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                        Licensed &amp; Certified
                    </h2>
                    <p className="mx-auto mb-12 max-w-3xl text-xl">
                        We maintain the highest standards of care through continuous education, state licensing, and
                        industry certifications.
                    </p>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            {
                                title: 'DOH Licensed',
                                detail: 'Department of Health Licensed Senior Care Facility',
                            },
                            {
                                title: 'Accredited',
                                detail: 'Accredited by Philippine Commission on Accreditation of Healthcare Organizations',
                            },
                            {
                                title: 'Certified',
                                detail: 'National Association of Residential Care Facilities Certified',
                            },
                        ].map(({ title, detail }) => (
                            <div key={title} className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-soft-white/20">
                                    <Award className="h-8 w-8 text-warm-gold" />
                                </div>
                                <h3 className="heading-small mb-2">{title}</h3>
                                <p className="text-senior">{detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
