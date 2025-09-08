import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { PrismaNotebookRepository } from '@/server/modules/notes/infrastructure/PrismaNotebookRepository';
import { PrismaUsersNotebooksRepository } from '@/server/modules/notes/infrastructure/PrismaUsersNotebooksRepository';
import { TRPCError } from '@trpc/server';
import { ListUserNotebooks } from '@/server/modules/notes/application/ListUserNotebooks';
import { CreateNotebook } from '@/server/modules/notes/application/CreateNotebook';
import { DeleteNotebook } from '@/server/modules/notes/application/DeleteNotebook';
import { createNotebookValidator, deleteNotebookValidator } from '@/shared/validators/notes/notebookValidators';
import { uuidValidator } from '@/shared/validators/uuidValidator';

const notebooks = new PrismaNotebookRepository();
const members = new PrismaUsersNotebooksRepository();
const listUserNotebooks = new ListUserNotebooks(notebooks);
const createNotebook = new CreateNotebook(notebooks, members);
const deleteNotebook = new DeleteNotebook(notebooks, members);

export const notebookRouter = createTRPCRouter({
  listMine: baseProcedure
  .input(z.object({ id: uuidValidator }))
  .query(async ({ ctx, input }) => {
    console.log({PACO: ctx.userId, input});
    const data = await listUserNotebooks.execute(input.id); 
    const notebooks = data.map(notebook => notebook.toPrimitives());
    // notebooks = notebooks.map(notebook => ({
    //   ...notebook,
    //   sheets: notebook.sheets.map(sheet => sheet.toPrimitives())
    // }));
    return notebooks;
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
      } catch (e: unknown) {
        if (e instanceof Error && e.message === 'Forbidden') throw new TRPCError({ code: 'FORBIDDEN' });
        throw e;
      }
    }),
});