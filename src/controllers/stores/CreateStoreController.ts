import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStoreUseCase } from '@useCases/stores/CreateStoreUseCase';

class CreateStoreController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const {
      address,
      categories_id,
      coordinates,
      delivery_fee,
      delivery_time,
      name,
      opening_time_weekend,
      opening_time_workweek,
    } = req.body;
    const image = req.file?.filename;

    // const toStringLocation = coordinates.toString();
    const parsedCoordinates = JSON.parse(coordinates);
    // const toStringCategoriesIds = categories_id.toString();
    const parsedCategories = JSON.parse(categories_id);

    const createStoreUseCase = container.resolve(CreateStoreUseCase);

    const store = await createStoreUseCase.execute({
      address,
      categories_id: parsedCategories,
      coordinates: parsedCoordinates,
      delivery_fee: Number(delivery_fee),
      delivery_time: Number(delivery_time),
      name,
      opening_time_weekend,
      opening_time_workweek,
      user_id: req.user.id,
      image: String(image),
    });

    return res.status(201).json(store);
  }
}

export { CreateStoreController };
