import { inject, injectable } from 'tsyringe';

import { IStore } from '@entities/IStore';
import { AppError } from '@errors/AppError';
import { IStoresRepository } from '@repositories/IStoresRepository';

@injectable()
class GetStoreByUserIdUseCase {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  async execute(user_id: string): Promise<IStore> {
    const store = await this.storesRepository.findByUserId(user_id);

    if (!store) {
      throw new AppError('User does not have a store.', 404);
    }

    return store;
  }
}

export { GetStoreByUserIdUseCase };
