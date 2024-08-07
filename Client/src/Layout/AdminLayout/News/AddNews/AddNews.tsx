import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, Image, Modal, Select } from 'antd';
import { useMessageNotify } from '@/components/MessageNotify';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { uploadCloud } from '@/services/uploadService';
import { newsAdd } from '@/services/newsServices';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { dataTaggedNews } from '@/services/menuData/menuData';

interface PropsAddNews {
    visible: boolean;
    onClose: () => void;
    mutate: any;
}

const AddNews: React.FC<PropsAddNews> = ({ visible, onClose, mutate }) => {
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [form] = Form.useForm();
    const [valueContent, setValueContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [thumbnail, setThumbnail] = useState([]);
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const [thumbnailOpen, setThumbnailOpen] = useState(false);
    const [imageUploadedThumbnail, setImageUploadedThumbnail] = useState(false);
    const dataTagged = [
        { id: '0', title: 'none', url: 'none' },
        ...dataTaggedNews.filter((item: any) => item.title !== 'all' && item.url !== 'all'),
    ];

    useEffect(() => {
        if (visible) {
            form.resetFields();
            setValueContent('');
            setThumbnail([]);
            setImageUploadedThumbnail(false);
        }
    }, [visible]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            values.content = valueContent;

            // Upload Image
            const uploadedThumbnail = await uploadImagesToCloudinary(thumbnail);
            if (!uploadedThumbnail) {
                messageCustomError('Upload Image Error');
                setLoading(false);
                return;
            }
            values.thumb = uploadedThumbnail[0];

            // Convert description values to include labels
            const descriptionWithLabels = values.description.map((value: string) => {
                const itemDescription = dataTagged.find((item: any) => item.url === value);
                return {
                    value,
                    label: itemDescription ? itemDescription.title : '',
                };
            });

            const news_data = {
                title: values.title,
                description: descriptionWithLabels[0].label === 'none' ? null : descriptionWithLabels[0].label,
                slug_description: descriptionWithLabels[0].value === 'none' ? null : descriptionWithLabels[0].value,
                thumb: values.thumb,
                content: values.content,
                tags: values.tags,
                author: values.author,
            };

            await newsAdd(news_data);
            form.resetFields();
            setValueContent('');
            setThumbnail([]);
            setImageUploadedThumbnail(false);
            mutate();
            messageCustomSuccess('Add News Successfully');
            setLoading(false);
            onClose();
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
            return [];
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

    // Markdown
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }: any) {
        setValueContent(text);
    }

    return (
        <>
            {contextHolder}
            {loading && <ModalLoadingAdmin />}
            <Modal
                visible={visible}
                title="Add News"
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
                <Form form={form} layout="vertical" initialValues={{ description: [''], author: 'Vũ Đức Anh' }}>
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
                    <Form.Item label="Description">
                        <Form.List name="description">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item required={true} key={field.key}>
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
                                                        (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    filterSort={(optionA: any, optionB: any) =>
                                                        (optionA?.name ?? '')
                                                            .toLowerCase()
                                                            .localeCompare((optionB?.name ?? '').toLowerCase())
                                                    }
                                                    placeholder="Select description"
                                                    options={dataTagged.map((item: any) => ({
                                                        name: item.title,
                                                        value: item.url,
                                                        label: item.title,
                                                    }))}
                                                />
                                            </Form.Item>
                                        </Form.Item>
                                    ))}
                                </>
                            )}
                        </Form.List>
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

export default AddNews;
