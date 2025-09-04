import { NotebookRole } from "../../shared/types";

export interface UsersNotebooksRepository {
  hasRole(userId: string, notebookId: string, roles: NotebookRole[]): Promise<boolean>;
  addMember(notebookId: string, userId: string, role: NotebookRole): Promise<void>;
  setRole(notebookId: string, userId: string, role: NotebookRole): Promise<void>;
  removeMember(notebookId: string, userId: string): Promise<void>;
  isUserMemberOfNotebook(userId: string, notebookId: string): Promise<boolean>;
}