'use client';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
// persistStore(store);
function ProviderRedux({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
}

export default ProviderRedux;
