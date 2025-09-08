import { Email } from "@/server/modules/user/domain/valueObjects/EmailValueObject";
import { StoreJson } from "@/shared/types";

export const newEmail = (s: string) => Email.create(s);
export const now = () => new Date('2024-01-01T00:00:00.000Z');

export const fakeStore = (data: Record<string, unknown> = {}): StoreJson =>
  ({ store: data as Record<string, unknown>, schema: {} as Record<string, unknown> } as unknown as StoreJson);