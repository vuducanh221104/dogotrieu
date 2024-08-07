'use client';
import { Suspense } from 'react';

import classNames from 'classnames/bind';
import styles from '@/styles/Search.module.scss';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '@/components/Breadcrumb';
import { Container } from 'react-bootstrap';
import { CheckIcon, ChervonUpIcon } from '@/components/Icons';
import Tippy from '@tippyjs/react/headless';
import useWindowWidth from '@/hooks/useWindowWidth';
import Pagination from '@/components/Pagination';
import CardProduct from '@/components/CardProduct';
import FilterModal from '@/components/FilterModal';
import { archivo } from '@/assets/FontNext';
import NotFound from '@/components/NotFound';
import Loading from '@/components/Loading';
import { searchFilter } from '@/services/searchServices';
import { dataFilterCategory } from '@/services/menuData/menuData';

const cx = classNames.bind(styles);

function prioritizeQuery(url: URL): string {
    const params = url.searchParams;
    const gfMaterial = params.getAll('gf_material');
    const gfAvailab = params.getAll('gf_availab');
    const sortBy = params.get('sort_by');

    const reorderedParams = new URLSearchParams();

    gfMaterial.forEach((material: string) => reorderedParams.append('gf_material', material));
    gfAvailab.forEach((availab: string) => reorderedParams.append('gf_availab', availab));

    if (sortBy) {
        reorderedParams.append('sort_by', sortBy);
    }

    params.forEach((value: string, key: string) => {
        if (key !== 'gf_material' && key !== 'gf_availab' && key !== 'sort_by') {
            reorderedParams.append(key, value);
        }
    });

    const newUrl = new URL(url.origin + url.pathname + '?' + reorderedParams.toString());

    return newUrl.toString();
}

function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [valueSearch, setValueSearch] = useState<any>('');
    const [showSort, setShowSort] = useState<boolean>(false);
    const [currentSort, setCurrentSort] = useState<string>('Giá, thấp đến cao');
    const [showFilterMobile, setShowFilterMobile] = useState<boolean>(false);
    const [showFilterContent, setShowFilterContent] = useState<any>({});
    const [selectedMaterials, setSelectedMaterials] = useState<{ slug: string; name: string }[]>([]);
    const [selectedAvailability, setSelectedAvailability] = useState<{ slug: string; name: string }[]>([]);

    useEffect(() => {
        const getQandType = () => {
            const Q = searchParams.get('q');
            setValueSearch(Q);
        };
        getQandType();
        const materials = searchParams.getAll('gf_material');
        setSelectedMaterials(
            materials.map((slug) => {
                const filter = dataFilterCategory
                    .flatMap((f: any) => f.content)
                    .find((item: any) => item.slug === slug);
                return { slug, name: filter ? filter.name : slug };
            }),
        );

        const availability = searchParams.getAll('gf_availab');
        setSelectedAvailability(
            availability.map((slug) => {
                const filter = dataFilterCategory
                    .flatMap((f: any) => f.content)
                    .find((item: any) => item.slug === slug);
                return { slug, name: filter ? filter.name : slug };
            }),
        );

        getCategoryUrl();
    }, [searchParams]);

    const getCategoryUrl = () => {
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            const pathname = url.pathname.split('/search')[1];
            const search = url.search;
            return `${pathname}${search}`;
        }
        return '';
    };

    const { data: originalData, error, isLoading, mutate } = searchFilter(getCategoryUrl());
    const data = originalData?.data;
    const dataTotalPage = originalData?.totalPages;
    const dataTotalProduct = originalData?.totalItems;

    const handleLimitChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const limit = event.target.value;
        const url = new URL(window.location.href);
        url.searchParams.set('limit', limit);
        url.searchParams.set('page', '1');
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const handleMaterialChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleAvailabilityChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const availability = event.target.value;
        const url = new URL(window.location.href);
        const availabilities = new Set(url.searchParams.getAll('gf_availab'));

        if (event.target.checked && !availabilities.has(availability)) {
            availabilities.add(availability);
        } else {
            availabilities.delete(availability);
        }

        url.searchParams.delete('gf_availab');
        availabilities.forEach((availab) => url.searchParams.append('gf_availab', availab));
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const handleRemoveMaterial = async (material: string) => {
        const url = new URL(window.location.href);
        const materials = new Set(url.searchParams.getAll('gf_material'));

        materials.delete(material);

        url.searchParams.delete('gf_material');
        materials.forEach((mat) => url.searchParams.append('gf_material', mat));
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const handleRemoveAvailability = async (availability: string) => {
        const url = new URL(window.location.href);
        const availabilities = new Set(url.searchParams.getAll('gf_availab'));

        availabilities.delete(availability);

        url.searchParams.delete('gf_availab');
        availabilities.forEach((availab) => url.searchParams.append('gf_availab', availab));
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const toggleContent = (index: number) => {
        setShowFilterContent((prevState: any) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const onChangeSort = async (value: string, nameSort: string) => {
        setCurrentSort(nameSort);
        const url = new URL(window.location.href);
        url.searchParams.set('sort_by', value);
        const newUrl = url.toString();
        window.history.pushState({}, '', newUrl);
        await router.replace(newUrl);
    };

    const windowWidth = useWindowWidth();
    const dataFilter = dataFilterCategory;

    if (isLoading) {
        return (
            <>
                <Loading />
                <FilterModal
                    dataFilter={dataFilter}
                    showFilterMobile={showFilterMobile}
                    setShowFilterMobile={setShowFilterMobile}
                    toggleContent={toggleContent}
                    showFilterContent={showFilterContent}
                    dataLength={dataTotalProduct}
                />
            </>
        );
    }

    if (error || valueSearch === '') {
        return <NotFound />;
    } else {
        return (
            <>
                <Breadcrumb nameSlug={`Kết quả tìm kiếm: "${valueSearch}"`} />
                <FilterModal
                    dataFilter={dataFilter}
                    showFilterMobile={showFilterMobile}
                    setShowFilterMobile={setShowFilterMobile}
                    toggleContent={toggleContent}
                    showFilterContent={showFilterContent}
                    dataLength={dataTotalProduct}
                />
                <Container className="container-flush">
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
                                                    Tìm Kiếm : "{valueSearch}"
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('layout', 'layout-no-bottom')}>
                                <div className={cx('layout-section', 'layout-filter')}>
                                    <div className={cx('card', 'card-no-border')}>
                                        <div className={cx('card-section', 'card-section-tight')}>
                                            <div className={cx('filter-title')}>
                                                <div className={cx('title-block')}>
                                                    <span>Lọc Sản Phẩm</span>
                                                </div>
                                                {(selectedMaterials.length > 0 || selectedAvailability.length > 0) && (
                                                    <p
                                                        onClick={() => {
                                                            const url = new URL(window.location.href);
                                                            url.searchParams.delete('gf_material');
                                                            url.searchParams.delete('gf_availab');
                                                            const prioritizedUrl = prioritizeQuery(url);
                                                            window.history.pushState({}, '', prioritizedUrl);
                                                            router.replace(prioritizedUrl);
                                                        }}
                                                    >
                                                        Clear All
                                                    </p>
                                                )}
                                            </div>
                                            <div className={cx('filter-selected-items')}>
                                                {selectedMaterials.map(({ slug, name }) => (
                                                    <div className={cx('selected-item-option-label')} key={slug}>
                                                        <span className={cx('selected-item')}>
                                                            <span className={cx('hidden-xs')}>Material</span>:
                                                            <strong>
                                                                <span className={cx('gf-label')}>{name}</span>
                                                            </strong>
                                                        </span>
                                                        <span
                                                            className={cx('icon-clear')}
                                                            onClick={() => handleRemoveMaterial(slug)}
                                                        >
                                                            x
                                                        </span>
                                                    </div>
                                                ))}
                                                {selectedAvailability.map(({ slug, name }) => (
                                                    <div className={cx('selected-item-option-label')} key={slug}>
                                                        <span className={cx('selected-item')}>
                                                            <span className={cx('hidden-xs')}>Availability</span>:
                                                            <strong>
                                                                <span className={cx('gf-label')}>{name}</span>
                                                            </strong>
                                                        </span>
                                                        <span
                                                            className={cx('icon-clear')}
                                                            onClick={() => handleRemoveAvailability(slug)}
                                                        >
                                                            x
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={cx('filter-group-list')}>
                                                {dataFilter.map((item, index) => (
                                                    <div className={cx('filter-group-item')} key={item.id}>
                                                        <button
                                                            className={`${cx('filter-name')} ${archivo.className}`}
                                                            onClick={() => toggleContent(index)}
                                                        >
                                                            {item.title}
                                                            <ChervonUpIcon className={cx('icon-chervonup')} />
                                                        </button>
                                                        <div
                                                            className={cx('filter-checkbox-wrapper')}
                                                            style={
                                                                showFilterContent[index]
                                                                    ? {
                                                                          height: 'auto',
                                                                          overflow: 'visible',
                                                                          visibility: 'visible',
                                                                      }
                                                                    : { height: '0' }
                                                            }
                                                        >
                                                            <ul className={cx('filter-checkbox-list')}>
                                                                {item.content.map((contentItem: any) => (
                                                                    <li
                                                                        className={cx('filter-checkbox-item')}
                                                                        key={contentItem.slug}
                                                                    >
                                                                        <div className={cx('checkbox-content')}>
                                                                            <input
                                                                                type="checkbox"
                                                                                className={cx('input-checkbox')}
                                                                                value={contentItem.slug}
                                                                                onChange={
                                                                                    item.title === 'KHẢ DỤNG'
                                                                                        ? handleAvailabilityChange
                                                                                        : handleMaterialChange
                                                                                }
                                                                                checked={
                                                                                    item.title === 'KHẢ DỤNG'
                                                                                        ? selectedAvailability.some(
                                                                                              (avail) =>
                                                                                                  avail.slug ===
                                                                                                  contentItem.slug,
                                                                                          )
                                                                                        : selectedMaterials.some(
                                                                                              (mat) =>
                                                                                                  mat.slug ===
                                                                                                  contentItem.slug,
                                                                                          )
                                                                                }
                                                                            />
                                                                            <CheckIcon className={cx('icon-check')} />
                                                                        </div>
                                                                        <label className={cx('checkbox-name-label')}>
                                                                            {contentItem.name}
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
                                        <div className={cx('card', 'card-no-border')}>
                                            <div className={cx('category-dymanic-part')}>
                                                <div className={cx('category-product-list')}>
                                                    <div className={cx('gf-controls-container')}>
                                                        <div className={cx('gf-action')}>
                                                            <div className={cx('gf-filter-trigger')}>
                                                                <div
                                                                    className={cx('gf-refine-toggle-mobile')}
                                                                    onClick={() =>
                                                                        setShowFilterMobile(!showFilterMobile)
                                                                    }
                                                                >
                                                                    <span>
                                                                        <FontAwesomeIcon
                                                                            icon={faBarsProgress}
                                                                            className={cx('icon-toglle-mobile')}
                                                                        />
                                                                        Lọc Sản Phẩm
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <span className={cx('gf-summary')}>
                                                                <b>{dataTotalProduct}</b> Sản Phẩm
                                                            </span>
                                                            <div className={cx('gf-filter-selection')}>
                                                                <div className={cx('sort-limit')}>
                                                                    <label htmlFor="limit-select">Hiển Thị</label>
                                                                    <select
                                                                        id="limit-select"
                                                                        onChange={handleLimitChange}
                                                                        defaultValue={searchParams.get('limit') || '48'}
                                                                    >
                                                                        <option value="12">12</option>
                                                                        <option value="24">24</option>
                                                                        <option value="48">48</option>
                                                                    </select>
                                                                </div>
                                                                <div className={cx('sort-by')}>
                                                                    <div className={cx('wrapper-search-tippy')}>
                                                                        <Tippy
                                                                            interactive
                                                                            visible={showSort}
                                                                            placement="bottom-start"
                                                                            onClickOutside={() =>
                                                                                setShowSort(!showSort)
                                                                            }
                                                                            offset={[0, 0]}
                                                                            render={(attrs: any) => (
                                                                                <div
                                                                                    className={cx('popperover')}
                                                                                    tabIndex="-1"
                                                                                    {...attrs}
                                                                                >
                                                                                    <span
                                                                                        onClick={() =>
                                                                                            onChangeSort(
                                                                                                'availability',
                                                                                                'Có Sẵn',
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Có Sẵn
                                                                                    </span>
                                                                                    <span
                                                                                        onClick={() =>
                                                                                            onChangeSort(
                                                                                                'title-asc',
                                                                                                'A-Z',
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        A-Z
                                                                                    </span>
                                                                                    <span
                                                                                        onClick={() =>
                                                                                            onChangeSort(
                                                                                                'title-desc',
                                                                                                'Z-A',
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Z-A
                                                                                    </span>
                                                                                    <span
                                                                                        onClick={() =>
                                                                                            onChangeSort(
                                                                                                'price-asc',
                                                                                                'Giá, thấp đến cao',
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Giá, thấp đến cao
                                                                                    </span>
                                                                                    <span
                                                                                        onClick={() =>
                                                                                            onChangeSort(
                                                                                                'price-desc',
                                                                                                'Giá, cao đến thấp ',
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Giá, cao đến thấp
                                                                                    </span>
                                                                                    <span
                                                                                        onClick={() =>
                                                                                            onChangeSort(
                                                                                                'date-desc',
                                                                                                'Ngày, Mới đến cũ',
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Ngày, mới đến cũ
                                                                                    </span>
                                                                                    <span
                                                                                        onClick={() =>
                                                                                            onChangeSort(
                                                                                                'date-asc',
                                                                                                'Ngày, cũ đến mới',
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Ngày, cũ đến mới
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                        >
                                                                            <div
                                                                                className={cx('globo-sort-options')}
                                                                                onClick={() => setShowSort(!showSort)}
                                                                                role="button"
                                                                                aria-label="Chọn phương thức sắp xếp"
                                                                            >
                                                                                <span>{currentSort}</span>
                                                                            </div>
                                                                        </Tippy>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('gf-filter-seleted-on-mobile')}>
                                                                <ul>
                                                                    {selectedMaterials.map(({ slug, name }) => (
                                                                        <li
                                                                            key={slug}
                                                                            onClick={() => handleRemoveMaterial(slug)}
                                                                        >
                                                                            <div>
                                                                                <span
                                                                                    className={cx(
                                                                                        'selected-item-on-mobile',
                                                                                    )}
                                                                                >
                                                                                    <strong>
                                                                                        <span
                                                                                            className={cx('gf-label')}
                                                                                        >
                                                                                            {name}
                                                                                        </span>
                                                                                    </strong>
                                                                                </span>
                                                                                <span
                                                                                    className={cx('icon-clear')}
                                                                                ></span>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                    {selectedAvailability.map(({ slug, name }) => (
                                                                        <li
                                                                            key={slug}
                                                                            onClick={() =>
                                                                                handleRemoveAvailability(slug)
                                                                            }
                                                                        >
                                                                            <div>
                                                                                <span
                                                                                    className={cx(
                                                                                        'selected-item-on-mobile',
                                                                                    )}
                                                                                >
                                                                                    <strong>
                                                                                        <span
                                                                                            className={cx('gf-label')}
                                                                                        >
                                                                                            {name}
                                                                                        </span>
                                                                                    </strong>
                                                                                </span>
                                                                                <span
                                                                                    className={cx('icon-clear')}
                                                                                ></span>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Product Card  */}
                                                    <div className={cx('category-product-item')}>
                                                        {dataTotalProduct <= 0 && (
                                                            <div className={cx('no-product-in-category')}>
                                                                {/* Sorry, there are no products in this collection */}
                                                                Xin lỗi , không có sản phẩm nào ở danh mục này
                                                            </div>
                                                        )}

                                                        {data?.map((item: any, index: number) => {
                                                            const isSpecialIndex =
                                                                windowWidth <= 641
                                                                    ? index % 2 !== 0
                                                                    : windowWidth <= 1279
                                                                    ? (index + 1) % 3 === 0
                                                                    : index % 3 !== 0
                                                                    ? (index + 1) % 4 === 0
                                                                    : (index + 1) % 4 === 0;
                                                            return (
                                                                <CardProduct
                                                                    key={item._id}
                                                                    data={item}
                                                                    isSpecialIndex={isSpecialIndex}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                    {/* Pagination */}
                                                    {dataTotalProduct !== 0 && (
                                                        <Pagination totalPages={dataTotalPage} />
                                                    )}
                                                </div>
                                            </div>
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
}

export default function PageSearchWrapper() {
    return (
        <Suspense
            fallback={
                <>
                    <Loading />
                </>
            }
        >
            <SearchContent />
        </Suspense>
    );
}
