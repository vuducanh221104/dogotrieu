import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminBreadCumbs } from '@/services/menuData/breadCrumbData';
import config from '@/config';

const breadcrumbs = adminBreadCumbs;

const BreadcrumbAdmin = () => {
    const pathname = usePathname();

    const urlAuth: string[] = [config.routesAdmin.login, config.routesAdmin.logout];
    const isAuthUrl = urlAuth.some((url: string) => pathname.startsWith(url));
    const breadcrumbTrail = breadcrumbs.filter((crumb: any) => pathname.startsWith(crumb.url));

    if (isAuthUrl) {
        return null;
    }

    // Đảm bảo luôn có URL mặc định
    const defaultUrl = config.routesAdmin.dashboard;
    const currentUrl = breadcrumbTrail[0]?.url || defaultUrl;
    const currentTitle = breadcrumbTrail[0]?.urlTile || 'Dashboard';
    const currentName = breadcrumbTrail[0]?.name || 'Dashboard';

    const items = [
        {
            title: <Link href={defaultUrl}>Home</Link>,
        },
        {
            title: <Link href={currentUrl}>{currentTitle}</Link>,
        },
    ];

    return (
        <>
            <Breadcrumb items={items} />
            <span className="ant-page-header-heading-title" style={{ textTransform: 'capitalize', fontSize: '2rem' }}>
                {currentName}
            </span>
        </>
    );
};

export default BreadcrumbAdmin;
