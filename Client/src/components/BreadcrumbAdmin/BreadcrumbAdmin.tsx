import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BreadcrumbAdmin = ({ breadcrumbs }: any) => {
    const pathname = usePathname();

    const breadcrumbTrail = breadcrumbs.filter((crumb: any) => pathname.startsWith(crumb.url));
    console.log(breadcrumbTrail);
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link href="/">Home</Link>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                    <Link href={breadcrumbTrail[0].url}>{breadcrumbTrail[0].urlTile}</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <span className="ant-page-header-heading-title" style={{ textTransform: 'capitalize' }}>
                {breadcrumbTrail[0].name}
            </span>
        </>
    );
};

export default BreadcrumbAdmin;
