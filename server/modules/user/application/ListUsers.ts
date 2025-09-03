import { UserRepository } from '../domain/UserRepository';

export class ListUsers {
  constructor(private repo: UserRepository) {}
  execute() {
    return this.repo.list(); // devuelve entidades o DTO, según prefieras
  }
}