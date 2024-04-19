import { tagStore } from '../../../stores/TagStore';

export default async () => {
  const state = await tagStore.get();

  if (Object.keys(state).length === 0) {
    await tagStore.set({
      tags: [],
    });

    return {
      tags: [],
    };
  }

  return state;
};
