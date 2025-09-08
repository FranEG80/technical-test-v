import { NotebookRepository } from "../domain/repositories/NotebookRepository";

export class ListUserNotebooks {
  constructor(private notebooks: NotebookRepository) {}
  execute(userId: string) {
    return this.notebooks.listByUserId(userId);
  }
}