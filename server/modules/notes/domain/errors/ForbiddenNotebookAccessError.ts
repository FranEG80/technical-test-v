export class ForbiddenNotebookAccessError extends Error {
    constructor() {
        super('You do not have permission to access this notebook');
        this.name = 'ForbiddenNotebookAccessError';
    }
}