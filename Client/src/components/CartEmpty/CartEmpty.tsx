import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './CartEmpty.module.scss';
import { archivo } from '@/assets/FontNext';
import { CartIcon } from '@/components/Icons';
const cx = classNames.bind(styles);
function CartEmpty() {
    return (
        <Container>
            <div className={cx('empty-state', 'active')}>
                <div className={cx('empty-state-icon-wrapper')}>
                    <CartIcon className={cx('empty-state-icon')} />
                </div>
                <p className={`${cx('empty-state-heading')} heading h1 ${archivo.className}`}>Your cart is empty</p>
                <p className={cx('empty-state-tile')}>Spend $500 more and get free shipping!</p>
                <div className={cx('empty-state-button')}>
                    <a href="/" className={`${cx('btn-sumbit-link')} button`}>
                        Shop our products
                    </a>
                </div>
            </div>
        </Container>
    );
}

export default CartEmpty;
