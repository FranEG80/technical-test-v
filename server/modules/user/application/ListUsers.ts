import { UserRepository } from '../domain/repositories/UserRepository';

export class ListUsers {
  constructor(private user: UserRepository) {}
  execute() {
    return this.user.list();
  }
}