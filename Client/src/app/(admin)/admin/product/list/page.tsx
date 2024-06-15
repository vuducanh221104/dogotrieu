'use client';
import React, { useRef, useState } from 'react';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { InputRef, Modal, TableColumnsType, TableColumnType, Tag, Tooltip } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import transformTime from '@/utils/transformTime';
import EditProduct from '@/componentsPage/EditProduct';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

type DataIndex = keyof DataType;

const data: any = [
    {
        _id: '66667765f46427b573abf8c5',
        product_type_id: {
            _id: '6662cb97fa6dce2c12115c23',
            sku: 'CA123',
            description: `The Mina natural rattan varnished armchair has a
            cleverly structured reclined sitting position which
            provides excellent back support and a super relaxing
            sitting experience. Made from woven vegetable fibers,
            this classic Asian chair can give your living space a
            lift with its natural materials and light colors.

            *  W26 x D28 x H29 in | Weight 9lbs
            * W65 x D72 x H73 cm | Weight 4kgs</li>
            * W26 x D28 x H29 in | Weight 9lbs
            * 5-year warranty & exclusive French design

            The Mina natural rattan varnished armchair has a
            cleverly structured reclined sitting position which
            provides excellent back support and a super relaxing
            sitting experience. Made from woven vegetable fibers,
            this classic Asian chair can give your living space a
            lift with its natural materials and light colors.

            *  W26 x D28 x H29 in | Weight 9lbs
            * W65 x D72 x H73 cm | Weight 4kgs</li>
            * W26 x D28 x H29 in | Weight 9lbs
            * 5-year warranty & exclusive French design`,
            tags: ['go', 'ghe-ban', '123'],
            dimensions: {
                width: 10,
                height: 20,
                length: 30,
                unit: 'cm',
            },
            images: [
                'https://woodfurniture.com/cdn/shop/files/ELE95652_1000x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_1_600x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_3_600x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_2_600x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_3_600x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_1000x.png?v=1711449715',
            ],
            created_at: '2024-06-07T08:57:59.966Z',
            __v: 0,
            updated_at: '2024-06-07T08:57:59.966Z',
            update_at: '2024-06-14T08:18:27.987Z',
        },
        name: 'Black-Framed Outdoor Adjustable Lounger | Ethnicraft Jack',
        price: {
            original: 5000000,
            discount: 4000000,
            discount_quantity: 10,
            currency: 'USD',
        },
        thumb: 'https://woodfurniture.com/cdn/shop/products/ELE95901_1_600x.png?v=1702570690',
        ship: 1,
        quantity: 100,
        slug: 'sample-product-123-45',
        material_id: [
            {
                _id: '666520c8d87c426ae42b85f0',
                name: 'Gỗ Công Nghiệp',
                parent_id: {
                    _id: '66651ed0a909caa6957e37ea',
                    name: 'Gỗ',
                    slug: 'go',
                },
                slug: 'go-cong-nghiep',
            },
        ],
        category_id: [
            {
                _id: '666557e3c3a93469c8e5a597',
                name: 'Bàn & Ghế Làm Việc',
                parent_id: {
                    _id: '66655754c3a93469c8e5a58a',
                    name: 'Tất Cả Bàn Ghế',
                    slug: 'tat-ca-ban-ghe',
                },
                slug: 'ban-&-ghe-lam-viec',
            },
            {
                _id: '66657750e54c81ef08cf5cb5',
                name: 'Bàn Ngoài Trời',
                parent_id: {
                    _id: '66657736e54c81ef08cf5cb3',
                    name: 'Ngoài Trời',
                    slug: 'ngoai-troi',
                },
                slug: 'ban-ngoai-troi',
            },
        ],
        deleted: false,
        created_at: '2024-06-10T03:50:32.875Z',
        updated_at: '2024-06-10T03:50:32.875Z',
    },
    {
        _id: '66667765f46427b573abf8c5',
        product_type_id: {
            _id: '6662cb97fa6dce2c12115c23',
            sku: 'CA123',
            description: `The Mina natural rattan varnished armchair has a
            cleverly structured reclined sitting position which
            provides excellent back support and a super relaxing
            sitting experience. Made from woven vegetable fibers,
            this classic Asian chair can give your living space a
            lift with its natural materials and light colors.

            *  W26 x D28 x H29 in | Weight 9lbs
            * W65 x D72 x H73 cm | Weight 4kgs</li>
            * W26 x D28 x H29 in | Weight 9lbs
            * 5-year warranty & exclusive French design

            The Mina natural rattan varnished armchair has a
            cleverly structured reclined sitting position which
            provides excellent back support and a super relaxing
            sitting experience. Made from woven vegetable fibers,
            this classic Asian chair can give your living space a
            lift with its natural materials and light colors.

            *  W26 x D28 x H29 in | Weight 9lbs
            * W65 x D72 x H73 cm | Weight 4kgs</li>
            * W26 x D28 x H29 in | Weight 9lbs
            * 5-year warranty & exclusive French design`,
            tags: ['go', 'ghe-ban', '123'],
            dimensions: {
                width: 10,
                height: 20,
                length: 30,
                unit: 'cm',
            },
            images: [
                'https://woodfurniture.com/cdn/shop/files/ELE95652_1000x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_1_600x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_3_600x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_2_600x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_3_600x.png?v=1711449715',
                'https://woodfurniture.com/cdn/shop/files/ELE95652_1000x.png?v=1711449715',
            ],
            created_at: '2024-06-07T08:57:59.966Z',
            __v: 0,
            updated_at: '2024-06-07T08:57:59.966Z',
            update_at: '2024-06-14T08:18:27.987Z',
        },
        name: '123123',
        price: {
            original: 5000000,
            discount: 4000000,
            discount_quantity: 10,
            currency: 'USD',
        },
        thumb: 'https://woodfurniture.com/cdn/shop/products/ELE95901_1_600x.png?v=1702570690',
        ship: 1,
        quantity: 100,
        slug: 'sample-product-123-45',
        material_id: [
            {
                _id: '666520c8d87c426ae42b85f0',
                name: 'Gỗ Công Nghiệp',
                parent_id: {
                    _id: '66651ed0a909caa6957e37ea',
                    name: 'Gỗ',
                    slug: 'go',
                },
                slug: 'go-cong-nghiep',
            },
        ],
        category_id: [
            {
                _id: '666557e3c3a93469c8e5a597',
                name: 'Bàn & Ghế Làm Việc',
                parent_id: {
                    _id: '66655754c3a93469c8e5a58a',
                    name: 'Tất Cả Bàn Ghế',
                    slug: 'tat-ca-ban-ghe',
                },
                slug: 'ban-&-ghe-lam-viec',
            },
            {
                _id: '66657750e54c81ef08cf5cb5',
                name: 'Bàn Ngoài Trời',
                parent_id: {
                    _id: '66657736e54c81ef08cf5cb3',
                    name: 'Ngoài Trời',
                    slug: 'ngoai-troi',
                },
                slug: 'ban-ngoai-troi',
            },
        ],
        deleted: false,
        created_at: '2024-06-10T03:50:32.875Z',
        updated_at: '2024-06-10T03:50:32.875Z',
    },
];

function PageListProduct() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<DataType | null>(null);
    const searchInput = useRef<InputRef>(null);

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

    const columns: any = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: 50,
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
            width: 50,
            ...getColumnSearchProps('product_type_id.sku'),
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumb',
            key: 'thumb',
            width: 50,
            render: (thumb: string) => <img src={thumb} alt="thumbnail" style={{ width: '50px', height: '50px' }} />,
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
            width: 200,
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
            width: 200,
            render: (material: any) => (
                <div>
                    {material.map((mat: any, index: number) => (
                        <div key={index}>
                            <Tooltip title={mat.parent_id.name}>
                                <Tag color="#f50">{mat.name}</Tag>
                            </Tooltip>
                        </div>
                    ))}
                </div>
            ),
            sorter: (a: any, b: any) => a.material_id.length - b.material_id.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Category',
            dataIndex: 'category_id',
            key: 'category_id',
            width: 200,
            render: (material: any) => (
                <div>
                    {material.map((mat: any, index: number) => (
                        <div key={index}>
                            <Tooltip title={mat.parent_id.name}>
                                <Tag color="#108ee9">{mat.name}</Tag>
                            </Tooltip>
                        </div>
                    ))}
                </div>
            ),
            sorter: (a: any, b: any) => a.category_id.length - b.category_id.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text: any, record: any) => <span>{transformTime(record.created_at)}</span>,
            sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Updated',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text: any, record: any) => <span>{transformTime(record.updated_at)}</span>,
            sorter: (a: any, b: any) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Tags',
            dataIndex: ['product_type_id', 'tags'],
            key: 'product_type_id.tags',
            render: (tags: string[]) => (
                <>
                    {tags.map((tag, index) => (
                        <Tag color={'volcano'} key={index}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
            sorter: (a: any, b: any) => a.tags.length - b.tags.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Ship',
            dataIndex: 'ship',
            key: 'ship',
            width: 50,
            ...getColumnSearchProps('ship'),
            render: (text: any) => (text === 0 ? <Tag color="#f50">null</Tag> : <Tag color="#87d068">QUICK SHIP</Tag>),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 50,
            ...getColumnSearchProps('quantity'),
            sorter: (a: any, b: any) => a.quantity - b.quantity,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 150,
            render: (text: any, record: DataType) => (
                <div className="flex justify-center items-center">
                    <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: '10px' }}>
                        Edit
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
            {editingProduct && (
                <EditProduct
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    product={editingProduct}
                />
            )}
        </>
    );
}

export default PageListProduct;
