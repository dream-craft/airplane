-- DropIndex
DROP INDEX "HttpMockEndpoint_httpMockId_key";

-- DropIndex
DROP INDEX "HttpMockEndpointResponse_httpMockEndpointId_key";

-- AlterTable
ALTER TABLE "HttpMockEndpoint" ADD COLUMN     "currentResponseId" INTEGER;

-- AddForeignKey
ALTER TABLE "HttpMockEndpoint" ADD CONSTRAINT "HttpMockEndpoint_currentResponseId_fkey" FOREIGN KEY ("currentResponseId") REFERENCES "HttpMockEndpointResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
