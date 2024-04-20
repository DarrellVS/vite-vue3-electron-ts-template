// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { contextBridge, ipcRenderer } from 'electron';
import { Tag } from '../../../types/stores';

const channels = {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  closeWindow: () => ipcRenderer.invoke('window:close'),
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window:maximize'),
  images_getState: () => ipcRenderer.invoke('app:images:getState'),
  images_selectSourceDirectory: () =>
    ipcRenderer.invoke('app:images:selectSourceDirectory'),
  tags_getState: () => ipcRenderer.invoke('app:tags:getState'),
  tags_createTag: (tag: Tag) => ipcRenderer.invoke('app:tags:createTag', tag),
  tags_deleteTag: (tagId: number) =>
    ipcRenderer.invoke('app:tags:deleteTag', tagId),
  tags_setTags: (dto: { imagePaths: string[]; tagIds: number[] }) =>
    ipcRenderer.invoke('app:tags:setTags', dto),
};

export type ElectronChannels = keyof typeof channels;

contextBridge.exposeInMainWorld('electronAPI', channels);
