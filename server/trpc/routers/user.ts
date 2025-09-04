import { baseProcedure, createTRPCRouter } from '../init';
import { PrismaUserRepository } from '@/server/modules/user/infrastructure/PrismaUserRepository';
import { createUserValidator, deleteUserValidator, editUserValidator } from '@/server/modules/user/validators/userValidators';
import { ListUsers } from '@/server/modules/user/application/ListUsers';
import { CreateUser } from '@/server/modules/user/application/CreateUser';
import { DeleteUser } from '@/server/modules/user/application/DeleteUser';
import { UpdateUser } from '@/server/modules/user/application/UpdateUser';
import { TRPCError } from '@trpc/server';
import { InvalidEmailError, UserAlreadyExistsError, UserNotFoundError } from '@/server/modules/user/domain/errors';



const repo = new PrismaUserRepository();
const listUsers = new ListUsers(repo);
const createUser = new CreateUser(repo);
const deleteUser = new DeleteUser(repo);
const editUser = new UpdateUser(repo);

export const userRouter = createTRPCRouter({
  list: baseProcedure.query(async () => {
    const users = await listUsers.execute();
    return users.map(u => u.toPrimitives()); 
  }),

  create: baseProcedure
    .input(createUserValidator)
    .mutation(async ({ input }) => {
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
    .mutation(async ({ input }) => {
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
    .mutation(async ({ input }) => {
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
});