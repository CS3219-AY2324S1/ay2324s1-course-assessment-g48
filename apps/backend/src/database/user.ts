import { Prisma, User } from "@prisma/client";
import { prisma } from "./prisma";
import { Response } from "express";

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
  return await prisma.user.delete({ where: { id } });
}

export async function findOneUser(where: Prisma.UserWhereInput) {
  return await prisma.user.findFirst({
    where,
  });
}
