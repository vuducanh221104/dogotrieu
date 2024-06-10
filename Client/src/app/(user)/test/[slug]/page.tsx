'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'antd';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const { Meta } = Card;
function SlugTest() {
    const [data, setData] = useState<any>([]);
    const { slug }: any = useParams();
    console.log(data);

    useEffect(() => {
        const handleSplitSlug = () => {
            const temp = slug.split('.html') ?? [];
            const temp2 = temp[0]?.split('-');
            const id = temp2[temp2.length - 1];
            return id;
        };

        const fetchData = async () => {
            try {
                const id = handleSplitSlug();
                const response = await axios.get(`http://localhost:4000/api/v1/product/detail/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [slug]); // Thêm slug vào dependency array để useEffect chạy lại khi slug thay đổi

    return <></>;
}

export default SlugTest;
