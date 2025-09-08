import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepo } from "./lib/inMemoryRepos";
import { CreateUser } from '@/server/modules/user/application/CreateUser';
import { now } from './lib/helpers';
import { UserAlreadyExistsError } from '@/server/modules/user/domain/errors';

describe('User use cases', () => {
    let users: InMemoryUserRepo;
    let userDemo: { name: string; email: string; };
    
    beforeEach(() => {
        users = new InMemoryUserRepo();
        userDemo = { name: 'Demo', email: 'demo@example.com' };
    });

    it('CreateUser create new user', async () => {
        const createUser = new CreateUser(users, now);
        const user = await createUser.execute(userDemo);

        expect(user.toPrimitives().name).toBe(userDemo.name);
        expect(user.toPrimitives().email).toBe(userDemo.email);
    });

    it('CreateUser throws UserAlreadyExistsError if email exists', async () => {
        const createUser = new CreateUser(users, now);
        await createUser.execute(userDemo);

        await expect(createUser.execute(userDemo)).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});