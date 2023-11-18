import { Prisma, User } from "@prisma/client";
import { prisma } from "./prisma";

export enum OAuthType {
  Google = "google",
  Github = "github",
}

export enum Role {
  Admin = "admin",
  Normal = "normal",
}

export async function createUser(data: User) {
  console.log(data);
  return prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: data.password ?? undefined,
      oauth: data.oauth,
      role: data.role,
      image: data.image,
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
  return await prisma.user.delete({ where: { id } });
}

export async function findOneUser(where: Prisma.UserWhereInput, select?: Prisma.UserSelect) {
  return await prisma.user.findFirst({
    where, select
  });
}
