'use client';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload, Image, Space, Modal, Spin } from 'antd';
import { useMessageNotify } from '@/components/MessageNotify';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { uploadCloud } from '@/services/uploadService';
import { newsPatchById } from '@/services/newsServices';
import axios from 'axios';

const EditNews: React.FC<any> = ({ visible, onClose, news, mutate }) => {
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [form] = Form.useForm();
    const [valueContent, setValueContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Thumbnail Upload
    const [thumbnail, setThumbnail] = useState([]);
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const [thumbnailOpen, setThumbnailOpen] = useState(false);
    const [imageUploadedThumbnail, setImageUploadedThumbnail] = useState(false);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            values.content = valueContent;

            let uploadedThumbnail = [];

            // Upload Images only if there are changes
            if (thumbnail.some((file: any) => !file.url)) {
                uploadedThumbnail = await uploadImagesToCloudinary(thumbnail.filter((file: any) => !file.url));
            }

            // Update values with uploaded images
            values.thumb = uploadedThumbnail.length > 0 ? uploadedThumbnail[0] : values.thumb;

            const news_data = {
                thumb: uploadedThumbnail.url || values.thumb,
                title: values.title,
                description: values.description,
                content: values.content,
                tags: values.tags,
                author: values.author,
            };

            try {
                await newsPatchById(news._id, news_data);
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
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }: any) {
        setValueContent(text);
    }

    useEffect(() => {
        if (news) {
            const formattedThumbnail: any = news.thumb
                ? [
                      {
                          uid: '-1',
                          name: 'thumbnail.png',
                          status: 'done',
                          url: news.thumb,
                      },
                  ]
                : [];
            setThumbnail(formattedThumbnail);
            setImageUploadedThumbnail(formattedThumbnail.length > 0);

            form.setFieldsValue({
                ...news,
            });
            setValueContent(news.content);
        }
    }, [news]);

    return (
        <>
            {contextHolder}
            {loading && <ModalLoadingAdmin />}
            <Modal
                visible={visible}
                title="Edit News"
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
                    {/* Title */}
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
                        <Input type="title" placeholder="Title" />
                    </Form.Item>
                    {/* Description */}
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                        ]}
                    >
                        <Input type="description" placeholder="Description" />
                    </Form.Item>
                    {/* Author */}
                    <Form.Item
                        name="author"
                        label="Author"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                        ]}
                    >
                        <Input type="author" placeholder="Author" />
                    </Form.Item>
                    {/* Tags */}
                    <Form.Item
                        name="tags"
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
                    {/* Content */}
                    <Form.Item label="Content" required>
                        <MdEditor
                            style={{ height: '250px', wordWrap: 'break-word' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={handleEditorChange}
                            value={valueContent}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditNews;
