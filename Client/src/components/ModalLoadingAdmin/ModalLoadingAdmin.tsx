import classNames from 'classnames/bind';
import styles from './ModalLoadingAdmin.module.scss';
import { Spin } from 'antd';

const cx = classNames.bind(styles);
function ModalLoadingAdmin() {
    return (
        <div className={cx('modal-loading')}>
            <div className={cx('icon-loading')}>
                <Spin size="large" />
                <h3 className={cx('title-loading')}>Loading....</h3>
            </div>
        </div>
    );
}

export default ModalLoadingAdmin;
