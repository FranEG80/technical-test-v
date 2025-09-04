import { z } from 'zod';
import { cuidValidator, titleValidator } from '@/server/shared/validators';

export const createNotebookValidator = z.object({
  userId: cuidValidator,
  title: titleValidator,
  id: cuidValidator,
});

export const updateNotebookValidator = z.object({
  id: cuidValidator,
  title: titleValidator.optional(),
  userId: cuidValidator,
});

export const deleteNotebookValidator = z.object({
  userId: cuidValidator,
  id: cuidValidator,
});