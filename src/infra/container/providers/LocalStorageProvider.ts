import { promises } from 'fs';
import { resolve } from 'path';

import upload from '@config/multer';
import { IStorageProvider } from '@providers/IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(fileName: string, folder: string): Promise<void> {
    try {
      await promises.stat(resolve(upload.tmpFolder, folder));
    } catch {
      await promises.mkdir(resolve(upload.tmpFolder, folder));
    }

    await promises.rename(
      resolve(upload.tmpFolder, fileName),
      resolve(`${upload.tmpFolder}/${folder}`, fileName)
    );
  }

  async delete(fileName: string, folder: string): Promise<void> {
    const filePath = resolve(`${upload.tmpFolder}/${folder}`, fileName);

    // Only delete the file if it still on tmp folder
    try {
      await promises.stat(filePath);
    } catch {
      return;
    }

    await promises.unlink(filePath);
  }
}

export { LocalStorageProvider };
