export class SheetNotFoundError extends Error {
    constructor(id: string) {
        super(`Sheet not found: ${id}`);
        this.name = 'SheetNotFoundError';
    }
}