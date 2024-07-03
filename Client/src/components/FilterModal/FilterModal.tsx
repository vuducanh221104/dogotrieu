'use client';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { ChervonDonwIcon, XmarkIcon } from '../Icons';
import styles from './FilterModal.module.scss';
import { useSearchParams, useRouter } from 'next/navigation';

const cx = classNames.bind(styles);

interface FilterModalProps {
    dataFilter: any;
    showFilterMobile: boolean;
    setShowFilterMobile: React.Dispatch<React.SetStateAction<boolean>>;
    showFilterContent: { [key: number]: boolean };
    toggleContent: (index: number) => void;
    dataLength: number;
}

interface FilterItem {
    id: string;
    title: string;
    content: { name: string; slug: string }[] | string[];
}

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

const FilterModal: React.FC<FilterModalProps> = ({
    dataFilter,
    showFilterMobile,
    setShowFilterMobile,
    showFilterContent,
    toggleContent,
    dataLength,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [slugNameMap, setSlugNameMap] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setSelectedMaterials(searchParams.getAll('gf_material'));
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

    const handleClearAll = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('gf_material');
        const prioritizedUrl = prioritizeQuery(url);
        window.history.pushState({}, '', prioritizedUrl);
        router.replace(prioritizedUrl);
    };

    return (
        <>
            <div className={cx('gf-tree', showFilterMobile && 'active')}>
                <div className={cx('gf-filter-tile')}>
                    <div className={cx('filter-heading')}>Filter</div>
                    <span>
                        <XmarkIcon className={cx('icon-xmark')} onClick={() => setShowFilterMobile(false)} />
                    </span>
                </div>
                {selectedMaterials.length > 0 && (
                    <div className={cx('globo-selected-items-wrapper')}>
                        <div className={cx('gf-block-content')}>
                            <button type="button" onClick={handleClearAll}>
                                Clear All
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
                        </div>
                    </div>
                )}
                <div className={cx('gf-filter-contents-wrapper')}>
                    {dataFilter.map((item: FilterItem, index: number) => (
                        <div className={cx('gf-filter-contents')} key={item.id}>
                            <div className={cx('gf-block-title')} onClick={() => toggleContent(index)}>
                                <div className={cx('gf-block-heading')}>
                                    <span>{item.title}</span>
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
                                                <li
                                                    key={indexCheckBox}
                                                    onClick={() => handleMaterialChange(contentItem.slug)}
                                                >
                                                    <button className={cx('btn-check-box')}>
                                                        <span className={cx('gf-check-box')}>
                                                            <input
                                                                type="checkbox"
                                                                value={contentItem.slug}
                                                                onChange={() => handleMaterialChange(contentItem.slug)}
                                                                checked={selectedMaterials.includes(contentItem.slug)}
                                                                onClick={() => handleMaterialChange(contentItem.slug)}
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
                        View
                        <b>{dataLength}</b>
                        Products
                    </button>
                </div>
            </div>
            <div
                className={cx('gf-overlay', showFilterMobile && 'active')}
                onClick={() => setShowFilterMobile(false)}
            ></div>
        </>
    );
};

export default FilterModal;
