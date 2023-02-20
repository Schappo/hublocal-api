/*
  Warnings:

  - You are about to drop the column `userId` on the `companies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_userId_fkey";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
