import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetStoreByUserIdUseCase } from '@useCases/stores/GetStoreByUserIdUseCase';

class GetStoreByUserIdController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;

    const getStoreByUserIdUseCase = container.resolve(GetStoreByUserIdUseCase);
    const store = await getStoreByUserIdUseCase.execute(String(id));

    return res.status(200).json(store);
  }
}

export { GetStoreByUserIdController };
