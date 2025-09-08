import { prisma } from '@/server/db';
import { UsersNotebooksRepository } from '../domain/repositories/UsersNotebooksRepository';
import { NotebookRole } from '@/server/modules/notes/shared/types';

export class PrismaUsersNotebooksRepository implements UsersNotebooksRepository {
  async hasRole(userId: string, notebookId: string, roles: NotebookRole[]) {
    const c = await prisma.userNotebook.count({
      where: { userId, notebookId, role: { in: roles } },
    });
    return c > 0;
  }

  async addMember(notebookId: string, userId: string, role: NotebookRole) {
    await prisma.userNotebook.upsert({
      where: { userId_notebookId: { userId, notebookId } },
      update: { role: role },
      create: { userId, notebookId, role: role },
    });
  }

  async setRole(notebookId: string, userId: string, role: NotebookRole) {
    await prisma.userNotebook.update({
      where: { userId_notebookId: { userId, notebookId } },
      data: { role: role },
    });
  }

  async removeMember(notebookId: string, userId: string) {
    await prisma.userNotebook.delete({
      where: { userId_notebookId: { userId, notebookId } },
    });
  }

  async listMembers(notebookId: string) {
    const rows = await prisma.userNotebook.findMany({
      where: { notebookId },
      select: { userId: true, role: true },
    });
    return rows as Array<{ userId: string; role: NotebookRole }>;
  }

  async isUserMemberOfNotebook(userId: string, notebookId: string): Promise<boolean> {
    return prisma.userNotebook.findFirst({
      where: { userId, notebookId },
    }).then((membership) => !!membership);
  }
}