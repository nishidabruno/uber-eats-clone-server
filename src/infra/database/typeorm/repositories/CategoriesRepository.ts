import { getRepository, Repository } from 'typeorm';

import { ICreateCategoryDTO } from '@dtos/ICreateCategoryDTO';
import { ICategory } from '@entities/ICategory';
import { ICategoriesRepository } from '@repositories/ICategoriesRepository';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ image, name }: ICreateCategoryDTO): Promise<ICategory> {
    const createCategoryResult = this.repository.create({ image, name });

    const category = await this.repository.save(createCategoryResult);

    return category;
  }

  async findByIds(ids: string[]): Promise<ICategory[]> {
    return this.repository.findByIds(ids);
  }

  async findByName(name: string): Promise<ICategory | undefined> {
    return this.repository.findOne({ name });
  }

  async listAll(): Promise<ICategory[]> {
    return this.repository.find();
  }

  async findStoresByCategory(
    category_id: string
  ): Promise<ICategory | undefined> {
    return this.repository.findOne({
      where: { id: category_id },
      relations: ['stores'],
    });
  }
}

export { CategoriesRepository };
