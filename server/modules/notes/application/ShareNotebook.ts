import { ForbiddenNotebookAccessError } from "../domain/errors";
import { UsersNotebooksRepository } from "../domain/repositories/UsersNotebooksRepository";

export class ShareNotebook {
  constructor(private members: UsersNotebooksRepository) {}

  async execute(input: { userId: string; notebookId: string; targetUserId: string; role: 'editor'|'viewer' }) {
    const isOwner = await this.members.hasRole(input.userId, input.notebookId, ['owner']);
    if (!isOwner) throw new ForbiddenNotebookAccessError();

    await this.members.addMember(input.notebookId, input.targetUserId, input.role);
  }
}