import { PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

export class TodoService {
  async findAll() {
    return prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: number) {
    return prisma.task.findUnique({
      where: { id },
    });
  }

  async create(data: { title: string; color: string }) {
    return prisma.task.create({
      data,
    });
  }

  async update(id: number, data: Partial<Task>) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.task.delete({
      where: { id },
    });
  }
}
