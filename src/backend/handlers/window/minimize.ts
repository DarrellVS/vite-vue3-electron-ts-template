import { BrowserWindow } from 'electron';

export default () => {
  BrowserWindow?.getFocusedWindow()?.minimize();
};
