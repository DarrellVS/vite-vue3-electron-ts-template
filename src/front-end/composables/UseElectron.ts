import { type ElectronChannels } from '../../backend/electron/preload/preload';

export const useElectron = () => {
  const emit = (channel: ElectronChannels, ...args: any[]) => {
    // @ts-ignore
    return window.electronAPI[channel](...args);
  };

  return {
    emit,
  };
};
