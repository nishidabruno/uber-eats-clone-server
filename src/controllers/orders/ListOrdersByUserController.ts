import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOrdersByUserUseCase } from '@useCases/orders/ListOrdersByUserUseCase';

interface IRequest {
  filter: 'open' | 'closed';
}

class ListOrdersByUserController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { filter } = req.query as unknown as IRequest;

    const listOrdersByUserUseCase = container.resolve(ListOrdersByUserUseCase);

    const orders = await listOrdersByUserUseCase.execute(req.user.id, filter);

    return res.status(200).json(orders);
  }
}

export { ListOrdersByUserController };
