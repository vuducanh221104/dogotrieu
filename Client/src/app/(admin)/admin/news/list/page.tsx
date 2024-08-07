'use client';
import React, { useRef, useState } from 'react';
import { SearchOutlined, DeleteOutlined, EditOutlined, FormOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Dropdown, InputRef, Menu, Modal, Tag, Tooltip } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import transformTime from '@/utils/transformTime';
import Highlighter from 'react-highlight-words';
import { newsDelete, newsGetAll } from '@/services/newsServices';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { useMessageNotify } from '@/components/MessageNotify';
import EditNews from '@/Layout/AdminLayout/News/EditNews';
import InfoNews from '@/Layout/AdminLayout/News/InfoNews';
import AddNews from '@/Layout/AdminLayout/News/AddNews';
import { CldImage } from 'next-cloudinary';

interface DataType {
    key: string;
    title: string;
    description: string;
    thumb: string;
    content: string;
    tags: string[];
    author: string;
    created_at: string;
    updated_at: string;
}

type DataIndex = keyof DataType;

function PageListNews() {
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();

    let { data, isLoading, error, mutate } = newsGetAll();
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [isModalDelete, setIsModalDelete] = useState<string | null>(null);
    const [infoNews, setInfoNews] = useState<DataType | null>(null);
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
    const [editingNews, setEditingNews] = useState<DataType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const searchInput = useRef<InputRef>(null);
    data = data?.map((item: any, index: number) => ({
        ...item,
        index: index + 1,
    }));
    //Handle Modal Info
    const handleInfo = (news: DataType) => {
        setInfoNews(news);
        setIsInfoModalVisible(true);
    };

    //Handle Delete
    const handleDeleteCickOk = async (news_id: string) => {
        setLoading(true);
        const newData = data.filter((news: any) => news._id !== news_id);
        mutate(newData, false);

        try {
            await newsDelete(news_id);
            setIsModalDelete(null);
            mutate();
            messageCustomSuccess('Delete Successfully');
        } catch (error) {
            console.error('Failed to delete news:', error);
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

    const handleEdit = (news: DataType) => {
        setEditingNews(news);
        setIsEditModalVisible(true);
    };

    const handleAdd = () => {
        setEditingNews(null); // Clear any existing edit data
        setIsAddModalVisible(true);
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            ...getColumnSearchProps('title'),
            render: (text: any) => (
                <Tooltip title={text}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
                        {text}
                    </div>
                </Tooltip>
            ),
            sorter: (a: any, b: any) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 150,
            ...getColumnSearchProps('description'),
            render: (text: any) => (
                <Tooltip title={text}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 300 }}>
                        {text}
                    </div>
                </Tooltip>
            ),
            sorter: (a: any, b: any) => a.description.length - b.description.length,
            sortDirections: ['descend', 'ascend'],
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
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            width: 150,
            ...getColumnSearchProps('author'),
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 150,
            render: (tags: string[]) => (
                <>
                    {tags.map((tag, index) => (
                        <Tag color={'volcano'} key={index}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
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
                        title="Are you sure you want to delete?"
                        visible={isModalDelete === record._id}
                        onOk={() => {
                            handleDeleteCickOk(record._id);
                        }}
                        onCancel={() => setIsModalDelete(null)}
                        style={{ marginTop: '150px' }}
                    >
                        <p>Delete: {record.title}</p>
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
                <div className="mb-5">
                    <Button type="primary" onClick={handleAdd}>
                        Add News
                    </Button>
                    <AddNews visible={isAddModalVisible} onClose={() => setIsAddModalVisible(false)} mutate={mutate} />
                </div>
                <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
                {editingNews && (
                    <EditNews
                        visible={isEditModalVisible}
                        onClose={() => setIsEditModalVisible(false)}
                        news={editingNews}
                        mutate={mutate}
                    />
                )}
                {infoNews && (
                    <InfoNews
                        visible={isInfoModalVisible}
                        onClose={() => setIsInfoModalVisible(false)}
                        news={infoNews}
                    />
                )}
            </div>
        </>
    );
}

export default PageListNews;
