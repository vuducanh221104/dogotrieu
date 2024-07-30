'use client';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PaginationNews.module.scss';
import { ChervonRight } from '@/components/Icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const cx = classNames.bind(styles);

interface PaginationNewsProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationNews: React.FC<PaginationNewsProps> = ({ totalPages, currentPage, onPageChange }) => {
    const searchParams = useSearchParams();
    const limitParam = '5'; // Default limit

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const generateHref = (page: number) => {
        const queryParams = new URLSearchParams(window.location.search);
        // queryParams.set('limit', limitParam);
        queryParams.set('page', page.toString());
        return `?${queryParams.toString()}`;
    };

    const renderPageNumbers = () => {
        const pageNumbers: JSX.Element[] = [];
        const pagesToShow = 5; // Number of pages to show in pagination

        let startPage = Math.max(1, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1));
        let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        if (currentPage > totalPages - Math.floor(pagesToShow / 2)) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - pagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Link
                    key={i}
                    href={generateHref(i)}
                    className={cx('news-pagination-nav-item', { active: i === currentPage })}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </Link>,
            );
        }

        return pageNumbers;
    };

    return (
        <div className={cx('news-pagination')}>
            <div className={cx('news-pagination-inner')}>
                <div className={cx('news-pagination-nav')}>{renderPageNumbers()}</div>
                {currentPage < totalPages && (
                    <Link
                        href={generateHref(currentPage + 1)}
                        className={cx('news-pagination-next')}
                        onClick={() => handlePageClick(currentPage + 1)}
                    >
                        Next
                        <ChervonRight className={cx('news-pagination-next-icon')} />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PaginationNews;
