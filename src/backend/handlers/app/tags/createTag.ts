import { Tag } from '../../../../types/stores';
import { tagStore } from '../../../stores/TagStore';

export default async (data: Tag) => {
  if (data.name.trim().length === 0) {
    throw new Error('Tag name cannot be empty');
  }

  const state = await tagStore.get();

  await tagStore.update({
    tags: [
      ...state.tags,
      {
        id: state.tags.length + 1,
        name: data.name,
        colorOption: data.colorOption,
        ...(data.parentTag && { parentTag: data.parentTag }),
      },
    ],
  });

  return data;
};
