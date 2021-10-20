import { getRepository, Repository } from 'typeorm';

import { ICreateStoreDbFormatDTO } from '@dtos/ICreateStoreDbFormatDTO';
import { IStore } from '@entities/IStore';
import { IStoresRepository } from '@repositories/IStoresRepository';

import { Store } from '../entities/Store';

class StoresRepository implements IStoresRepository {
  repository: Repository<Store>;

  constructor() {
    this.repository = getRepository(Store);
  }

  async create(storeData: ICreateStoreDbFormatDTO): Promise<IStore> {
    const createStoreResult = this.repository.create(storeData);

    const store = await this.repository.save(createStoreResult);

    return store;
  }

  async listAll(): Promise<IStore[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<IStore | undefined> {
    return this.repository.findOne(id);
  }

  async findByUserId(user_id: string): Promise<IStore | undefined> {
    return this.repository.findOne({ user_id });
  }

  async findByStoreName(storeName: string): Promise<IStore[]> {
    return this.repository
      .createQueryBuilder('stores')
      .where('LOWER(stores.name) = LOWER(:storeName)', { storeName })
      .getMany();
  }
}

export { StoresRepository };
