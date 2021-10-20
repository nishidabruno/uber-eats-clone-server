import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindStoresByNameUseCase } from '@useCases/stores/FindStoresByNameUseCase';

class FindStoresByNameController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.query;

    const findStoresByNameUseCase = container.resolve(FindStoresByNameUseCase);

    const stores = await findStoresByNameUseCase.execute(String(name));

    return res.status(200).json(stores);
  }
}

export { FindStoresByNameController };
