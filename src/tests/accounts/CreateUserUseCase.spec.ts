import { AppError } from '@errors/AppError';
import { HashProvider } from '@infra/container/providers/HashProvider';
import { UsersRepositoryInMemory } from '@repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@useCases/accounts/CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProvider: HashProvider;
let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProvider = new HashProvider();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProvider
    );
  });

  it('should be able to create an user', async () => {
    await createUserUseCase.execute({
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: 'valid-password',
      avatar: 'http://valid-imgurl.com',
    });

    const user = await usersRepositoryInMemory.findByEmail(
      'validemail@email.com'
    );

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an new user if the provided e-mail is already registered', async () => {
    await createUserUseCase.execute({
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: 'valid-password',
      avatar: 'http://valid-imgurl.com',
    });

    await expect(
      createUserUseCase.execute({
        full_name: 'Valid name',
        email: 'validemail@email.com',
        password: 'valid-password',
        avatar: 'http://valid-imgurl.com',
      })
    ).rejects.toEqual(new AppError('E-mail already registered.', 409));
  });

  it('should be able to encrypt the password', async () => {
    await createUserUseCase.execute({
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: 'valid-password',
      avatar: 'http://valid-imgurl.com',
    });

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
