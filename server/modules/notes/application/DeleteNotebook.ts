import { ForbiddenNotebookAccessError } from "../domain/errors";
import { NotebookRepository } from "../domain/repositories/NotebookRepository";
import { UsersNotebooksRepository } from "../domain/repositories/UsersNotebooksRepository";

export class DeleteNotebook {
  constructor(
    private notebooks: NotebookRepository,
    private members: UsersNotebooksRepository
  ) {}

  async execute(input: { userId: string; notebookId: string }) {
    const isOwner = await this.members.hasRole(input.userId, input.notebookId, ['owner']);
    if (!isOwner) throw new ForbiddenNotebookAccessError();

    await this.notebooks.delete(input.notebookId);
  }
}