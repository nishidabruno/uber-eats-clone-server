import { inject, injectable } from 'tsyringe';

import { IStore } from '@entities/IStore';
import { AppError } from '@errors/AppError';
import { IStoresRepository } from '@repositories/IStoresRepository';

@injectable()
class GetStoreByIdUseCase {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  async execute(id: string): Promise<IStore> {
    const store = await this.storesRepository.findById(id);

    if (!store) {
      throw new AppError('Store does not exist.', 400);
    }

    return store;
  }
}

export { GetStoreByIdUseCase };
