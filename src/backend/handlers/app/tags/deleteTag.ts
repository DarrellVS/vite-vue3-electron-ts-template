import { tagStore } from '../../../stores/TagStore';
import { imagesStateStore } from '../../../stores/ImagesStateStore';

export default async (id: number) => {
  const tagStoreState = await tagStore.get();
  const imagesState = await imagesStateStore.get();

  let newTagsState = tagStoreState.tags;
  const removedTagIds: number[] = [];

  // Tags may be nested, so we need to remove the tag and all of its children (tag has childTags property)
  const removeTagAndChildren = (tagId: number) => {
    const tagIndex = newTagsState.findIndex((tag) => tag.id === tagId);

    if (tagIndex !== -1) {
      const tag = newTagsState[tagIndex];
      removedTagIds.push(tag.id);

      newTagsState = newTagsState.filter((tag) => tag.id !== tagId);

      tag.childTags.forEach((childTag) => {
        removeTagAndChildren(childTag.id);
      });
    }
  };

  removeTagAndChildren(id);

  await tagStore.update({ tags: newTagsState });

  // Remove the tag from all images
  const newImagesState = imagesState.entries.map((entry) => {
    return {
      ...entry,
      tags: entry.tags.filter((tagId) => !removedTagIds.includes(tagId)),
    };
  });

  await imagesStateStore.update({ entries: newImagesState });
};
