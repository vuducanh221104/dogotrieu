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
import { categoryGet } from '@/services/categoryServices';
import { materialGet } from '@/services/materialServices';
import { transformListSelect } from '@/utils/transformListSelect';
import { productAdd } from '@/services/productServices';

function PageProductAdd() {
    const { data: categories } = categoryGet();
    const { data: materials } = materialGet();
    console.log(categories);
    console.log(materials);

    const transformedCategories = transformListSelect(categories?.category_list || []);
    const transformedMaterials = transformListSelect(materials?.material_list || []);
    const { messageSuccess, messageError, messageCustomError, contextHolder } = useMessageNotify();
    const [form] = Form.useForm();
    const [valueDes, setValueDes] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Thumbnail Upload
    const [thumbnail, setThumbnail] = useState([]);
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const [thumbnailOpen, setThumbnailOpen] = useState(false);
    const [imageUploadedThumbnail, setImageUploadedThumbnail] = useState(false);

    // Image Upload
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageUploaded, setImageUploaded] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            values.description = valueDes;
            const skuGenerate = useGenerateSKU();
            // Upload Image
            const uploadPromises = [uploadImagesToCloudinary(fileList), uploadImagesToCloudinary(thumbnail)];
            const [uploadedImages, uploadedThumbnail] = await Promise.all(uploadPromises);
            values.images = uploadedImages;
            values.thumb = uploadedThumbnail;

            const product_data = {
                thumb: uploadedThumbnail[0],
                name: values.name,
                price: values.price,
                ship: values.ship,
                quantity: values.quantity,
                material_id: values.material,
                category_id: values.category,
            };
            const product_type_data = {
                sku: skuGenerate,
                description: values.description,
                tags: values.tags,
                dimensions: values.dimensions,
                images: values.images,
            };
            // Submit dữ liệu form
            console.log('Form values with images:', { product_data, product_type_data });
            const postAddProduct = productAdd({
                product_data,
                product_type_data,
            });

            console.log('Saved Successfully', postAddProduct);
            messageSuccess();
            setLoading(false);
        } catch (error) {
            console.log('Validation failed:', error);
            messageError();
            setLoading(false);
        }
    };

    // Image Upload
    const getBase64 = (file: any) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
        setImageUploaded(newFileList.length > 0);
        if (newFileList.length > 0) {
            form.setFields([
                {
                    name: 'image',
                    errors: [],
                },
            ]);
        }
    };
    //Handle Thumbnail
    const handlePreviewThumbnail = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewThumbnail(file.url || file.preview);
        setThumbnailOpen(true);
    };
    const handleChangeThumbnail = ({ fileList: newFileList }: any) => {
        setThumbnail(newFileList);
        setImageUploadedThumbnail(newFileList.length > 0);
        if (newFileList.length > 0) {
            form.setFields([
                {
                    name: 'thumbnail',
                    errors: [],
                },
            ]);
        }
    };
    const uploadImagesToCloudinary = async (fileList: any) => {
        const formData = new FormData();
        fileList.forEach((file: any) => {
            formData.append('img', file.originFileObj);
        });

        const data = await uploadCloud(formData);
        console.log(data);
        if (data.length === 0) {
            messageCustomError('Images upload failed');
        }

        return data.map((file: any) => file.path);
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    //Markdown
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }: any) {
        setValueDes(text);
    }

    return (
        <>
            {contextHolder}
            {/* <ModalLoadingAdmin /> */}
            <div>
                <Form form={form} layout="vertical" initialValues={{ category: [''], material: [''] }}>
                    {/* Thumbnail upload */}
                    <Form.Item
                        name="thumb"
                        label="Thumbnail"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (!imageUploadedThumbnail) {
                                        return Promise.reject(new Error('Please upload thumbnail image!'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                        validateStatus={imageUploadedThumbnail ? 'success' : 'error'}
                        help={!imageUploadedThumbnail && 'Please upload at least one thumbnail image!'}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={thumbnail}
                            onPreview={handlePreviewThumbnail}
                            onChange={handleChangeThumbnail}
                            multiple={false}
                            accept="image/*"
                            name="thumb"
                        >
                            {thumbnail.length >= 1 ? null : uploadButton}
                        </Upload>
                        {previewThumbnail && (
                            <Image
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: thumbnailOpen,
                                    onVisibleChange: (visible) => setThumbnailOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewThumbnail(''),
                                }}
                                src={previewThumbnail}
                            />
                        )}
                    </Form.Item>
                    {/* Name */}
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name',
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
                    {/* Price */}
                    <Form.Item label="Price">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div className="pl-10">
                                <Form.Item
                                    name={['price', 'original']}
                                    label="Original Price"
                                    rules={[{ required: true, message: 'Please input the original price' }]}
                                >
                                    <Input type="number" placeholder="Original Price" />
                                </Form.Item>
                                <Form.Item
                                    name={['price', 'discount']}
                                    label="Discount Price"
                                    rules={[{ required: false, message: 'Please input the discount price' }]}
                                >
                                    <Input placeholder="Discount Price" />
                                </Form.Item>
                                <Form.Item
                                    name={['price', 'discount_quantity']}
                                    label="Discount Quantity"
                                    rules={[{ required: false, message: 'Please input the discount quantity' }]}
                                >
                                    <Input placeholder="Discount Quantity" />
                                </Form.Item>
                                <Form.Item
                                    name={['price', 'currency']}
                                    label="Currency"
                                    rules={[{ required: false, message: 'Please input the discount currency' }]}
                                >
                                    <Input placeholder="Currency" />
                                </Form.Item>
                            </div>
                        </Space>
                    </Form.Item>
                    {/* Ship */}
                    <Form.Item label="Ship" name="ship">
                        <Select style={{ width: 400 }}>
                            <Select.Option value={0}>null</Select.Option>
                            <Select.Option value={1}>Ship-Fast</Select.Option>
                        </Select>
                    </Form.Item>
                    {/* Quantity */}
                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input quantity',
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
                        <Input type="number" placeholder="Quantity" />
                    </Form.Item>
                    {/* Category */}
                    <Form.Item label="Category">
                        <Form.List
                            name="category"
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value) {
                                            return Promise.reject(new Error('Required'));
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
                                                        required: true,
                                                        whitespace: true,
                                                        message: 'Please select material or delete this field.',
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
                                                    placeholder="Select your category"
                                                    options={transformedCategories}
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
                        <Form.List
                            name="material"
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
                                                        required: true,
                                                        whitespace: true,
                                                        message: 'Please select material or delete this field.',
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
                                                    placeholder="Select your material"
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

                    {/* Product Type */}
                    {/* TAG */}
                    <Form.Item
                        name="tag"
                        label="Tag"
                        rules={[
                            {
                                required: true,
                                message: 'Please input tags',
                            },
                        ]}
                    >
                        <Select mode="tags" style={{ width: '100%' }} placeholder="Tags" tokenSeparators={[',']} />
                    </Form.Item>
                    {/* Dimensions */}
                    <Form.Item label="Dimensions">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div className="pl-10">
                                <Form.Item
                                    name={['dimensions', 'width']}
                                    label="Width"
                                    rules={[{ required: false, message: 'Please input width' }]}
                                >
                                    <Input placeholder="Width" />
                                </Form.Item>
                                <Form.Item
                                    name={['dimensions', 'height']}
                                    label="Height"
                                    rules={[{ required: false, message: 'Please input height' }]}
                                >
                                    <Input placeholder="Height" />
                                </Form.Item>
                                <Form.Item
                                    name={['dimensions', 'length']}
                                    label="Length"
                                    rules={[{ required: false, message: 'Please input length' }]}
                                >
                                    <Input placeholder="Length" />
                                </Form.Item>
                                <Form.Item
                                    name={['dimensions', 'unit']}
                                    label="Unit (Cm)"
                                    rules={[{ required: true, message: 'Required' }]}
                                >
                                    <Input placeholder="Unit (Cm)" defaultValue={'cm'} />
                                </Form.Item>
                            </div>
                        </Space>
                    </Form.Item>
                    {/* Description */}
                    <MdEditor
                        style={{ height: '250px', wordWrap: 'break-word' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                        name="description"
                        value={valueDes}
                    />
                    {/* Images */}
                    <Form.Item
                        name="images"
                        label="Images"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (!imageUploaded) {
                                        return Promise.reject(new Error('Please upload at least one image!'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                        validateStatus={imageUploaded ? 'success' : 'error'}
                        help={!imageUploaded && 'Please upload at least one image!'}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            multiple={true}
                            accept="image/*"
                            name="images"
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>
                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit} loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default PageProductAdd;
