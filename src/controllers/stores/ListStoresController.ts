import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListStoresUseCase } from '@useCases/stores/ListStoresUseCase';

class ListStoresController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const listStoresUseCase = container.resolve(ListStoresUseCase);

    const stores = await listStoresUseCase.execute();

    return res.status(200).json(stores);
  }
}

export { ListStoresController };
