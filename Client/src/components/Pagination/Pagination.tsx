import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const cx = classNames.bind(styles);

interface PaginationProps {
    totalPages: number;
    onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit') || '48'; // Default limit

    useEffect(() => {
        if (pageParam) {
            const parsedPage = parseInt(pageParam, 10);
            if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {
                setCurrentPage(parsedPage);
            } else {
                setCurrentPage(1);
            }
        } else {
            setCurrentPage(1);
        }
    }, [pageParam, totalPages]);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        if (onPageChange) onPageChange(page);
    };

    const generateHref = (page: number) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('limit', limitParam);
        queryParams.set('page', page.toString());
        return `?${queryParams.toString()}`;
    };

    const renderPageNumbers = () => {
        const pageNumbers: JSX.Element[] = [];
        const pagesToShow = 5; // Quantity Want to Show

        let startPage = Math.max(1, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1));
        let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
        // Đảm bảo trang hiện tại luôn được giữ ở giữa
        if (currentPage > totalPages - Math.floor(pagesToShow / 2)) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - pagesToShow + 1);
        }

        // Render first page if it's not the current page
        if (startPage !== 1) {
            pageNumbers.push(
                <span key={1} className={cx('page')}>
                    {currentPage !== 1 ? (
                        <Link href={generateHref(1)} onClick={() => handlePageClick(1)}>
                            1
                        </Link>
                    ) : (
                        <span>1</span>
                    )}
                </span>,
            );
            // Render ellipsis before startPage if needed
            if (startPage > 2) {
                pageNumbers.push(
                    <span key="ellipsis1" className={cx('deco')}>
                        ...
                    </span>,
                );
            }
        }

        // Render page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <span key={i} className={cx('page', { current: i === currentPage })}>
                    {currentPage !== i ? (
                        <Link href={generateHref(i)} onClick={() => handlePageClick(i)}>
                            {i}
                        </Link>
                    ) : (
                        <span>{i}</span>
                    )}
                </span>,
            );
        }

        // Render ellipsis after endPage if needed
        if (endPage < totalPages) {
            pageNumbers.push(
                <span key="ellipsis2" className={cx('deco')}>
                    ...
                </span>,
            );
            // Render last page if it's not the current page
            if (totalPages !== currentPage) {
                pageNumbers.push(
                    <span key={totalPages} className={cx('page')}>
                        {currentPage !== totalPages ? (
                            <Link href={generateHref(totalPages)} onClick={() => handlePageClick(totalPages)}>
                                {totalPages}
                            </Link>
                        ) : (
                            <span>{totalPages}</span>
                        )}
                    </span>,
                );
            }
        }

        return pageNumbers;
    };

    return (
        <div className={cx('pagination')}>
            <div className={cx('pagination-inner')}>
                <span className={cx('prev')}>
                    <Link
                        href={generateHref(Math.max(1, currentPage - 1))}
                        onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? cx('disabled') : ''}
                    >
                        ←
                    </Link>
                </span>
                {renderPageNumbers()}
                <span className={cx('next', { [cx('disabled')]: currentPage === totalPages })}>
                    {currentPage !== totalPages && (
                        <Link
                            href={generateHref(Math.min(totalPages, currentPage + 1))}
                            onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
                        >
                            →
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Pagination;
