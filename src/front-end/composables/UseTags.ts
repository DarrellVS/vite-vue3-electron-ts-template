import { computed, inject } from 'vue';
import { TagsProviderKey } from '@/provider-keys/tagsProviderKey';

export const useTags = () => {
  return inject(
    TagsProviderKey,
    computed(() => [])
  );
};
