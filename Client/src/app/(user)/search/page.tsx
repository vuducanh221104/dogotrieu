'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from '@/styles/Search.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import { Container } from 'react-bootstrap';
import { dataProduct } from '@/services/mockApi';
import useWindowWidth from '@/hooks/useWindowWidth';
import Pagination from '@/components/Pagination';
import CardProduct from '@/components/CardProduct';
import { useEffect, useState } from 'react';
import NotFound from '@/components/NotFound';
import { archivo } from '@/assets/FontNext';
const cx = classNames.bind(styles);

function PageSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [valueSearch, setValueSearch] = useState<string | null>(null);
    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const limit = event.target.value;
        const url = new URL(window.location.href);
        url.searchParams.set('limit', limit);
        url.searchParams.set('page', '1');
        window.history.pushState({}, '', url);
        router.replace(url.toString());
    };
    useEffect(() => {
        const getQandType = () => {
            const Q = searchParams.get('q');
            setValueSearch(Q);
        };
        getQandType();
    }, []);
    const windowWidth = useWindowWidth();
    const totalPages = 73;
    const data = dataProduct;
    if (!data || data.length === 0) {
        return (
            <NotFound
                title="Search"
                description={`No results could be found for ${valueSearch}`}
                placeholderText="Search..."
                linkText="or click here to go back home"
            />
        );
    } else {
        return (
            <>
                <Breadcrumb />
                <Container>
                    <div className={cx('category-wrapper')}>
                        <div className={cx('card')}>
                            <div className={cx('card-header')}>
                                <div className={cx('category-header')}>
                                    <div className={cx('category-header-inner')}>
                                        <div className={cx('category-meta')}>
                                            <div className={cx('category-meta-inner')}>
                                                <h1
                                                    className={`${cx('category-meta-title')} h1 heading ${
                                                        archivo.className
                                                    }`}
                                                >
                                                    Products for "{valueSearch}"
                                                </h1>
                                                <p className={cx('category-meta-product-count')}>312 results</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('category-dymanic-part')}>
                                <div className={cx('category-product-list')}>
                                    <div className={cx('gf-controls-container')}>
                                        <div className={cx('gf-action')}>
                                            <div className={cx('gf-filter-selection')}>
                                                <div className={cx('sort-limit')}>
                                                    <label>Show</label>
                                                    <select
                                                        onChange={handleLimitChange}
                                                        defaultValue={searchParams.get('limit') || '48'}
                                                    >
                                                        <option value="12">12</option>
                                                        <option value="24">24</option>
                                                        <option value="48" selected>
                                                            48
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product Card  */}
                                    <div className={cx('category-product-item')}>
                                        {/* <div className={cx('no-product-in-category')}>
                                                    Sorry, there are no products in this collection
                                            </div> */}
                                        {data.map((item: any, index: number) => {
                                            let isSpecialIndex = true;
                                            if (windowWidth <= 641) {
                                                isSpecialIndex = index % 2 !== 0;
                                            } else {
                                                if (windowWidth <= 999) {
                                                    isSpecialIndex = (index + 1) % 3 === 0;
                                                } else {
                                                    isSpecialIndex = (index + 1) % 4 === 0;
                                                }
                                            }
                                            return (
                                                <CardProduct
                                                    key={item.id}
                                                    data={item}
                                                    isSpecialIndex={isSpecialIndex}
                                                    onPageSearch={true}
                                                />
                                            );
                                        })}
                                    </div>
                                    {/* Pagination */}
                                    <Pagination totalPages={totalPages} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </>
        );
    }
}

export default PageSearch;
