import { RootStoreContext } from 'src/stores';
import { useContext } from 'react';

export const useStores = () => useContext(RootStoreContext);
