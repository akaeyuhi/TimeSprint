import { store } from 'src/stores/root.store';

export const useService = <T extends keyof typeof store.services>(
  serviceName: T
) => store.services[serviceName];
