import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateOrderStatusUseCase } from '@useCases/orders/UpdateOrderStatusUseCase';

class UpdateOrderStatusController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;
    const { is_completed } = req.body;

    const updateOrderStatusUseCase = container.resolve(
      UpdateOrderStatusUseCase
    );

    await updateOrderStatusUseCase.execute({
      is_completed,
      order_id,
      user_id: req.user.id,
    });

    return res.status(200).send();
  }
}

export { UpdateOrderStatusController };
