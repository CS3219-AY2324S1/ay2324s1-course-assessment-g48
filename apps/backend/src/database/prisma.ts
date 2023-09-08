import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
// Example usage: This find the first user that has the email "abc@gmail.com" with a username 'alksdja"
// prisma.users.findFirst({
//   where: {
//     email: "abc@gmail.com",
//     username: "alksdja",
//   },
// });

// async function main() {
// ... you will write your Prisma Client queries here
// await prisma.user.create({
//   data: {
//     id: 1,
//     email: "abc@gmail.com",
//     username: "alksdja",
//     password: "alksdja",
//   },
// });
// const allUsers = await prisma.user.findMany();
// console.log(allUsers);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
