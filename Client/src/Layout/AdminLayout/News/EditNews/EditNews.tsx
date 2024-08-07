import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload, Image, Modal } from 'antd';
import { useMessageNotify } from '@/components/MessageNotify';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { uploadCloud } from '@/services/uploadService';
import { newsPatchById } from '@/services/newsServices';
import { dataTaggedNews } from '@/services/menuData/menuData';

interface PropsEditNews {
    visible: boolean;
    onClose: () => void;
    news: any;
    mutate: any;
}

const EditNews: React.FC<PropsEditNews> = ({ visible, onClose, news, mutate }) => {
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [form] = Form.useForm();
    const [valueContent, setValueContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Thumbnail Upload
    const [thumbnail, setThumbnail] = useState([]);
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const [thumbnailOpen, setThumbnailOpen] = useState(false);
    const [imageUploadedThumbnail, setImageUploadedThumbnail] = useState(false);
    const dataTagged = [
        { id: '0', title: 'none', url: 'none' },
        ...dataTaggedNews.filter((item: any) => item.title !== 'all' && item.url !== 'all'),
    ];

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            console.log(values);
            values.content = valueContent;
            const selectedDescription = dataTagged.find((item: any) => item.url === values.description);

            let uploadedThumbnail = [];

            if (thumbnail.some((file: any) => !file.url)) {
                uploadedThumbnail = await uploadImagesToCloudinary(thumbnail.filter((file: any) => !file.url));
            }

            values.thumb = uploadedThumbnail.length > 0 ? uploadedThumbnail[0] : values.thumb;

            // Prepare data to send
            const news_data = {
                thumb: values.thumb,
                title: values.title,
                description: selectedDescription?.title === 'none' ? null : selectedDescription?.title,
                slug_description: selectedDescription?.url === 'none' ? null : selectedDescription?.url,
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

    // Markdown Editor
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
                description: dataTagged.find((item: any) => item.url === news.description)?.url || news.description,
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
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            filterOption={(input: any, option: any) =>
                                (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            filterSort={(optionA: any, optionB: any) =>
                                (optionA?.name ?? '').toLowerCase().localeCompare((optionB?.name ?? '').toLowerCase())
                            }
                            placeholder="Select description"
                            options={dataTagged.map((item: any) => ({
                                name: item.title,
                                value: item.url,
                                label: item.title,
                            }))}
                        />
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
                    <Form.Item label="Content">
                        <MdEditor
                            style={{ height: '400px' }}
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
