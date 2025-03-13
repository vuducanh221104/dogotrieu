'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { Form, Input, Tag } from 'antd';
import Link from 'next/link';
import AuthSpinLoading from '@/components/AuthSpinLoading';
import { archivo } from '@/assets/FontNext';
import styles from '@/styles/Auth.module.scss';
import { updateInfoUser } from '@/services/authServices';
import { updatePhoneNumber, updateFullName } from '@/redux/authSlice';
import Loading from '@/components/Loading';
import useMultiCooldown from '@/utils/hookMultiCooldown';
import routes from '@/config/routes';
import React from 'react';
import { AuthState, UpdateInfoFormValues, ApiError, CooldownHook } from '@/types/client';
import { Dispatch } from 'redux';

const cx = classNames.bind(styles);

function AccountInfoContent() {
    const [form] = Form.useForm<UpdateInfoFormValues>();
    const { currentUser } = useSelector((state: AuthState) => state.auth.login);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const dispatch: Dispatch = useDispatch();

    const {
        cooldown: infoCooldown,
        startCooldown: startInfoCooldown,
        checkCooldown,
    } = useMultiCooldown('infoCooldown') as CooldownHook;

    // Set initial values for form
    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue({
                phoneNumber: currentUser.phone_number,
                fullName: currentUser.full_name,
            });
        }
    }, [currentUser, form]);

    // Kiểm tra cooldown khi component mount và mỗi khi có thay đổi
    useEffect(() => {
        checkCooldown();
    }, [checkCooldown]);

    const handleSubmit = async () => {
        // Kiểm tra lại cooldown trước khi submit
        if (infoCooldown > 0 || !currentUser) {
            return;
        }

        setLoading(true);
        setSuccess(false);
        try {
            const values = await form.validateFields();
            const hasPhoneChanged = values.phoneNumber !== currentUser.phone_number;
            const hasNameChanged = values.fullName !== currentUser.full_name;

            if (!hasPhoneChanged && !hasNameChanged) {
                setLoading(false);
                return;
            }

            // Chỉ gửi những giá trị đã thay đổi
            const response = await updateInfoUser(
                currentUser._id,
                hasPhoneChanged ? values.phoneNumber : undefined,
                hasNameChanged ? values.fullName : undefined,
            );

            if (response) {
                if (hasPhoneChanged) {
                    dispatch(updatePhoneNumber(values.phoneNumber));
                }
                if (hasNameChanged) {
                    dispatch(updateFullName(values.fullName));
                }
                setSuccess(true);
                startInfoCooldown(); // Bắt đầu cooldown khi cập nhật thành công
            }
        } catch (error: ApiError | any) {
            console.error('Failed to update:', error);
        } finally {
            setLoading(false);
        }
    };

    const userInfoList = [
        {
            label: 'Họ và Tên',
            value: (
                <Form.Item
                    name="fullName"
                    rules={[
                        { required: true, message: 'Vui lòng nhập họ và tên!' },
                        {
                            pattern:
                                /^[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
                            message: 'Họ tên chỉ được chứa chữ cái và khoảng trắng!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập Họ và Tên" disabled={infoCooldown > 0} />
                </Form.Item>
            ),
        },
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
                    ]}
                >
                    <Input placeholder="Nhập Số Điện Thoại" disabled={infoCooldown > 0} />
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
                    {currentUser?.type === 'WEBSITE' && (
                        <div className={`${archivo.className} ${cx('password-change')}`}>
                            <Link href={routes.user.changePasswordInfo}>
                                <h2>Đổi Mật Khẩu</h2>
                            </Link>
                        </div>
                    )}
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

function InfoUser() {
    return (
        <Suspense fallback={<Loading height="300px" />}>
            <AccountInfoContent />
        </Suspense>
    );
}

export default InfoUser;
