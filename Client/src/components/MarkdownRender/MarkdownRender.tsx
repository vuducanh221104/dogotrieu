import ReactMarkdown from 'react-markdown';

interface MarkdownRenderI {
    content: string;
}
const MarkdownRender = ({ content }: MarkdownRenderI) => {
    return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default MarkdownRender;
