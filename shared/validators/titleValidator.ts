import { z } from 'zod';

export const titleValidator = z
  .string()
  .min(1, 'The title cannot be empty')
  .max(100, 'The title cannot be longer than 100 characters');
