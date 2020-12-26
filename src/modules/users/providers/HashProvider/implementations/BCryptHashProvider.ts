import { hash, compare } from 'bcryptjs';
import IHasProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHasProvider {
  public async compareHash(paylaod: string, hashed: string): Promise<boolean> {
    return compare(paylaod, hashed);
  }

  public async generateHash(paylaod: string): Promise<string> {
    return hash(paylaod, 8);
  }
}

export default BCryptHashProvider;
