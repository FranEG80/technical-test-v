import { User } from '../domain/entities/UserEntity';

export const toDomain = (row: unknown) => {
  if (typeof row === 'object' && row !== null && 'id' in row && 'name' in row && 'email' in row && 'createdAt' in row && 'updatedAt' in row) {
	return User.fromPrimitives(row as { id: string; name: string; email: string; createdAt: Date; updatedAt: Date });
  }
  throw new Error('Invalid row format');
};
export const toPrismaData = (u: User) => u.toPrimitives(); 