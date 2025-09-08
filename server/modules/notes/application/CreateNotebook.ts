import { Notebook } from "../domain/entities/NotebookEntity";
import { ForbiddenNotebookAccessError } from "../domain/errors";
import { NotebookRepository } from "../domain/repositories/NotebookRepository";
import { UsersNotebooksRepository } from "../domain/repositories/UsersNotebooksRepository";

export class CreateNotebook {
    constructor(private notebooks: NotebookRepository, private users: UsersNotebooksRepository) {}

    async execute(data: { userId: string; title: string; notebookId?: string }) {
        const { userId, title } = data;
        const notebookId = data.notebookId || '';

        if (notebookId) {
            const isMember = await this.users.isUserMemberOfNotebook(userId, notebookId);
            if (!isMember) throw new ForbiddenNotebookAccessError();
        }

        const notebook = Notebook.createNew({ title });
        await this.notebooks.save(notebook);
        await this.users.addMember(notebook.toPrimitives().id, userId, 'owner');
        
        return notebook;
    }
}
