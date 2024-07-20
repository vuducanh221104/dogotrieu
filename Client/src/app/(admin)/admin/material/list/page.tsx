'use client';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Tag, Tooltip, Modal, Form, Input, Space } from 'antd';
import { PlusOutlined, EditOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { materialAdd, materialDelete, materialGet, materialUpdate } from '@/services/materialServices';
import { useMessageNotify } from '@/components/MessageNotify';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { Material } from '@/types/client';

const PageListCategory: React.FC = () => {
    const { data, isLoading, mutate } = materialGet();
    const materials = data?.material_list;
    const [editForm] = Form.useForm<Material>();
    const [addForm] = Form.useForm<Material>();
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [loading, setLoading] = useState<boolean>(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);

    const showEditModal = (material: Material | null = null) => {
        setCurrentMaterial(material);
        setIsEditModalVisible(true);
    };

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const showDeleteModal = (material: Material) => {
        setCurrentMaterial(material);
        setIsDeleteModalVisible(true);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setCurrentMaterial(null);
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
                    _id: currentMaterial?._id,
                    name: values.name,
                    slug: values.slug,
                },
            ];
            try {
                await materialUpdate(newData);

                const initialChildren = currentMaterial ? currentMaterial.children : [];
                const updatedChildren = values.children;

                const childrenToDelete = initialChildren
                    .filter(
                        (initialChild) =>
                            !updatedChildren.some((updatedChild: any) => updatedChild._id === initialChild._id),
                    )
                    .map((child) => child._id);

                if (childrenToDelete.length > 0) {
                    await materialDelete(childrenToDelete);
                }

                const childrenToAdd = updatedChildren
                    .filter(
                        (updatedChild: any) =>
                            !initialChildren.some((initialChild) => initialChild._id === updatedChild._id),
                    )
                    .map((child: any) => ({
                        ...child,
                        parent_id: currentMaterial?._id,
                    }));

                if (childrenToAdd.length > 0) {
                    await materialAdd(childrenToAdd);
                }

                mutate();
                messageCustomSuccess('Update success!');
                setIsEditModalVisible(false);
                setCurrentMaterial(null);
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
                await materialAdd([values]);
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
            if (currentMaterial) {
                const childrenToDelete = currentMaterial.children.map((child) => child._id);
                childrenToDelete.push(currentMaterial._id);
                try {
                    await materialDelete(childrenToDelete);
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
        if (currentMaterial) {
            editForm.setFieldsValue(currentMaterial);
        } else {
            editForm.resetFields();
        }
    }, [currentMaterial, editForm]);

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
                {materials?.map((material: any) => (
                    <Col key={material._id} xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Card
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Tooltip title={material.name}>
                                        <span className="block overflow-hidden truncate whitespace-nowrap max-w-[150px] mr-3">
                                            {material.name}
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
                                                onClick={() => showEditModal(material)}
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
                                                onClick={() => showDeleteModal(material)}
                                                danger
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            }
                        >
                            <div>
                                <strong>Sub-materials:</strong>
                                <div>{renderChildren(material.children)}</div>
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
                <div>Are you sure you want to delete "{currentMaterial?.name}"?</div>
            </Modal>
        </>
    );
};

export default PageListCategory;
