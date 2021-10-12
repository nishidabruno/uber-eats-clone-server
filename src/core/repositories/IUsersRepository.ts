import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { IUser } from '@entities/IUser';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
}

export { IUsersRepository };
