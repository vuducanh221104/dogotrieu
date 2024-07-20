'use client';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ReactNode } from 'react';
// persistStore(store);
interface Props {
    children: ReactNode;
}

function ProviderRedux({ children }: Props) {
    return <Provider store={store}>{children}</Provider>;
}

export default ProviderRedux;
