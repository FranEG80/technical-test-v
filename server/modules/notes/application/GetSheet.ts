import { ForbiddenNotebookAccessError } from "../domain/errors";
import { NotebookRepository } from "../domain/repositories/NotebookRepository";
import { UsersNotebooksRepository } from "../domain/repositories/UsersNotebooksRepository";

export class GetSheet {
  constructor(
    private notebooks: NotebookRepository,
    private members: UsersNotebooksRepository
  ) {}

  async execute(input: { notebookId: string; id: string }) {
    const notebook = await this.notebooks.findById(input.notebookId);
    if (!notebook) throw new Error('NotebookNotFound');

    const sheet = notebook.toPrimitives().sheets.find(s => s.id === input.id);
    if (!sheet) throw new Error('SheetNotFound');

    return sheet;
  }
}