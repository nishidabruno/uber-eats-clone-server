import { StoresRepositoryInMemory } from '@repositories/in-memory/StoresRepositoryInMemory';
import { ListStoresUseCase } from '@useCases/stores/ListStoresUseCase';

let storesRepositoryInMemory: StoresRepositoryInMemory;
let listStoresUseCase: ListStoresUseCase;

describe('ListStoresUseCase', () => {
  beforeEach(() => {
    storesRepositoryInMemory = new StoresRepositoryInMemory();
    listStoresUseCase = new ListStoresUseCase(storesRepositoryInMemory);
  });

  it('should be able to list all stores', async () => {
    await storesRepositoryInMemory.create({
      address: 'Valid address',
      location: {
        type: 'Point',
        coordinates: [123, 456],
      },
      delivery_fee: 0,
      delivery_time: 90,
      categories: [],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: '123',
    });

    await storesRepositoryInMemory.create({
      address: 'Valid address',
      location: {
        type: 'Point',
        coordinates: [123, 456],
      },
      delivery_fee: 0,
      delivery_time: 90,
      categories: [],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: '123',
    });

    const stores = await listStoresUseCase.execute();

    expect(stores).toHaveLength(2);
  });
});
