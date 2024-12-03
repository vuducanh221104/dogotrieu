import { CldImage } from 'next-cloudinary';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames/bind';
import styles from '@/styles/NewsDetail.module.scss';

const cx = classNames.bind(styles);

interface MarkdownRenderI {
    content: string;
}
const MarkdownRender = ({ content }: MarkdownRenderI) => {
    return (
        <ReactMarkdown
            components={{
                // Custom image renderer
                img: ({ src, alt }) => (
                    <div className={cx('aspect-ratio')}>
                        <CldImage
                            src={src || ''}
                            alt={alt || 'DOOGTRIEU.COM'}
                            width={1000} // You can adjust width and height as needed
                            height={500} // Or make them dynamic if required
                        />
                    </div>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRender;
