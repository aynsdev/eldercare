import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/eldecarelogo.png"
            alt="St. Joseph Eldercare Residences Logo"
            className="h-8 w-auto"
            {...props}
        />
    );
}
