import { ComputedRef, computed } from 'vue';
import { Tag, IndentedTag } from '../../types/stores';

export const useFlatTags = (tags: ComputedRef<Tag[]>) => {
  let indentLevel = -1;

  const flattenTags = (tags: Tag[]): IndentedTag[] => {
    indentLevel += 1;
    return tags.reduce((acc, tag) => {
      acc.push({
        ...tag,
        indentLevel,
      });
      acc.push(...flattenTags(tag.childTags));
      return acc;
    }, [] as IndentedTag[]);
  };

  return computed(() => flattenTags(tags.value));
};
