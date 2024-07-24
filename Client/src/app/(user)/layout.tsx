import { Poppins } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/GobalStyles.scss';
import '@/styles/SwiperCustom.scss';

import Footer from '@/Layout/components/Footer';
import AnouBar from '@/Layout/components/AnouBar';
import Chat from '@/Layout/components/Chat';
import Header from '@/Layout/components/Header';
import ProviderRedux from '@/redux/ProviderRedux';
import Script from 'next/script';
import { jsonLdOrganization, jsonLdStore, jsonWebsite } from '@/services/menuData/jsonLd';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    style: ['italic', 'normal'],
});

export const metadata = {
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <meta
                content="width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=5"
                name="viewport"
            />
            <body className={poppins.className}>
                <main>
                    <ProviderRedux>
                        <AnouBar />
                        <Header />
                        {children}

                        <Footer />
                        <Chat />
                    </ProviderRedux>
                    <Script
                        type="application/jsonLdWebsite"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonWebsite) }}
                        strategy="lazyOnload"
                    />
                    <Script
                        type="application/jsonLdStore"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStore) }}
                        strategy="lazyOnload"
                    />
                    <Script
                        type="application/jsonLdOrganization"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
                        strategy="lazyOnload"
                    />
                </main>
            </body>
        </html>
    );
}
