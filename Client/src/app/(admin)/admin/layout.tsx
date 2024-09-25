import AdminLayout from '@/Layout/AdminLayout';
import '@/styles/AdminStyles/resposive.scss';
import '@/styles/AdminStyles/main.scss';
import './gobals.scss';
import { openSans } from '@/assets/FontNext';
import ProviderRedux from '@/redux/ProviderRedux';
import { Viewport } from 'next/types';

export const metadata = {
    title: 'Admin',
    description: 'Admin Page',
};
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className={openSans.className}>
                <ProviderRedux>
                    <AdminLayout children={children} />
                </ProviderRedux>
            </body>
        </html>
    );
}
