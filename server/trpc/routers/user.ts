import { baseProcedure, createTRPCRouter } from '../init';
import { PrismaUserRepository } from '@/server/modules/user/infrastructure/PrismaUserRepository';
import { createUserValidator, deleteUserValidator, editUserValidator, loginUserValidator } from '@/server/modules/user/validators/userValidators';
import { ListUsers } from '@/server/modules/user/application/ListUsers';
import { CreateUser } from '@/server/modules/user/application/CreateUser';
import { DeleteUser } from '@/server/modules/user/application/DeleteUser';
import { UpdateUser } from '@/server/modules/user/application/UpdateUser';
import { TRPCError } from '@trpc/server';
import { InvalidEmailError, UserAlreadyExistsError, UserNotFoundError } from '@/server/modules/user/domain/errors';
import { AuthUser } from '@/server/modules/user/application/AuthUser';
import { User } from '@/server/lib/generated/prisma';


const repo = new PrismaUserRepository();
const listUsers = new ListUsers(repo);
const createUser = new CreateUser(repo);
const deleteUser = new DeleteUser(repo);
const editUser = new UpdateUser(repo);
const authUser = new AuthUser(repo);

export const userRouter = createTRPCRouter({
  list: baseProcedure.query(async (): Promise<User[]> => {
    const users = await listUsers.execute();
    return users.map(u => u.toPrimitives()); 
  }),

  create: baseProcedure
    .input(createUserValidator)
    .mutation(async ({ input }): Promise<User> => {
      try {
        const user = await createUser.execute(input);
        return user.toPrimitives();
      } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
          throw new TRPCError({ code: 'CONFLICT', message: err.message });
        }
        if (err instanceof InvalidEmailError) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: err.message });
        }
        throw err; 
      }
    }),

  delete: baseProcedure
    .input(deleteUserValidator)
    .mutation(async ({ input }): Promise<void> => {
      try {
        await deleteUser.execute(input.id);
      } catch (err) {
        if (err instanceof UserNotFoundError) {
          throw new TRPCError({ code: 'NOT_FOUND', message: err.message });
        }
        throw err;
      }
    }),

  edit: baseProcedure
    .input(editUserValidator)
    .mutation(async ({ input }): Promise<User> => {
      try {
        const user = await editUser.execute(input);
        return user.toPrimitives();
      } catch (err) {
        if (err instanceof UserNotFoundError) {
          throw new TRPCError({ code: 'NOT_FOUND', message: err.message });
        }
        if (err instanceof InvalidEmailError) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: err.message });
        }
        throw err;
      }
    }),

  login: baseProcedure
    .input(loginUserValidator)
    .mutation(async ({ input }): Promise<User> => {
      const user = await authUser.execute(input.name, input.email);
      return user.toPrimitives();
    }),

  logout: baseProcedure.mutation(async () => {
    // No server-side session to clear in this stateless example
    return;
  }),

  register: baseProcedure
    .input(createUserValidator)
    .mutation(async ({ input }): Promise<User> => {
      try {
        const user = await createUser.execute(input);
        return user.toPrimitives();
      } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
          throw new TRPCError({ code: 'CONFLICT', message: err.message });
        }
        if (err instanceof InvalidEmailError) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: err.message });
        }
        throw err; 
      }
    }),

  getUser: baseProcedure
    .input(deleteUserValidator)
    .query(async ({ input }): Promise<User> => {
      try {
        if (!input.id) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'User ID is required' });
        }
        const users = await listUsers.execute();
        const user = users.find(u => u.toPrimitives().id === input.id);
        if (!user) {
          throw new UserNotFoundError(input.id);
        }
        return user.toPrimitives();
      } catch (err) {
        if (err instanceof UserNotFoundError) {
          throw new TRPCError({ code: 'NOT_FOUND', message: err.message });
        }
        throw err;
      }
    }),
  
});