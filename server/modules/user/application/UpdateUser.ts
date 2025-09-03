import { UserRepository } from '../domain/UserRepository';
import { Email } from '../domain/Email';
import { UserAlreadyExistsError } from '../domain/errors'; // si lo tienes
import { User } from '../domain/User';

type Input = { id: string; name?: string; email?: string };

export class UpdateUser {
  constructor(private repo: UserRepository) {}

  async execute({ id, name, email }: Input): Promise<User> {
    const existing = await this.repo.existsById(id);
    if (!existing) {
      throw new Error('User not found'); // o UserNotFoundError
    }

    const changes: { name?: string; email?: string } = {};
    if (typeof name === 'string') changes.name = name.trim();

    if (typeof email === 'string') {
      const vo = Email.create(email);                 // valida formato en dominio
      const sameEmailOwner = await this.repo.findByEmail(vo.value);
      if (sameEmailOwner && sameEmailOwner.props.id !== id) {
        throw new UserAlreadyExistsError(vo.value);
      }
      changes.email = vo.value;
    }

    const updated = await this.repo.updateById(id, changes);
    return updated;
  }
}