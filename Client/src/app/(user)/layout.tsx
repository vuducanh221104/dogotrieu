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
import ProgressBarUser from '@/components/ProgressBarUser';
import { Metadata, Viewport } from 'next/types';
import { poppins } from '@/assets/FontNext';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import FooterLogo from '@/components/FooterLogo';

const poppinsFont = poppins;

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#000000',
};

export const metadata: Metadata = {
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vn" suppressHydrationWarning={true}>
            <body className={poppinsFont.className} data-instant-intensity="viewport">
                {/* <main> */}
                <ProviderRedux>
                    <AnouBar />
                    <Header />
                    <ProgressBarUser>{children}</ProgressBarUser>
                    <ViewSpecification />
                    <FooterLogo />
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
                {/* </main> */}
            </body>
        </html>
    );
}
