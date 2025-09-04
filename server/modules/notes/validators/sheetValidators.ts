import { z } from 'zod';
import { cuidValidator, titleValidator } from '@/server/shared/validators';
import { StoreJson } from '../shared/types/sheetTypes';


export const storeJsonValidator: z.ZodType<StoreJson> = z
  .unknown()
  .refine((value) => typeof value === 'object' && value !== null, 'storeJson must be an object')
  .transform((value) => value as StoreJson);

export const addSheetValidator = z.object({
  userId: cuidValidator,
  notebookId: cuidValidator,
  title: titleValidator,
  storeJson: storeJsonValidator,
});

export const updateSheetValidator = z.object({
  userId: cuidValidator,
  notebookId: cuidValidator,
  sheetId: cuidValidator,
  title: titleValidator.optional(),
  storeJson: storeJsonValidator.optional(),
});

export const deleteSheetValidator = z.object({
  userId: cuidValidator,
  notebookId: cuidValidator,
  sheetId: cuidValidator,
});
