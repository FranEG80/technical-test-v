import { AddSheet } from "@/server/modules/notes/application/AddSheet";
import { baseProcedure, createTRPCRouter  } from "../init";
import { addSheetValidator, deleteSheetValidator, updateSheetValidator } from "@/shared/validators/notes/sheetValidators";
import { PrismaNotebookRepository } from "@/server/modules/notes/infrastructure/PrismaNotebookRepository";
import { PrismaUsersNotebooksRepository } from "@/server/modules/notes/infrastructure/PrismaUsersNotebooksRepository";
import { UpdateSheet } from "@/server/modules/notes/application/UpdateSheet";
import { DeleteSheet } from "@/server/modules/notes/application/DeleteSheet";
import z from "zod";
import { GetSheet } from "@/server/modules/notes/application/GetSheet";

const notebooks = new PrismaNotebookRepository();
const members = new PrismaUsersNotebooksRepository();

const addSheet = new AddSheet(notebooks, members);
const updateSheet = new UpdateSheet(notebooks, members);
const deleteSheet = new DeleteSheet(notebooks, members);
const getSheet = new GetSheet(notebooks, members);

export const sheetRouter = createTRPCRouter({
  create: baseProcedure
    .input(addSheetValidator)
    .mutation(async ({ ctx, input }) => {
      const notebook = await addSheet.execute({
        id: input.id ?? crypto.randomUUID(),
        userId: input.userId,
        notebookId: input.notebookId ?? crypto.randomUUID(),
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
  
  get: baseProcedure
    .input(z.object({
      id: z.string().uuid(), 
      notebookId: z.string().uuid()
    }))
    .query(async ({ ctx, input }) => {
      const sheet = await getSheet.execute({
        notebookId: input.notebookId,
        id: input.id
      });
      return sheet;
    }),
});