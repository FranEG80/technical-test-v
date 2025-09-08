import z from "zod";
import { cuidValidator } from "./cuidValidator";

export const idValidator = z.object({
  id: cuidValidator
});