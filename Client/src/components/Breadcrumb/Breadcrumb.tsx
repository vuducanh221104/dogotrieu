'use client';
import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from 'react-bootstrap';
import { ChervonRight } from '../Icons';
import { userBreadCumbs } from '@/services/menuData/breadCrumbData';

interface IProps {
    nameSlug?: string;
}

const cx = classNames.bind(styles);

const slugMapping: any = userBreadCumbs;

const convertSlugToText = (slug: string) => {
    if (slugMapping[slug]) {
        return slugMapping[slug];
    }
    return slug
        .split('-')
        .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const Breadcrumb = ({ nameSlug }: IProps) => {
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
                        {nameSlug ? (
                            <li className={cx('breadcrumb-item')}>
                                <span className={cx('breadcrumb-link')}>{nameSlug}</span>
                            </li>
                        ) : (
                            breadcrumbItems.map((item, index) => (
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
                            ))
                        )}
                    </ol>
                </nav>
            </div>
        </Container>
    );
};

export default Breadcrumb;
