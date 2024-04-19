import { ComputedRef, InjectionKey } from 'vue';
import { ImagesStateStoreState } from '../../types/stores';

export const StateProviderKey: InjectionKey<
  ComputedRef<ImagesStateStoreState | null>
> = Symbol('StateProviderKey');
