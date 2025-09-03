import { UserRepository } from '../domain/UserRepository';

export class DeleteUser {
  constructor(private repo: UserRepository) {}

  async execute(id: string) {
    const user = await this.repo.existsById(id);
    if (!user) throw new Error('User not found');
    await this.repo.deleteById(id);
  }
}