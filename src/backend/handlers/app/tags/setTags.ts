import { imagesStateStore } from '../../../stores/ImagesStateStore';

export default async (data: { imagePaths: string[]; tagIds: number[] }) => {
  let state = await imagesStateStore.get();

  const entries = state.entries.map((entry) => {
    if (data.imagePaths.includes(entry.path)) {
      return {
        ...entry,
        tags: [...new Set([...data.tagIds])],
      };
    }
    return entry;
  });

  state = {
    ...state,
    entries,
  };

  await imagesStateStore.set(state);
};
