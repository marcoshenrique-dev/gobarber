import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { uuid } from 'uuidv4';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userToken.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
