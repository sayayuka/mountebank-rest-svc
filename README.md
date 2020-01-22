# mock-svc

Using mountebank to mock rest services

## Prerequisites

- Install npm tool

- Install mountebank
> npm install -g mountebank

- Start mock services
> npm start

## Permission mock service

- API interface
> http://{host:port}/rest/v1/CheckUserPrivilege

- Request body:
```
{
  "accessUserId": "userA",
  "permLongValue": -1,
  "permStringValue": "Activity",
  "permType": "CREATE",
  "targetUserIds": []
}
```

- Response body:
```
{
  "hasPermission": true
}
```

## Build image

> docker build -t mock-rest-svc:1.0.0 -f docker/Dockerfile .

## Run image instance

> docker run -p 5002:5002 {IMAGE ID}