export class NotebookNotFoundError extends Error {
    constructor(id: string) {
        super(`Notebook not found: ${id}`);
        this.name = 'NotebookNotFoundError';
    }
}