import { inject, injectable } from 'tsyringe';

import { IStore } from '@entities/IStore';
import { IStoresRepository } from '@repositories/IStoresRepository';

@injectable()
class FindStoresByNameUseCase {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  async execute(storeName: string): Promise<IStore[]> {
    const stores = await this.storesRepository.findByStoreName(storeName);

    return stores;
  }
}

export { FindStoresByNameUseCase };
