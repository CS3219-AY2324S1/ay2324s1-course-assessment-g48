/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OAuth" AS ENUM ('google', 'github');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'normal');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oauth" "OAuth"[],
ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
