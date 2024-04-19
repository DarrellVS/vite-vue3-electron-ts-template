import { TagStoreState } from '../../types/stores';
import { BaseStore } from './BaseStore';

export const tagStore = new BaseStore<TagStoreState>('tags');
