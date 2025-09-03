import { prisma } from '@/server/db/db';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { toDomain, toPrismaData } from './mappers';
import { Email } from '../domain/Email';

export class PrismaUserRepository implements UserRepository {
  async list(): Promise<User[]> {
    const rows = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map(toDomain);
  }
  async save(user: User): Promise<void> {
    const data = toPrismaData(user);
    await prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { email } });
    return found ? toDomain(found) : null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const found = await prisma.user.findUnique({ where: { email } });
    return !!found;
  }

  async findById(id: string): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { id } });
    return found ? toDomain(found) : null;
  }

  async existsById(id: string): Promise<boolean> {
    const found = await prisma.user.findUnique({ where: { id } });
    return !!found;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async updateById(id: string, changes: { name?: string; email?: string }): Promise<User> {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(changes.name ? { name: changes.name } : {}),
        ...(changes.email ? { email: Email.create(changes.email).value } : {}),
      },
    });
    return toDomain(updated);
  }
}