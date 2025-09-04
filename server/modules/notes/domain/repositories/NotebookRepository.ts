import { Notebook } from '../entities/NotebookEntity';

export interface NotebookRepository {
  findById(id: string): Promise<Notebook | null>;
  listByUserId(userId: string): Promise<Notebook[]>;
  save(aggregate: Notebook): Promise<void>;
  delete(id: string): Promise<void>;
}