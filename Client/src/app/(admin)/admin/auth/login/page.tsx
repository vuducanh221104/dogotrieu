'use client';
import images from '@/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { changeUser } from '@/redux/authSlice';
import { useRouter } from 'next-nprogress-bar';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import config from '@/config';
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function PageAdminLogin() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [auth, setAuth] = useState<boolean>(false);
    const { token } = useToken();
    const screens = useBreakpoint();

    const styles: any = {
        container: {
            margin: '0 auto',
            padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
            width: '380px',
        },
        footer: {
            marginTop: token.marginLG,
            textAlign: 'center',
            width: '100%',
        },
        forgotPassword: {
            float: 'right',
        },
        header: {
            marginBottom: token.marginXL,
        },
        section: {
            alignItems: 'center',
            backgroundColor: token.colorBgContainer,
            display: 'flex',
            height: screens.sm ? '100vh' : 'auto',
            padding: screens.md ? `${token.sizeXXL}px 0px` : '0px',
        },
        text: {
            color: token.colorTextSecondary,
        },
        title: {
            fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
        },
    };

    const authAccount = {
        name: 'admin',
        password: process.env.NEXT_PUBLIC_AUTH_ACCOUNT,
    };

    const onFinish = (values: any) => {
        setLoading(true);
        if (values.name === authAccount.name && values.password === authAccount.password) {
            setAuth(false);
            dispatch(
                changeUser({
                    name: 'admin',
                    role: 3,
                }),
            );
            router.push(config.routesAdmin.dashboard);
        } else {
            setAuth(true);
            setLoading(false);
        }
    };
    if (loading) {
        return <ModalLoadingAdmin />;
    }
    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <Image src={images._favicon} alt="Logo" height={30} className="mr-2" />

                    <Title style={styles.title}>Login</Title>
                    <Text style={styles.text}>Welcome You To Đồ Gỗ Triệu Dashboard</Text>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    {auth && (
                        <Link
                            type="danger"
                            href="#"
                            style={{
                                marginTop: '-12px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            Name Or Password Failed
                        </Link>
                    )}

                    <Form.Item>
                        <Form.Item valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Link style={styles.forgotPassword} href="#">
                            Forgot password?
                        </Link>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '0px' }}>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
