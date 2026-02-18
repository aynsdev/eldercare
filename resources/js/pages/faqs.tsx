import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

const faqCategories = [
    {
        title: 'Getting Started',
        questions: [
            {
                question: 'How do I know if St. Joseph Eldercare Residences is right for my loved one?',
                answer: "We encourage you to schedule a tour to see our residence and meet our staff. During your visit, we'll discuss your loved one's specific needs and show you how our services can help them maintain their independence while receiving appropriate care. Our care team will also conduct a comprehensive assessment to ensure we can meet all their needs.",
            },
            {
                question: 'What is the admission process?',
                answer: "Our admission process begins with a tour and consultation where we'll assess your loved one's care needs. We'll review medical history, current medications, and discuss any special requirements. Once we determine we can provide appropriate care, we'll complete the necessary paperwork and coordinate a move-in date that works for your family.",
            },
            {
                question: 'Is there a waiting list?',
                answer: "Availability varies depending on the level of care needed and room preference. We recommend contacting us as soon as you begin considering senior care options. We'll discuss current availability and can place your loved one on our priority list if needed.",
            },
        ],
    },
    {
        title: 'Care & Services',
        questions: [
            {
                question: 'What types of care do you provide?',
                answer: "We provide comprehensive personal care services including assistance with bathing, dressing, medication management, meal preparation, and mobility support. Our services are personalized to each resident's needs and can be adjusted as those needs change over time.",
            },
            {
                question: 'Do you provide medical care?',
                answer: "While we have licensed nurses on staff for health monitoring and medication administration, we coordinate with your loved one's existing physicians and specialists for medical care. We can help arrange transportation to appointments and communicate with healthcare providers about any changes in condition.",
            },
            {
                question: 'Can residents bring their own furniture and belongings?',
                answer: "Yes! We encourage residents to bring personal belongings, photos, and some furniture to make their room feel like home. Our rooms are spacious enough to accommodate personal furniture, and we'll work with you to arrange the space safely and comfortably.",
            },
            {
                question: "What if my loved one's care needs change?",
                answer: "We conduct regular care assessments and adjust services as needed. Our goal is to age in place with us, so we'll modify the care plan and services to meet changing needs. If we ever reach a point where we cannot safely provide the level of care needed, we'll work with your family to find an appropriate next step.",
            },
        ],
    },
    {
        title: 'Daily Life & Activities',
        questions: [
            {
                question: 'What does a typical day look like?',
                answer: "Each day includes three nutritious meals in our dining room, scheduled activities like exercise classes or games, and plenty of time for personal interests and rest. Residents can choose to participate in activities or spend quiet time in their rooms or common areas. We maintain a structured but flexible schedule that allows for individual preferences.",
            },
            {
                question: 'What activities do you offer?',
                answer: 'We offer a variety of physical, social, and mental stimulation activities including chair exercises, music therapy, game nights, arts and crafts, reading groups, and regular outings to restaurants or cultural events. Our activity calendar changes monthly and we welcome suggestions from residents and families.',
            },
            {
                question: 'Can family and friends visit anytime?',
                answer: 'Yes, family and friends are welcome to visit during our generous visiting hours from 8 AM to 8 PM daily. We encourage families to join us for meals (with advance notice) and special events. Overnight guests can be accommodated with prior arrangement.',
            },
        ],
    },
    {
        title: 'Financial Questions',
        questions: [
            {
                question: 'What payment methods do you accept?',
                answer: "We accept private pay, long-term care insurance, and Veterans benefits. We also offer flexible payment plans and can help you understand what financial assistance programs might be available. Our billing is transparent with no hidden fees.",
            },
            {
                question: 'Are there any additional fees?',
                answer: "Our monthly rate includes room, board, care services, activities, and utilities. Additional services like physical therapy, beauty services, or private companions are available at additional cost. We'll always discuss any additional services and their costs before providing them.",
            },
            {
                question: 'Do you help with insurance or benefit applications?',
                answer: "Yes, our administrative team can help you understand what benefits might be available and assist with applications for Veterans benefits or other programs. We'll also work with long-term care insurance providers to verify coverage and handle billing.",
            },
        ],
    },
    {
        title: 'Health & Safety',
        questions: [
            {
                question: 'How do you ensure resident safety?',
                answer: 'We maintain 24/7 staffing with trained caregivers, have emergency call systems in every room, conduct regular safety assessments, and maintain secure but welcoming common areas. Our staff is trained in emergency procedures and we have established relationships with local emergency services.',
            },
            {
                question: 'What happens in a medical emergency?',
                answer: "We have trained staff available 24/7 who can assess the situation and contact emergency services if needed. We'll immediately notify family members and ensure that medical personnel have access to your loved one's medical information and emergency contacts.",
            },
            {
                question: 'How do you handle medication management?',
                answer: "Our licensed nurses manage all medications according to physician orders. We maintain secure medication storage, provide administration at prescribed times, and monitor for side effects. We coordinate with pharmacies and physicians for medication changes and can help with prescription management.",
            },
        ],
    },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card-warm border-0">
            <button
                className="text-senior flex w-full items-start justify-between gap-4 px-6 py-4 text-left font-medium"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                {isOpen ? (
                    <ChevronUp className="mt-1 h-5 w-5 shrink-0 text-primary" />
                ) : (
                    <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-primary" />
                )}
            </button>
            {isOpen && (
                <div className="text-senior text-muted-foreground px-6 pb-6 leading-relaxed">{answer}</div>
            )}
        </div>
    );
}

export default function FAQs() {
    return (
        <PublicLayout
            title="Frequently Asked Questions — St. Joseph Eldercare Residences"
            description="Answers to common questions about senior care, admission, activities, and costs."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="heading-large mb-6">Frequently Asked Questions</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            We understand that choosing senior care for your loved one brings many questions. Here are
                            answers to the questions families most commonly ask us.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Sections */}
            <section className="bg-soft-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        {faqCategories.map((category) => (
                            <div key={category.title} className="mb-12">
                                <h2 className="heading-medium mb-8 text-center">{category.title}</h2>
                                <div className="space-y-4">
                                    {category.questions.map((faq) => (
                                        <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="bg-cream py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="heading-large mb-6">Still Have Questions?</h2>
                        <p className="mb-8 text-xl text-muted-foreground">
                            Our experienced care team is here to provide personalized answers and guidance for your
                            family&apos;s unique situation.
                        </p>

                        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="text-center">
                                <h3 className="heading-small mb-4">Call Us Directly</h3>
                                <p className="text-senior text-muted-foreground mb-4">
                                    Speak with our care coordinators who can answer specific questions about services,
                                    availability, and costs.
                                </p>
                                <a href="tel:+639153714314" className="btn-primary justify-center text-xl">
                                    Call +63 915 371 4314
                                </a>
                            </div>

                            <div className="text-center">
                                <h3 className="heading-small mb-4">Schedule a Tour</h3>
                                <p className="text-senior text-muted-foreground mb-4">
                                    See our residence firsthand and meet our staff. Tours include a comprehensive
                                    discussion of your loved one&apos;s needs.
                                </p>
                                <Link href="/contact" className="btn-secondary justify-center text-xl">
                                    Schedule Visit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-warm py-20 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                        We&apos;re Here to Help
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl">
                        Making the decision about senior care is important and personal. We&apos;re committed to
                        providing all the information you need to make the best choice for your family.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 rounded-lg bg-soft-white px-10 py-4 text-xl font-medium text-forest-green transition-all hover:bg-soft-white/90"
                        >
                            Get in Touch
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center justify-center gap-2 rounded-lg border border-soft-white bg-soft-white/20 px-10 py-4 text-xl text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green"
                        >
                            Learn About Us
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
