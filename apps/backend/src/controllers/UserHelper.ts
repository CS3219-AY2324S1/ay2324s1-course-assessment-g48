import { PrismaClient, User } from "@prisma/client";
import { prisma } from "../database/prisma";

export async function createUser(data: User) {
  console.log(data);
  return prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: data.password,
    },
  });
}

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function updateUser(id: number, data: Partial<User>) {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}
