import { PrismaClient } from '@prisma/client';

async function main(): Promise<void> {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const mockServer = await prisma.mockServer.create({
    data: {
      name: '뀨!',
      description: '뀨?',
    },
  });

  const httpMock = await prisma.httpMock.create({
    data: {
      baseUrl: 'https://qqu.qqu',
      mockServer: {
        connect: {
          id: mockServer.id,
        },
      },
    },
  });

  const httpMockEndpoint = await prisma.httpMockEndpoint.create({
    data: {
      httpMock: {
        connect: {
          id: httpMock.id,
        },
      },
      method: 'GET',
      path: '/qqu',
    },
  });

  const httpMockEndpointRequestHeader = await prisma.httpHeader.create({
    data: {
      httpMockEndpoint: {
        connect: {
          id: httpMockEndpoint.id,
        },
      },
      name: 'Content-Type',
      value: 'qqu',
    },
  });

  const httpMockEndpointResponse = await prisma.httpMockEndpointResponse.create({
    data: {
      httpMockEndpoint: {
        connect: {
          id: httpMockEndpoint.id,
        },
      },
      statusCode: 200,
      body: '{"qqu": "qqu"}',
    },
  });

  const httpMockEndpointResponseHeader = await prisma.httpHeader.create({
    data: {
      httpMockEndpointResponse: {
        connect: {
          id: httpMockEndpointResponse.id,
        },
      },
      name: 'Content-Type',
      value: 'qqu',
    },
  });

  await prisma.$disconnect();
}

await main();
