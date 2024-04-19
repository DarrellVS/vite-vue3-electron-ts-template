import { dialog } from 'electron';
import fs from 'fs/promises';
import { imagesStateStore } from '../../../stores/ImagesStateStore';
import { ImagesStateStoreStateEntry } from '../../../../types/stores';
import { Dirent } from 'original-fs';
import { join } from 'path';
const mime = require('mime-types');

export default async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (result.canceled) return;

  const path = result.filePaths[0];
  const files = await fs.readdir(path, { withFileTypes: true });
  const parsedFiles: ImagesStateStoreStateEntry[] = [];

  const parseFiles = async (files: Dirent[], path: string) => {
    for (const file of files) {
      if (file.isDirectory()) {
        const subFiles = await fs.readdir(`${path}/${file.name}`, {
          withFileTypes: true,
        });
        await parseFiles(subFiles, `${path}/${file.name}`);
      } else if (file.isFile() && mime.lookup(file.name)?.includes('image')) {
        parsedFiles.push({
          name: file.name,
          path: join(path, file.name),
        });
      }
    }
  };

  await parseFiles(files, path);

  const state = {
    directory: path,
    entries: parsedFiles,
  };
  imagesStateStore.set(state);

  return state;
};
