import { ICreateStoreDbFormatDTO } from '@dtos/ICreateStoreDbFormatDTO';
import { IStore } from '@entities/IStore';

interface IStoresRepository {
  create(storeData: ICreateStoreDbFormatDTO): Promise<IStore>;
  listAll(): Promise<IStore[]>;
  findById(id: string): Promise<IStore | undefined>;
  findByUserId(user_id: string): Promise<IStore | undefined>;
}

export { IStoresRepository };
