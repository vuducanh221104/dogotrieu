// ProviderRedux.tsx
'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { persistStore } from 'redux-persist';

persistStore(store);
interface Props {
    children: React.ReactNode;
}

const ProviderRedux = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ProviderRedux;
