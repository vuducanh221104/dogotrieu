import { Metadata } from 'next';
import PageSearchWrapper from '@/appLayout/Search';
import routes from '@/config/routes';
type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { q } = searchParams;

    const title = `${q} - DOGOTRIEU.COM`;
    const description =
        'Khám phá những món đồ nội thất cổ xưa, mới, tự nhiên và đậm chất bản xứ cho không gian sống của bạn. Tham khảo bàn, ghế, sofa, tủ, kệ, đèn ,phụ kiện, đồ trang trí và nội thất bằng gỗ.';
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/q_auto:best/v1741769745/dogotrieu_image_bjb0ga.jpg';
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/search?${q}`,
            images: [
                {
                    url: image,
                    alt: 'DOGOTRIEU.COM',
                },
            ],
        },
        twitter: {
            title: title,
            description: description,
            card: 'summary_large_image',
            site: `${routes.domain.nameCamel}$`,
            images: [
                {
                    url: image,
                    alt: 'DOGOTRIEU.COM',
                },
            ],
        },
    };
}

function PageSearch() {
    return (
        <>
            <PageSearchWrapper />
        </>
    );
}
export default PageSearch;
