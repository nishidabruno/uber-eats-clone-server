import { promises } from 'fs';
import { resolve } from 'path';

import upload from '@config/multer';
import { IStorageProvider } from '@providers/IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`${upload.tmpFolder}/${folder}`, file);

    // Only delete the file if it still on tmp folder
    try {
      await promises.stat(fileName);
    } catch {
      return;
    }

    await promises.unlink(fileName);
  }
}

export { LocalStorageProvider };
