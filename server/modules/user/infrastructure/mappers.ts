import { User } from '../domain/entities/UserEntity';

export const toDomain = (row: any) => User.fromPrimitives(row);
export const toPrismaData = (u: User) => u.toPrimitives(); 