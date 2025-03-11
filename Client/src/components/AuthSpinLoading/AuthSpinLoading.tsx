import { Spin } from 'antd';
import classNames from 'classnames/bind';
import styles from './AuthSpinLoading.module.scss';
const cx = classNames.bind(styles);
function AuthSpinLoading({ loading = false, zIndex = 10 }) {
    return (
        <>
            {loading && (
                <div className={cx('wrapper-loading')} style={{ zIndex: `${zIndex} !important` }}>
                    <Spin size="large" className={cx('spin-icon')} />
                    <div className={cx('modal-loading')}></div>
                </div>
            )}
        </>
    );
}

export default AuthSpinLoading;
