'use client';
import {
    ApplePayment,
    ATMPayment,
    ChervonDonwIcon,
    DiscoverPayment,
    FacebookIcon,
    InstaIcon,
    MasterPayment,
    PrinterestIcon,
    VisaPayment,
    YoutubeIcon,
} from '@/components/Icons';
import classNames from 'classnames/bind';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const [toggleIndex, setToggleIndex] = useState<null | number>(null);
    const [width, setWitdh] = useState(window.innerWidth);
    const [contentHeights, setContentHeights] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        setToggleIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    // DATA FOOTER ROW
    const footerItems = [
        {
            id: 0,
            title: 'ABOUT WOOD FURNITURE',
            content:
                'Wood Furniture was created with the intention of offering you an array of certified sustainably sourced materials for wood furniture, lighting and decor. We strive to be as eco-friendly as possible and are a proud partner of the National Forest Foundation. WOODFURNITURE.COM is part of the OROA Group.',
            classNameChild: 'text',
            height: '140px',
        },
        {
            id: 1,
            title: 'COMPANY',
            links: [
                { label: 'About us', url: '/' },
                { label: 'Contact', url: '/' },
                { label: 'Shipping & Returns', url: '/' },
                { label: 'Privacy Policy', url: '/' },
                { label: 'Terms of Service', url: '/' },
                { label: 'Refund policy', url: '/' },
            ],
            classNameChild: 'link',
            height: '181px',
        },
        {
            id: 2,
            title: 'EXPLORE',
            links: [
                { label: 'Trade', url: '/' },
                { label: 'Blog', url: '/' },
            ],
            classNameChild: 'link',
            height: '60px',
        },
        {
            id: 3,
            title: 'NEWSLETTER',
            content: 'Sign up for exclusive promotions, new collections, tips & much more',
            classNameChild: 'newsletter',
            height: '40px',
        },
    ];
    // HANDLE REPOSIVE
    const updateDimensions = () => {
        setWitdh(window.innerWidth);
    };
    useEffect(() => {
        const handleContentHeights = () => {
            if (width <= 641) {
                const heights = footerItems.map((_, index) => {
                    const contentRef = contentRefs.current[index];
                    if (contentRef && contentRef.current) {
                        return contentRef.current.scrollHeight;
                    }
                    return 0;
                });
                setContentHeights(heights);
            }
        };

        window.addEventListener('resize', updateDimensions);
        handleContentHeights();

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, [width]);

    const contentRefs = useRef<(React.RefObject<HTMLParagraphElement> | null)[]>(
        Array.from({ length: footerItems.length }, () => React.createRef()),
    );

    return (
        <div className={cx('footer-wrapper')}>
            <Container>
                <div className={cx('footer-inner')}>
                    <div className={cx('footer-block-list')}>
                        {footerItems.map((item, index) => (
                            <div key={item.id} className={cx('footer-block-item', item.classNameChild)}>
                                <h3 className={cx('footer-block-item-heading')} onClick={() => handleToggle(item.id)}>
                                    <p>{item.title}</p>
                                    <ChervonDonwIcon
                                        className={cx('icon-chervon-down', toggleIndex === index && 'active')}
                                    />
                                </h3>
                                {item.content && (
                                    <div
                                        className={cx('footer-block-item-content')}
                                        style={
                                            width <= 640
                                                ? toggleIndex === index
                                                    ? { height: `${contentHeights[index] + 10}px` }
                                                    : { height: '0' }
                                                : { height: 'auto' }
                                        }
                                    >
                                        <p
                                            className={cx('footer-block-item-content-p')}
                                            ref={contentRefs.current[index]}
                                        >
                                            {item.content}
                                        </p>
                                    </div>
                                )}
                                {item.links && (
                                    <div
                                        className={cx('footer-block-item-content')}
                                        style={
                                            width <= 640
                                                ? toggleIndex === index
                                                    ? { height: item.height }
                                                    : { height: '0' }
                                                : { height: 'auto' }
                                        }
                                    >
                                        <div className={cx('footer-collapsible-content')}>
                                            <ul className={cx('footer-block-content-link-list')}>
                                                {item.links.map((link, index) => (
                                                    <li key={index} className={cx('footer-block-content-link-item')}>
                                                        <a href={link.url}>{link.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <aside className={cx('footer-aside')}>
                        <div className={cx('footer-aside-signature')}>
                            <a href="/">© 2024 DOGOTRIEU.COM</a>
                        </div>
                        <div className={cx('footer-aside-socical-and-payment')}>
                            <div className={cx('footer-aside-social')}>
                                <h4>Follow Us</h4>
                                <ul className={cx('footer-aside-social-list')}>
                                    <li className={cx('footer-aside-social-item')}>
                                        <a href="/">
                                            <FacebookIcon className={cx('icon-social', 'facebook')} />
                                        </a>
                                    </li>
                                    <li className={cx('footer-aside-social-item')}>
                                        <a href="/">
                                            <InstaIcon className={cx('icon-social', 'instagram')} />
                                        </a>
                                    </li>
                                    <li className={cx('footer-aside-social-item')}>
                                        <a href="/">
                                            <PrinterestIcon className={cx('icon-social', 'pinterest')} />
                                        </a>
                                    </li>
                                    <li className={cx('footer-aside-social-item')}>
                                        <a href="/">
                                            <YoutubeIcon className={cx('icon-social', 'youtube')} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('footer-aside-payment')}>
                                <ul className={cx('footer-aside-payment-list')}>
                                    <li className={cx('footer-aside-payment-item')}>
                                        <ATMPayment />
                                    </li>
                                    <li className={cx('footer-aside-payment-item')}>
                                        <ApplePayment />
                                    </li>
                                    <li className={cx('footer-aside-payment-item')}>
                                        <DiscoverPayment />
                                    </li>
                                    <li className={cx('footer-aside-payment-item')}>
                                        <MasterPayment />
                                    </li>
                                    <li className={cx('footer-aside-payment-item')}>
                                        <VisaPayment />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </Container>
        </div>
    );
}

export default Footer;
