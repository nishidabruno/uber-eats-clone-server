import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOrdersByStoreUseCase } from '@useCases/orders/ListOrdersByStoreUseCase';

class ListOrdersByStoreController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { type } = req.query;

    const listOrdersByStoreUseCase = container.resolve(
      ListOrdersByStoreUseCase
    );

    const orders = await listOrdersByStoreUseCase.execute(
      req.user.id,
      String(type)
    );

    return res.status(200).json(orders);
  }
}

export { ListOrdersByStoreController };
