export const metadata = {
    title: 'admin',
    description: 'Generated by create next app',
};
// Trang layout của admin
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <div>123124{children}</div>
            </body>
        </html>
    );
}
