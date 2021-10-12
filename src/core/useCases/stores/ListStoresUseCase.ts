import { IStore } from 'core/entities/IStore';
import { IStoresRepository } from 'core/repositories/IStoresRepository';
import { inject, injectable } from 'tsyringe';

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
