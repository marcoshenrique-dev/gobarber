import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'JOHN DOE',
      email: 'johnDoe@gmail.com',
      password: '12e1231231312',
    });
    const response = await authenticateUser.execute({
      email: 'johnDoe@gmail.com',
      password: '12e1231231312',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johnDoe@gmail.com',
        password: '12e1231231312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    const user = await createUser.execute({
      name: 'JOHN DOE',
      email: 'johnDoe@gmail.com',
      password: '12e1231231312',
    });

    await expect(
      authenticateUser.execute({
        email: 'johnDoe@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
