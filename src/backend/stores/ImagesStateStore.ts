import { ImagesStateStoreState } from '../../types/stores';
import { BaseStore } from './BaseStore';

export const imagesStateStore = new BaseStore<ImagesStateStoreState>('images');
