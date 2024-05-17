import classNames from 'classnames/bind';
import { XmarkIcon } from '../Icons';
import styles from './FilterModal.module.scss';

const cx = classNames.bind(styles);
function FilterModal() {
    return (
        <>
            <div className={cx('gf-tree', 'active')}>
                <div className={cx('gf-filter-tile')}>
                    <div className={cx('filter-heading')}>Filter</div>
                    <span>
                        <XmarkIcon className={cx('icon-xmark')} />
                    </span>
                </div>
                <div className={cx('globo-selected-items-wrapper')}>
                    <div className={cx('gf-block-content')}>
                        <button type="button">Clear All</button>
                        <div className={cx('gf-option-label')}>
                            <div className={cx('gf-lable-wrapper')}>
                                <span className={cx('selected-item')}>
                                    {/* <span className={cx('hidden-xs')}>Color</span> */}
                                    <strong>
                                        <span className={cx('gf-label')}>Black</span>
                                    </strong>
                                </span>
                                <span className={cx('icon-clear')}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('gf-overlay', 'active')}></div>
        </>
    );
}

export default FilterModal;
