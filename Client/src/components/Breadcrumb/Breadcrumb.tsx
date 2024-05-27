'use client';
import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from 'react-bootstrap';
import { ChervonRight } from '../Icons';

const cx = classNames.bind(styles);

const slugMapping: any = {
    'ban-ghe': 'Tất Cả Bàn & Ghế',
    'ban-an': 'Bàn Ăn',
    'ban-trang-diem': 'Bàn Trang Điểm',
    'ban-tra': 'Bàn Trà',
    'ban-ghe-lam-viec': 'Bàn & Ghế Làm Việc',
    'ghe-don': 'Ghế Đơn',
    'ban-ghe-truong-ky': 'Bàn & Ghế Trường Kỷ Cổ',
    'ban-ghe-sofa': 'Bàn & Ghế Sofa',
    tu: 'Tất Cả Tủ',
    'tu-tho': 'Tủ Thờ',
    'tu-bay-do': 'Tủ Bày Đồ',
    'tu-chua': 'Tủ Chùa',
    'tu-quan-ao': 'Tủ Quần Áo',
    'tu-sach': 'Tủ Sách',
    'tu-loai-khac': 'Tủ Loại Khác',
    ke: 'Tất Cả Kệ',
    'ke-tivi': 'Kệ Tivi',
    'ke-trang-tri': 'Kệ Trang Trí',
    'ke-loai-khac': 'Kệ Loại Khác',
    giuong: 'Tất Cả Giường',
    'giuong-cu-xua': 'Giường Cũ Xưa',
    'giuong-hien-dai': 'Giường Hiện Đại',
    'tuong-&-tranh': 'Tất Cả Tượng & Tranh',
    'tuong-go': 'Tượng Gỗ',
    'tuong-su': 'Tượng Sứ',
    'tuong-dong': 'Tượng Đồng',
    'tuong-da': 'Tượng Đá',
    'tranh-go': 'Tranh Gỗ',
    'tranh-son-dau': 'Tranh Sơn Dầu',
    'tranh-da': 'Tranh Đá',
    'trang-tri-&-khac': 'Tất Cả Trang Trí & Khác',
    'do-gom': 'Đồ Gốm',
    ruong: 'Rương',
    'den-tran': 'Đèn Trần',
};

const convertSlugToText = (slug: any) => {
    if (slugMapping[slug]) {
        return slugMapping[slug];
    }
    return slug
        .split('-')
        .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const Breadcrumb = () => {
    const router = usePathname();
    const value = router.toLowerCase().split('/');
    const routesFilter = value.filter((item) => item !== 'products' && item !== 'category' && item !== '');
    const limitedText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const breadcrumbItems = routesFilter.map((item, index) => {
        const link = '/' + value.slice(1, index + 3).join('/');

        return {
            name: convertSlugToText(item),
            link: index === routesFilter.length - 1 ? null : link,
        };
    });

    return (
        <Container className={'container-flush'}>
            <div className={cx('page-sub-header')}>
                <nav className={cx('breadcrumb')}>
                    <ol className={cx('breadcrumb-list')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link href="/" className={cx('breadcrumb-link')}>
                                Home
                            </Link>
                            <ChervonRight className={cx('breadcrumb-icon')} />
                        </li>
                        {breadcrumbItems.map((item, index) => (
                            <li key={index} className={cx('breadcrumb-item')}>
                                {item.link ? (
                                    <Link href={item.link} className={cx('breadcrumb-link')}>
                                        {limitedText(item.name, 35)}
                                    </Link>
                                ) : (
                                    <span className={cx('breadcrumb-link')}>{limitedText(item.name, 35)}</span>
                                )}
                                {index !== breadcrumbItems.length - 1 && (
                                    <ChervonRight className={cx('breadcrumb-icon')} />
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </Container>
    );
};

export default Breadcrumb;
