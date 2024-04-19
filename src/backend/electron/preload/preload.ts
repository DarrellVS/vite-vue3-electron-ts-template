// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { contextBridge, ipcRenderer } from 'electron';

const channels = {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  closeWindow: () => ipcRenderer.invoke('window:close'),
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window:maximize'),
  getState: () => ipcRenderer.invoke('app:images:getState'),
  selectSourceDirectory: () =>
    ipcRenderer.invoke('app:images:selectSourceDirectory'),
};

export type ElectronChannels = keyof typeof channels;

contextBridge.exposeInMainWorld('electronAPI', channels);
