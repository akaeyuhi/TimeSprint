import { store } from 'src/stores/root.store';

export const useStore = <T extends keyof typeof store>(storeName: T) =>
  store[storeName];
