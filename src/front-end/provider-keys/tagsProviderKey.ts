import { ComputedRef, InjectionKey } from 'vue';
import { TagStoreState } from '../../types/stores';

export const TagsProviderKey: InjectionKey<ComputedRef<TagStoreState['tags']>> =
  Symbol('StateProviderKey');
