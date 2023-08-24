/*
  Warnings:

  - You are about to drop the column `mockServerId` on the `WsMock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WsMock" DROP CONSTRAINT "WsMock_mockServerId_fkey";

-- DropIndex
DROP INDEX "WsMock_mockServerId_key";

-- AlterTable
ALTER TABLE "WsMock" DROP COLUMN "mockServerId";
