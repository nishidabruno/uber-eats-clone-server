import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { IUser } from '@entities/IUser';
import { IUsersRepository } from '@repositories/IUsersRepository';
import { generateID } from '@utils/generateID';

class UsersRepositoryInMemory implements IUsersRepository {
  users: IUser[] = [];

  async create({
    avatar,
    email,
    full_name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const newUser: IUser = {
      id: generateID(),
      avatar,
      email,
      full_name,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(newUser);
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
