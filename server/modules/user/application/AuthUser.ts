import { UserNotFoundError } from '../domain/errors';
import { InvalidCredentialsError } from '../domain/errors/InvalidCredentialsError';
import { UserRepository } from '../domain/repositories/UserRepository';

export class AuthUser {
  constructor(private user: UserRepository) {}

  async execute(name: string, email: string) {
    const user = await this.user.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError(email);
    }
    if (user?.toPrimitives().name === name) {
      return user;
    }
    throw new InvalidCredentialsError();
  }
}