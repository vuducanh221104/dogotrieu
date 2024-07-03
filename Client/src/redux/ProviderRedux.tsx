'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '@/redux/store';
import { persistStore } from 'redux-persist';
// persistStore(store);
function ProviderRedux({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
}

export default ProviderRedux;
