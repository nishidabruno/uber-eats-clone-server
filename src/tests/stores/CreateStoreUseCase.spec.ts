import { AppError } from '@errors/AppError';
import { CategoriesRepositoryInMemory } from '@repositories/in-memory/CategoriesRepositoryInMemory';
import { StoresRepositoryInMemory } from '@repositories/in-memory/StoresRepositoryInMemory';
import { UsersRepositoryInMemory } from '@repositories/in-memory/UsersRepositoryInMemory';
import { CreateStoreUseCase } from '@useCases/stores/CreateStoreUseCase';

let storesRepositoryInMemory: StoresRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createStoreUseCase: CreateStoreUseCase;

describe('CreateStoreUseCase', () => {
  beforeEach(() => {
    storesRepositoryInMemory = new StoresRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createStoreUseCase = new CreateStoreUseCase(
      storesRepositoryInMemory,
      usersRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new store', async () => {
    await usersRepositoryInMemory.create({
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: 'valid-password',
      avatar: 'http://valid-imgurl.com',
    });

    const category = await categoriesRepositoryInMemory.create({
      image: 'Valid image',
      name: 'Valid category name',
    });

    const user = await usersRepositoryInMemory.findByEmail(
      'validemail@email.com'
    );

    const store = await createStoreUseCase.execute({
      address: 'Valid address',
      location: {
        long: 35.6847875,
        lat: 139.710875,
      },
      delivery_fee: 0,
      delivery_time: 90,
      categories_id: [category.id],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: user!.id,
    });

    expect(store).toHaveProperty('id');
    expect(store).toHaveProperty('categories');
    expect(store.location.coordinates).toHaveLength(2);
    expect(store.categories[0]).toHaveProperty('id');
  });

  it('should not be able to create a store if the provided user id does not exist', async () => {
    await expect(
      createStoreUseCase.execute({
        address: 'Valid address',
        location: {
          long: 35.6847875,
          lat: 139.710875,
        },
        delivery_fee: 0,
        delivery_time: 90,
        categories_id: ['123'],
        name: 'Valid store name',
        opening_time_weekend: '8-17',
        opening_time_workweek: '8-18',
        user_id: 'Invalid user id',
      })
    ).rejects.toEqual(new AppError('The provided user does not exist.', 400));
  });
});
