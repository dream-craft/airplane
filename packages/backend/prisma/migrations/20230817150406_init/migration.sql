-- CreateTable
CREATE TABLE "MockServer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "MockServer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HttpHeader" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',
    "httpMockEndpointResponseId" INTEGER,
    "httpMockEndpointId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HttpHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HttpMock" (
    "id" SERIAL NOT NULL,
    "baseUrl" TEXT NOT NULL DEFAULT '',
    "mockServerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HttpMock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HttpMockEndpoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "httpMockId" INTEGER NOT NULL,
    "method" TEXT NOT NULL DEFAULT '',
    "path" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HttpMockEndpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HttpMockEndpointResponse" (
    "id" SERIAL NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "httpMockEndpointId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HttpMockEndpointResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HttpMock_mockServerId_key" ON "HttpMock"("mockServerId");

-- CreateIndex
CREATE UNIQUE INDEX "HttpMockEndpoint_httpMockId_key" ON "HttpMockEndpoint"("httpMockId");

-- CreateIndex
CREATE UNIQUE INDEX "HttpMockEndpointResponse_httpMockEndpointId_key" ON "HttpMockEndpointResponse"("httpMockEndpointId");

-- AddForeignKey
ALTER TABLE "HttpHeader" ADD CONSTRAINT "HttpHeader_httpMockEndpointResponseId_fkey" FOREIGN KEY ("httpMockEndpointResponseId") REFERENCES "HttpMockEndpointResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HttpHeader" ADD CONSTRAINT "HttpHeader_httpMockEndpointId_fkey" FOREIGN KEY ("httpMockEndpointId") REFERENCES "HttpMockEndpoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HttpMock" ADD CONSTRAINT "HttpMock_mockServerId_fkey" FOREIGN KEY ("mockServerId") REFERENCES "MockServer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HttpMockEndpoint" ADD CONSTRAINT "HttpMockEndpoint_httpMockId_fkey" FOREIGN KEY ("httpMockId") REFERENCES "HttpMock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HttpMockEndpointResponse" ADD CONSTRAINT "HttpMockEndpointResponse_httpMockEndpointId_fkey" FOREIGN KEY ("httpMockEndpointId") REFERENCES "HttpMockEndpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
