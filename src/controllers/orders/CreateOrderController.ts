import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrderUseCase } from '@useCases/orders/CreateOrderUseCase';

class CreateOrderController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { orderProducts, store_id } = req.body;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    const order = await createOrderUseCase.execute({
      orderProducts,
      user_id: req.user.id,
      store_id,
    });

    return res.status(201).json(order);
  }
}

export { CreateOrderController };
