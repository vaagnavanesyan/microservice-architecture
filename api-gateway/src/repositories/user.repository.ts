import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto';
import { User } from '../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { login, password } = authCredentialsDto;
    const user = new User();
    user.login = login;
    user.password = password;
    user.firstName = 'adsds';
    user.lastName = 'asdasdss';
    await user.save();
  }
}
