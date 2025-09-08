import { StoreJson } from '@/shared/types';
import { Sheet } from './SheetEntity';

export interface NotebookProps {
  id: string;
  title: string;
  sheets: Sheet[];
  createdAt: Date;
  updatedAt: Date;
}

export class Notebook {
  private constructor(readonly props: NotebookProps) {}

  static createNew(params: { title: string }): Notebook {
    return new Notebook({
      id: crypto.randomUUID(),
      title: params.title.trim(),
      sheets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPrimitives(p: {
    id: string;
    title: string;
    sheets: ReturnType<Sheet['toPrimitives']>[];
    createdAt: Date;
    updatedAt: Date;
  }): Notebook {
    return new Notebook({
      ...p,
      sheets: p.sheets.map(Sheet.fromPrimitives),
    });
  }

  toPrimitives() {
    return {
      id: this.props.id,
      title: this.props.title,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      sheets: this.props.sheets.map(sheet => sheet.toPrimitives()),
    };
  }

  addSheet(params: { title: string; storeJson: StoreJson }) {
    const maxOrder = this.props.sheets.length
      ? Math.max(...this.props.sheets.map(sheet => sheet.props.order))
      : 0;
    const sheet = Sheet.createNew({
      title: params.title,
      storeJson: params.storeJson,
      order: maxOrder + 1,
    });
    this.props.sheets.push(sheet);
    this.touch();
    return sheet;
  }

  updateSheet(sheetId: string, changes: { title?: string; storeJson?: StoreJson }) {
    const sheet = this.props.sheets.find(sheet => sheet.props.id === sheetId);
    if (!sheet) throw new Error('SheetNotFound');
    sheet.update(changes);
    this.touch();
    return sheet;
  }

  removeSheet(sheetId: string) {
    const before = this.props.sheets.length;
    this.props.sheets = this.props.sheets.filter(sheet => sheet.props.id !== sheetId);
    if (this.props.sheets.length === before) throw new Error('SheetNotFound');
    this.props.sheets.forEach((sheet, i) => (sheet.props.order = i + 1));
    this.touch();
  }

  updateTitle(newTitle: string) {
    this.props.title = newTitle.trim();
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}