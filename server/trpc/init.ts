
import { cache } from 'react';
import { initTRPC } from '@trpc/server';
import { prisma } from '@/server/db';
import superjson from 'superjson';
import { ZodError, z } from 'zod';
import { cookies, headers } from 'next/headers';

export type FieldErrors = Record<string, string[]> | null;
export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

export const createTRPCContext = cache(async () => {
  const cookieStore = await cookies();
  const headersBag = await headers();
  const userIdFromCookie = cookieStore.get('uid')?.value ?? null;
  const userIdFromHeader = headersBag.get('x-user-id'); 

  const userId = userIdFromCookie ?? userIdFromHeader ?? null;

  return { prisma, userId };
});

function issuesToFieldErrors(issues: z.ZodIssue[]): Record<string, string[]> {
  const acc: Record<string, string[]> = {};
  for (const issue of issues) {
    const key = String(issue.path?.[0] ?? '_');
    (acc[key] ??= []).push(issue.message);
  }
  return acc;
}


const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    let fieldErrors: FieldErrors = null;

    if (error.cause instanceof ZodError) {
      fieldErrors = issuesToFieldErrors(error.cause.issues);
    }

    return {
      ...shape,
      data: {
        ...shape.data,
        fieldErrors, 
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;