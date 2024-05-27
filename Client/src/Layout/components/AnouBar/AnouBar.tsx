import Container from 'react-bootstrap/Container';
import classNames from 'classnames/bind';
import styles from './AnouBar.module.scss';

const cx = classNames.bind(styles);

function AnouBar() {
    return (
        <div className={cx('wrapper-anou-bar')}>
            <Container>
                <div className={cx('anou-bar-inner')}>
                    <a href="/123">Kho hàng lớn + Miễn phí vận chuyển *</a>
                </div>
            </Container>
        </div>
    );
}

export default AnouBar;
