import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { AppError } from '@errors/AppError';
import { HashProvider } from '@infra/container/providers/HashProvider';
import { UsersRepositoryInMemory } from '@repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@useCases/accounts/CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProvider: HashProvider;
let createUserUseCase: CreateUserUseCase;
let userMock = {} as ICreateUserDTO;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProvider = new HashProvider();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProvider
    );

    // SETUP
    userMock = {
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: 'valid-password',
    };
  });

  it('should be able to create an user', async () => {
    await createUserUseCase.execute(userMock);

    const user = await usersRepositoryInMemory.findByEmail(
      'validemail@email.com'
    );

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an new user if the provided e-mail is already registered', async () => {
    await createUserUseCase.execute(userMock);

    await expect(createUserUseCase.execute(userMock)).rejects.toEqual(
      new AppError('E-mail already registered.', 409)
    );
  });

  it('should be able to encrypt the password', async () => {
    await createUserUseCase.execute(userMock);

    const user = await usersRepositoryInMemory.findByEmail(
      'validemail@email.com'
    );

    const isHashed = await hashProvider.compare(
      'valid-password',
      user!.password
    );

    expect(isHashed).toEqual(true);
  });
});
