import { Email } from "../valueObjects/EmailValueObject";


export interface UserProps {
  id: string;
  name: string;
  email: Email;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(readonly props: UserProps) {}
  static createNew(params: { name: string; email: Email; createdAt: Date }) {
    return new User({
      id: crypto.randomUUID(),
      name: params.name.trim(),
      email: params.email,
      createdAt: params.createdAt,
      updatedAt: params.createdAt,
    });
  }

  static fromPrimitives(p: { id: string; name: string; email: string; createdAt: Date; updatedAt: Date }) {
    return new User({ ...p, email: Email.create(p.email) });
  }
  toPrimitives() {
    const { id, name, email, createdAt, updatedAt } = this.props;
    return { id, name, email: email.value, createdAt, updatedAt };
  }


  private touch() {
    this.props.updatedAt = new Date();
  }
}