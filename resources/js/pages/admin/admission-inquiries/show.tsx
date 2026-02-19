import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem, AdmissionInquiry } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admission Inquiries', href: '/admin/admission-inquiries' },
    { title: 'View', href: '#' },
];

interface Props {
    inquiry: AdmissionInquiry;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className="mb-3 border-b border-border pb-2 text-base font-semibold text-foreground">{title}</h2>
            <div className="grid gap-3 sm:grid-cols-2">{children}</div>
        </div>
    );
}

function Field({ label, value }: { label: string; value?: string | boolean | string[] | null }) {
    if (value === null || value === undefined || value === '') return null;
    let display: string;
    if (typeof value === 'boolean') {
        display = value ? 'Yes' : 'No';
    } else if (Array.isArray(value)) {
        display = value.join(', ');
    } else {
        display = value;
    }
    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-medium text-foreground capitalize">{display}</p>
        </div>
    );
}

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function AdmissionInquiryShow({ inquiry }: Props) {
    function markRead() {
        router.patch(`/admin/admission-inquiries/${inquiry.id}/read`, {}, {
            onSuccess: () => toast.success('Marked as read.'),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admission Inquiry" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/admission-inquiries">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">
                            Inquiry from {inquiry.title} {inquiry.first_name} {inquiry.last_name}
                        </h1>
                        <p className="text-sm text-muted-foreground">Received {formatDate(inquiry.created_at)}</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                    <div className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6">
                        <Section title="Inquirer Information">
                            <Field label="Full Name" value={`${inquiry.title ?? ''} ${inquiry.first_name} ${inquiry.last_name}`.trim()} />
                            <Field label="Address" value={inquiry.address} />
                            <Field label="Phone" value={inquiry.phone} />
                            <Field label="Email" value={inquiry.email} />
                            <Field label="Preferred Contact" value={inquiry.preferred_contact} />
                        </Section>

                        <Section title="Prospective Resident">
                            <Field label="Resident Name" value={inquiry.resident_name} />
                            <Field label="Gender" value={inquiry.resident_gender} />
                            <Field label="Date of Birth" value={inquiry.resident_date_of_birth} />
                            <Field label="Relationship" value={inquiry.relationship} />
                            <Field label="Resident Address" value={inquiry.resident_address} />
                        </Section>

                        <Section title="Care Needs">
                            <Field label="Care Service" value={inquiry.care_service?.replace(/_/g, ' ')} />
                            <Field label="Medical Conditions" value={inquiry.medical_conditions} />
                            <Field label="Needs Walking Assistance" value={inquiry.needs_walking_assistance} />
                            <Field label="Wheelchair Bound" value={inquiry.is_wheelchair_bound} />
                            <Field label="Needs Bathing Assistance" value={inquiry.needs_bathing_assistance} />
                            <Field label="Has Feeding Tube" value={inquiry.has_feeding_tube} />
                            <Field label="Special Needs" value={inquiry.special_needs} />
                        </Section>

                        <Section title="Scheduling">
                            <Field label="Move-in Timeline" value={inquiry.move_in_timeline?.replace(/_/g, ' ')} />
                            <Field label="Preferred Tour Date" value={inquiry.preferred_tour_date} />
                            <Field label="Preferred Tour Time" value={inquiry.preferred_tour_time} />
                        </Section>

                        {inquiry.additional_info && (
                            <div>
                                <h2 className="mb-3 border-b border-border pb-2 text-base font-semibold text-foreground">Additional Information</h2>
                                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{inquiry.additional_info}</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-4">
                            <h2 className="mb-3 font-semibold text-foreground">Status</h2>
                            <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                                inquiry.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                inquiry.status === 'read' ? 'bg-gray-100 text-gray-600' :
                                'bg-green-100 text-green-700'
                            }`}>
                                {inquiry.status}
                            </span>

                            <div className="mt-4 space-y-2">
                                {inquiry.status === 'new' && (
                                    <Button className="w-full" onClick={markRead}>
                                        Mark as Read
                                    </Button>
                                )}
                                <Button variant="outline" className="w-full" asChild>
                                    <a href={`mailto:${inquiry.email}?subject=Re: Admission Inquiry for ${inquiry.resident_name}`}>
                                        Reply via Email
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {inquiry.how_found_us && (
                            <div className="rounded-xl border border-sidebar-border/70 bg-card p-4">
                                <h2 className="mb-2 font-semibold text-foreground">How They Found Us</h2>
                                <p className="text-sm text-muted-foreground capitalize">{inquiry.how_found_us.replace(/_/g, ' ')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
