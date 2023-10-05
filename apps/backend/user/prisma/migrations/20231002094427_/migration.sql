-- CreateEnum
CREATE TYPE "Complexity" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateEnum
CREATE TYPE "OAuth" AS ENUM ('google', 'github');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'normal');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "oauth" "OAuth"[],
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "complexity" "Complexity" NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToQuestion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToQuestion_AB_unique" ON "_CategoryToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToQuestion_B_index" ON "_CategoryToQuestion"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToQuestion" ADD CONSTRAINT "_CategoryToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToQuestion" ADD CONSTRAINT "_CategoryToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
