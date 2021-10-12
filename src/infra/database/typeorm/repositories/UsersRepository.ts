import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { IUser } from '@entities/IUser';
import { IUsersRepository } from '@repositories/IUsersRepository';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ email, full_name, password }: ICreateUserDTO): Promise<void> {
    const userCreateResult = this.repository.create({
      email,
      full_name,
      password,
    });

    await this.repository.save(userCreateResult);
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<IUser | undefined> {
    return this.repository.findOne(id);
  }
}

export { UsersRepository };
