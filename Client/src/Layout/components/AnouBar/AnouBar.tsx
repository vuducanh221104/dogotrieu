import Container from 'react-bootstrap/Container';
import classNames from 'classnames/bind';
import styles from './AnouBar.module.scss';

const cx = classNames.bind(styles);

function AnouBar() {
    return (
        <div className={cx('wrapper-anou-bar')}>
            <Container>
                <div className={cx('anou-bar-inner')}>
                    <a href="/123">LARGE INVENTORY + FREE SHIPPING *</a>
                </div>
            </Container>
        </div>
    );
}

export default AnouBar;
