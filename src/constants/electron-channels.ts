import { ipcRenderer } from 'electron';

export const electronChannels = {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  closeWindow: () => ipcRenderer.invoke('window:close'),
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window:maximize'),
  getState: () => ipcRenderer.invoke('app:getState'),
  selectSourceDirectory: () => ipcRenderer.invoke('app:selectSourceDirectory'),
};
