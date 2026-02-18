import { type ReactNode } from 'react';
import Navigation from '@/components/eldercare/navigation';
import Footer from '@/components/eldercare/footer';
import MessengerButton from '@/components/eldercare/messenger-button';
import ScrollToTop from '@/components/eldercare/scroll-to-top';
import { Head } from '@inertiajs/react';

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export default function PublicLayout({
    children,
    title = 'St. Joseph Eldercare Residences',
    description = 'Compassionate senior care in a warm, family-oriented environment in Tagbilaran City.',
}: PublicLayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <div className="flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
            <MessengerButton />
            <ScrollToTop />
        </>
    );
}
