import { StoreJson } from "@/shared/types";

export interface SheetProps {
  id: string;
  title: string;
  storeJson: StoreJson;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Sheet {
  private constructor(readonly props: SheetProps) {}

  static createNew(params: { title: string; storeJson: StoreJson; order: number, id?: string }): Sheet {
    return new Sheet({
      id: params.id ?? crypto.randomUUID(),
      title: params.title.trim(),
      storeJson: params.storeJson,
      order: params.order,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPrimitives(p: SheetProps): Sheet {
    return new Sheet(p);
  }

  toPrimitives(): SheetProps {
    return { ...this.props };
  }

  updateStoreJson(newStoreJson: StoreJson) {
    this.props.storeJson = newStoreJson;
    this.touch();
  }

  updateTitle(newTitle: string) {
    this.props.title = newTitle.trim();
    this.touch();
  }

  updateOrder(newOrder: number) {
    this.props.order = newOrder;
    this.touch();
  }

  update(changes: { title?: string; storeJson?: StoreJson }) {
    if (changes.title) this.props.title = changes.title.trim();
    if (changes.storeJson !== undefined) this.props.storeJson = changes.storeJson;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}