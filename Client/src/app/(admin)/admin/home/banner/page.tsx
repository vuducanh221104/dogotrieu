'use client';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, Image } from 'antd';
import { useMessageNotify } from '@/components/MessageNotify';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { uploadCloud } from '@/services/uploadService';
import { homeGet, homePatch } from '@/services/homeServices';

function PageBannerHome() {
    const { data } = homeGet();
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [fileLists, setFileLists] = useState<{ [key: number]: any[] }>({});
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (data && data.length > 0 && data[0].images_banner) {
            const initialValues = {
                images: data[0].images_banner.map((banner: any) => ({
                    link: banner.link,
                    image: banner.url,
                })),
            };
            form.setFieldsValue(initialValues);

            const initialFileLists: { [key: number]: any[] } = {};
            data[0].images_banner.forEach((banner: any, index: number) => {
                initialFileLists[index] = [
                    {
                        uid: index,
                        name: `image-${index}.jpg`,
                        status: 'done',
                        url: banner.url,
                    },
                ];
            });
            setFileLists(initialFileLists);
            setInitialDataLoaded(true);
        }
    }, [data, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const dataImages = await Promise.all(
                values.images.map(async (image: any, index: number) => {
                    if (fileLists[index] && fileLists[index][0] && fileLists[index][0].originFileObj) {
                        const uploadedImages = await uploadImagesToCloudinary(fileLists[index]);
                        return { url: uploadedImages[0], link: image.link };
                    }
                    return { url: image.image, link: image.link };
                }),
            );

            const postHome = await homePatch({ images_banner: dataImages });
            if (!postHome) {
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

    const handleChange = (key: number, { fileList: newFileList }: any) => {
        setFileLists((prev) => ({ ...prev, [key]: newFileList }));
        if (newFileList.length > 0) {
            form.setFields([
                {
                    name: ['images', key, 'image'],
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
        if (data.length === 0) {
            messageCustomError('Images upload failed');
            return null;
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

    return (
        <>
            {contextHolder}
            {loading && <ModalLoadingAdmin />}
            <div>
                {initialDataLoaded && (
                    <Form form={form} layout="vertical">
                        <Form.List name="images">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key}>
                                            <Button type="link">{`${key + 1}.`}</Button>
                                            <div className="ml-20">
                                                <Form.Item label="Image:">
                                                    <Upload
                                                        listType="picture-card"
                                                        fileList={fileLists[key] || []}
                                                        onPreview={handlePreview}
                                                        onChange={(info) => handleChange(key, info)}
                                                        multiple={false}
                                                        accept="image/*"
                                                        name="image"
                                                    >
                                                        {(fileLists[key] || []).length >= 1 ? null : uploadButton}
                                                    </Upload>
                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'link']}
                                                    fieldKey={[name, 'link']}
                                                    label="Link:"
                                                    rules={[{ required: true, message: 'Required' }]}
                                                >
                                                    <Input placeholder="Link" />
                                                </Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => remove(name)}
                                                    icon={<MinusCircleOutlined />}
                                                    style={{ marginBottom: 8 }}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                        style={{ width: '60%' }}
                                    >
                                        Add Image
                                    </Button>
                                </>
                            )}
                        </Form.List>

                        <Form.Item>
                            <Button type="primary" onClick={handleSubmit} loading={loading} className="mt-5">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                )}
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
            </div>
        </>
    );
}

export default PageBannerHome;
