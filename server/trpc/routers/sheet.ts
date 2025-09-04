import { AddSheet } from "@/server/modules/notes/application/AddSheet";
import { baseProcedure, createTRPCRouter  } from "../init";
import { addSheetValidator, deleteSheetValidator, updateSheetValidator } from "@/server/modules/notes/validators/sheetValidators";
import { PrismaNotebookRepository } from "@/server/modules/notes/infrastructure/PrismaNotebookRepository";
import { PrismaUsersNotebooksRepository } from "@/server/modules/notes/infrastructure/PrismaUsersNotebooksRepository";
import { UpdateSheet } from "@/server/modules/notes/application/UpdateSheet";
import { DeleteSheet } from "@/server/modules/notes/application/DeleteSheet";

const notebooks = new PrismaNotebookRepository();
const members = new PrismaUsersNotebooksRepository();

const addSheet = new AddSheet(notebooks, members);
const updateSheet = new UpdateSheet(notebooks, members);
const deleteSheet = new DeleteSheet(notebooks, members);

export const sheetRouter = createTRPCRouter({
  create: baseProcedure
    .input(addSheetValidator)
    .mutation(async ({ ctx, input }) => {
      const notebook = await addSheet.execute({
        userId: input.userId,
        notebookId: input.notebookId,
        title: input.title,
        storeJson: input.storeJson,
      });
      return notebook.toPrimitives();
    }),

  update: baseProcedure
    .input(updateSheetValidator)
    .mutation(async ({ ctx, input }) => {
      const notebook = await updateSheet.execute({
        userId: input.userId,
        notebookId: input.notebookId,
        sheetId: input.sheetId,
        title: input.title,
        storeJson: input.storeJson,
      });
      return notebook.toPrimitives();
    }),

  delete: baseProcedure
    .input(deleteSheetValidator)
    .mutation(async ({ ctx, input }) => {
      await deleteSheet.execute({
        userId: input.userId,
        notebookId: input.notebookId,
        sheetId: input.sheetId,
      });
      return { success: true };
    }),
});