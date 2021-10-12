import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '@dtos/ICreateCategoryDTO';
import { ICategory } from '@entities/ICategory';
import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@providers/IStorageProvider';
import { ICategoriesRepository } from '@repositories/ICategoriesRepository';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute({ image, name }: ICreateCategoryDTO): Promise<ICategory> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      await this.storageProvider.delete(image, '');
      throw new AppError('Category already exists.', 409);
    }

    await this.storageProvider.save(image, 'categories');
    await this.storageProvider.delete(image, '');

    const category = await this.categoriesRepository.create({ image, name });

    return category;
  }
}

export { CreateCategoryUseCase };
