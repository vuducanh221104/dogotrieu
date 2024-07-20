interface PropsLoading {
    height?: string;
}
function Loading({ height = '1000px' }: PropsLoading) {
    return <div style={{ height: height }}></div>;
}

export default Loading;
