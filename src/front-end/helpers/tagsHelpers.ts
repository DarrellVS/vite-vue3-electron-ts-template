import { ComputedRef, computed } from 'vue';
import { type Tag } from '../../types/stores';
import { tagColors } from '../../constants/tag-colors';

export const mapTagsToComboboxOptions = (tags: ComputedRef<Tag[]>) =>
  computed(() => {
    return tags.value.map((tag) => {
      const color = tagColors.find((color) => color.id === tag.colorOption);

      return {
        value: tag.id,
        label: tag.name,
        badgeColor: color?.bg ?? '',
        textColor: color?.text ?? '',
      };
    });
  });

export const addBadgeFields = <
  T extends {
    id: number;
    colorOption: number;
  }
>(
  tags: ComputedRef<T[]>
) => {
  return computed(() => {
    return tags.value.map((tag) => {
      const color = tagColors.find((color) => color.id === tag.colorOption);

      return {
        ...tag,
        badgeColor: color?.bg ?? '',
        textColor: color?.text ?? '',
      };
    });
  });
};
