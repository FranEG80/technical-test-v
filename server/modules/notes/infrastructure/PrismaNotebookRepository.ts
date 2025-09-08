import { prisma } from '@/server/db';
import { NotebookRepository } from '@/server/modules/notes/domain/repositories/NotebookRepository';
import { Notebook } from '@/server/modules/notes/domain/entities/NotebookEntity';
import { prismaNotebookToDomain, domainNotebookToPrisma } from './mappers';

export class PrismaNotebookRepository implements NotebookRepository {
  async findById(id: string): Promise<Notebook | null> {
    const notebook = await prisma.notebook.findUnique({
      where: { id },
      include: {
        sheets: { orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] },
      },
    });
    return notebook ? prismaNotebookToDomain(notebook) : null;
  }

  async listByUserId(userId: string): Promise<Notebook[]> {
    const rows = await prisma.notebook.findMany({
      where: { users: { some: { userId } } },
      orderBy: { updatedAt: 'desc' },
      include: {
        sheets: { select: { id: true, title: true, storeJson: true, order: true, createdAt: true, updatedAt: true } },
      },
    });
    return rows.map(prismaNotebookToDomain);
  }

  async save(aggregate: Notebook): Promise<void> {
    const dto = domainNotebookToPrisma(aggregate.toPrimitives());

    await prisma.$transaction(async (tx) => {
      await tx.notebook.upsert({
        where: { id: dto.id },
        update: { title: dto.title, updatedAt: new Date() },
        create: { id: dto.id, title: dto.title, createdAt: dto.createdAt },
      });

      await tx.sheet.deleteMany({ where: { notebookId: dto.id } });
      for (const sheet of dto.sheets) {
        await tx.sheet.create({
          data: {
            id: sheet.id,
            title: sheet.title,
            storeJson: sheet.storeJson,
            order: sheet.order,
            createdAt: sheet.createdAt,
            updatedAt: sheet.updatedAt,
            notebookId: dto.id,
          },
        });
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.notebook.delete({ where: { id } });
  }

}