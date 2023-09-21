-- CreateEnum
CREATE TYPE "OAuth" AS ENUM ('google', 'github');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oauth" "OAuth"[];
