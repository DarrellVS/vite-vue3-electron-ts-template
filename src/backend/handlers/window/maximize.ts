import { BrowserWindow } from 'electron';

export default () => {
  const focusedWindow = BrowserWindow?.getFocusedWindow();
  if (focusedWindow?.isMaximized()) {
    focusedWindow.unmaximize();
  } else {
    focusedWindow?.maximize();
  }
};
