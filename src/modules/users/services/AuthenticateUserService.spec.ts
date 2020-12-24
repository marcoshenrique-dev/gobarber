import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'JOHN DOE',
      email: 'johnDoe@gmail.com',
      password: '12e1231231312',
    });
    const response = await authenticateUser.execute({
      email: 'johnDoe@gmail.com',
      password: '12e1231231312',
    });

    expect(response).toHaveProperty('token');
  });
});

it('should not be able to create a new user with same email from another', async () => {
  const fakeUsersRepository = new FakeUsersRepository();

  const createUser = new CreateUserService(fakeUsersRepository);
  const user = await createUser.execute({
    name: 'John Doe',
    email: 'johnDoe@gmail.com',
    password: '12e1231231312',
  });

  expect(
    createUser.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '12e1231231312',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
