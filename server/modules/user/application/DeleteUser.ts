import { UserNotFoundError } from '../domain/errors';
import { UserRepository } from '../domain/repositories/UserRepository';

export class DeleteUser {
  constructor(private user: UserRepository) {}

  async execute(id: string) {
    const user = await this.user.existsById(id);
    if (!user) throw new UserNotFoundError(id);
    await this.user.deleteById(id);
  }
}