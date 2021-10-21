import { promises } from 'fs';
import Imagekit from 'imagekit';
import { resolve } from 'path';

import upload from '@config/multer';
import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@providers/IStorageProvider';

class ImagekitProvider implements IStorageProvider {
  async save(fileName: string, folder: string): Promise<void> {
    const imagekit = new Imagekit({
      publicKey: String(process.env.IMAGEKIT_PUBLIC_KEY),
      privateKey: String(process.env.IMAGEKIT_PRIVATE_KEY),
      urlEndpoint: String(process.env.IMAGEKIT_URL_ENDPOINT),
    });

    try {
      const file = await promises.readFile(resolve(upload.tmpFolder, fileName));
      await imagekit.upload({
        file,
        fileName,
        folder,
      });
    } catch {
      try {
        await promises.stat(resolve(upload.tmpFolder, fileName));
      } catch {
        return;
      }

      await promises.unlink(resolve(upload.tmpFolder, fileName));
      throw new AppError('Image upload failed.', 400);
    }
  }

  async delete(fileName: string): Promise<void> {
    const filePath = resolve(upload.tmpFolder, fileName);

    try {
      await promises.stat(filePath);
    } catch {
      return;
    }

    await promises.unlink(filePath);
  }
}

export { ImagekitProvider };
