'use client';
import { AppProgressBar as NextProgressBar } from 'next-nprogress-bar';

type Props = { children?: React.ReactNode };

function ProgressBar({ children }: Props) {
    return (
        <>
            {children}
            <NextProgressBar height="4px" color="#00bfff" options={{ showSpinner: true }} shallowRouting />
        </>
    );
}

export default ProgressBar;
