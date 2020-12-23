import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUsersRepository);
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '12e1231231312',
    });

    expect(user).toHaveProperty('id');
  });
});
