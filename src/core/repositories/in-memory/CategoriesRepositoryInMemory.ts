import { ICreateCategoryDTO } from 'core/dtos/ICreateCategoryDTO';
import { ICategory } from 'core/entities/ICategory';

import { generateID } from '@utils/generateID';

import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: ICategory[] = [];

  async create({ image, name }: ICreateCategoryDTO): Promise<ICategory> {
    const category: ICategory = {
      id: generateID(),
      image,
      name,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.categories.push(category);

    return category;
  }

  async findByIds(ids: string[]): Promise<ICategory[]> {
    const categories: ICategory[] = [];

    ids.forEach((id) => {
      const category = this.categories.find((category) => category.id === id);

      if (category) {
        categories.push(category);
      }
    });

    return categories;
  }

  async findByName(name: string): Promise<ICategory | undefined> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepositoryInMemory };
