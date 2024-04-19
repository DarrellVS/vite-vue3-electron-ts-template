import { computed, inject } from 'vue';
import { StateProviderKey } from '../provider-keys/stateProviderKey';

export const useState = () => {
  return inject(
    StateProviderKey,
    computed(() => null)
  );
};
