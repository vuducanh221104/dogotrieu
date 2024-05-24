import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from '@/styles/Contact.module.scss';
import { DividerSymbol, InstaIcon } from '@/components/Icons';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import { archivo } from '@/assets/FontNext';
const cx = classNames.bind(styles);

function PageContact() {
    return (
        <>
            <Container className={'container--narrow'}>
                <div className={cx('page-header')}>
                    <h1 className={`${cx('page-header-heading')} ${archivo.className}`}>CONTACT</h1>
                    <div className={cx('page-description')}>
                        <div className={cx('page-img-wrapper')}>
                            <center>
                                <img
                                    src="https://cdn.shopify.com/s/files/1/0285/8683/6027/files/11111_4fd5de6b-a245-41f7-8cc7-3a74da1a940e_2048x2048.jpg?v=1626441718"
                                    alt=""
                                />
                            </center>
                        </div>
                        <p>
                            {' '}
                            Our team is always ready to assist with any inquiry about the products or services mentioned
                            on our website. Whether it be a question on design, availability, or price we are
                            immediately at your disposal. We pride ourselves with being as transparent as possible with
                            our clients. Whether it be via email or phone, follow the form below to contact us!
                        </p>
                        <p>
                            We consider customer service another great opportunity to serve you better. As such, your
                            questions or concerns are a priority at Wood Furniture. Please feel free to contact us today
                            with any questions, concerns or requests.
                        </p>
                        <p>MON-FRI 9AM - 6PM EST</p>
                        <p>
                            <a href="/"> Tel: 844 443-WOOD</a>
                        </p>
                        <p>Brickell, Miami - FL - 33130</p>
                    </div>
                </div>
            </Container>
            <ViewSpecification />
        </>
    );
}

export default PageContact;
