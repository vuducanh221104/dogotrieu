import AdminLayout from '@/Layout/AdminLayout';
import '@/styles/AdminStyles/resposive.scss';
import '@/styles/AdminStyles/main.scss';
import '@/styles/AdminStyles/mainAdmin.scss';
import './gobals.scss';
export const metadata = {
    title: 'Admin',
    description: 'Admin Page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            <body>
                <AdminLayout children={children} />
            </body>
        </html>
    );
}
