import { Metadata } from 'next';
import routes from '@/config/routes';
import { archivo } from '@/assets/FontNext';
import styles from './Privacy.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Chính Sách Bảo Mật & Điều Khoản Sử Dụng | Đồ Gỗ Triệu';
    const description = `Chính sách bảo mật và điều khoản sử dụng của Đồ Gỗ Triệu - Cam kết bảo vệ thông tin cá nhân của khách hàng và quy định sử dụng dịch vụ khi sử dụng website của chúng tôi.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/privacy`,
            images: [
                { url: image, alt: 'Chính Sách Bảo Mật & Điều Khoản Sử Dụng | DOGOTRIEU', width: 1200, height: 630 },
            ],
            siteName: 'Đồ Gỗ Triệu',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            site: `${routes.domain.nameCamel}`,
            images: [
                { url: image, alt: 'Chính Sách Bảo Mật & Điều Khoản Sử Dụng | DOGOTRIEU', width: 1200, height: 630 },
            ],
        },
        keywords: [
            'chính sách bảo mật đồ gỗ triệu',
            'điều khoản sử dụng đồ gỗ triệu',
            'bảo mật thông tin cá nhân',
            'privacy policy',
            'terms of use',
            'đăng nhập google đồ gỗ triệu',
            'bảo vệ dữ liệu người dùng',
        ],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
    };
}

function PagePrivacyGoogle() {
    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <div className={cx('content')}>
                    <div className={cx('privacy-section')}>
                        <h1 className={`${archivo.className} ${cx('heading')}`}>Privacy Policy</h1>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>What information do we collect?</h2>
                            <p>We collect information from you when you register on our site or fill out a form.</p>
                            <p>
                                When ordering or registering on our site, as appropriate, you may be asked to enter
                                your: name or e-mail address. You may, however, visit our site anonymously.
                            </p>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>What do we use your information for?</h2>
                            <p>Any of the information we collect from you may be used in one of the following ways:</p>
                            <ul className={cx('list')}>
                                <li>
                                    <strong>To send periodic emails:</strong> The email address you provide may be used
                                    to send you information, respond to inquiries, and/or other requests or questions.
                                </li>
                            </ul>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>How do we protect your information?</h2>
                            <p>
                                We implement a variety of security measures to maintain the safety of your personal
                                information when you enter, submit, or access your personal information.
                            </p>
                            <p>
                                We offer the use of a secure server. All supplied sensitive/credit information is
                                transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment
                                gateway providers database only to be accessible by those authorized with special access
                                rights to such systems, and are required to keep the information confidential.
                            </p>
                            <p>
                                After a transaction, your private information (credit cards, social security numbers,
                                financials, etc.) will not be stored on our servers.
                            </p>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Do we use cookies?</h2>
                            <p>Yes. We use them to understand and save your preferences for future visits.</p>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Do we disclose any information to outside parties?</h2>
                            <p>
                                We do not sell, trade, or otherwise transfer to outside parties your personally
                                identifiable information. This does not include trusted third parties who assist us in
                                operating our website, conducting our business, or servicing you, so long as those
                                parties agree to keep this information confidential.
                            </p>
                            <p>
                                We may also release your information when we believe release is appropriate to comply
                                with the law, enforce our site policies, or protect ours or others rights, property, or
                                safety. However, non-personally identifiable visitor information may be provided to
                                other parties for marketing, advertising, or other uses.
                            </p>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Data Deletion Instructions</h2>
                            <p>
                                You have the right, under certain circumstances, to obtain the erasure of your Data from
                                us. Any requests to exercise your rights can be directed to us through the contact
                                details provided in this document. These requests can be exercised free of charge and
                                will be addressed by us as early as possible and always within one month.
                            </p>
                        </div>
                    </div>

                    <div className={cx('terms-section')}>
                        <h1 className={`${archivo.className} ${cx('heading')}`}>Terms of Use</h1>

                        <div className={cx('section')}>
                            <p>
                                These terms and conditions ("Agreement") set forth the general terms and conditions of
                                your use of the Đồ Gỗ Triệu website ("Website" or "Service") and any of its related
                                products and services (collectively, "Services"). This Agreement is legally binding
                                between you ("User", "you" or "your") and this Service operator ("Operator", "we", "us"
                                or "our").
                            </p>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Accounts and membership</h2>
                            <p>
                                You must be at least 13 years of age to use the Website and Services. By using the
                                Website and Services and by agreeing to this Agreement you warrant and represent that
                                you are at least 13 years of age.
                            </p>
                            <p>
                                If you create an account on the Website, you are responsible for maintaining the
                                security of your account and you are fully responsible for all activities that occur
                                under the account and any other actions taken in connection with it.
                            </p>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Prohibited uses</h2>
                            <p>
                                In addition to other terms as set forth in the Agreement, you are prohibited from using
                                the Website and Services or Content:
                            </p>
                            <ul className={cx('list')}>
                                <li>for any unlawful purpose;</li>
                                <li>to solicit others to perform or participate in any unlawful acts;</li>
                                <li>
                                    to violate any international, federal, provincial or state regulations, rules, laws,
                                    or local ordinances;
                                </li>
                                <li>
                                    to infringe upon or violate our intellectual property rights or the intellectual
                                    property rights of others;
                                </li>
                                <li>
                                    to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
                                    discriminate;
                                </li>
                                <li>to submit false or misleading information;</li>
                                <li>to upload or transmit viruses or any other type of malicious code;</li>
                                <li>to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
                            </ul>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Limitation of liability</h2>
                            <p>
                                To the fullest extent permitted by applicable law, in no event will the Operator, its
                                affiliates, directors, officers, employees, agents, suppliers or licensors be liable to
                                any person for any indirect, incidental, special, punitive, cover or consequential
                                damages.
                            </p>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Changes and amendments</h2>
                            <p>
                                We reserve the right to modify this Agreement or its terms at any time, effective upon
                                posting of an updated version of this Agreement on the Website. When we do, we will
                                revise the updated date at the bottom of this page.
                            </p>
                        </div>
                    </div>

                    <div className={cx('footer-section')}>
                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Your Consent</h2>
                            <p>By using our site, you consent to our Privacy Policy and Terms of Use.</p>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Last Modified</h2>
                            <p>This policy and terms were last modified on 08/03/2024</p>
                        </div>

                        <div className={cx('section')}>
                            <h2 className={cx('sub-heading')}>Contacting Us</h2>
                            <p>
                                If there are any questions regarding this privacy policy and terms of use, you may
                                contact us using the information below:
                            </p>
                            <p>Email: dogotrieu.com@gmail.com</p>
                            <p>Website: https://dogotrieu.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PagePrivacyGoogle;
