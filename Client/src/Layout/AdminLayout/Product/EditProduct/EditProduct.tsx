'use client';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload, Image, Space, Modal } from 'antd';
import { useMessageNotify } from '@/components/MessageNotify';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { uploadCloud } from '@/services/uploadService';
import { categoryGet } from '@/services/categoryServices';
import { materialGet } from '@/services/materialServices';
import { transformListSelect } from '@/utils/transformListSelect';
import { productPatch } from '@/services/productServices';

interface PropsEditProduct {
    visible: boolean;
    onClose: () => void;
    product: any;
    mutate: any;
}
const EditProduct = ({ visible, onClose, product, mutate }: PropsEditProduct) => {
    const { data: categories } = categoryGet();
    const { data: materials } = materialGet();

    const transformedCategories = transformListSelect(categories?.category_list || []);
    const transformedMaterials = transformListSelect(materials?.material_list || []);
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [form] = Form.useForm();
    const [valueDes, setValueDes] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Thumbnail Upload
    const [thumbnail, setThumbnail] = useState<[]>([]);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
    const [thumbnailOpen, setThumbnailOpen] = useState<boolean>(false);
    const [imageUploadedThumbnail, setImageUploadedThumbnail] = useState<boolean>(false);

    // Image Upload
    const [fileList, setFileList] = useState<[]>([]);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [imageUploaded, setImageUploaded] = useState<boolean>(false);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            values.description = valueDes;

            let uploadedThumbnail = [];
            let uploadedImages = [];

            // Upload Images only if there are changes
            if (thumbnail.some((file: any) => !file.url) || fileList.some((file: any) => !file.url)) {
                const uploadPromises = [
                    uploadImagesToCloudinary(thumbnail.filter((file: any) => !file.url)),
                    uploadImagesToCloudinary(fileList.filter((file: any) => !file.url)),
                ];
                [uploadedThumbnail, uploadedImages] = await Promise.all(uploadPromises);
            }

            // Update values with uploaded images
            values.thumb = uploadedThumbnail.length > 0 ? uploadedThumbnail[0] : values.thumb;
            values.product_type_id.images = [
                ...fileList.filter((file: any) => file.url).map((file: any) => file.url),
                ...uploadedImages,
            ];

            const product_data = {
                thumb: uploadedThumbnail.url || values.thumb,
                name: values.name,
                price: values.price,
                ship: values.ship,
                quantity: values.quantity,
                material_id: values.material_id,
                category_id: values.category_id,
            };
            const product_type_data = {
                description: values.description,
                sku: values.product_type_id.sku,
                tags: values.product_type_id.tags,
                dimensions: values.product_type_id.dimensions,
                images: values.product_type_id.images,
            };
            try {
                await productPatch(product._id, product_data, product_type_data);
                mutate();
                messageCustomSuccess('Edit Successfully');
            } catch {
                messageCustomError('Edit Error');
            } finally {
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            messageCustomError('Missing input field');
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

        const data: any = await uploadCloud(formData);
        if (!data) {
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
    // Markdown
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }: any) {
        setValueDes(text);
    }

    useEffect(() => {
        if (product) {
            const formattedThumbnail: any = product.thumb
                ? [
                      {
                          uid: '-1',
                          name: 'thumbnail.png',
                          status: 'done',
                          url: product.thumb,
                      },
                  ]
                : [];
            setThumbnail(formattedThumbnail);
            setImageUploadedThumbnail(formattedThumbnail.length > 0);

            const formattedFileList: any = product.product_type_id.images
                ? product.product_type_id.images.map((image: string, index: number) => ({
                      uid: `-${index + 1}`,
                      name: `image${index + 1}.png`,
                      status: 'done',
                      url: image,
                  }))
                : [];
            setFileList(formattedFileList);
            setImageUploaded(formattedFileList.length > 0);
            form.setFieldsValue({
                ...product,
                material_id: product.material_id.map((material: any) => material._id),
                category_id: product.category_id.map((category: any) => category._id),
            });
            setValueDes(product.product_type_id.description);
        }
    }, [product]);

    return (
        <>
            {contextHolder}
            {loading && <ModalLoadingAdmin />}
            <Modal
                visible={visible}
                title="Edit Product"
                onCancel={onClose}
                width={800}
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
                    {/* Thumbnail upload */}
                    <Form.Item
                        name="thumb"
                        label="Thumbnail"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (!imageUploadedThumbnail) {
                                        return Promise.reject(new Error('Required'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                        validateStatus={imageUploadedThumbnail ? 'success' : 'error'}
                        help={!imageUploadedThumbnail && 'Required'}
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
                                message: 'Required',
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
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Required',
                                        },
                                        {
                                            validator(_, value) {
                                                if (value < 0) {
                                                    return Promise.reject(new Error('Must be a non-negative number.'));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input type="number" min={0} placeholder="Original Price" />
                                </Form.Item>
                                <Form.Item
                                    name={['price', 'discount']}
                                    label="Discount Price"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Required',
                                        },
                                        {
                                            validator(_, value) {
                                                if (value < 0) {
                                                    return Promise.reject(new Error('Must be a non-negative number.'));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input type="number" min={0} placeholder="Discount Price" />
                                </Form.Item>
                                <Form.Item
                                    name={['price', 'discount_quantity']}
                                    label="Discount Quantity"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Required',
                                        },
                                        {
                                            validator(_, value) {
                                                if (value < 0) {
                                                    return Promise.reject(new Error('Must be a non-negative number.'));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input type="number" min={0} placeholder="Discount Quantity" />
                                </Form.Item>
                                <Form.Item
                                    name={['price', 'currency']}
                                    label="Currency"
                                    rules={[{ required: false, message: 'Required' }]}
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
                                message: 'Required',
                            },
                            {
                                validator(_, value) {
                                    if (value < 0) {
                                        return Promise.reject(new Error('Must be a non-negative number.'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input type="number" min={0} placeholder="Quantity" />
                    </Form.Item>
                    {/* Category */}
                    <Form.Item label="Category">
                        <Form.List
                            name="category_id"
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
                        <Form.List name="material_id">
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
                    {/* SKU */}
                    <Form.Item
                        name={['product_type_id', 'sku']}
                        label="SKU"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                            {
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.resolve();
                                    }
                                    if (value.length < 5) {
                                        return Promise.reject(new Error('Must 5 character'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input placeholder="SKU" />
                    </Form.Item>
                    {/* TAG */}
                    <Form.Item
                        name={['product_type_id', 'tags']}
                        label="Tags"
                        rules={[
                            {
                                required: false,
                                message: 'Required',
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
                                    name={['product_type_id', 'dimensions', 'width']}
                                    label="Width"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Required',
                                        },
                                        {
                                            validator(_, value) {
                                                if (value < 0) {
                                                    return Promise.reject(new Error('Must be a non-negative number.'));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input type="number" min={0} placeholder="Width" />
                                </Form.Item>
                                <Form.Item
                                    name={['product_type_id', 'dimensions', 'height']}
                                    label="Height"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Required',
                                        },
                                        {
                                            validator(_, value) {
                                                if (value < 0) {
                                                    return Promise.reject(new Error('Must be a non-negative number.'));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input type="number" min={0} placeholder="Height" />
                                </Form.Item>
                                <Form.Item
                                    name={['product_type_id', 'dimensions', 'length']}
                                    label="Length"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Required',
                                        },
                                        {
                                            validator(_, value) {
                                                if (value < 0) {
                                                    return Promise.reject(new Error('Must be a non-negative number.'));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input type="number" min={0} placeholder="Length" />
                                </Form.Item>
                                <Form.Item
                                    name={['product_type_id', 'dimensions', 'unit']}
                                    label="Unit (Cm)"
                                    rules={[{ required: true, message: 'Required' }]}
                                >
                                    <Input placeholder="Unit (Cm)" defaultValue={'cm'} />
                                </Form.Item>
                            </div>
                        </Space>
                    </Form.Item>
                    {/* Description */}
                    <Form.Item label="Description" required>
                        <MdEditor
                            style={{ height: '250px', wordWrap: 'break-word' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={handleEditorChange}
                            value={valueDes}
                        />
                    </Form.Item>
                    {/* Images */}
                    <Form.Item
                        name={['product_type_id', 'images']}
                        label="Images"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (!imageUploaded) {
                                        return Promise.reject(new Error('Required'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                        validateStatus={imageUploaded ? 'success' : 'error'}
                        help={!imageUploaded && 'Required'}
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
                </Form>
            </Modal>
        </>
    );
};

export default EditProduct;
