import { User } from './User';

export interface UserRepository {
  list(): Promise<User[]>;
  save(user: User): Promise<void>;
  updateById(id: string, changes: { name?: string; email?: string }): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  existsById(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  deleteById(id: string): Promise<void>;
}