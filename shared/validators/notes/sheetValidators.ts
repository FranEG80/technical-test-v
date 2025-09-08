import { z } from 'zod';
import {  titleValidator } from '@/shared/validators';
import { uuidValidator } from '../uuidValidator';
import { StoreJson } from '@/shared/types';

export const storeJsonValidator: z.ZodType<StoreJson> = z
  .unknown()
  .refine((value) => typeof value === 'object' && value !== null, 'storeJson must be an object')
  .transform((value) => value as StoreJson);

export const addSheetValidator = z.object({
  id: uuidValidator.optional(),
  userId: uuidValidator,
  notebookId: uuidValidator.optional(),
  title: titleValidator,
  storeJson: storeJsonValidator,
});

export const updateSheetValidator = z.object({
  userId: uuidValidator,
  notebookId: uuidValidator,
  sheetId: uuidValidator,
  title: titleValidator.optional(),
  storeJson: storeJsonValidator.optional(),
});

export const deleteSheetValidator = z.object({
  userId: uuidValidator,
  notebookId: uuidValidator,
  sheetId: uuidValidator,
});
