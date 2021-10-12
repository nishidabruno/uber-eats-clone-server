import { inject, injectable } from 'tsyringe';

import { ICategory } from '@entities/ICategory';
import { ICategoriesRepository } from '@repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute(): Promise<ICategory[]> {
    const categories = await this.categoriesRepository.listAll();

    return categories;
  }
}

export { ListCategoriesUseCase };
