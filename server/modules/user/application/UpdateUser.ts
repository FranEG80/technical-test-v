import { UserRepository } from '../domain/repositories/UserRepository';
import { Email } from '../domain/valueObjects/EmailValueObject';
import { UserAlreadyExistsError, UserNotFoundError } from '../domain/errors';
import { User } from '../domain/entities/UserEntity';

type Input = { id: string; name?: string; email?: string };

export class UpdateUser {
  constructor(private user: UserRepository) {}

  async execute({ id, name, email }: Input): Promise<User> {
    const existing = await this.user.existsById(id);
    if (!existing) {
      throw new UserNotFoundError(id);
    }

    const changes: { name?: string; email?: string } = {};
    if (typeof name === 'string') changes.name = name.trim();

    if (typeof email === 'string') {
      const valueObject = Email.create(email);
      const sameEmailOwner = await this.user.findByEmail(valueObject.value);
      if (sameEmailOwner && sameEmailOwner.props.id !== id) {
        throw new UserAlreadyExistsError(valueObject.value);
      }
      changes.email = valueObject.value;
    }

    const updated = await this.user.updateById(id, changes);
    return updated;
  }
}