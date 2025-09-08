import { z } from 'zod';
import { cuidValidator, emailValidator } from '@/shared/validators';
import { uuidValidator } from '@/shared/validators/uuidValidator';

export const userNameValidator = z.string().min(1).max(50);

export const createUserValidator = z.object({
  name: userNameValidator,
  email: emailValidator,
});

export const deleteUserValidator = z.object({
  id: uuidValidator,
});

export const editUserValidator = z.object({
  id: uuidValidator,
  name: userNameValidator,
  email: emailValidator,
});

export const loginUserValidator = z.object({
  email: emailValidator,
  name: userNameValidator,
});