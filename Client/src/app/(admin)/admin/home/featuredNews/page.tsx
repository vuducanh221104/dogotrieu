'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useMessageNotify } from '@/components/MessageNotify';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { homeGet, homePatch } from '@/services/homeServices';

function PageFeaturedNews() {
    const { data } = homeGet();
    const { messageCustomError, messageCustomSuccess, contextHolder } = useMessageNotify();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<{ featuredNews: { id: string }[] }>({
        featuredNews: [{ id: '' }, { id: '' }, { id: '' }],
    });

    useEffect(() => {
        if (data && data.length > 0 && data[0].featured_news) {
            const initialValues = {
                featuredNews: data[0].featured_news.map((item: any) => ({
                    id: item,
                })),
            };
            form.setFieldsValue(initialValues);
            setInitialValues(initialValues);
        }
    }, [data, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const featuredNewsIds = values.featuredNews.map((news: any) => news.id);
            const postFeaturedNews = await homePatch({ featured_news: featuredNewsIds });
            if (!postFeaturedNews) {
                messageCustomError('Add Error');
            } else {
                messageCustomSuccess('Add Successfully');
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
            <div>
                <Form form={form} layout="vertical" initialValues={initialValues}>
                    <Form.List name="featuredNews">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key}>
                                        <Button type="link">{`${key + 1}.`}</Button>
                                        <div className="ml-20">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'id']}
                                                label="ID"
                                                rules={[{ required: true, message: 'Missing ID' }]}
                                            >
                                                <Input placeholder="Enter ID" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit} loading={loading} className="mt-5">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default PageFeaturedNews;
