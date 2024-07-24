'use client';
import styles from './MapMini.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useState } from 'react';

const cx = classNames.bind(styles);

interface Location {
    id: number;
    city: string;
    district: string;
    address: string;
    descripton: string;
}

function MapMini() {
    const [city, setCity] = useState<string>('');
    const [district, setDistrict] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);

    const locations: Location[] = [
        {
            id: 1,
            city: 'ho-chi-minh',
            district: 'quan-tp-thu-duc',
            address: '24 Lương Định Của , Trần Não ,TP.Thủ Đức',
            descripton: 'Cửa Hàng',
        },
        {
            id: 2,
            city: 'ho-chi-minh',
            district: 'quan-tp-thu-duc',
            address: '25/4 Xuân Thủy , Thảo Điền , TP.Thủ Đức',
            descripton: 'Kho,Xưởng',
        },
    ];

    const filteredLocations: Location[] = locations.filter((location: Location) => {
        if (!city || !district) return true;
        return city === location.city && district === location.district;
    });

    const changeCity = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setActive(true);
        setCity(e.target.value);
        setDistrict('');
    };

    const changeDistrict = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setDistrict(e.target.value);
    };

    return (
        <div className={cx('wrapper-map')}>
            <div className={cx('map-header')}>
                <FontAwesomeIcon icon={faMapLocation} className={cx('location-icon')} />
                <h3>Hệ Thống Cửa Hàng</h3>
            </div>
            <div className={cx('map-select')}>
                <label htmlFor="select-city" className={cx('map-mini-label')} style={{ display: 'none' }}>
                    Chọn Thành Phố
                </label>
                <select id="select-city" className={cx('select-city')} onChange={changeCity}>
                    <option value="">Chọn thành Phố</option>
                    <option value="ho-chi-minh">Hồ Chí Minh</option>
                </select>
                <label htmlFor="select-district" className={cx('map-mini-label')} style={{ display: 'none' }}>
                    Chọn Quận/Huyện
                </label>
                <select
                    id="select-district"
                    className={cx('select-district', active ? '' : 'active')}
                    onChange={changeDistrict}
                >
                    <option value="">Chọn Quận/Huyện</option>
                    <option value="quan-tp-thu-duc">TP.Thủ Đức</option>
                </select>
            </div>
            <ul className={cx('map-list')}>
                {filteredLocations.map((location: Location, index: number) => (
                    <Fragment key={index}>
                        <li className={cx('map-description')}>
                            <h4>{location.descripton}</h4>
                        </li>
                        <li className={cx('map-item')}>
                            <FontAwesomeIcon icon={faLocationDot} className={cx('map-icon')} />
                            <span>{location.address}</span>
                        </li>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

export default MapMini;
