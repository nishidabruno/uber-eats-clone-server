import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from '@useCases/categories/CreateCategoryUseCase';

class CreateCategoryController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const image = req.file?.filename;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const category = await createCategoryUseCase.execute({
      name,
      image: String(image),
    });

    return res.status(201).send(category);
  }
}

export { CreateCategoryController };
