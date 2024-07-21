export const data = 123;
interface Props {
    title: string;
    description: string;
}

export default function HandleMetadata({ title, description }: Props) {
    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
        </>
    );
}
