import { social } from '@/lib/contact';

export default function MessengerButton() {
    return (
        <a
            href={social.messenger}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on Messenger"
            className="group fixed bottom-6 right-6 z-50 flex h-15 w-15 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none"
            style={{
                background: 'linear-gradient(135deg, #0099ff 0%, #a033ff 60%, #ff5c87 100%)',
            }}
        >
            {/* Messenger icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-8 w-8"
                aria-hidden="true"
            >
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.377 5.504 3.538 7.24V22l3.333-1.803c.975.274 2.01.423 3.129.423 5.523 0 10-4.145 10-9.377C22 6.145 17.523 2 12 2zm1.006 12.617-2.545-2.683-4.97 2.683 5.476-5.96 2.607 2.683 4.908-2.683-5.476 5.96z" />
            </svg>

            {/* Tooltip */}
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                Chat with us
            </span>
        </a>
    );
}
