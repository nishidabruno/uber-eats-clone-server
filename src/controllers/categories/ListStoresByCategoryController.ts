import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListStoresByCategoryUseCase } from '@useCases/categories/ListStoresByCategoryUseCase';

class ListStoresByCategoryController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const listStoresByCategory = container.resolve(ListStoresByCategoryUseCase);

    const stores = await listStoresByCategory.execute(id);

    return res.status(200).json(stores);
  }
}

export { ListStoresByCategoryController };
