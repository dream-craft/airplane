-- CreateTable
CREATE TABLE "WsMock" (
    "id" SERIAL NOT NULL,
    "baseUrl" TEXT NOT NULL DEFAULT '',
    "mockServerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "WsMock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WsMock_mockServerId_key" ON "WsMock"("mockServerId");

-- AddForeignKey
ALTER TABLE "WsMock" ADD CONSTRAINT "WsMock_mockServerId_fkey" FOREIGN KEY ("mockServerId") REFERENCES "MockServer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
