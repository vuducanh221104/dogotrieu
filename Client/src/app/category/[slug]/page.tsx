'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Category.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import { Container } from 'react-bootstrap';
import { CheckIcon, ChervonDonwIcon, ChervonLeft, ChervonUpIcon } from '@/components/Icons';
import Tippy from '@tippyjs/react/headless';
import { Archivo } from 'next/font/google';
import { dataProduct } from '@/services/mockApi';
import useWindowWidth from '@/hooks/useWindowWidth';
import Pagination from '@/components/Pagination';
import CardProduct from '@/components/CardProduct';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterModal from '@/components/FilterModal';

const archivo = Archivo({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['italic', 'normal'],
});
const cx = classNames.bind(styles);

function prioritizeQuery(url: any) {
    const params = url.searchParams;
    const gfMaterial = params.getAll('gf_material');
    const sortBy = params.get('sort_by');

    const reorderedParams = new URLSearchParams();

    // Append gf_material first
    gfMaterial.forEach((material: any) => reorderedParams.append('gf_material', material));

    // Append sort_by if it exists
    if (sortBy) {
        reorderedParams.append('sort_by', sortBy);
    }

    // Append other params
    params.forEach((value: any, key: any) => {
        if (key !== 'gf_material' && key !== 'sort_by') {
            reorderedParams.append(key, value);
        }
    });

    const newUrl = new URL(url.origin + url.pathname + '?' + reorderedParams.toString());

    return newUrl.toString();
}

function PageCategory() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showSort, setShowSort] = useState<boolean>(false);

    const handleLimitChange = (event: any) => {
        const limit = event.target.value;
        const url = new URL(window.location.href);
        url.searchParams.set('limit', limit);
        url.searchParams.set('page', '1');
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const handleMaterialChange = (event: any) => {
        const material = event.target.value;
        const url = new URL(window.location.href);
        const materials = new Set(url.searchParams.getAll('gf_material'));

        if (event.target.checked && !materials.has(material)) {
            materials.add(material);
        } else {
            materials.delete(material);
        }

        url.searchParams.delete('gf_material');
        materials.forEach((mat) => url.searchParams.append('gf_material', mat));
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const onChangeSort = (value: string) => {
        console.log(value);
        const url = new URL(window.location.href);
        // const sortValue = url.searchParams.get('sort_by');
        url.searchParams.set('sort_by', value);
        const newUrl = url.toString();
        window.history.pushState({}, '', newUrl);
        router.replace(newUrl);
    };

    const windowWidth = useWindowWidth();
    const totalPages = 73;
    const data = dataProduct;
    const dataFilter = [
        {
            id: '1',
            title: 'AVAILABILITY',
            content: ['QUICK-SHIP'],
        },
        {
            id: '2',
            title: 'MATERIAL',
            content: ['Wood', 'Glass', 'Stone', 'Metal', 'Rattan'],
        },
    ];

    return (
        <>
            <FilterModal />
            <Breadcrumb />
            <Container className="container-flush">
                <div className={cx('layout')}>
                    <div className={cx('layout-section', 'layout-filter')}>
                        <div className={cx('card')}>
                            <div className={cx('card-section', 'card-section-tight')}>
                                <div className={cx('filter-title')}>
                                    <div className={cx('title-block')}>
                                        <span>Filter</span>
                                    </div>
                                    <p>Clear All</p>
                                </div>
                                <div className={cx('filter-selected-items')}>
                                    <div className={cx('selected-item-option-label')}>
                                        <span className={cx('selected-item')}>
                                            <span className={cx('hidden-xs')}>Material</span>:
                                            <strong>
                                                <span className={cx('gf-label')}>Wood</span>
                                            </strong>
                                        </span>
                                        <span className={cx('icon-clear')}></span>
                                    </div>
                                </div>
                                <div className={cx('filter-group-list')}>
                                    {dataFilter.map((item) => (
                                        <div className={cx('filter-group-item')} key={item.id}>
                                            <button className={cx('filter-name')}>
                                                {item.title}
                                                <ChervonUpIcon className={cx('icon-chervonup')} />
                                            </button>
                                            <div
                                                className={cx('filter-checkbox-wrapper')}
                                                style={{ height: 'auto', overflow: 'visible', visibility: 'visible' }}
                                            >
                                                <ul className={cx('filter-checkbox-list')}>
                                                    {item?.content.map((contentItem, index) => (
                                                        <li className={cx('filter-checkbox-item')} key={index}>
                                                            <div className={cx('checkbox-content')}>
                                                                <input
                                                                    type="checkbox"
                                                                    className={cx('input-checkbox')}
                                                                    value={contentItem}
                                                                    onChange={handleMaterialChange}
                                                                    checked={searchParams
                                                                        .getAll('gf_material')
                                                                        .includes(contentItem)}
                                                                />
                                                                <CheckIcon className={cx('icon-check')} />
                                                            </div>
                                                            <label className={cx('checkbox-name-label')}>
                                                                {contentItem}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('layout-section', 'layout-category')}>
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
                                                        Coffee Tables
                                                    </h1>
                                                    <p className={cx('category-meta-product-count')}>312 products</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('category-dymanic-part')}>
                                    <div className={cx('category-product-list')}>
                                        <div className={cx('gf-controls-container')}>
                                            <div className={cx('gf-action')}>
                                                <div className={cx('gf-filter-trigger')}>
                                                    <div className={cx('gf-refine-toggle-mobile')}>
                                                        <span>
                                                            <FontAwesomeIcon
                                                                icon={faBarsProgress}
                                                                className={cx('icon-toglle-mobile')}
                                                            />
                                                            Filter By
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className={cx('gf-summary')}>
                                                    <b>312</b> Products
                                                </span>
                                                <div className={cx('gf-filter-selection')}>
                                                    <div className={cx('sort-limit')}>
                                                        <label>Show</label>
                                                        <select
                                                            onChange={handleLimitChange}
                                                            defaultValue={searchParams.get('limit') || '48'}
                                                        >
                                                            <option value="12">12</option>
                                                            <option value="24">24</option>
                                                            <option value="48">48</option>
                                                        </select>
                                                    </div>
                                                    <div className={cx('sort-by')}>
                                                        <Tippy
                                                            interactive
                                                            visible={showSort}
                                                            placement="bottom-start"
                                                            onClickOutside={() => setShowSort(!showSort)}
                                                            offset={[0, 0]}
                                                            render={(attrs: any) => (
                                                                <div
                                                                    className={cx('popperover')}
                                                                    tabIndex="-1"
                                                                    {...attrs}
                                                                >
                                                                    <span onClick={() => onChangeSort('availability')}>
                                                                        Availability
                                                                    </span>
                                                                    <span onClick={() => onChangeSort('title-asc')}>
                                                                        A-Z
                                                                    </span>
                                                                    <span onClick={() => onChangeSort('title-desc')}>
                                                                        Z-A
                                                                    </span>
                                                                    <span onClick={() => onChangeSort('price-asc')}>
                                                                        Price, low to high
                                                                    </span>
                                                                    <span onClick={() => onChangeSort('price-desc')}>
                                                                        Price, high to low
                                                                    </span>
                                                                    <span onClick={() => onChangeSort('date-desc')}>
                                                                        Date, new to old
                                                                    </span>
                                                                    <span onClick={() => onChangeSort('date-asc')}>
                                                                        Date, old to new
                                                                    </span>
                                                                </div>
                                                            )}
                                                        >
                                                            <label
                                                                className={cx('globo-sort-options')}
                                                                onClick={() => setShowSort(!showSort)}
                                                            >
                                                                <span>Featured</span>
                                                            </label>
                                                        </Tippy>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('category-product-item')}>
                                            {data.map((item, index) => {
                                                const isSpecialIndex =
                                                    windowWidth <= 641 ? index % 2 !== 0 : (index + 1) % 3 === 0;
                                                return (
                                                    <CardProduct
                                                        key={item.id}
                                                        data={item}
                                                        isSpecialIndex={isSpecialIndex}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <Pagination totalPages={totalPages} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default PageCategory;
