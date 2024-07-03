'use client';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Tag, Tooltip, Modal, Form, Input, Space } from 'antd';
import { PlusOutlined, EditOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMessageNotify } from '@/components/MessageNotify';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { categoryAdd, categoryDelete, categoryGet, categoryUpdate } from '@/services/categoryServices';

interface Material {
    _id: string;
    name: string;
    slug: string;
    parent_id?: string | null;
    children: Material[];
}

const PageListCategory: React.FC = () => {
    const { data, isLoading, mutate } = categoryGet();
    const categories = data?.category_list;
    const [editForm] = Form.useForm();
    const [addForm] = Form.useForm();
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [loading, setLoading] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Material | null>(null);

    const showEditModal = (material: Material | null = null) => {
        setCurrentCategory(material);
        setIsEditModalVisible(true);
    };

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const showDeleteModal = (material: Material) => {
        setCurrentCategory(material);
        setIsDeleteModalVisible(true);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setCurrentCategory(null);
        editForm.resetFields();
    };

    const handleAddCancel = () => {
        setIsAddModalVisible(false);
        addForm.resetFields();
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
    };

    const handleEditOk = async () => {
        setLoading(true);
        try {
            const values = await editForm.validateFields();
            const newData = [
                ...values.children,
                {
                    _id: currentCategory?._id,
                    name: values.name,
                    slug: values.slug,
                },
            ];
            try {
                await categoryUpdate(newData);

                const initialChildren = currentCategory ? currentCategory.children : [];
                const updatedChildren = values.children;

                const childrenToDelete = initialChildren
                    .filter(
                        (initialChild) =>
                            !updatedChildren.some((updatedChild: any) => updatedChild._id === initialChild._id),
                    )
                    .map((child) => child._id);

                if (childrenToDelete.length > 0) {
                    await categoryDelete(childrenToDelete);
                }

                const childrenToAdd = updatedChildren
                    .filter(
                        (updatedChild: any) =>
                            !initialChildren.some((initialChild) => initialChild._id === updatedChild._id),
                    )
                    .map((child: any) => ({
                        ...child,
                        parent_id: currentCategory?._id,
                    }));

                if (childrenToAdd.length > 0) {
                    await categoryAdd(childrenToAdd);
                }

                mutate();
                messageCustomSuccess('Update success!');
                setIsEditModalVisible(false);
                setCurrentCategory(null);
                editForm.resetFields();
            } catch (error) {
                console.error('Edit failed:', error);
                messageCustomError('Edit failed');
            } finally {
                setLoading(false);
            }
        } catch (error) {
            messageCustomError('Missing Field');
            setLoading(false);
        }
    };

    const handleAddOk = async () => {
        setLoading(true);
        try {
            const values = await addForm.validateFields();
            try {
                await categoryAdd([values]);
                mutate();
                messageCustomSuccess('Add success!');
                setIsAddModalVisible(false);
                addForm.resetFields();
            } catch {
                messageCustomError('Edit Failed');
            } finally {
                setLoading(false);
            }
        } catch (error) {
            messageCustomError('Missing Field');
            setLoading(false);
        }
    };

    const handleDeleteOk = async () => {
        setLoading(true);
        try {
            if (currentCategory) {
                const childrenToDelete = currentCategory.children.map((child) => child._id);
                childrenToDelete.push(currentCategory._id);
                try {
                    await categoryDelete(childrenToDelete);
                    mutate();
                    messageCustomSuccess('Delete success!');
                    setIsDeleteModalVisible(false);
                } catch (error) {
                    messageCustomError('Delete failed');
                } finally {
                    setLoading(false);
                }
            }
        } catch (error) {
            messageCustomError('Missing Field');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentCategory) {
            editForm.setFieldsValue(currentCategory);
        } else {
            editForm.resetFields();
        }
    }, [currentCategory, editForm]);

    const renderChildren = (children: Material[]) => {
        return children.map((child) => (
            <Tag key={child._id} color="blue" style={{ marginBottom: 5 }}>
                {child.name}
            </Tag>
        ));
    };

    return (
        <>
            {contextHolder}
            {isLoading || (loading && <ModalLoadingAdmin />)}
            <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal} style={{ marginBottom: 20 }}>
                Add
            </Button>
            <Row gutter={[16, 16]}>
                {categories?.map((category: any) => (
                    <Col key={category._id} xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Card
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Tooltip title={category.name}>
                                        <span className="block overflow-hidden truncate whitespace-nowrap max-w-[150px] mr-3">
                                            {category.name}
                                        </span>
                                    </Tooltip>
                                    <div>
                                        <Tooltip title="Edit">
                                            <Button
                                                icon={
                                                    <EditOutlined
                                                        style={{
                                                            color: '#108ee9',
                                                            cursor: 'pointer',
                                                            fontSize: '1.4rem',
                                                        }}
                                                    />
                                                }
                                                size="small"
                                                onClick={() => showEditModal(category)}
                                                className="!mr-1 !border-sky-400"
                                            />
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <Button
                                                icon={
                                                    <DeleteOutlined
                                                        style={{
                                                            color: '#ff4d4f',
                                                            cursor: 'pointer',
                                                            fontSize: '1.4rem',
                                                        }}
                                                    />
                                                }
                                                size="small"
                                                onClick={() => showDeleteModal(category)}
                                                danger
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            }
                        >
                            <div>
                                <strong>Sub-categories:</strong>
                                <div>{renderChildren(category.children)}</div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Edit Material Modal */}
            <Modal
                title="Edit Material"
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={[
                    <Button key="cancel" onClick={handleEditCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleEditOk} loading={loading}>
                        Save
                    </Button>,
                ]}
            >
                <Form
                    form={editForm}
                    initialValues={{ name: '', slug: '', children: [{ name: '', slug: '' }] }}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Material Name"
                        rules={[{ required: true, message: 'Please input the material name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="slug" label="Slug" rules={[{ required: true, message: 'Please input the slug!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Children:">
                        <div className="!ml-10">
                            <Form.List name="children">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space
                                                key={key}
                                                direction="horizontal"
                                                style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'name']}
                                                    rules={[{ required: true, message: 'Missing child name' }]}
                                                >
                                                    <Input placeholder="Child Name" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'slug']}
                                                    rules={[{ required: true, message: 'Missing child slug' }]}
                                                >
                                                    <Input placeholder="Child Slug" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                                Add Child
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Add Material Modal */}
            <Modal
                title="Add Material"
                visible={isAddModalVisible}
                onCancel={handleAddCancel}
                footer={[
                    <Button key="cancel" onClick={handleAddCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleAddOk} loading={loading}>
                        Add
                    </Button>,
                ]}
            >
                <Form
                    form={addForm}
                    initialValues={{ name: '', slug: '', children: [{ name: '', slug: '' }] }}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Material Name"
                        rules={[{ required: true, message: 'Please input the material name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="slug" label="Slug" rules={[{ required: true, message: 'Please input the slug!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Material Modal */}
            <Modal
                title="Delete Material"
                visible={isDeleteModalVisible}
                onCancel={handleDeleteCancel}
                footer={[
                    <Button key="cancel" onClick={handleDeleteCancel}>
                        Cancel
                    </Button>,
                    <Button key="delete" type="primary" onClick={handleDeleteOk} loading={loading}>
                        Delete
                    </Button>,
                ]}
            >
                <div>Are you sure you want to delete "{currentCategory?.name}"?</div>
            </Modal>
        </>
    );
};

export default PageListCategory;
