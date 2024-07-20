'use client';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Select } from 'antd';
import { Button, Input } from 'antd';
import { homeGet, homePatchFeatProduct } from '@/services/homeServices';
import { useMessageNotify } from '@/components/MessageNotify';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { categoryGet } from '@/services/categoryServices';
import { materialGet } from '@/services/materialServices';
import { transformListSelect } from '@/utils/transformListSelect';

interface PropsEditFeatProduct {
    visible: boolean;
    onClose: () => void;
    featuredProduct: any;
}

function EditFeatProduct({ visible, onClose, featuredProduct }: PropsEditFeatProduct) {
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const { mutate } = homeGet();
    const { data: categories } = categoryGet();
    const { data: materials } = materialGet();
    const transformedCategories = transformListSelect(categories?.category_list || []);
    const transformedMaterials = transformListSelect(materials?.material_list || []);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    //Handle Save
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const tranformQuery = handleTranformQuery(values);
            const newData = {
                query: tranformQuery,
                title: values.title,
                link_view_all: values.linkViewAll,
            };
            const add = await homePatchFeatProduct(featuredProduct._id, newData);
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
    const parseQueryString = (queryString: string) => {
        const params = new URLSearchParams(queryString);
        const categories: string[] = [];
        const materials: string[] = [];

        params.forEach((value, key) => {
            if (key === 'category_id') categories.push(value);
            if (key === 'material_id') materials.push(value);
        });

        return { categories, materials };
    };

    //Intial Value
    useEffect(() => {
        if (featuredProduct) {
            const { categories, materials } = parseQueryString(featuredProduct.query);

            form.setFieldsValue({
                title: featuredProduct.title,
                linkViewAll: featuredProduct.link_view_all,
                category: categories.length ? categories : [],
                material: materials.length ? materials : [],
            });
        }
    }, [featuredProduct, form]);
    return (
        <>
            {contextHolder}
            {loading && <ModalLoadingAdmin />}
            <Modal
                title="Add New Material"
                visible={visible}
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
                <Form form={form} layout="vertical">
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
        </>
    );
}

export default EditFeatProduct;
