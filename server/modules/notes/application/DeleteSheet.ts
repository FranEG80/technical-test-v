import { ForbiddenNotebookAccessError } from "../domain/errors";
import { NotebookRepository } from "../domain/repositories/NotebookRepository";
import { UsersNotebooksRepository } from "../domain/repositories/UsersNotebooksRepository";

export class DeleteSheet {
  constructor(
    private notebooks: NotebookRepository,
    private members: UsersNotebooksRepository
  ) {}

  async execute(input: { userId: string; notebookId: string; sheetId: string }) {
    const isAuth = await this.members.hasRole(input.userId, input.notebookId, ['owner','editor']);
    if (!isAuth) throw new ForbiddenNotebookAccessError();

    const notebook = await this.notebooks.findById(input.notebookId);
    if (!notebook) throw new Error('NotebookNotFound');

    notebook.removeSheet(input.sheetId);
    await this.notebooks.save(notebook);
  }
}