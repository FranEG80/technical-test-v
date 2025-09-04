import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { PrismaNotebookRepository } from '@/server/modules/notes/infrastructure/PrismaNotebookRepository';
import { PrismaUsersNotebooksRepository } from '@/server/modules/notes/infrastructure/PrismaUsersNotebooksRepository';
import { TRPCError } from '@trpc/server';
import { ListUserNotebooks } from '@/server/modules/notes/application/ListUserNotebooks';
import { CreateNotebook } from '@/server/modules/notes/application/CreateNotebook';
import { DeleteNotebook } from '@/server/modules/notes/application/DeleteNotebook';
import { createNotebookValidator, deleteNotebookValidator } from '@/server/modules/notes/validators/notebookValidators';
import { idValidator } from '@/server/shared/validators/idValidator';

const notebooks = new PrismaNotebookRepository();
const members = new PrismaUsersNotebooksRepository();
const listUserNotebooks = new ListUserNotebooks(notebooks);
const createNotebook = new CreateNotebook(notebooks, members);
const deleteNotebook = new DeleteNotebook(notebooks, members);

export const notebookRouter = createTRPCRouter({
  listMine: baseProcedure
  .input(idValidator)
  .query(async ({ ctx, input }) => {
    console.log(ctx)
    const data = await listUserNotebooks.execute(input.id); 
    return data.map(notebook => notebook.toPrimitives());
  }),

  create: baseProcedure
    .input(createNotebookValidator)
    .mutation(async ({ ctx, input }) => {
      const notebook = await createNotebook.execute({ 
        userId: input.userId, 
        title: input.title,
        notebookId: input.id,
      });
      return notebook.toPrimitives();
    }),

  delete: baseProcedure
    .input(deleteNotebookValidator)
    .mutation(async ({ ctx, input }) => {
      try {
        await deleteNotebook.execute({ userId: input.userId, notebookId: input.id });
        return { success: true };
      } catch (e: any) {
        if (e.message === 'Forbidden') throw new TRPCError({ code: 'FORBIDDEN' });
        throw e;
      }
    }),
});