import { UserRepository } from '../domain/UserRepository';
import { Email } from '../domain/Email';
import { User } from '../domain/User';
import { UserAlreadyExistsError } from '../domain/errors';

export class CreateUser {
  constructor(private repo: UserRepository) {}
  async execute(input: { name: string; email: string }) {
    const email = Email.create(input.email);
    if (await this.repo.existsByEmail(email.value)) {
      throw new UserAlreadyExistsError(email.value);
    }
    const user = User.createNew({ name: input.name, email });
    await this.repo.save(user);
    return user;
  }
}