// lib/validators/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z
    .string()
    .trim()
    .min(1, "Nombre requerido")
    .max(80, "Máx. 80 caracteres"),
  remember: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Nombre requerido").max(80),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm: z.string().min(6, "Confirma tu contraseña"),
    accept: z.boolean().refine(Boolean, "Debes aceptar los términos"),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Las contraseñas no coinciden",
  });

export type RegisterInput = z.infer<typeof registerSchema>;