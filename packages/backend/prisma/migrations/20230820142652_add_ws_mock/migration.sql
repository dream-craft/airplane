/*
  Warnings:

  - A unique constraint covering the columns `[mockServerId]` on the table `WsMock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mockServerId` to the `WsMock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WsMock" ADD COLUMN     "mockServerId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WsMock_mockServerId_key" ON "WsMock"("mockServerId");

-- AddForeignKey
ALTER TABLE "WsMock" ADD CONSTRAINT "WsMock_mockServerId_fkey" FOREIGN KEY ("mockServerId") REFERENCES "MockServer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
