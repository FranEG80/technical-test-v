import { createTRPCRouter } from '../init';
import { notebookRouter } from './notebook';
import { sheetRouter } from './sheet';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  user: userRouter,
  notebook: notebookRouter,
  sheet: sheetRouter,
});

export type AppRouter = typeof appRouter;