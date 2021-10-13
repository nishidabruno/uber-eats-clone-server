import { ICreateStoreDbFormatDTO } from '@dtos/ICreateStoreDbFormatDTO';
import { IStore } from '@entities/IStore';
import { IStoresRepository } from '@repositories/IStoresRepository';
import { generateID } from '@utils/generateID';

class StoresRepositoryInMemory implements IStoresRepository {
  stores: IStore[] = [];

  async create(storeData: ICreateStoreDbFormatDTO): Promise<IStore> {
    const newStore = {
      ...storeData,
      id: generateID(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.stores.push(newStore);

    return newStore;
  }
  async listAll(): Promise<IStore[]> {
    const { stores } = this;

    return stores;
  }

  async findById(id: string): Promise<IStore | undefined> {
    return this.stores.find((store) => store.id === id);
  }

  async findByUserId(user_id: string): Promise<IStore | undefined> {
    return this.stores.find((store) => store.user_id === user_id);
  }
}

export { StoresRepositoryInMemory };
