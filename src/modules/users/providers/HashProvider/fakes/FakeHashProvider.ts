import IHasProvider from '../models/IHashProvider';

class FakeHashProvider implements IHasProvider {
  public async compareHash(paylaod: string, hashed: string): Promise<boolean> {
    return paylaod === hashed;
  }

  public async generateHash(paylaod: string): Promise<string> {
    return paylaod;
  }
}

export default FakeHashProvider;
