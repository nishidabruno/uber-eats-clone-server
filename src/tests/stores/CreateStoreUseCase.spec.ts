import { AppError } from '@errors/AppError';
import { StorageProviderInMemory } from '@providers/in-memory/StorageProviderInMemory';
import { CategoriesRepositoryInMemory } from '@repositories/in-memory/CategoriesRepositoryInMemory';
import { StoresCoordinatesRepositoryInMemory } from '@repositories/in-memory/StoresCoordinatesRepositoryInMemory';
import { StoresRepositoryInMemory } from '@repositories/in-memory/StoresRepositoryInMemory';
import { UsersRepositoryInMemory } from '@repositories/in-memory/UsersRepositoryInMemory';
import { CreateStoreUseCase } from '@useCases/stores/CreateStoreUseCase';

let storesRepositoryInMemory: StoresRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createStoreUseCase: CreateStoreUseCase;
let storageProvider: StorageProviderInMemory;
let storesCoordinatesRepository: StoresCoordinatesRepositoryInMemory;

describe('CreateStoreUseCase', () => {
  beforeEach(() => {
    storesRepositoryInMemory = new StoresRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    storageProvider = new StorageProviderInMemory();
    storesCoordinatesRepository = new StoresCoordinatesRepositoryInMemory();

    createStoreUseCase = new CreateStoreUseCase(
      storesRepositoryInMemory,
      usersRepositoryInMemory,
      categoriesRepositoryInMemory,
      storageProvider,
      storesCoordinatesRepository
    );
  });

  it('should be able to create a new store', async () => {
    await usersRepositoryInMemory.create({
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: 'valid-password',
    });
    const spyOnCoordinatesRepository = jest.spyOn(
      storesCoordinatesRepository,
      'create'
    );

    const category = await categoriesRepositoryInMemory.create({
      image: 'Valid image',
      name: 'Valid category name',
    });

    const user = await usersRepositoryInMemory.findByEmail(
      'validemail@email.com'
    );

    const coordinates = {
      longitude: 35.6847875,
      latitude: 139.710875,
    };

    const store = await createStoreUseCase.execute({
      address: 'Valid address',
      coordinates,
      delivery_fee: 0,
      delivery_time: 90,
      categories_id: [category.id],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: user!.id,
      image: 'validImage',
    });

    expect(store).toHaveProperty('id');
    expect(store).toHaveProperty('categories');
    expect(store).toHaveProperty('coordinates_id');
    expect(spyOnCoordinatesRepository).toHaveBeenCalledTimes(1);
    expect(store.categories[0]).toHaveProperty('id');
  });

  it('should not be able to create a store if the provided user id does not exist', async () => {
    const coordinates = {
      longitude: 35.6847875,
      latitude: 139.710875,
    };
    await expect(
      createStoreUseCase.execute({
        address: 'Valid address',
        coordinates,
        delivery_fee: 0,
        delivery_time: 90,
        categories_id: ['123'],
        name: 'Valid store name',
        opening_time_weekend: '8-17',
        opening_time_workweek: '8-18',
        user_id: 'Invalid user id',
        image: 'validImage',
      })
    ).rejects.toEqual(new AppError('The provided user does not exist.', 400));
  });
});
