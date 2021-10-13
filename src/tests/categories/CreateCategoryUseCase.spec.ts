import { AppError } from '@errors/AppError';
import { StorageProviderInMemory } from '@providers/in-memory/StorageProviderInMemory';
import { CategoriesRepositoryInMemory } from '@repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from '@useCases/categories/CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let storageProvider: StorageProviderInMemory;

describe('CreateCategoryUseCase', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    storageProvider = new StorageProviderInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
      storageProvider
    );
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Valid category',
      image: 'Valid image link',
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a new category if one with the same name already exists', async () => {
    await createCategoryUseCase.execute({
      name: 'Valid category',
      image: 'Valid image link',
    });

    await expect(
      createCategoryUseCase.execute({
        name: 'Valid category',
        image: 'Valid image link',
      })
    ).rejects.toEqual(new AppError('Category already exists.', 409));
  });
});
