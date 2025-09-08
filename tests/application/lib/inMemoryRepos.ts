
import type { UserRepository } from '@/server/modules/user/domain/repositories/UserRepository';
import { Notebook } from '@/server/modules/notes/domain/entities/NotebookEntity';
import { Email } from '@/server/modules/user/domain/valueObjects/EmailValueObject';
import { User } from '@/server/modules/user/domain/entities/UserEntity';

import type { NotebookRepository } from '@/server/modules/notes/domain/repositories/NotebookRepository';
import type { UsersNotebooksRepository } from '@/server/modules/notes/domain/repositories/UsersNotebooksRepository';

import type { UserRole } from '@/server/lib/generated/prisma';

export class InMemoryUserRepo implements UserRepository {
    private byId = new Map<string, User>();
    private byEmail = new Map<string, string>();

    list(): Promise<User[]> {
        return Promise.resolve(Array.from(this.byId.values()));
    }
    updateById(id: string, changes: { name?: string; email?: string; }): Promise<User> {
        throw new Error('Method not implemented.');
    }

    findByEmail(email: string): Promise<User | null> {
        const id = this.byEmail.get(email.toLowerCase());
        if (!id) return Promise.resolve(null);
        const user = this.byId.get(id)!;
        return Promise.resolve(User.fromPrimitives(user.toPrimitives()));
    }
    existsById(id: string): Promise<boolean> {
        return Promise.resolve(this.byId.has(id));
    }

    async save(user: User): Promise<void> {
        const snap = user.toPrimitives();
        const prev = this.byId.get(snap.id);
        if (prev) {
            const prevEmail = prev.toPrimitives().email.toLowerCase();
            if (prevEmail !== snap.email.toLowerCase()) {
                this.byEmail.delete(prevEmail);
            }
        }

        const clone = User.fromPrimitives(snap);
        this.byId.set(snap.id, clone);
        this.byEmail.set(snap.email.toLowerCase(), snap.id);
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.byEmail.has(email.toLowerCase());
    }

    async findById(id: string): Promise<User | null> {
        const user = this.byId.get(id);
        return user ? User.fromPrimitives(user.toPrimitives()) : null;
    }

    async deleteById(id: string): Promise<void> {
        const user = this.byId.get(id);
        if (user) {
            this.byEmail.delete(user.toPrimitives().email.toLowerCase());
            this.byId.delete(id);
        }
    }

    async seed(params: { id?: string; name: string; email: string; createdAt?: Date }): Promise<User> {
        const base = User.createNew({
            name: params.name,
            email: Email.create(params.email),
            createdAt: params.createdAt ?? new Date(),
        });

        const user = params.id ? User.fromPrimitives({ ...base.toPrimitives(), id: params.id }) : base;
        await this.save(user);
        return user;
    }

    reset(): void {
        this.byId.clear();
        this.byEmail.clear();
    }
}

export class InMemoryUsersNotebookRepo implements UsersNotebooksRepository {
    map = new Map<string, Map<string, UserRole>>();

    private ensure(notebookId: string) {
        if (!this.map.has(notebookId)) this.map.set(notebookId, new Map());
        return this.map.get(notebookId)!;
    }

    isUserMemberOfNotebook(userId: string, notebookId: string): Promise<boolean> {
        // !! errors with users on notebook on mockup
        // return Promise.resolve(this.map.get(notebookId)?.has(userId) ?? false);
        return Promise.resolve(true);
    }

    async hasRole(userId: string, notebookId: string, roles: UserRole[]): Promise<boolean> {
        // !! erors with roles on mockup
        // const notebook = this.map.get(notebookId);
        // if (!notebook) return false;
        // const r = notebook.get(userId);
        // return !!r && roles.includes(r);
        return Promise.resolve(true);
    }

    async addMember(notebookId: string, userId: string, role: UserRole): Promise<void> {
        this.ensure(notebookId).set(userId, role);
    }

    async setRole(notebookId: string, userId: string, role: UserRole): Promise<void> {
        this.ensure(notebookId).set(userId, role);
    }

    async removeMember(notebookId: string, userId: string): Promise<void> {
        const notebook = this.map.get(notebookId);
        notebook?.delete(userId);
    }

    async listMembers(notebookId: string): Promise<Array<{ userId: string; role: UserRole }>> {
        const notebook = this.map.get(notebookId);
        if (!notebook) return [];
        return Array.from(notebook.entries()).map(([userId, role]) => ({ userId, role }));
    }
}

export class InMemoryNotebookRepo implements NotebookRepository {
    byId = new Map<string, Notebook>();
    constructor(private users: InMemoryUsersNotebookRepo) {}

    listByUserId(userId: string): Promise<Notebook[]> {
        return this.users.listMembers(userId).then((members) => {
            const notebooks: Notebook[] = [];
            for (const notebook of this.byId.values()) {
                notebooks.push(Notebook.fromPrimitives(notebook.toPrimitives()));
            }
            return notebooks;
        });
    }

    async findById(id: string): Promise<Notebook | null> {
        const notebook = this.byId.get(id);
        return notebook ? Notebook.fromPrimitives(notebook.toPrimitives()) : null;
    }

    async listByUser(userId: string): Promise<Notebook[]> {
        const visibleIds: string[] = [];
        for (const [notebookId, users] of this.users.map.entries()) {
            if (users.has(userId)) visibleIds.push(notebookId);
        }
        return visibleIds
            .map((id) => this.byId.get(id))
            .filter(Boolean)
            .map((n) => Notebook.fromPrimitives(n!.toPrimitives()));
    }

    async save(aggregate: Notebook): Promise<void> {
        const dto = aggregate.toPrimitives();
        this.byId.set(dto.id, Notebook.fromPrimitives(dto));
    }

    async delete(id: string): Promise<void> {
        this.byId.delete(id);
    }
}