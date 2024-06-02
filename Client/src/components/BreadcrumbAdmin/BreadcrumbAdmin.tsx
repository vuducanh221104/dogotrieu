import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BreadcrumbAdmin = ({ breadcrumbs }: any) => {
    const pathname = usePathname();

    const breadcrumbTrail = breadcrumbs.filter((crumb: any) => pathname.startsWith(crumb.url));

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link href={breadcrumbs[0].url}>Home</Link>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                    <Link href={breadcrumbTrail[0].url}>{breadcrumbTrail[0].urlTile}</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <span className="ant-page-header-heading-title " style={{ textTransform: 'capitalize', fontSize: '2rem' }}>
                {breadcrumbTrail[0].name}
            </span>
        </>
    );
};

export default BreadcrumbAdmin;
