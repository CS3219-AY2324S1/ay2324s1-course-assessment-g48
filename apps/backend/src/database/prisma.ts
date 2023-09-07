import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
// Example usage: This find the first user that has the email "abc@gmail.com" with a username 'alksdja"
// prisma.users.findFirst({
//   where: {
//     email: "abc@gmail.com",
//     username: "alksdja",
//   },
// });
