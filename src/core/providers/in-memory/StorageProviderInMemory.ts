import { IStorageProvider } from '@providers/IStorageProvider';

class StorageProviderInMemory implements IStorageProvider {
  async save(): Promise<void> {
    return Promise.resolve();
  }
  async delete(): Promise<void> {
    return Promise.resolve();
  }
}

export { StorageProviderInMemory };
