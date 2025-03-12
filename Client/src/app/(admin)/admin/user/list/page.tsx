'use client';
import React, { useRef, useState } from 'react';
import { SearchOutlined, DeleteOutlined, EditOutlined, FormOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Dropdown, InputRef, Menu, Modal, Tag, Tooltip, Form, Select } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import transformTime from '@/utils/transformTime';
import Highlighter from 'react-highlight-words';
import { deleteUser, getAllUsers, updateUser } from '@/services/authServices';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { useMessageNotify } from '@/components/MessageNotify';

interface DataType {
    key: string;
    _id: string;
    user_name: string;
    email: string;
    full_name: string;
    phone_number: string;
    role: number;
    type: string;
    is_verified: boolean;
    status: number;
    created_at: string;
    updated_at: string;
}

type DataIndex = keyof DataType;

function UserListPage() {
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [form] = Form.useForm();

    let { data, isLoading, error, mutate } = getAllUsers();
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const [isModalDelete, setIsModalDelete] = useState<string | null>(null);
    const [isModalView, setIsModalView] = useState<string | null>(null);
    const [isModalEdit, setIsModalEdit] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const searchInput = useRef<InputRef>(null);

    data = data
        ?.sort((a: any, b: any) => {
            if (a.role !== b.role) {
                return b.role - a.role;
            }
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        })
        .map((item: any, index: number) => ({
            ...item,
            index: index + 1,
        }));

    const handleDeleteClick = async (userId: string) => {
        setLoading(true);
        const newData = data.filter((user: any) => user._id !== userId);
        mutate(newData, false);

        try {
            await deleteUser(userId);
            setIsModalDelete(null);
            mutate();
            messageCustomSuccess('Delete Successfully');
        } catch (error) {
            console.error('Failed to delete user:', error);
            messageCustomError('Delete Error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateClick = async (values: any) => {
        setLoading(true);
        try {
            await updateUser(isModalEdit!, values);
            setIsModalEdit(null);
            mutate();
            messageCustomSuccess('Update Successfully');
        } catch (error) {
            console.error('Failed to update user:', error);
            messageCustomError('Update Error');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
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
            title: 'Username',
            dataIndex: 'user_name',
            key: 'user_name',
            width: 150,
            ...getColumnSearchProps('user_name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            width: 150,
            ...getColumnSearchProps('full_name'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            key: 'phone_number',
            width: 120,
            ...getColumnSearchProps('phone_number'),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 100,
            render: (type: string) => <span>{type}</span>,
        },
        {
            title: 'Verified',
            dataIndex: 'is_verified',
            key: 'is_verified',
            width: 100,
            render: (verified: boolean) => <span>{verified ? 'Yes' : 'No'}</span>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 100,
            render: (role: number) => (
                <Tag color={role === 2 ? 'red' : role === 1 ? 'blue' : 'default'}>
                    {role === 2 ? 'Admin' : role === 1 ? 'Manager' : 'User'}
                </Tag>
            ),
            sorter: (a: any, b: any) => a.role - b.role,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: number) => (
                <Tag color={status === 1 ? 'success' : 'error'}>{status === 1 ? 'Active' : 'Inactive'}</Tag>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 150,
            render: (text: any) => <span>{transformTime(text)}</span>,
            sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Updated',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 150,
            render: (text: any) => <span>{transformTime(text)}</span>,
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
                                <Menu.Item
                                    key="edit"
                                    onClick={() => {
                                        setIsModalEdit(record._id);
                                        form.setFieldsValue({
                                            full_name: record.full_name,
                                            phone_number: record.phone_number,
                                            role: record.role,
                                            status: record.status,
                                        });
                                    }}
                                >
                                    <EditOutlined
                                        style={{
                                            color: '#52c41a',
                                            cursor: 'pointer',
                                            fontSize: '1.4rem',
                                            marginRight: '6px',
                                        }}
                                    />
                                    Edit
                                </Menu.Item>
                                <Menu.Item key="view" onClick={() => setIsModalView(record._id)}>
                                    <InfoCircleOutlined
                                        style={{
                                            color: '#1677ff',
                                            cursor: 'pointer',
                                            fontSize: '1.4rem',
                                            marginRight: '6px',
                                        }}
                                    />
                                    View
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

                    {/* View Modal */}
                    <Modal
                        title="User Details"
                        open={isModalView === record._id}
                        onCancel={() => setIsModalView(null)}
                        footer={null}
                        style={{ marginTop: '50px' }}
                    >
                        <div className="space-y-4">
                            <p>
                                <strong>ID:</strong> {record._id}
                            </p>
                            <p>
                                <strong>Username:</strong> {record.user_name}
                            </p>
                            <p>
                                <strong>Email:</strong> {record.email}
                            </p>
                            <p>
                                <strong>Full Name:</strong> {record.full_name}
                            </p>
                            <p>
                                <strong>Phone:</strong> {record.phone_number}
                            </p>
                            <p>
                                <strong>Role:</strong>{' '}
                                {record.role === 2 ? 'Admin' : record.role === 1 ? 'Manager' : 'User'}
                            </p>
                            <p>
                                <strong>Type:</strong> {record.type}
                            </p>
                            <p>
                                <strong>Verified:</strong> {record.is_verified ? 'Yes' : 'No'}
                            </p>
                            <p>
                                <strong>Status:</strong> {record.status === 1 ? 'Active' : 'Inactive'}
                            </p>
                            <p>
                                <strong>Created:</strong> {transformTime(record.created_at)}
                            </p>
                            <p>
                                <strong>Updated:</strong> {transformTime(record.updated_at)}
                            </p>
                        </div>
                    </Modal>

                    {/* Edit Modal */}
                    <Modal
                        title="Edit User"
                        open={isModalEdit === record._id}
                        onCancel={() => {
                            setIsModalEdit(null);
                            form.resetFields();
                        }}
                        footer={null}
                        style={{ marginTop: '50px' }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleUpdateClick}
                            initialValues={{
                                full_name: record.full_name,
                                phone_number: record.phone_number,
                                role: record.role,
                                status: record.status,
                            }}
                        >
                            <Form.Item
                                name="full_name"
                                label="Full Name"
                                rules={[
                                    { required: true, message: 'Please input full name!' },
                                    {
                                        pattern:
                                            /^[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
                                        message: 'Full name can only contain letters, numbers, underscores and spaces!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="phone_number"
                                label="Phone Number"
                                rules={[
                                    { required: true, message: 'Please input phone number!' },
                                    {
                                        pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/,
                                        message: 'Invalid phone number format!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[{ required: true, message: 'Please select role!' }]}
                            >
                                <Select>
                                    <Select.Option value={0}>User</Select.Option>
                                    <Select.Option value={1}>Manager</Select.Option>
                                    <Select.Option value={2}>Admin</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: 'Please select status!' }]}
                            >
                                <Select>
                                    <Select.Option value={1}>Active</Select.Option>
                                    <Select.Option value={0}>Inactive</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <div className="flex justify-end space-x-4">
                                    <Button
                                        onClick={() => {
                                            setIsModalEdit(null);
                                            form.resetFields();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Update
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Modal>

                    {/* Delete Modal */}
                    <Modal
                        title="Are you sure you want to delete?"
                        open={isModalDelete === record._id}
                        onOk={() => handleDeleteClick(record._id)}
                        onCancel={() => setIsModalDelete(null)}
                        style={{ marginTop: '150px' }}
                    >
                        <p>Delete user: {record.user_name}</p>
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
                <Table columns={columns} dataSource={data} scroll={{ x: 1500 }} />
            </div>
        </>
    );
}

export default UserListPage;
