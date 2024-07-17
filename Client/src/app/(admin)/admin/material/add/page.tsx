'use client';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload, Image, Space } from 'antd';
import { useMessageNotify } from '@/components/MessageNotify';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { uploadCloud } from '@/services/uploadService';
import axios from 'axios';
import { useGenerateSKU } from '@/components/GenerateSKU/GenerateSKU';
import { categoryAdd, categoryGet } from '@/services/categoryServices';
import { materialAdd, materialGet } from '@/services/materialServices';
import { transformListSelect, transformParentListSelect } from '@/utils/transformListSelect';
import { mutate } from 'swr';

function pageAddMaterial() {
    const { messageCustomSuccess, messageError, messageCustomError, contextHolder } = useMessageNotify();
    const { data: materials } = materialGet();
    const transformedMaterials = transformParentListSelect(materials?.material_list || []);
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            if (values.parent_id[0] === 'null') {
                delete values.parent_id;
            } else {
                values.parent_id = values.parent_id[0];
            }
            // Submit dữ liệu form

            const postAddProduct = await materialAdd(values);
            if (!postAddProduct) {
                messageCustomError('Add Error');
            } else {
                messageCustomSuccess('Add Successfully');
                setLoading(false);
            }
        } catch (error) {
            messageCustomError('Missing Input Field');
            setLoading(false);
        }
    };

    return (
        <>
            <Form form={form} layout="vertical" initialValues={{ parent_id: ['null'] }}>
                {/* Name */}
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Required',
                        },
                        {
                            validator(_, value) {
                                if (!value) {
                                    return Promise.reject();
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input type="name" placeholder="Name" />
                </Form.Item>
                {/* Slug */}
                <Form.Item
                    name="slug"
                    label="Slug"
                    rules={[
                        {
                            required: true,
                            message: 'Required',
                        },
                        {
                            validator(_, value) {
                                if (!value) {
                                    return Promise.reject();
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input type="slug" placeholder="Slug" />
                </Form.Item>
                {/* Parent Material */}
                <Form.Item label="Parent material">
                    <Form.List
                        name="parent_id"
                        rules={[
                            {
                                validator: async (_, value) => {
                                    if (!value) {
                                        return Promise.reject(new Error('At least 2 passengers'));
                                    }
                                },
                            },
                        ]}
                    >
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
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                optionFilterProp="children"
                                                filterOption={(input: any, option: any) =>
                                                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                filterSort={(optionA: any, optionB: any) =>
                                                    (optionA?.value ?? '')
                                                        .toLowerCase()
                                                        .localeCompare((optionB?.value ?? '').toLowerCase())
                                                }
                                                placeholder="Select Parent Material"
                                                options={transformedMaterials}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSubmit} loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default pageAddMaterial;
