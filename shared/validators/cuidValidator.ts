import { z } from 'zod';

export const cuidValidator = z.string().cuid();