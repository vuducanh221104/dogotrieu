'use client';
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    FolderAddOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Avatar, Drawer, Breadcrumb } from 'antd';
import Link from 'next/link';
import config from '@/config';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import BreadcrumbAdmin from '@/components/BreadcrumbAdmin';

const { Header, Sider, Content } = Layout;

const menuItems = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: <Link href="/admin/dashboard">Dashboard</Link>,
    },
    {
        key: 'sub1',
        icon: <FolderAddOutlined />,
        label: 'Products',
        children: [
            { key: '2', label: <Link href="/admin/product/list">List Product</Link> },
            { key: '3', label: <Link href="/admin/product/add">Add Product</Link> },
        ],
    },
    // {
    //     key: 'sub2',
    //     icon: <ShoppingCartOutlined />,
    //     label: 'Orders',
    //     children: [{ key: '4', label: <Link href={config.routesAdmin.orderList}>List Order</Link> }],
    // },
    // {
    //     key: 'sub3',
    //     icon: <UserOutlined />,
    //     label: 'User',
    //     children: [
    //         { key: '5', label: <Link href={config.routesAdmin.userList}>List User</Link> },
    //         { key: '6', label: <Link href={config.routesAdmin.userAdd}>Add User</Link> },
    //     ],
    // },
    {
        key: 'sub4',
        icon: <FolderAddOutlined />,
        label: 'Edit',
        children: [
            {
                key: 'sub5',
                label: 'Home',
                children: [
                    { key: '7', label: <Link href={config.routesAdmin.imageHomeBanner}>Image Banner</Link> },
                    { key: '8', label: <Link href={config.routesAdmin.imageHomeCustomer}>Image Customer</Link> },
                    { key: '9', label: <Link href={config.routesAdmin.featuredProduct}>Featured Products</Link> },
                ],
            },
            {
                key: 'sub6',
                label: 'Category',
                children: [
                    { key: '10', label: <Link href="/">Category List</Link> },
                    { key: '12', label: <Link href="/">Add Box Product</Link> },
                ],
            },
        ],
    },
    {
        key: 'sub7',
        icon: <FolderAddOutlined />,
        label: 'Blogs/News',
        children: [{ key: '13', label: <Link href={config.routesAdmin.blogsList}>List Blogs/News</Link> }],
    },
];

const breadcrumbs = [
    { url: '/admin/dashboard', urlTile: 'Dashboard', name: 'Dashboard' },
    { url: '/admin/product/list', urlTile: 'Product', name: 'List Product' },
    { url: '/admin/product/add', urlTile: 'Product', name: 'Add Product' },
];
const AdminLayout = ({ children }: any) => {
    const [collapsed, setCollapsed] = useState(false);
    const [visible, setVisible] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Drawer
                title={false}
                placement={'left'}
                closable={true}
                onClose={() => setVisible(false)}
                open={visible}
                key={'left'}
                width={250}
            >
                <Layout>
                    <Sider
                        trigger={null}
                        width={210}
                        className={'sider-primary ant-layout-sider-primarys bg-slate-900'}
                    >
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
                    </Sider>
                </Layout>
            </Drawer>

            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {}}
                trigger={null}
                width={210}
                style={{ minHeight: '100vh' }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, height: 'auto' }}>
                    <Row
                        className="!p-5 m-0 lg:!mt-6 lg:!mx-10 md:!mt-4 md:!mx-8 sm:!mt-4"
                        style={{
                            background: colorBgContainer,
                        }}
                    >
                        <Col xs={6} sm={6} md={0}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setVisible(true)}
                                style={{ fontSize: '16px', width: 64, height: 64 }}
                                className={'btn-sidebar-toggler lg:!hidden'}
                            />
                        </Col>
                        <Col span={6} xs={18} sm={18} md={20}>
                            <div className="ant-page-header-heading">
                                <BreadcrumbAdmin breadcrumbs={breadcrumbs} />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={4} className="max-md:!hidden">
                            <Avatar size={'default'} icon={<UserOutlined />} /> Admin
                        </Col>
                    </Row>
                </Header>

                <div className="ant-container-content-custom- flex-auto min-h-0 p-0 !mx-10 !my-16  max-sm:!mx-0 max-sm:!my-0 xl:!m-24 xl:!my-20">
                    <Content className="!p-14 rounded-lg bg-[#eaeaea96] max-sm:!p-11">
                        <ProgressBar>{children}</ProgressBar>
                    </Content>
                </div>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
