import { AppError } from '@errors/AppError';
import { StorageProviderInMemory } from '@providers/in-memory/StorageProviderInMemory';
import { ProductsRepositoryInMemory } from '@repositories/in-memory/ProductsRepositoryInMemory';
import { StoresRepositoryInMemory } from '@repositories/in-memory/StoresRepositoryInMemory';
import { CreateProductUseCase } from '@useCases/products/CreateProductUseCase';

let createProductUseCase: CreateProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let storesRepositoryInMemory: StoresRepositoryInMemory;
let storageProvider: StorageProviderInMemory;

describe('CreateProductUseCase', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    storesRepositoryInMemory = new StoresRepositoryInMemory();
    storageProvider = new StorageProviderInMemory();

    createProductUseCase = new CreateProductUseCase(
      productsRepositoryInMemory,
      storesRepositoryInMemory,
      storageProvider
    );
  });

  it('should be able to create a new product for a store', async () => {
    const store = await storesRepositoryInMemory.create({
      address: 'Valid address',
      coordinates_id: '123',
      delivery_fee: 0,
      delivery_time: 90,
      categories: [],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: '123',
      image: 'validImage',
    });

    const product = await createProductUseCase.execute({
      name: 'Valid name',
      description: 'Valid description',
      store_id: store.id,
      image: 'Valid image',
      price: 100,
      user_id: '123',
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a product if the provided store_id does not exist', async () => {
    await expect(
      createProductUseCase.execute({
        name: 'Valid name',
        description: 'Valid description',
        store_id: '000',
        image: 'Valid image',
        price: 100,
        user_id: '123',
      })
    ).rejects.toEqual(new AppError('Store does not exist.', 400));
  });
});
