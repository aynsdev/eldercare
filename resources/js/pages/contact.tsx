import { useForm, usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, CheckCircle, Clock, ClipboardList, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect } from 'react';
import { address, email, phones, primaryPhone, visitingHours } from '@/lib/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/public-layout';

interface PageProps {
    flash?: {
        success?: string;
    };
}

export default function Contact() {
    const { flash } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        preferred_contact: '',
        message: '',
    });

    useEffect(() => {
        if (flash?.success) {
            reset();
        }
    }, [flash?.success]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <PublicLayout
            title="Contact Us"
            description="Get in touch with St. Joseph Eldercare Residences to schedule a visit or ask about our services."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Reach Out</p>
                        <h1 className="heading-large mb-6">Get in Touch</h1>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl leading-relaxed">
                            We&apos;d love to meet you and show you how St. Joseph Eldercare Residences can provide the
                            perfect care solution for your loved one.
                        </p>
                    </div>
                </div>
            </section>

            {/* Flash Success */}
            {flash?.success && (
                <div className="border-l-4 border-primary bg-primary/10 px-6 py-5">
                    <div className="container mx-auto flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 shrink-0 text-primary" />
                        <p className="text-senior font-medium text-primary">{flash.success}</p>
                    </div>
                </div>
            )}

            {/* Admission Inquiry Banner */}
            <div className="border-b border-primary/20 bg-primary/5 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                                <ClipboardList className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Inquiring about admission for a loved one?</p>
                                <p className="text-senior text-muted-foreground">
                                    Use our detailed inquiry form so we can prepare the right care plan.
                                </p>
                            </div>
                        </div>
                        <a
                            href="/inquire"
                            className="btn-primary shrink-0 justify-center"
                        >
                            Start Admission Inquiry
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Contact Info & Form */}
            <section className="bg-soft-white py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Contact Information */}
                        <div>
                            <h2 className="heading-medium mb-8">Contact Information</h2>

                            <div className="space-y-5">
                                {/* Phone */}
                                <div className="card-warm flex items-start gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/8">
                                        <Phone className="h-7 w-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="heading-small mb-2">Phone</h3>
                                        <p className="text-senior text-muted-foreground mb-3">
                                            Call us anytime for immediate assistance
                                        </p>
                                        {phones.map(({ label, tel }) => (
                                            <a
                                                key={tel}
                                                href={`tel:${tel}`}
                                                className="block text-xl font-semibold text-primary transition-colors hover:text-primary/80"
                                            >
                                                {label}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="card-warm flex items-start gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/8">
                                        <Mail className="h-7 w-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="heading-small mb-2">Email</h3>
                                        <p className="text-senior text-muted-foreground mb-3">
                                            Send us a message anytime
                                        </p>
                                        <a
                                            href={`mailto:${email}`}
                                            className="text-base font-medium text-primary transition-colors hover:text-primary/80"
                                        >
                                            {email}
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="card-warm flex items-start gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/8">
                                        <MapPin className="h-7 w-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="heading-small mb-2">Address</h3>
                                        <address className="text-senior not-italic text-muted-foreground">
                                            {address.line1}
                                            <br />
                                            {address.line2}
                                        </address>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="card-warm flex items-start gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/8">
                                        <Clock className="h-7 w-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="heading-small mb-2">Visiting Hours</h3>
                                        <div className="text-senior space-y-2 text-muted-foreground">
                                            <p><span className="font-semibold text-foreground">Daily:</span> {visitingHours.daily}</p>
                                            <p><span className="font-semibold text-foreground">Tours:</span> {visitingHours.tours}</p>
                                            <p><span className="font-semibold text-foreground">Emergency:</span> {visitingHours.emergency}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="heading-medium mb-8">Send Us a Message</h2>

                            <div className="card-warm">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="name" className="text-senior mb-1.5 block font-semibold">
                                            Your Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="text-senior h-12"
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && (
                                            <p className="mt-1.5 text-base text-destructive">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="email" className="text-senior mb-1.5 block font-semibold">
                                            Email Address <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="text-senior h-12"
                                            placeholder="Enter your email address"
                                        />
                                        {errors.email && (
                                            <p className="mt-1.5 text-base text-destructive">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="phone" className="text-senior mb-1.5 block font-semibold">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="text-senior h-12"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="preferred_contact" className="text-senior mb-1.5 block font-semibold">
                                            Preferred Contact Method
                                        </Label>
                                        <select
                                            id="preferred_contact"
                                            value={data.preferred_contact}
                                            onChange={(e) => setData('preferred_contact', e.target.value)}
                                            className="text-senior h-12 w-full rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                                        >
                                            <option value="">Select your preference</option>
                                            <option value="phone">Phone call</option>
                                            <option value="email">Email</option>
                                            <option value="tour">Schedule a tour</option>
                                            <option value="emergency">Urgent — please call immediately</option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label htmlFor="message" className="text-senior mb-1.5 block font-semibold">
                                            Message <span className="text-destructive">*</span>
                                        </Label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="text-senior w-full rounded-md border border-input bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                                            placeholder="Please tell us about your loved one's care needs, questions about our services, or anything else we can help you with..."
                                        />
                                        {errors.message && (
                                            <p className="mt-1.5 text-base text-destructive">{errors.message}</p>
                                        )}
                                    </div>

                                    {errors.throttle && (
                                        <p className="text-base text-destructive">{errors.throttle}</p>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="btn-primary w-full justify-center text-xl"
                                        disabled={processing}
                                    >
                                        <Send className="mr-2 h-5 w-5" />
                                        {processing ? 'Sending…' : 'Send Message'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="bg-cream py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Location</p>
                        <h2 className="heading-medium mb-6">Find Us</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-2xl">
                            We&apos;re conveniently located on the 5th Floor of Holy Name Medical Center Inc in
                            Tagbilaran City, with easy access to comprehensive medical care.
                        </p>
                    </div>

                    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl">
                        <iframe
                            title="St. Joseph Eldercare Residences location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d830.2!2d123.8678294!3d9.6511395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa4d001a6a8157%3A0xd916072ed30bc7d1!2sSt.%20Joseph%20ELDECARE%20Residences!5e0!3m2!1sen!2sph!4v1700000000000"
                            width="100%"
                            height="420"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>

            {/* Emergency CTA */}
            <section className="bg-gradient-warm py-24 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Need Immediate Assistance?
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-soft-white/90">
                        If you have an urgent need or emergency situation, please don&apos;t hesitate to call us
                        directly. We&apos;re available 24/7 to help.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <a
                            href={`tel:${primaryPhone.tel}`}
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] bg-soft-white px-10 py-4 text-xl font-semibold text-forest-green shadow-lg transition-all hover:bg-soft-white/90"
                        >
                            <Phone className="h-6 w-6" />
                            Call Now: {primaryPhone.tel}
                        </a>
                        <a
                            href={`mailto:${email}`}
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] border-2 border-soft-white/50 bg-soft-white/15 px-10 py-4 text-xl font-semibold text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green"
                        >
                            <Calendar className="h-6 w-6" />
                            Email Us
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
