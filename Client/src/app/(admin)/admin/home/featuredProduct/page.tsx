'use client';
import React, { useRef, useState } from 'react';
import {
    SearchOutlined,
    MinusCircleOutlined,
    PlusOutlined,
    FormOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { Dropdown, Form, InputRef, Menu, Modal, Select, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { homeDeleteFeatProduct, homeGet, homePatch } from '@/services/homeServices';
import { useMessageNotify } from '@/components/MessageNotify';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { categoryGet } from '@/services/categoryServices';
import { materialGet } from '@/services/materialServices';
import { transformListSelect } from '@/utils/transformListSelect';
import EditFeatProduct from '@/components/EditFeatProduct';
import EditFeatProductById from '@/Layout/AdminLayout/Home/EditFeatProductById';

interface DataType {
    title: string;
    query: string;
    link_view_all: string;
    index?: number;
    _id: any;
}

type DataIndex = keyof DataType;

function PageListMaterial() {
    const { data, mutate }: any = homeGet();
    const { data: categories } = categoryGet();
    const { data: materials } = materialGet();
    const transformedCategories = transformListSelect(categories?.category_list || []);
    const transformedMaterials = transformListSelect(materials?.material_list || []);
    const [form] = Form.useForm();
    const [formById] = Form.useForm();

    const hasCategoryOrMaterial = (query: any) => {
        const queryCheck = query?.includes('category_id') || query?.includes('material_id');
        return queryCheck;
    };

    const indexedData =
        data && data[0] && data[0].featured_product
            ? data[0].featured_product.map((item: any, index: number) => ({
                  ...item,
                  index: index + 1,
              }))
            : [];
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState<boolean>(false);
    const [isModalVisibleDelete, setIsModalVisibleDelete] = useState<any>(null);
    const [isModalVisibleAddById, setIsModalVisibleAddById] = useState<any>(false);
    const [editingFeatured, setEditingFeatured] = useState<DataType | null>(null);
    const searchInput = useRef<InputRef>(null);
    //
    const handleSaveById = async () => {
        try {
            const values = await formById.validateFields();
            const queryIds = Object.keys(values)
                .filter((key) => key.startsWith('id'))
                .map((key) => values[key])
                .filter(Boolean)
                .join('&');
            const newData = {
                query: `?${queryIds}`,
                title: values.title,
                link_view_all: values.linkViewAll,
            };
            const add = await homePatch({ featured_product: [...data[0].featured_product, newData] });
            if (add) {
                formById.resetFields();
                mutate();
                messageCustomSuccess('Add Successfully');
                setLoading(false);
                onClose();
            } else {
                messageCustomError('Add Error');
                setLoading(false);
            }
        } catch (error) {
            messageCustomError('Missing input field');
            setLoading(false);
        }
    };
    // Handle Modal Add
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const tranformQuery = handleTranformQuery(values);
            const newData = {
                query: tranformQuery,
                title: values.title,
                link_view_all: values.linkViewAll,
            };
            const add = await homePatch({ featured_product: [...data[0].featured_product, newData] });
            if (add) {
                form.resetFields();
                mutate();
                messageCustomSuccess('Add Successfully');
                setLoading(false);
                onClose();
            } else {
                messageCustomError('Error Add');
                setLoading(false);
            }
        } catch (error) {
            messageCustomError('Missing input field');
            setLoading(false);
        }
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    const onClose = () => {
        setIsModalVisible(false);
    };
    const handleEdit = (product: DataType) => {
        setEditingFeatured(product);
        setIsModalVisibleEdit(true);
    };

    //Handle Delete
    const handleDeleteClickOk = async (product_id: string) => {
        setLoading(true);
        const newData = data.filter((product: any) => product._id !== product_id);
        mutate(newData, false);

        try {
            await homeDeleteFeatProduct(product_id);
            setIsModalVisibleDelete(null);
            mutate();
            messageCustomSuccess('Delete Successfully');
        } catch (error) {
            console.error('Failed to delete product:', error);
            messageCustomError('Delete Error');
        } finally {
            setLoading(false);
        }
    };

    // Handle Classic
    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 20,
            render: (_, record) => <div>{record.index}</div>,
            sorter: (a: any, b: any) => a.index - b.index,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 150,
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Query',
            dataIndex: 'query',
            key: 'query',
            width: 350,
            ...getColumnSearchProps('query'),
        },
        {
            title: 'Link View All',
            dataIndex: 'link_view_all',
            key: 'link_view_all',
            ...getColumnSearchProps('link_view_all'),
            width: 200,
        },
        {
            title: 'Action',
            width: 80,
            fixed: 'right',
            render: (_, record) => (
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
                                {/* <Menu.Item key="info">Info</Menu.Item> */}
                                <Menu.Item key="delete" onClick={() => setIsModalVisibleDelete(record._id)}>
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
                </div>
            ),
        },
    ];

    // Handle form submission
    const handleTranformQuery = (values: any) => {
        const { category, material } = values;

        // Create query string
        const queryParts: string[] = [];

        if (category && category.length > 0) {
            category.forEach((catId: string) => {
                if (catId) {
                    queryParts.push(`category_id=${encodeURIComponent(catId)}`);
                }
            });
        }

        if (material && material.length > 0) {
            material.forEach((matId: string) => {
                if (matId) {
                    queryParts.push(`material_id=${encodeURIComponent(matId)}`);
                }
            });
        }

        // Join query parts
        const queryString = queryParts.join('&');

        return `?${queryString}`;
    };

    return (
        <>
            {contextHolder}
            {loading && <ModalLoadingAdmin />}
            <div className="flex justify-end items-center mr-6 mb-3">
                <Button type="primary" onClick={() => setIsModalVisibleAddById(true)} className="mr-3">
                    Add By Id
                </Button>
                <Button type="primary" onClick={showModal}>
                    Add
                </Button>
            </div>
            <Table columns={columns} dataSource={indexedData} scroll={{ x: 550 }} />;
            <Modal
                title="Add New Products by ID"
                visible={isModalVisibleAddById}
                width={1100}
                onCancel={() => setIsModalVisibleAddById(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisibleAddById(false)}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSaveById}>
                        Save
                    </Button>,
                ]}
            >
                <Form form={formById} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                        ]}
                    >
                        <Input type="name" placeholder="Title" />
                    </Form.Item>
                    {[...Array(12)].map((_, index) => (
                        <Form.Item
                            key={index}
                            name={`id${index + 1}`}
                            label={`Product ID ${index + 1}`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Required',
                                },
                            ]}
                        >
                            <Input type="text" placeholder={`Enter Product ID ${index + 1}`} />
                        </Form.Item>
                    ))}
                    <Form.Item
                        name="linkViewAll"
                        label="Link View All"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                        ]}
                    >
                        <Input type="name" placeholder="ex:(/category/tat-ca-ban-ghe)" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Add New Material"
                visible={isModalVisible}
                width={1100}
                onCancel={onClose}
                footer={[
                    <Button key="cancel" onClick={onClose}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        Save
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        category: [null],
                        material: [null],
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Tile"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                        ]}
                    >
                        <Input type="name" placeholder="Title" />
                    </Form.Item>
                    <Form.Item label="Query:">
                        <div className="ml-20">
                            {/* Category */}
                            <Form.Item label="Category">
                                <Form.List name="category">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item required={false} key={field.key}>
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: false,
                                                                whitespace: true,
                                                                message: 'Required',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Select
                                                            showSearch
                                                            style={{ width: 200 }}
                                                            optionFilterProp="children"
                                                            filterOption={(input: any, option: any) =>
                                                                (option?.value ?? '')
                                                                    .toLowerCase()
                                                                    .includes(input.toLowerCase())
                                                            }
                                                            filterSort={(optionA: any, optionB: any) =>
                                                                (optionA?.value ?? '')
                                                                    .toLowerCase()
                                                                    .localeCompare((optionB?.value ?? '').toLowerCase())
                                                            }
                                                            placeholder="Select category"
                                                            options={transformedCategories}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 0 ? (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    ) : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add field
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                            {/* Material */}
                            <Form.Item label="Material">
                                <Form.List name="material">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item required={false} key={field.key}>
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: false,
                                                                whitespace: true,
                                                                message: 'Required',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Select
                                                            showSearch
                                                            style={{ width: 200 }}
                                                            optionFilterProp="children"
                                                            filterOption={(input: any, option: any) =>
                                                                (option?.value ?? '')
                                                                    .toLowerCase()
                                                                    .includes(input.toLowerCase())
                                                            }
                                                            filterSort={(optionA: any, optionB: any) =>
                                                                (optionA?.value ?? '')
                                                                    .toLowerCase()
                                                                    .localeCompare((optionB?.value ?? '').toLowerCase())
                                                            }
                                                            placeholder="Select material"
                                                            options={transformedMaterials}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 0 ? (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    ) : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add field
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="linkViewAll"
                        label="Link View All"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                        ]}
                    >
                        <Input type="name" placeholder="ex:(/category/tat-ca-ban-ghe)" />
                    </Form.Item>
                </Form>
            </Modal>
            {/*  */}
            {hasCategoryOrMaterial(editingFeatured?.query) ? (
                <EditFeatProduct
                    visible={isModalVisibleEdit}
                    onClose={() => setIsModalVisibleEdit(false)}
                    featuredProduct={editingFeatured}
                />
            ) : (
                <EditFeatProductById
                    visible={isModalVisibleEdit}
                    onClose={() => setIsModalVisibleEdit(false)}
                    editingFeatured={editingFeatured}
                    mutate={mutate}
                />
            )}
            {/*  */}
            <Modal
                title="You Sure Delete ?"
                visible={!!isModalVisibleDelete}
                onOk={() => handleDeleteClickOk(isModalVisibleDelete)}
                onCancel={() => setIsModalVisibleDelete(null)}
            >
                <p>Are you sure you want to delete this featured product?</p>
            </Modal>
        </>
    );
}

export default PageListMaterial;
