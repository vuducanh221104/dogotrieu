'use client';
import React from 'react';
import { Modal, Descriptions, Image } from 'antd';
import MarkdownRender from '@/components/MarkdownRender';
import classNames from 'classnames/bind';
import styles from './InfoNews.module.scss';

const cx = classNames.bind(styles);

interface PropsInfoNews {
    visible: boolean;
    onClose: () => void;
    news: any;
}
const InfoNews = ({ visible, onClose, news }: PropsInfoNews) => {
    return (
        <Modal visible={visible} title="News Info" onCancel={onClose} footer={null}>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Title">{news.title}</Descriptions.Item>
                <Descriptions.Item label="Description">{news.description}</Descriptions.Item>
                <Descriptions.Item label="Author">{news.author}</Descriptions.Item>
                <Descriptions.Item label="Tags">
                    {news.tags.map((tag: string, index: number) => (
                        <span key={index}>{tag}</span>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label="Content" className={cx('content')}>
                    {<MarkdownRender content={news.content} />}
                </Descriptions.Item>
                <Descriptions.Item label="Thumbnail">
                    <Image src={news.thumb} alt="thumbnail" style={{ width: '100%', height: 'auto' }} />
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {new Date(news.created_at).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At">
                    {new Date(news.updated_at).toLocaleDateString()}
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    );
};

export default InfoNews;
