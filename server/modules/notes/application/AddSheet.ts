import { StoreJson } from "@/shared/types";
import { ForbiddenNotebookAccessError, NotebookNotFoundError } from "../domain/errors";
import { NotebookRepository } from "../domain/repositories/NotebookRepository";
import { UsersNotebooksRepository } from "../domain/repositories/UsersNotebooksRepository";
import { AddSheetInput } from "../shared/types";

export class AddSheet {
  constructor(
    private notebooks: NotebookRepository,
    private members: UsersNotebooksRepository
  ) {}

  async execute(input: AddSheetInput) {
    const isAuth = await this.members.hasRole(input.userId, input.notebookId, ['owner','editor']);
    if (!isAuth) throw new ForbiddenNotebookAccessError();

    const notebook = await this.notebooks.findById(input.notebookId);
    if (!notebook) throw new NotebookNotFoundError(input.notebookId);

    const sheet = notebook.addSheet({ title: input.title, storeJson: input.storeJson });
    await this.notebooks.save(notebook);
    return sheet;
  }
}


export type UpdateSheetInput = {
  userId: string;
  notebookId: string;
  sheetId: string;
  title?: string;
  storeJson?: StoreJson;
};