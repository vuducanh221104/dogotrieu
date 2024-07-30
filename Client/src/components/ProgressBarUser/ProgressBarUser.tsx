'use client';
import { AppProgressBar as NextProgressBar } from 'next-nprogress-bar';

type Props = { children?: React.ReactNode };

function ProgressBarUser({ children }: Props) {
    return (
        <>
            {children}
            <NextProgressBar
                height="2.5px"
                color="rgba(223, 204, 142)"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
}

export default ProgressBarUser;
