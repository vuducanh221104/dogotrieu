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
import { GoogleOAuthProvider } from '@react-oauth/google';

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
    verification: {
        google: 'ljTC6Y_QfYGEtaJ4LjgsFnadypNeRXeSvbCnaGUefSQ',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    return (
        <html lang="vn" suppressHydrationWarning={true}>
            <head>
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-KM8GZRSR');
                    `}
                </Script>
                {/* Google Analytics */}
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-M4G2QSTXZL" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-M4G2QSTXZL');
                    `}
                </Script>
                <meta name="google-site-verification" content="ljTC6Y_QfYGEtaJ4LjgsFnadypNeRXeSvbCnaGUefSQ" />
            </head>
            <body className={poppinsFont.className} data-instant-intensity="viewport">
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-KM8GZRSR"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {/* <main> */}
                <ProviderRedux>
                    <GoogleOAuthProvider clientId={clientId || ''}>
                        <AnouBar />
                        <Header />
                        <ProgressBarUser>{children}</ProgressBarUser>
                        <ViewSpecification />
                        <FooterLogo />
                        <Footer />
                        <Chat />
                    </GoogleOAuthProvider>
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
