import { User } from '../domain/User';

export const toDomain = (row: any) => User.fromPrimitives(row);
export const toPrismaData = (u: User) => u.toPrimitives(); 