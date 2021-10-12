import { ICategory } from 'core/entities/ICategory';

import { ICreateStoreDTO } from './ICreateStoreDTO';

interface ICreateStoreDbFormatDTO
  extends Omit<ICreateStoreDTO, 'categories_id' | 'coordinates'> {
  categories: ICategory[];
  coordinates_id: string;
}

export { ICreateStoreDbFormatDTO };
