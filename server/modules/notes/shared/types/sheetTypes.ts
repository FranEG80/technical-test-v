import type { StoreSnapshot, TLRecord } from 'tldraw';
import z from 'zod';

export type StoreJson = StoreSnapshot<TLRecord>;

export type AddSheetInput = {
  userId: string;
  notebookId: string;
  title: string;
  storeJson: StoreJson;
};
