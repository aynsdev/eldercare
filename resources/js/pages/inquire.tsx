import { useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CheckCircle, ClipboardList, Heart, Send, User, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/public-layout';

interface PageProps {
    flash?: { success?: string };
}

const STEPS = [
    { number: 1, label: 'Your Information', icon: User },
    { number: 2, label: 'About the Resident', icon: Users },
    { number: 3, label: 'Care Needs', icon: Heart },
    { number: 4, label: 'Scheduling', icon: ClipboardList },
] as const;

const RELATIONSHIPS = [
    'Mother', 'Father', 'Parents', 'Brother', 'Sister',
    'Grandfather', 'Grandmother', 'Mother-In-Law', 'Father-In-Law',
    'Aunt', 'Uncle', 'Spouse', 'Friend', 'Close Relative',
];

const CARE_SERVICES = [
    'Assisted Living', 'Memory Care', 'Skilled Nursing',
    'Respite/Short Term Stay', 'Hospice', 'Rehabilitation Services',
];

const MEDICAL_CONDITIONS = [
    "Dementia/Alzheimer's", 'Diabetes', 'Mobility Limitations', 'Oxygen Therapy', 'Other',
];

const MOVE_IN_TIMELINES = [
    'Immediately', 'Within 1–2 weeks', 'Within a month', 'Just exploring options', 'Other',
];

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-1.5 text-base text-destructive">{message}</p>;
}

function RadioGroup({
    label,
    name,
    options,
    value,
    onChange,
    required,
    error,
}: {
    label: string;
    name: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
    required?: boolean;
    error?: string;
}) {
    return (
        <div>
            <Label className="text-senior mb-3 block font-semibold">
                {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <div className="flex flex-wrap gap-3">
                {options.map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onChange(opt)}
                        className={`rounded-lg border px-4 py-2 text-base font-medium transition-colors ${
                            value === opt
                                ? 'border-primary bg-primary text-white'
                                : 'border-border bg-background hover:border-primary/50 hover:bg-primary/5'
                        }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
            <FieldError message={error} />
        </div>
    );
}

function CheckboxGroup({
    label,
    name,
    options,
    values,
    onChange,
    required,
    error,
}: {
    label: string;
    name: string;
    options: string[];
    values: string[];
    onChange: (vals: string[]) => void;
    required?: boolean;
    error?: string;
}) {
    const toggle = (opt: string) => {
        onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]);
    };

    return (
        <div>
            <Label className="text-senior mb-3 block font-semibold">
                {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <div className="flex flex-wrap gap-3">
                {options.map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => toggle(opt)}
                        className={`rounded-lg border px-4 py-2 text-base font-medium transition-colors ${
                            values.includes(opt)
                                ? 'border-primary bg-primary text-white'
                                : 'border-border bg-background hover:border-primary/50 hover:bg-primary/5'
                        }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
            <FieldError message={error} />
        </div>
    );
}

export default function Inquire() {
    const { flash } = usePage<PageProps>().props;
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        // Step 1 — Inquirer
        title: '',
        first_name: '',
        last_name: '',
        address: '',
        phone: '',
        email: '',
        preferred_contact: '',

        // Step 2 — Resident
        resident_name: '',
        resident_gender: '',
        resident_address: '',
        resident_date_of_birth: '',
        relationship: '',

        // Step 3 — Care needs
        care_service: '',
        medical_conditions: [] as string[],
        special_needs: '',
        needs_walking_assistance: '',
        is_wheelchair_bound: '',
        needs_bathing_assistance: '',
        has_feeding_tube: '',

        // Step 4 — Scheduling
        move_in_timeline: '',
        preferred_tour_date: '',
        preferred_tour_time: '',
        how_found_us: '',
        additional_info: '',
    });

    const canAdvance = (): boolean => {
        if (step === 1) return data.first_name.trim() !== '' && data.last_name.trim() !== '';
        if (step === 2) return data.resident_name.trim() !== '' && data.relationship !== '';
        if (step === 3) return data.medical_conditions.length > 0;
        return true;
    };

    const next = () => {
        if (canAdvance()) setStep((s) => Math.min(s + 1, 4));
    };

    const back = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/inquire');
    };

    const inputClass = 'text-senior h-12';

    const selectClass =
        'text-senior h-12 w-full rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring';

    const textareaClass =
        'text-senior w-full rounded-md border border-input bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-ring';

    if (flash?.success) {
        return (
            <PublicLayout
                title="Inquiry Submitted"
                description="Thank you for submitting your admission inquiry to St. Joseph Eldercare Residences."
            >
                <section className="bg-gradient-subtle py-32">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl text-center">
                            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                                <CheckCircle className="h-12 w-12 text-primary" />
                            </div>
                            <h1 className="heading-large mb-6">Inquiry Received!</h1>
                            <p className="text-senior text-muted-foreground mb-10 leading-relaxed">{flash.success}</p>
                            <a href="/" className="btn-primary inline-flex justify-center">
                                Return to Home
                            </a>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout
            title="Admission Inquiry"
            description="Submit a detailed inquiry about care for your loved one at St. Joseph Eldercare Residences."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Admission Inquiry</p>
                        <h1 className="heading-large mb-6">Tell Us About Your Loved One</h1>
                        <p className="text-senior text-muted-foreground mx-auto max-w-2xl leading-relaxed">
                            Fill out this form so we can understand your loved one&apos;s care needs and get in touch
                            with the right information.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="bg-soft-white py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl">
                        {/* Step indicator */}
                        <div className="mb-12">
                            <div className="flex items-center justify-between">
                                {STEPS.map(({ number, label, icon: Icon }, index) => (
                                    <div key={number} className="flex flex-1 items-center">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                                                    step > number
                                                        ? 'border-primary bg-primary text-white'
                                                        : step === number
                                                          ? 'border-primary bg-primary/10 text-primary'
                                                          : 'border-border bg-background text-muted-foreground'
                                                }`}
                                            >
                                                {step > number ? (
                                                    <CheckCircle className="h-6 w-6" />
                                                ) : (
                                                    <Icon className="h-5 w-5" />
                                                )}
                                            </div>
                                            <span
                                                className={`mt-2 hidden text-center text-sm font-medium sm:block ${
                                                    step >= number ? 'text-primary' : 'text-muted-foreground'
                                                }`}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                        {index < STEPS.length - 1 && (
                                            <div
                                                className={`mx-2 mb-5 h-0.5 flex-1 transition-all ${
                                                    step > number ? 'bg-primary' : 'bg-border'
                                                }`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form card */}
                        <form onSubmit={handleSubmit}>
                            <div className="card-warm space-y-7">
                                {/* ── Step 1: Your Information ── */}
                                {step === 1 && (
                                    <>
                                        <div>
                                            <h2 className="heading-medium mb-1">Your Information</h2>
                                            <p className="text-senior text-muted-foreground">
                                                Tell us how to reach you.
                                            </p>
                                        </div>

                                        <RadioGroup
                                            label="Title"
                                            name="title"
                                            options={['Mr.', 'Mrs.', 'Ms.']}
                                            value={data.title}
                                            onChange={(val) => setData('title', val)}
                                            error={errors.title}
                                        />

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <Label htmlFor="first_name" className="text-senior mb-1.5 block font-semibold">
                                                    First Name <span className="text-destructive">*</span>
                                                </Label>
                                                <Input
                                                    id="first_name"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    className={inputClass}
                                                    placeholder="Juan"
                                                    required
                                                />
                                                <FieldError message={errors.first_name} />
                                            </div>
                                            <div>
                                                <Label htmlFor="last_name" className="text-senior mb-1.5 block font-semibold">
                                                    Last Name <span className="text-destructive">*</span>
                                                </Label>
                                                <Input
                                                    id="last_name"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    className={inputClass}
                                                    placeholder="dela Cruz"
                                                    required
                                                />
                                                <FieldError message={errors.last_name} />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="address" className="text-senior mb-1.5 block font-semibold">
                                                Address
                                            </Label>
                                            <Input
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                className={inputClass}
                                                placeholder="Street, City, Province"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <Label htmlFor="phone" className="text-senior mb-1.5 block font-semibold">
                                                    Phone Number
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    className={inputClass}
                                                    placeholder="+63 9XX XXX XXXX"
                                                />
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    Include area/country code
                                                </p>
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="text-senior mb-1.5 block font-semibold">
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className={inputClass}
                                                    placeholder="you@example.com"
                                                />
                                                <FieldError message={errors.email} />
                                            </div>
                                        </div>

                                        <RadioGroup
                                            label="Preferred Contact Method"
                                            name="preferred_contact"
                                            options={['Email', 'Phone', 'Text', 'Messenger', 'Other']}
                                            value={data.preferred_contact}
                                            onChange={(val) => setData('preferred_contact', val)}
                                            error={errors.preferred_contact}
                                        />
                                    </>
                                )}

                                {/* ── Step 2: About the Resident ── */}
                                {step === 2 && (
                                    <>
                                        <div>
                                            <h2 className="heading-medium mb-1">About the Resident</h2>
                                            <p className="text-senior text-muted-foreground">
                                                Tell us about the person who will be receiving care.
                                            </p>
                                        </div>

                                        <div>
                                            <Label htmlFor="resident_name" className="text-senior mb-1.5 block font-semibold">
                                                Full Name of Prospective Resident <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="resident_name"
                                                value={data.resident_name}
                                                onChange={(e) => setData('resident_name', e.target.value)}
                                                className={inputClass}
                                                placeholder="Full legal name"
                                                required
                                            />
                                            <FieldError message={errors.resident_name} />
                                        </div>

                                        <RadioGroup
                                            label="Gender"
                                            name="resident_gender"
                                            options={['Female', 'Male', 'Other']}
                                            value={data.resident_gender}
                                            onChange={(val) => setData('resident_gender', val)}
                                            error={errors.resident_gender}
                                        />

                                        <div>
                                            <Label htmlFor="resident_address" className="text-senior mb-1.5 block font-semibold">
                                                Resident&apos;s Current Address
                                            </Label>
                                            <Input
                                                id="resident_address"
                                                value={data.resident_address}
                                                onChange={(e) => setData('resident_address', e.target.value)}
                                                className={inputClass}
                                                placeholder="Street, City, Province"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="resident_date_of_birth" className="text-senior mb-1.5 block font-semibold">
                                                Date of Birth
                                            </Label>
                                            <Input
                                                id="resident_date_of_birth"
                                                type="date"
                                                value={data.resident_date_of_birth}
                                                onChange={(e) => setData('resident_date_of_birth', e.target.value)}
                                                className={inputClass}
                                            />
                                            <FieldError message={errors.resident_date_of_birth} />
                                        </div>

                                        <div>
                                            <Label htmlFor="relationship" className="text-senior mb-1.5 block font-semibold">
                                                I am inquiring on behalf of my <span className="text-destructive">*</span>
                                            </Label>
                                            <select
                                                id="relationship"
                                                value={data.relationship}
                                                onChange={(e) => setData('relationship', e.target.value)}
                                                className={selectClass}
                                                required
                                            >
                                                <option value="">Select relationship</option>
                                                {RELATIONSHIPS.map((r) => (
                                                    <option key={r} value={r}>{r}</option>
                                                ))}
                                            </select>
                                            <FieldError message={errors.relationship} />
                                        </div>
                                    </>
                                )}

                                {/* ── Step 3: Care Needs ── */}
                                {step === 3 && (
                                    <>
                                        <div>
                                            <h2 className="heading-medium mb-1">Care Needs</h2>
                                            <p className="text-senior text-muted-foreground">
                                                Help us understand the level of care required.
                                            </p>
                                        </div>

                                        <RadioGroup
                                            label="Care Service Needed"
                                            name="care_service"
                                            options={CARE_SERVICES}
                                            value={data.care_service}
                                            onChange={(val) => setData('care_service', val)}
                                            error={errors.care_service}
                                        />

                                        <CheckboxGroup
                                            label="Medical Conditions (check all that apply)"
                                            name="medical_conditions"
                                            options={MEDICAL_CONDITIONS}
                                            values={data.medical_conditions}
                                            onChange={(vals) => setData('medical_conditions', vals)}
                                            required
                                            error={errors.medical_conditions}
                                        />

                                        <div>
                                            <Label htmlFor="special_needs" className="text-senior mb-1.5 block font-semibold">
                                                Special Needs or Dietary Restrictions
                                            </Label>
                                            <textarea
                                                id="special_needs"
                                                rows={3}
                                                value={data.special_needs}
                                                onChange={(e) => setData('special_needs', e.target.value)}
                                                className={textareaClass}
                                                placeholder="Describe any special dietary needs, allergies, or other requirements…"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <RadioGroup
                                                label="Needs assistance when walking?"
                                                name="needs_walking_assistance"
                                                options={['yes', 'no']}
                                                value={data.needs_walking_assistance}
                                                onChange={(val) => setData('needs_walking_assistance', val)}
                                                error={errors.needs_walking_assistance}
                                            />
                                            <RadioGroup
                                                label="Wheelchair bound?"
                                                name="is_wheelchair_bound"
                                                options={['yes', 'no']}
                                                value={data.is_wheelchair_bound}
                                                onChange={(val) => setData('is_wheelchair_bound', val)}
                                                error={errors.is_wheelchair_bound}
                                            />
                                            <RadioGroup
                                                label="Needs assistance when bathing?"
                                                name="needs_bathing_assistance"
                                                options={['yes', 'no']}
                                                value={data.needs_bathing_assistance}
                                                onChange={(val) => setData('needs_bathing_assistance', val)}
                                                error={errors.needs_bathing_assistance}
                                            />
                                            <RadioGroup
                                                label="Has a feeding tube / PEG?"
                                                name="has_feeding_tube"
                                                options={['Yes', 'No', 'Sometimes']}
                                                value={data.has_feeding_tube}
                                                onChange={(val) => setData('has_feeding_tube', val)}
                                                error={errors.has_feeding_tube}
                                            />
                                        </div>
                                    </>
                                )}

                                {/* ── Step 4: Scheduling & Final Details ── */}
                                {step === 4 && (
                                    <>
                                        <div>
                                            <h2 className="heading-medium mb-1">Scheduling &amp; Final Details</h2>
                                            <p className="text-senior text-muted-foreground">
                                                Let us know your timeline and preferred visit schedule.
                                            </p>
                                        </div>

                                        <RadioGroup
                                            label="When are you looking to move in or begin services?"
                                            name="move_in_timeline"
                                            options={MOVE_IN_TIMELINES}
                                            value={data.move_in_timeline}
                                            onChange={(val) => setData('move_in_timeline', val)}
                                            error={errors.move_in_timeline}
                                        />

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <Label htmlFor="preferred_tour_date" className="text-senior mb-1.5 block font-semibold">
                                                    Preferred Tour / Appointment Date
                                                </Label>
                                                <Input
                                                    id="preferred_tour_date"
                                                    type="date"
                                                    value={data.preferred_tour_date}
                                                    onChange={(e) => setData('preferred_tour_date', e.target.value)}
                                                    className={inputClass}
                                                />
                                                <FieldError message={errors.preferred_tour_date} />
                                            </div>
                                            <div>
                                                <Label htmlFor="preferred_tour_time" className="text-senior mb-1.5 block font-semibold">
                                                    Preferred Tour / Appointment Time
                                                </Label>
                                                <Input
                                                    id="preferred_tour_time"
                                                    type="time"
                                                    value={data.preferred_tour_time}
                                                    onChange={(e) => setData('preferred_tour_time', e.target.value)}
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="how_found_us" className="text-senior mb-1.5 block font-semibold">
                                                How did you find out about us?
                                            </Label>
                                            <Input
                                                id="how_found_us"
                                                value={data.how_found_us}
                                                onChange={(e) => setData('how_found_us', e.target.value)}
                                                className={inputClass}
                                                placeholder="e.g. Google, referral, Facebook…"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="additional_info" className="text-senior mb-1.5 block font-semibold">
                                                Is there anything else you&apos;d like us to know?
                                            </Label>
                                            <textarea
                                                id="additional_info"
                                                rows={4}
                                                value={data.additional_info}
                                                onChange={(e) => setData('additional_info', e.target.value)}
                                                className={textareaClass}
                                                placeholder="Any additional details that would help us prepare for your inquiry…"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Navigation */}
                                <div className="flex items-center justify-between border-t border-border pt-6">
                                    {step > 1 ? (
                                        <Button type="button" variant="outline" size="lg" onClick={back} className="text-lg">
                                            <ArrowLeft className="mr-2 h-5 w-5" />
                                            Back
                                        </Button>
                                    ) : (
                                        <div />
                                    )}

                                    {step < 4 ? (
                                        <Button
                                            type="button"
                                            size="lg"
                                            onClick={next}
                                            disabled={!canAdvance()}
                                            className="btn-primary text-lg"
                                        >
                                            Next
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="btn-primary text-lg"
                                            disabled={processing}
                                        >
                                            <Send className="mr-2 h-5 w-5" />
                                            {processing ? 'Submitting…' : 'Submit Inquiry'}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>

                        <p className="mt-6 text-center text-base text-muted-foreground">
                            Just want to ask a quick question?{' '}
                            <a href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
                                Use the contact form instead.
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
