import { UserRepository } from '../domain/repositories/UserRepository';
import { Email } from '../domain/valueObjects/EmailValueObject';
import { User } from '../domain/entities/UserEntity';
import { UserAlreadyExistsError } from '../domain/errors/UserAlreadyExistsError';

export type CreateUserInput = {
  name: string;
  email: string;
};

export class CreateUser {
  constructor(
    private readonly user: UserRepository,
    private readonly now: () => Date = () => new Date()
  ) {}

  async execute({ name, email }: CreateUserInput): Promise<User> {
    const emailValueObject = Email.create(email);

    const exists = await this.user.existsByEmail(emailValueObject.value);
    if (exists) {
      throw new UserAlreadyExistsError(emailValueObject.value);
    }

    const user = User.createNew({
      name: name.trim(),
      email: emailValueObject,
      createdAt: this.now(),
    });

    await this.user.save(user);
    return user;
  }
}