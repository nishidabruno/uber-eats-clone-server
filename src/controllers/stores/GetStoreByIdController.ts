import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetStoreByIdUseCase } from '@useCases/stores/GetStoreByIdUseCase';

class GetStoreByIdController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getStoreByIdUseCase = container.resolve(GetStoreByIdUseCase);

    const store = await getStoreByIdUseCase.execute(id);

    return res.status(200).json(store);
  }
}

export { GetStoreByIdController };
