# Schema Description

## MockServer

목서버 인스턴스 생성을 위한 스키마입니다.

## HttpMock

목서버 인스턴스에 동록할 Http Mock을 정의하는 스키마입니다.
Http Mocking 관련 기능에 대한 최상위 스키마입니다.

## HttpMockEndpoint

목서버 인스턴스에 동록할 Http Mock의 Endpoint를 정의하는 스키마입니다.
요청을 받을 Endpoint에 대한 정보를 정의합니다.

## HttpMockEndpointResponse

Http Mock의 Endpoint에서 응답할 Response를 정의하는 스키마입니다.
응답할 Response에 대한 정보를 정의합니다.

## HttpHeader

Http Header를 정의하는 스키마입니다.
Http Header에 대한 정보를 정의합니다.
HttpMockEndpoint 및 HttpMockEndpointResponse에서 사용됩니다.
HttpMockEndpoint에서는 요청에 대한 Http Header를 정의하고,
HttpMockEndpointResponse에서는 응답에 대한 Http Header를 정의합니다.

## WsMock

목서버 인스턴스에 동록할 Ws Mock을 정의하는 스키마입니다.
Ws Mocking 관련 기능에 대한 최상위 스키마입니다.