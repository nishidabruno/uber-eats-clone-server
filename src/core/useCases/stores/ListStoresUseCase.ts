import { inject, injectable } from 'tsyringe';

import { IStore } from '@entities/IStore';
import { IStoresRepository } from '@repositories/IStoresRepository';

@injectable()
class ListStoresUseCase {
  constructor(
    @inject('StoresRepository') private storesRepository: IStoresRepository
  ) {}

  async execute(): Promise<IStore[]> {
    const stores = await this.storesRepository.listAll();

    return stores;
  }
}

export { ListStoresUseCase };
