import { CreateTagDto, Tag } from '../../../../types/stores';
import { tagStore } from '../../../stores/TagStore';

export default async (data: CreateTagDto) => {
  if (data.name.trim().length === 0) {
    throw new Error('Tag name cannot be empty');
  }

  const state = await tagStore.get();
  const lastTagId = state.tags[state.tags.length - 1]?.id || 0;
  const newId = lastTagId + 1;

  let newTagsState: Tag[] = [];

  const newTag: Tag = {
    id: newId,
    name: data.name,
    colorOption: data.colorOption,
    childTags: [],
  };

  if (data.parentTag) {
    newTagsState = state.tags.map((tag) => ({
      ...tag,
      childTags: [...tag.childTags, newTag],
    }));
  } else {
    newTagsState = [...state.tags, newTag];
  }

  await tagStore.update({
    tags: newTagsState,
  });

  return data;
};
