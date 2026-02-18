import { useForm, usePage } from '@inertiajs/react';
import { Calendar, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect } from 'react';
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
            title="Contact Us — St. Joseph Eldercare Residences"
            description="Get in touch with St. Joseph Eldercare Residences to schedule a visit or ask about our services."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="heading-large mb-6">Get in Touch</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            We&apos;d love to meet you and show you how St. Joseph Eldercare Residences can provide the
                            perfect care solution for your loved one.
                        </p>
                    </div>
                </div>
            </section>

            {/* Flash Success */}
            {flash?.success && (
                <div className="bg-primary/10 border-l-4 border-primary px-6 py-4">
                    <div className="container mx-auto">
                        <p className="text-senior font-medium text-primary">{flash.success}</p>
                    </div>
                </div>
            )}

            {/* Contact Info & Form */}
            <section className="bg-soft-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Contact Information */}
                        <div>
                            <h2 className="heading-medium mb-8">Contact Information</h2>

                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="card-warm flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="heading-small mb-2">Phone</h3>
                                        <p className="text-senior text-muted-foreground mb-3">
                                            Call us anytime for immediate assistance
                                        </p>
                                        {[
                                            { label: '+63 915 371 4314', tel: '+639153714314' },
                                            { label: '+63 935 794 3648', tel: '+639357943648' },
                                            { label: '(038) 412-8270', tel: '03841282170' },
                                        ].map(({ label, tel }) => (
                                            <a
                                                key={tel}
                                                href={`tel:${tel}`}
                                                className="block text-lg font-semibold text-primary transition-colors hover:text-primary/80"
                                            >
                                                {label}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="card-warm flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="heading-small mb-2">Email</h3>
                                        <p className="text-senior text-muted-foreground mb-3">
                                            Send us a message anytime
                                        </p>
                                        <a
                                            href="mailto:stjosepheldecareresidences@gmail.com"
                                            className="text-lg font-medium text-primary transition-colors hover:text-primary/80"
                                        >
                                            stjosepheldecareresidences@gmail.com
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="card-warm flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="heading-small mb-2">Address</h3>
                                        <address className="text-senior not-italic text-muted-foreground">
                                            5th Floor of Holy Name Medical Center Inc
                                            <br />
                                            Tagbilaran City
                                        </address>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="card-warm flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <Clock className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="heading-small mb-2">Visiting Hours</h3>
                                        <div className="text-senior space-y-1 text-muted-foreground">
                                            <p>
                                                <span className="font-medium">Daily:</span> 8:00 AM – 8:00 PM
                                            </p>
                                            <p>
                                                <span className="font-medium">Tours:</span> By appointment
                                            </p>
                                            <p>
                                                <span className="font-medium">Emergency:</span> 24/7 available
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="heading-medium mb-8">Send Us a Message</h2>

                            <div className="card-warm">
                                <form onSubmit={handleSubmit} className="space-y-6 p-2">
                                    <div>
                                        <Label htmlFor="name" className="text-senior font-medium">
                                            Your Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-2 text-senior"
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="email" className="text-senior font-medium">
                                            Email Address <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-2 text-senior"
                                            placeholder="Enter your email address"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="phone" className="text-senior font-medium">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="mt-2 text-senior"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="preferred_contact" className="text-senior font-medium">
                                            Preferred Contact Method
                                        </Label>
                                        <select
                                            id="preferred_contact"
                                            value={data.preferred_contact}
                                            onChange={(e) => setData('preferred_contact', e.target.value)}
                                            className="text-senior mt-2 w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="">Select your preference</option>
                                            <option value="phone">Phone call</option>
                                            <option value="email">Email</option>
                                            <option value="tour">Schedule a tour</option>
                                            <option value="emergency">Urgent — please call immediately</option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label htmlFor="message" className="text-senior font-medium">
                                            Message <span className="text-destructive">*</span>
                                        </Label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={6}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="text-senior mt-2 w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Please tell us about your loved one's care needs, questions about our services, or anything else we can help you with..."
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                                        )}
                                    </div>

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
            <section className="bg-cream py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="heading-medium mb-6">Find Us</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-2xl">
                            We&apos;re conveniently located on the 5th Floor of Holy Name Medical Center Inc in
                            Tagbilaran City, with easy access to comprehensive medical care.
                        </p>
                    </div>

                    <div className="mx-auto max-w-4xl overflow-hidden rounded-xl shadow-lg">
                        <iframe
                            title="St. Joseph Eldercare Residences location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.1884285185615!2d123.85260!3d9.65600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ab6cc5f6e27e35%3A0x4d2bbf3e5c1e7c3e!2sHoly%20Name%20Medical%20Center!5e0!3m2!1sen!2sph!4v1700000000000"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>

            {/* Emergency */}
            <section className="bg-gradient-warm py-20 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                        Need Immediate Assistance?
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl">
                        If you have an urgent need or emergency situation, please don&apos;t hesitate to call us
                        directly. We&apos;re available 24/7 to help.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <a
                            href="tel:+639153714314"
                            className="flex items-center justify-center gap-2 rounded-lg bg-soft-white px-10 py-4 text-xl font-medium text-forest-green shadow-lg transition-all hover:bg-soft-white/90"
                        >
                            <Phone className="h-6 w-6" />
                            Call Now: +63 915 371 4314
                        </a>
                        <a
                            href="mailto:stjosepheldecareresidences@gmail.com"
                            className="flex items-center justify-center gap-2 rounded-lg border border-soft-white bg-soft-white/20 px-10 py-4 text-xl text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green"
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
