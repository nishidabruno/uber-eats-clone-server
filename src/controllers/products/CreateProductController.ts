import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from '@useCases/products/CreateProductUseCase';

class CreateProductController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { description, name, price } = req.body;
    const image = req.file;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    const product = await createProductUseCase.execute({
      description,
      image: String(image?.filename),
      name,
      price,
      user_id: req.user.id,
    });

    return res.status(201).json(product);
  }
}

export { CreateProductController };
