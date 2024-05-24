'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from '@/styles/Category.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import { Container } from 'react-bootstrap';
import { CheckIcon, ChervonUpIcon } from '@/components/Icons';
import Tippy from '@tippyjs/react/headless';
import { dataProduct } from '@/services/mockApi';
import useWindowWidth from '@/hooks/useWindowWidth';
import Pagination from '@/components/Pagination';
import CardProduct from '@/components/CardProduct';
import FilterModal from '@/components/FilterModal';
import { archivo } from '@/assets/FontNext';

type FilterItem = {
    id: string;
    title: string;
    content: string[];
};

type ShowFilterContent = {
    [key: number]: boolean;
};

const cx = classNames.bind(styles);

function prioritizeQuery(url: URL): string {
    const params = url.searchParams;
    const gfMaterial = params.getAll('gf_material');
    const sortBy = params.get('sort_by');

    const reorderedParams = new URLSearchParams();

    gfMaterial.forEach((material: string) => reorderedParams.append('gf_material', material));

    if (sortBy) {
        reorderedParams.append('sort_by', sortBy);
    }

    params.forEach((value: string, key: string) => {
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
    const [showFilterMobile, setShowFilterMobile] = useState<boolean>(false);
    const [showFilterContent, setShowFilterContent] = useState<ShowFilterContent>({});
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

    useEffect(() => {
        setSelectedMaterials(searchParams.getAll('gf_material'));
    }, [searchParams]);

    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const limit = event.target.value;
        const url = new URL(window.location.href);
        url.searchParams.set('limit', limit);
        url.searchParams.set('page', '1');
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const handleMaterialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleRemoveMaterial = (material: string) => {
        const url = new URL(window.location.href);
        const materials = new Set(url.searchParams.getAll('gf_material'));

        materials.delete(material);

        url.searchParams.delete('gf_material');
        materials.forEach((mat) => url.searchParams.append('gf_material', mat));
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const toggleContent = (index: number) => {
        setShowFilterContent((prevState: ShowFilterContent) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const onChangeSort = (value: string) => {
        console.log(value);
        const url = new URL(window.location.href);
        url.searchParams.set('sort_by', value);
        const newUrl = url.toString();
        window.history.pushState({}, '', newUrl);
        router.replace(newUrl);
    };

    const windowWidth = useWindowWidth();
    const totalPages = 73;
    const data = dataProduct;
    const dataFilter: FilterItem[] = [
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
        // Nếu không có product thì thêm thẻ này
        //<div className={cx('no-product-in-category')}>
        // Sorry, there are no products in this collection
        // </div>
        <>
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
                                    <p
                                        onClick={() => {
                                            const url = new URL(window.location.href);
                                            url.searchParams.delete('gf_material');
                                            const prioritizedUrl = prioritizeQuery(url);
                                            window.history.pushState({}, '', prioritizedUrl);
                                            router.replace(prioritizedUrl);
                                        }}
                                    >
                                        Clear All
                                    </p>
                                </div>
                                <div className={cx('filter-selected-items')}>
                                    {selectedMaterials.map((material: string, index: number) => (
                                        <div className={cx('selected-item-option-label')} key={material}>
                                            <span className={cx('selected-item')}>
                                                <span className={cx('hidden-xs')}>Material</span>:
                                                <strong>
                                                    <span className={cx('gf-label')}>{material}</span>
                                                </strong>
                                            </span>
                                            <span
                                                className={cx('icon-clear')}
                                                onClick={() => handleRemoveMaterial(material)}
                                            >
                                                x
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx('filter-group-list')}>
                                    {dataFilter.map((item: FilterItem, index: number) => (
                                        <div className={cx('filter-group-item')} key={item.id}>
                                            <button className={cx('filter-name')} onClick={() => toggleContent(index)}>
                                                {item.title}
                                                <ChervonUpIcon className={cx('icon-chervonup')} />
                                            </button>
                                            <div
                                                className={cx('filter-checkbox-wrapper')}
                                                style={
                                                    showFilterContent[index]
                                                        ? { height: 'auto', overflow: 'visible', visibility: 'visible' }
                                                        : { height: '0' }
                                                }
                                            >
                                                <ul className={cx('filter-checkbox-list')}>
                                                    {item?.content.map((contentItem: string, indexItem: number) => (
                                                        <li className={cx('filter-checkbox-item')} key={indexItem}>
                                                            <div className={cx('checkbox-content')}>
                                                                <input
                                                                    type="checkbox"
                                                                    className={cx('input-checkbox')}
                                                                    value={contentItem}
                                                                    onChange={handleMaterialChange}
                                                                    checked={selectedMaterials.includes(contentItem)}
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
                                                    <div
                                                        className={cx('gf-refine-toggle-mobile')}
                                                        onClick={() => setShowFilterMobile(!showFilterMobile)}
                                                    >
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
                                                <div className={cx('gf-filter-seleted-on-mobile')}>
                                                    <ul>
                                                        {selectedMaterials.map((material: string) => (
                                                            <li onClick={() => handleRemoveMaterial(material)}>
                                                                <div>
                                                                    <span className={cx('selected-item-on-mobile')}>
                                                                        <strong>
                                                                            <span className={cx('gf-label')}>
                                                                                {material}
                                                                            </span>
                                                                        </strong>
                                                                    </span>
                                                                    <span className={cx('icon-clear')}></span>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Product Card  */}
                                        <div className={cx('category-product-item')}>
                                            {/* <div className={cx('no-product-in-category')}>
                                                Sorry, there are no products in this collection
                                            </div> */}
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
                                        {/* Pagination */}
                                        <Pagination totalPages={totalPages} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <FilterModal
                dataFilter={dataFilter}
                showFilterMobile={showFilterMobile}
                setShowFilterMobile={setShowFilterMobile}
                toggleContent={toggleContent}
                showFilterContent={showFilterContent}
            />
        </>
    );
}

export default PageCategory;
