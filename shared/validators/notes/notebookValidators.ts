import { z } from 'zod';
import { titleValidator } from '@/shared/validators';
import { uuidValidator } from '../uuidValidator';

export const createNotebookValidator = z.object({
  userId: uuidValidator,
  title: titleValidator,
  id: uuidValidator.optional(),
});

export const updateNotebookValidator = z.object({
  id: uuidValidator,
  title: titleValidator.optional(),
  userId: uuidValidator,
});

export const deleteNotebookValidator = z.object({
  userId: uuidValidator,
  id: uuidValidator,
});