import { imagesStateStore } from '../../../stores/ImagesStateStore';

export default async () => {
  const state = await imagesStateStore.get();

  if (Object.keys(state).length === 0) {
    return import('./selectSourceDirectory').then((module) => module.default());
  }

  return state;
};
