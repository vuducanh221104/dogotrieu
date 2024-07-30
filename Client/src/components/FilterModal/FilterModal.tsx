'use client';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { ChervonDonwIcon, XmarkIcon } from '../Icons';
import styles from './FilterModal.module.scss';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { archivo } from '@/assets/FontNext';

const cx = classNames.bind(styles);

interface FilterModalProps {
    dataFilter: any;
    showFilterMobile: boolean;
    setShowFilterMobile: React.Dispatch<React.SetStateAction<boolean>>;
    showFilterContent: { [key: number]: boolean };
    toggleContent: (index: number) => void;
    dataLength?: number;
}

interface FilterItem {
    id: string;
    title: string;
    content: { name: string; slug: string }[] | string[];
}

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

function FilterModal({
    dataFilter,
    showFilterMobile,
    setShowFilterMobile,
    showFilterContent,
    toggleContent,
    dataLength,
}: FilterModalProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
    const [slugNameMap, setSlugNameMap] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setSelectedMaterials(searchParams.getAll('gf_material'));
        setSelectedAvailability(searchParams.getAll('gf_availab'));
    }, [searchParams]);

    useEffect(() => {
        const map: { [key: string]: string } = {};
        dataFilter.forEach((item: FilterItem) => {
            if (Array.isArray(item.content)) {
                item.content.forEach((contentItem: any) => {
                    if (typeof contentItem === 'object' && contentItem.slug) {
                        map[contentItem.slug] = contentItem.name;
                    }
                });
            }
        });
        setSlugNameMap(map);
    }, [dataFilter]);

    const handleMaterialChange = (materialSlug: string) => {
        const url = new URL(window.location.href);
        const materials = new Set(url.searchParams.getAll('gf_material'));

        if (!materials.has(materialSlug)) {
            materials.add(materialSlug);
        } else {
            materials.delete(materialSlug);
        }

        url.searchParams.delete('gf_material');
        materials.forEach((mat: string) => url.searchParams.append('gf_material', mat));
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const handleAvailabilityChange = (availabilitySlug: string) => {
        const url = new URL(window.location.href);
        const availabilities = new Set(url.searchParams.getAll('gf_availab'));

        if (!availabilities.has(availabilitySlug)) {
            availabilities.add(availabilitySlug);
        } else {
            availabilities.delete(availabilitySlug);
        }

        url.searchParams.delete('gf_availab');
        availabilities.forEach((availab: string) => url.searchParams.append('gf_availab', availab));
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const handleRemoveMaterial = (materialSlug: string) => {
        const url = new URL(window.location.href);
        const materials = new Set(url.searchParams.getAll('gf_material'));

        materials.delete(materialSlug);

        url.searchParams.delete('gf_material');
        materials.forEach((mat: string) => url.searchParams.append('gf_material', mat));
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const handleRemoveAvailability = (availabilitySlug: string) => {
        const url = new URL(window.location.href);
        const availabilities = new Set(url.searchParams.getAll('gf_availab'));

        availabilities.delete(availabilitySlug);

        url.searchParams.delete('gf_availab');
        availabilities.forEach((availab: string) => url.searchParams.append('gf_availab', availab));
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    const handleClearAll = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('gf_material');
        url.searchParams.delete('gf_availab');
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    return (
        <>
            <div className={cx('gf-tree', showFilterMobile && 'active')}>
                <div className={cx('gf-filter-tile')}>
                    <div className={`${cx('filter-heading')} ${archivo.className}`}>Lọc Sản Phẩm</div>
                    <span>
                        <XmarkIcon className={cx('icon-xmark')} onClick={() => setShowFilterMobile(false)} />
                    </span>
                </div>
                {(selectedMaterials.length > 0 || selectedAvailability.length > 0) && (
                    <div className={cx('globo-selected-items-wrapper')}>
                        <div className={cx('gf-block-content')}>
                            <button type="button" onClick={handleClearAll} className={archivo.className}>
                                Xóa Hết
                            </button>
                            {selectedMaterials.map((materialSlug: string) => (
                                <div className={cx('gf-option-label')} key={materialSlug}>
                                    <div className={cx('gf-lable-wrapper')}>
                                        <span className={cx('selected-item')}>
                                            <strong>
                                                <span className={cx('gf-label')}>{slugNameMap[materialSlug]}</span>
                                            </strong>
                                        </span>
                                        <span
                                            className={cx('icon-clear')}
                                            onClick={() => handleRemoveMaterial(materialSlug)}
                                        >
                                            x
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {selectedAvailability.map((availabilitySlug: string) => (
                                <div className={cx('gf-option-label')} key={availabilitySlug}>
                                    <div className={cx('gf-lable-wrapper')}>
                                        <span className={cx('selected-item')}>
                                            <strong>
                                                <span className={cx('gf-label')}>{slugNameMap[availabilitySlug]}</span>
                                            </strong>
                                        </span>
                                        <span
                                            className={cx('icon-clear')}
                                            onClick={() => handleRemoveAvailability(availabilitySlug)}
                                        >
                                            x
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className={cx('gf-filter-contents-wrapper')}>
                    {dataFilter.map((item: FilterItem, index: number) => (
                        <div className={cx('gf-filter-contents')} key={item.id}>
                            <div className={cx('gf-block-title')} onClick={() => toggleContent(index)}>
                                <div className={cx('gf-block-heading')}>
                                    <span className={archivo.className}>{item.title}</span>
                                    <ChervonDonwIcon className={cx('icon-chervon-down')} />
                                </div>
                            </div>
                            {showFilterContent && (
                                <div
                                    className={cx('gf-block-content')}
                                    style={
                                        showFilterContent[index]
                                            ? { height: 'auto', padding: '15px 0 0' }
                                            : { height: '0' }
                                    }
                                >
                                    <div className={cx('gf-scroll')}>
                                        <ul className={cx('gf-option-box')}>
                                            {item.content.map((contentItem: any, indexCheckBox: number) => (
                                                <li key={indexCheckBox}>
                                                    <button className={cx('btn-check-box')}>
                                                        <span className={cx('gf-check-box')}>
                                                            <input
                                                                type="checkbox"
                                                                value={contentItem.slug}
                                                                onChange={() =>
                                                                    item.title === 'KHẢ DỤNG'
                                                                        ? handleAvailabilityChange(contentItem.slug)
                                                                        : handleMaterialChange(contentItem.slug)
                                                                }
                                                                checked={
                                                                    item.title === 'KHẢ DỤNG'
                                                                        ? selectedAvailability.includes(
                                                                              contentItem.slug,
                                                                          )
                                                                        : selectedMaterials.includes(contentItem.slug)
                                                                }
                                                            />
                                                        </span>
                                                        <span className={cx('gf-label')}>
                                                            {contentItem.name || contentItem}
                                                        </span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={cx('gf-footer')} onClick={() => setShowFilterMobile(false)}>
                    <button>
                        Xem
                        <b>{dataLength}</b>
                        Sản Phẩm
                    </button>
                </div>
            </div>
            <div
                className={cx('gf-overlay', showFilterMobile && 'active')}
                onClick={() => setShowFilterMobile(false)}
            ></div>
        </>
    );
}

export default FilterModal;
