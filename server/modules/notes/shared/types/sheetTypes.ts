import { StoreJson } from "@/shared/types";

export type AddSheetInput = {
  id?: string;
  userId: string;
  notebookId: string;
  title: string;
  storeJson: StoreJson;
};
