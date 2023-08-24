# API Request Samples

## Create a new Http Mock

1. Create a new Mock Server

   POST /mock-servers

   Request

   ```json
   {
     "name": "my mock server",
     "description": "for testing"
   }
   ```

   Response

   ```json
   {
     "id": "1",
     "name": "my mock server",
     "description": "for testing"
     // ...
   }
   ```

2. Create a new Http Mock

   POST /mock-servers/1/http-mocks

   Request

   ```json
   {
     "baseUrl": "http://127.0.0.1:8080"
   }
   ```

   Response

   ```json
   {
     "id": "1",
     "baseUrl": "http://127.0.0.1:8080"
     // ...
   }
   ```

3. Create a new Http Mock Endpoint

   POST /mock-servers/1/http-mocks/1/endpoints

   Request

   ```json
   {
     "method": "GET",
     "path": "/api/v1/users",
     "description": "get all users"
   }
   ```

   Response

   ```json
   {
     "id": "1",
     "method": "GET",
     "path": "/api/v1/users",
     "description": "get all users"
     // ...
   }
   ```

4. Create a new Http Mock Endpoint Response

   POST /mock-servers/1/http-mocks/1/endpoints/1/responses

   Request

   ```json
   {
     "statusCode": 200,
     "description": "success",
     "body": "{\"message\": \"success\"}"
   }
   ```

   Response

   ```json
   {
     "id": "1",
     "statusCode": 200,
     "description": "success",
     "body": "{\"message\": \"success\"}"
     // ...
   }
   ```

5. Add a new Http Header to Http Mock Endpoint for Request Header Validation

   POST /mock-servers/1/http-mocks/1/endpoints/1/request-headers

   Request

   ```json
   {
     "name": "Content-Type",
     "value": "application/json"
   }
   ```

   Response

   ```json
   {
     "id": "1",
     "name": "Content-Type",
     "value": "application/json"
     // ...
   }
   ```

6. Add a new Http Header to Http Mock Endpoint Response for Response Header Validation

   POST /mock-servers/1/http-mocks/1/endpoints/1/responses/1/headers

   Request

   ```json
   {
     "name": "Content-Type",
     "value": "application/json"
   }
   ```

   Response

   ```json
   {
     "id": "1",
     "name": "Content-Type",
     "value": "application/json"
     // ...
   }
   ```
