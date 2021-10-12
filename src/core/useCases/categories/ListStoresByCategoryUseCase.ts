import { inject, injectable } from 'tsyringe';

import { ICategory } from '@entities/ICategory';
import { ICategoriesRepository } from '@repositories/ICategoriesRepository';

@injectable()
class ListStoresByCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(category_id: string): Promise<ICategory | undefined> {
    const stores = await this.categoriesRepository.findStoresByCategory(
      category_id
    );

    return stores;
  }
}

export { ListStoresByCategoryUseCase };
