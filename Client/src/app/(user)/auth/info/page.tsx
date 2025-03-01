'use client';
import { Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Form, Input, Tag } from 'antd';
import Link from 'next/link';
import AuthSpinLoading from '@/components/AuthSpinLoading';
import { archivo } from '@/assets/FontNext';
import styles from '@/styles/Auth.module.scss';
import { authUpdatePhoneNumber } from '@/services/authServices';
import { updatePhoneNumber } from '@/redux/authSlice';
import Loading from '@/components/Loading';
import useMultiCooldown from '@/utils/hookMultiCooldown';

const cx = classNames.bind(styles);

function AccountInfoContent() {
    const [form] = Form.useForm();
    const { currentUser } = useSelector((state: any) => state.auth.login);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Sử dụng hook cooldown
    const { cooldown: infoCooldown, startCooldown: startInfoCooldown } = useMultiCooldown('infoCooldown');

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const values = await form.validateFields();
            if (values.phoneNumber === currentUser.phone_number) {
                setLoading(false);
                return;
            }

            startInfoCooldown();

            await authUpdatePhoneNumber(currentUser._id, values.phoneNumber);
            updatePhoneNumber(values.phoneNumber);
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            setLoading(false);
            console.error('Failed to update phone number:', error);
        }
    };

    const userInfoList = [
        { label: 'Tên đăng nhập', value: currentUser?.user_name },
        { label: 'Email', value: currentUser?.email },
        {
            label: 'Cấp bậc',
            value: (
                <Tag color="#dc3545">
                    {currentUser?.role === 0 && 'Thành Viên'}
                    {currentUser?.role === 1 && 'Quản Lý'}
                    {currentUser?.role === 2 && 'Admin'}
                </Tag>
            ),
        },
        {
            label: 'Phone',
            value: (
                <Form.Item
                    name="phoneNumber"
                    rules={[
                        { required: true, message: 'Nhập số điện thoại của bạn !' },
                        {
                            pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/,
                            message: 'Số điện thoại không hợp lệ!',
                        },
                        () => ({
                            validator(_, value) {
                                if (value && value === currentUser?.phone_number) {
                                    return Promise.reject('Vui lòng nhập số điện thoại khác!');
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input defaultValue={currentUser?.phone_number} type="text" placeholder="Nhập Số Điện Thoại" />
                </Form.Item>
            ),
        },
    ];

    return (
        <div className={cx('account-wrapper')}>
            <AuthSpinLoading loading={loading} />
            <div className={cx('container')}>
                <header className={cx('account-header')}>
                    <h1 className={cx('account-heading')}>Tài Khoản</h1>
                </header>
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <div className={`${archivo.className} ${cx('account-details')}`}>
                        {userInfoList.map((item, index) => (
                            <div key={index} className={cx('form-warpper', 'row')}>
                                <label className={cx('form-label', 'col-sm-3')}>{item.label}:</label>
                                <div className={cx('form-description', 'col-sm-9')}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                    <div className={`${archivo.className} ${cx('password-change')}`}>
                        <Link href={'/auth/info/changePassword'}>
                            <h2>Đổi Mật Khẩu</h2>
                        </Link>
                    </div>
                    <Form.Item>
                        <button
                            className={`${archivo.className} ${cx(
                                'btn-submit',
                                infoCooldown > 0 && 'verify-clicked',
                            )} button `}
                            id="btn-submit"
                            type="submit"
                            disabled={infoCooldown > 0}
                        >
                            {infoCooldown > 0 ? `Cập Nhật (${infoCooldown}s)` : 'Cập Nhật'}
                        </button>
                    </Form.Item>
                </Form>
                {success && (
                    <p className={cx('error-message', 'info', 'color-success')}>Thay Đổi Số Điện Thoại Thành Công</p>
                )}
            </div>
        </div>
    );
}

function AccountInfo() {
    return (
        <Suspense fallback={<Loading height="300px" />}>
            <AccountInfoContent />
        </Suspense>
    );
}

export default AccountInfo;
