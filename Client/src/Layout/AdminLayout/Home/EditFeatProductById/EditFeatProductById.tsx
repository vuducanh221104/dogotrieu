'use client';
import React, { useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { homePatchFeatProduct } from '@/services/homeServices';
import { useMessageNotify } from '@/components/MessageNotify';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';

function EditFeatProductById({ visible, onClose, editingFeatured, mutate }: any) {
    const [form] = Form.useForm();
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [loading, setLoading] = useState(false);

    const initialValues: { [key: string]: any } = {
        title: editingFeatured?.title || '',
        linkViewAll: editingFeatured?.link_view_all || '',
    };

    // Parse the query string to get the IDs
    if (editingFeatured) {
        const ids = editingFeatured.query.slice(1).split('&');
        ids.forEach((id: string, index: number) => {
            initialValues[`id${index + 1}`] = id;
        });
    }

    const handleSaveById = async () => {
        try {
            const values = await form.validateFields();
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
            const updated = await homePatchFeatProduct(editingFeatured._id, newData);
            if (updated) {
                form.resetFields();
                mutate();
                messageCustomSuccess('Update Successfully');
                setLoading(false);
                onClose();
            } else {
                messageCustomError('Error Update');
                setLoading(false);
            }
        } catch (error) {
            messageCustomError('Missing input field');
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            {loading && <ModalLoadingAdmin />}
            <Modal
                title="Edit Material By ID"
                visible={visible}
                onCancel={onClose}
                footer={[
                    <Button key="cancel" onClick={onClose}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSaveById}>
                        Save
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" initialValues={initialValues}>
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
                        <Input placeholder="Title" />
                    </Form.Item>
                    {[...Array(12)].map((item, index) => (
                        <Form.Item
                            key={index}
                            name={`id${index + 1}`}
                            label={`ID ${index + 1}`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Required',
                                },
                            ]}
                        >
                            <Input placeholder={`ID ${index + 1}`} />
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
                        <Input placeholder="Link View All" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default EditFeatProductById;
