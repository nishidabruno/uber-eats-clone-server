/* eslint-disable @typescript-eslint/no-unused-vars */
import { IStorageProvider } from '@providers/IStorageProvider';

class StorageProviderInMemory implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    return 'Test';
  }
  async delete(file: string, folder: string): Promise<void> {
    return Promise.resolve();
  }
}

export { StorageProviderInMemory };
