import AdminLayout from '@/Layout/AdminLayout';
import '@/styles/AdminStyles/resposive.scss';
import '@/styles/AdminStyles/main.scss';
import './gobals.scss';
import { openSans } from '@/assets/FontNext';
import ProviderRedux from '@/redux/ProviderRedux';

export const metadata = {
    title: 'Admin',
    description: 'Admin Page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            <body className={openSans.className}>
                <ProviderRedux>
                    <AdminLayout children={children} />
                </ProviderRedux>
            </body>
        </html>
    );
}
