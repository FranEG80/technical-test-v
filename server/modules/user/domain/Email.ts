import { InvalidEmailError } from "./errors";

export class Email {
  private constructor(public readonly value: string) {}
  static create(value: string) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!ok) throw new InvalidEmailError(value);
    return new Email(value.toLowerCase());
  }
}