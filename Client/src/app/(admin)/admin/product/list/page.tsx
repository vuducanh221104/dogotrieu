'use client';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload, Image } from 'antd';
import { useMessageNotify } from '@/components/MessageNotify';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';

function MyCustomForm() {
    const { messageSuccess, messageError, contextHolder } = useMessageNotify();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    //Image Upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [imageUploaded, setImageUploaded] = useState(false);

    const handleSubmit = () => {
        messageSuccess();
        form.validateFields()
            .then((values) => {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    console.log('All fields are valid');
                    console.log('Form values:', values);
                }, 2000);
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
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

    return (
        <>
            {contextHolder}
            {/* <ModalLoadingAdmin /> */}
            <Form form={form} layout="vertical">
                <Form.Item
                    name="contactNumber"
                    label="Contact Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter contact number!',
                        },
                        {
                            validator(_, value) {
                                if (!value || value.length === 10) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject('Please enter a 10-digit number!');
                                }
                            },
                        },
                    ]}
                >
                    <Input type="number" placeholder="Contact number" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'The input is not a valid email!',
                        },
                        {
                            validator(_, value) {
                                if (!value || /^\S+@\S+\.\S+$/.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Please enter a valid email!');
                            },
                        },
                    ]}
                >
                    <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select' }]}>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        optionFilterProp="children"
                        filterOption={(input: any, option: any) =>
                            (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        filterSort={(optionA: any, optionB: any) =>
                            (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
                        }
                        placeholder="Select your category"
                        options={[
                            {
                                label: <span>manager</span>,
                                title: 'manager',
                                options: [
                                    { label: <span>Jack</span>, value: 'Jack' },
                                    { label: <span>Lucy</span>, value: 'Lucy' },
                                ],
                            },
                            {
                                label: <span>engineer</span>,
                                title: 'engineer',
                                options: [
                                    { label: <span>Chloe</span>, value: 'Chloe' },
                                    { label: <span>Lucas</span>, value: 'Lucas' },
                                ],
                            },
                        ]}
                    />
                </Form.Item>
                {/* upload */}
                <Form.Item
                    name="image"
                    label="Image"
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
                        name="image"
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
                <Form.Item>
                    <Button type="primary" onClick={handleSubmit} loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {/* {true && < />} */}
        </>
    );
}

export default MyCustomForm;
