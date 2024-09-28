import Image from 'next/image';
import images from '@/assets';
import styles from './FooterLogo.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function FooterLogo() {
    return (
        <div>
            <div className={cx('website-wrapper')}>
                <div className={cx('item')}>
                    <Image src={images.imgFSC} alt="DOGOTRIEU" />
                </div>
                <div className={cx('item')}>
                    <Image src={images.imgNFF} alt="DOGOTRIEU" />
                </div>
            </div>
        </div>
    );
}

export default FooterLogo;
