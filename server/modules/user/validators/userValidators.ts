import { z } from 'zod';
import { cuidValidator, emailValidator } from '@/server/shared/validators';

export const userNameValidator = z.string().min(1).max(50);

export const createUserValidator = z.object({
  name: userNameValidator,
  email: emailValidator,
});

export const deleteUserValidator = z.object({
  id: cuidValidator,
});

export const editUserValidator = z.object({
  id: cuidValidator,
  name: userNameValidator,
  email: emailValidator,
});