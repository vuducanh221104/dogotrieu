'use client';
import React, { useRef, useState } from 'react';
import { SearchOutlined, DeleteOutlined, EditOutlined, FormOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Dropdown, InputRef, Menu, Modal, Tag, Tooltip } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import transformTime from '@/utils/transformTime';
import { productDelete, productGetAll } from '@/services/productServices';
import Link from 'next/link';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { useMessageNotify } from '@/components/MessageNotify';
import config from '@/config';
import InfoProduct from '@/Layout/AdminLayout/Product/InfoProduct';
import { CldImage } from 'next-cloudinary';
import EditProduct from '@/Layout/AdminLayout/Product/EditProduct';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

type DataIndex = keyof DataType;

function PageListProduct() {
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();

    let { data, isLoading, error, mutate } = productGetAll();
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isModalDelete, setIsModalDelete] = useState<string | null>(null);
    const [infoProduct, setInfoProduct] = useState<DataType | null>(null);
    const [isInfoModalVisible, setIsInfoModalVisible] = useState<boolean>(false);
    const [editingProduct, setEditingProduct] = useState<DataType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const searchInput = useRef<InputRef>(null);
    data = data?.map((item: any, index: number) => ({
        ...item,
        index: index + 1,
    }));

    //Handle Modal Info
    //Handle Info
    const handleInfo = (product: DataType) => {
        setInfoProduct(product);
        setIsInfoModalVisible(true);
    };

    //Handle Delete
    const handleDeleteCickOk = async (product_id: string, product_type_id: string) => {
        setLoading(true);
        const newData = data.filter((product: any) => product._id !== product_id);
        mutate(newData, false);

        try {
            await productDelete(product_id, product_type_id);
            setIsModalDelete(null);
            mutate();
            messageCustomSuccess('Delete Successfully');
        } catch (error) {
            console.error('Failed to delete product:', error);
            messageCustomError('Delete Error');
        } finally {
            setLoading(false);
        }
    };

    //Handle Classic
    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleEdit = (product: DataType) => {
        setEditingProduct(product);
        setIsModalVisible(true);
    };

    const priceFormatter = (price: any) => {
        const formatter = new Intl.NumberFormat('vi-VN');
        return formatter.format(price.original);
    };

    const getColumnSearchProps = (dataIndex: any, customRender?: (text: any, record: any) => JSX.Element) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: any) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value: any, record: any) => {
            const recordValue = dataIndex.split('.').reduce((acc: any, part: string) => acc && acc[part], record);
            return recordValue ? recordValue.toString().toLowerCase().includes(value.toString().toLowerCase()) : false;
        },
        onFilterDropdownOpenChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text: any, record: any) => {
            const recordValue = dataIndex.split('.').reduce((acc: any, part: string) => acc && acc[part], record);
            const highlight =
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={recordValue ? recordValue.toString() : ''}
                    />
                ) : (
                    text
                );

            return customRender ? customRender(highlight, record) : highlight;
        },
    });

    //Columns Render
    const columns: any = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 50,
            sorter: (a: any, b: any) => a.index - b.index,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: 80,
            ...getColumnSearchProps('_id'),
            render: (text: any) => (
                <Tooltip title={text}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 50 }}>
                        {text}
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'SKU',
            dataIndex: ['product_type_id', 'sku'],
            key: 'product_type_id.sku',
            width: 80,
            ...getColumnSearchProps('product_type_id.sku'),
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumb',
            key: 'thumb',
            width: 110,
            render: (thumb: string) => (
                <div className="flex justify-center">
                    <CldImage
                        width={'50'}
                        height={'50'}
                        src={thumb}
                        alt="thumbnail"
                        style={{ width: '50px', height: '50px' }}
                    />
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            ...getColumnSearchProps('name'),
            render: (text: any) => (
                <Tooltip title={text}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
                        {text}
                    </div>
                </Tooltip>
            ),
            sorter: (a: any, b: any) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (price: any) => (
                <span style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
                    <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                        {`${priceFormatter(price)} ${price.currency}`}
                    </p>
                    <span
                        style={{ textDecoration: 'line-through', marginRight: '4px', color: '#999', fontWeight: '400' }}
                    >
                        <p style={{ fontSize: '1.3rem', textDecoration: 'line-through' }}>
                            {`${priceFormatter(price)} ${price.currency}`}
                        </p>
                    </span>
                </span>
            ),
            sorter: (a: any, b: any) => a.price.original - b.price.original,
            sortDirections: ['descend', 'ascend'],
            with: '50%',
        },
        {
            title: 'Material',
            dataIndex: 'material_id',
            key: 'material_id',
            width: 160,
            render: (material: any) => (
                <div>
                    {material.map((mat: any, index: number) => (
                        <div key={index}>
                            <Tooltip title={mat.parent_id?.name}>
                                <Tag color="#f50">{mat.name}</Tag>
                            </Tooltip>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category_id',
            key: 'category_id',
            width: 170,
            render: (material: any) => (
                <div>
                    {material.map((mat: any, index: number) => (
                        <div key={index}>
                            <Tooltip title={mat.parent_id?.name}>
                                <Tag color="#108ee9">{mat.name}</Tag>
                            </Tooltip>
                        </div>
                    ))}
                </div>
            ),
        },
        // {
        //     title: 'Tags',
        //     dataIndex: ['product_type_id', 'tags'],
        //     key: 'product_type_id.tags',
        //     width: 100,
        //     render: (tags: string[]) => (
        //         <>
        //             {tags.map((tag, index) => (
        //                 <Tag color={'volcano'} key={index}>
        //                     {tag}
        //                 </Tag>
        //             ))}
        //         </>
        //     ),
        //     sortDirections: ['descend', 'ascend'],
        // },
        // SHIP
        // {
        //     title: 'Ship',
        //     dataIndex: 'ship',
        //     key: 'ship',
        //     width: 100,
        //     ...getColumnSearchProps('ship'),
        //     render: (text: any) => (text === 0 ? <Tag color="#f50">null</Tag> : <Tag color="#87d068">QUICK SHIP</Tag>),
        //     sortDirections: ['descend', 'ascend'],
        // },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            ...getColumnSearchProps('quantity'),
            sorter: (a: any, b: any) => a.quantity - b.quantity,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 170,
            render: (text: any, record: any) => <span>{transformTime(record.created_at)}</span>,
            sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Updated',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 170,
            render: (text: any, record: any) => <span>{transformTime(record.updated_at)}</span>,
            sorter: (a: any, b: any) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 80,
            fixed: 'right',
            render: (text: any, record: any) => (
                <div className="flex justify-center">
                    <Dropdown
                        trigger={['click']}
                        overlay={
                            <Menu>
                                <Menu.Item key="edit" onClick={() => handleEdit(record)}>
                                    <EditOutlined
                                        style={{
                                            color: '#ff4d4f',
                                            cursor: 'pointer',
                                            fontSize: '1.4rem',
                                            marginRight: '6px',
                                        }}
                                    />
                                    Edit
                                </Menu.Item>
                                <Menu.Item key="info" onClick={() => handleInfo(record)}>
                                    <InfoCircleOutlined
                                        style={{
                                            color: '#108ee9',
                                            cursor: 'pointer',
                                            fontSize: '1.4rem',
                                            marginRight: '6px',
                                        }}
                                    />
                                    Info
                                </Menu.Item>
                                <Menu.Item key="delete" onClick={() => setIsModalDelete(record._id)}>
                                    <DeleteOutlined
                                        style={{
                                            color: '#ff4d4f',
                                            cursor: 'pointer',
                                            fontSize: '1.4rem',
                                            marginRight: '6px',
                                        }}
                                    />
                                    Delete
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <div className="cursor-pointer">
                            <FormOutlined />
                        </div>
                    </Dropdown>
                    <Modal
                        title="Bạn Có Chắc Chắn Muốn Xóa Không ? "
                        visible={isModalDelete === record._id}
                        onOk={() => {
                            handleDeleteCickOk(record._id, record.product_type_id._id);
                        }}
                        onCancel={() => setIsModalDelete(null)}
                        style={{ marginTop: '150px' }}
                    >
                        <p>
                            Xóa : {record.name}
                            <span style={{ fontWeight: '700', fontSize: '1.5rem' }}> {record.actionDelete}</span>
                        </p>
                    </Modal>
                </div>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            {isLoading || (loading && <ModalLoadingAdmin />)}
            <div>
                <div className="flex justify-end items-center mr-6 mb-2">
                    <Link href={config.routesAdmin.productAdd}>
                        <Button type="primary">Add Product</Button>
                    </Link>
                </div>
                <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
                {editingProduct && (
                    <EditProduct
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        product={editingProduct}
                        mutate={mutate}
                    />
                )}
                {infoProduct && (
                    <InfoProduct
                        visible={isInfoModalVisible}
                        onClose={() => setIsInfoModalVisible(false)}
                        product={infoProduct}
                    />
                )}
            </div>
        </>
    );
}

export default PageListProduct;
