import { ForbiddenNotebookAccessError } from "../domain/errors";
import { NotebookRepository } from "../domain/repositories/NotebookRepository";
import { UsersNotebooksRepository } from "../domain/repositories/UsersNotebooksRepository";
import { StoreJson } from "../shared/types";
import { UpdateSheetInput } from "./AddSheet";

export class UpdateSheet {
  constructor(
    private notebooks: NotebookRepository,
    private members: UsersNotebooksRepository
  ) {}

  async execute(input: UpdateSheetInput) {
    const isAuth = await this.members.hasRole(input.userId, input.notebookId, ['owner','editor']);
    if (!isAuth) throw new ForbiddenNotebookAccessError();

    const notebook = await this.notebooks.findById(input.notebookId);
    if (!notebook) throw new Error('NotebookNotFound');

    notebook.updateSheet(input.sheetId, { title: input.title, storeJson: input.storeJson });
    await this.notebooks.save(notebook);
    return notebook;
  }
}