# User API Spec

## Register User

### Endpoint : 
- **HTTP Method :** `POST`
- **route path :** /api/users

### Request Body :
```json
{
  "username": "cah_ganteng",
  "name": "Muhammad Malfinn",
  "password": "rahasia123"
}
```
### Response Body (Success) :
**status code :** 
- Created: `201`
```json
{
  "success": true,
  "message": "User Created successfully",
  "data": {
    "username": "cah_ganteng",
    "name": "Muhammad Malfin"
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Validation Error: `400`
- Conflict: `409`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "Validation Error/ Conflict",
  "errors": []
}
```

## Login User
### Endpoint : 
- **HTTP Method :** `POST`
- **route path :** /api/users/login

### Request Body :
```json
{
  "username": "cah_ganteng",
  "password": "rahasia123",
}
```
### Response Body (Success) :
**status code :** 
- Ok: `200`
```json
{
  "success": true,
  "message": "User Login successfully",
  "data": {
    "username": "cah_ganteng",
    "name": "Muhammad Malfin",
    "token": "JWT token / UUID"
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Validation Error: `400`
- Unauthorized: `401`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "Validation Error/ Unauthorized",
  "errors": []
}
```

## Get User
### Endpoint : 
- **HTTP Method :** `GET`
- **route path :** /api/users/current

### Request Header
- Authorization: Bearer Token / token UUID

### Response Body (Success) :
**status code :** 
- Ok: `200`
```json
{
  "success": true,
  "message": "User Retrieved successfully",
  "data": {
    "username": "cah_ganteng",
    "name": "Muhammad Malfin",
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Unauthorized: `401`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "Unauthorized",
  "errors": []
}
```

## Update User
### Endpoint : 
- **HTTP Method :** `PATCH`
- **route path :** /api/users/current

### Request Header
- Authorization: Bearer Token / token UUID

### Request Body :
```json
{
  "password": "rahasia123", // tidak wajib
  "name": "Budi Sudarsono" // tidak wajib
}
```

### Response Body (Success) :
**status code :** 
- Ok: `200`
```json
{
  "success": true,
  "message": "User Updated successfully",
  "data": {
    "username": "cah_ganteng",
    "name": "Budi Sudarsono",
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Validation Error: `400`
- Unauthorized: `401`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "Validation Error/ Unauthorized",
  "errors": []
}
```

## Logout User
### Endpoint : 
- **HTTP Method :** `DELETE`
- **route path :** /api/users/current

### Request Header
- Authorization: Bearer Token / token UUID

### Response Body (Success) :
**status code :** 
- Ok: `200`
```json
{
  "success": true,
  "message": "User Logout successfully",
  "data": "OK"
}
```
### Response Body (Failed) :
**Status code :** 
- Unauthorized: `401`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "Unauthorized",
  "errors": []
}
```