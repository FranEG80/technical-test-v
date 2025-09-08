import { Prisma } from '@/server/lib/generated/prisma';
import { Sheet } from '../domain/entities/SheetEntity';
import { Notebook } from '../domain/entities/NotebookEntity';
import { StoreJson } from '@/shared/types';

export function toDomainStore(json: Prisma.JsonValue): StoreJson {
  return json as unknown as StoreJson;
}

export function toPrismaInputJson(json: StoreJson): Prisma.InputJsonValue {
  return json as unknown as Prisma.InputJsonValue;
}

export function prismaSheetToDomain(sheet: {
  id: string;
  title: string;
  storeJson: Prisma.JsonValue;
  order: number | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return Sheet.fromPrimitives({
    id: sheet.id,
    title: sheet.title,
    storeJson: toDomainStore(sheet.storeJson),
    order: sheet.order ?? 0,
    createdAt: sheet.createdAt,
    updatedAt: sheet.updatedAt,
  });
}

export function prismaNotebookToDomain(notebook: {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  sheets: Array<{
    id: string;
    title: string;
    storeJson: Prisma.JsonValue;
    order: number | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
}) {
  return Notebook.fromPrimitives({
    id: notebook.id,
    title: notebook.title,
    createdAt: notebook.createdAt,
    updatedAt: notebook.updatedAt,
    sheets: notebook.sheets.map(prismaSheetToDomain).map(sheet => sheet.toPrimitives()),
  });
}

export function domainSheetToPrisma(sheet: ReturnType<Sheet['toPrimitives']>) {
  return {
    id: sheet.id,
    title: sheet.title,
    storeJson: toPrismaInputJson(sheet.storeJson),
    order: sheet.order,
    createdAt: sheet.createdAt,
    updatedAt: sheet.updatedAt,
  };
}

export function domainNotebookToPrisma(notebook: ReturnType<Notebook['toPrimitives']>) {
  return {
    id: notebook.id,
    title: notebook.title,
    createdAt: notebook.createdAt,
    updatedAt: notebook.updatedAt,
    sheets: notebook.sheets.map(domainSheetToPrisma),
  };
}