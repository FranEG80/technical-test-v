import { Email } from "./Email";

export interface UserProps {
  id: string;
  name: string;
  email: Email;
  createdAt: Date;
}

export class User {
  private constructor(readonly props: UserProps) {}
  static createNew(params: { name: string; email: Email }) {
    return new User({
      id: crypto.randomUUID(),
      name: params.name.trim(),
      email: params.email,
      createdAt: new Date(),
    });
  }
  static fromPrimitives(p: { id: string; name: string; email: string; createdAt: Date }) {
    return new User({ ...p, email: Email.create(p.email) });
  }
  toPrimitives() {
    const { id, name, email, createdAt } = this.props;
    return { id, name, email: email.value, createdAt };
  }
}