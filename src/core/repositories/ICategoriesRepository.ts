import { ICreateCategoryDTO } from '@dtos/ICreateCategoryDTO';
import { ICategory } from '@entities/ICategory';

interface ICategoriesRepository {
  create(categoryDate: ICreateCategoryDTO): Promise<ICategory>;
  findByIds(ids: string[]): Promise<ICategory[]>;
  findByName(name: string): Promise<ICategory | undefined>;
  listAll(): Promise<ICategory[]>;
  findStoresByCategory(category_id: string): Promise<ICategory | undefined>;
}

export { ICategoriesRepository };
