'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'antd';
import Link from 'next/link';
import slugify from 'slugify';
const { Meta } = Card;

function PageTest() {
    const [data, setData] = useState<any>([]);
    console.log(data);
    useEffect(() => {
        const fetchApi = async () => {
            const dataProduct = await axios.get('http://localhost:4000/api/v1/product/get');
            setData(dataProduct.data);
        };
        fetchApi();
    }, []);

    const handleSlugify = (value: string) => {
        if (!value) return '';
        const slug = slugify(value, { lower: true, locale: 'vi' });
        return slug;
    };
    return (
        <>
            {data.map((item: any) => (
                <Link href={`/test/${handleSlugify(item.name)}-${item._id}.html`}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title={item.name} description="www.instagram.com" />
                    </Card>
                </Link>
            ))}
        </>
    );
}

export default PageTest;
