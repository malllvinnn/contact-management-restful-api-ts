# Contact API Spec

## Create Contact
### Endpoint : 
- **HTTP Method :** `POST`
- **route path :** /api/users/contacts

### Request Header
- Authorization: Bearer Token / token UUID

### Request Body
```json
{
  "first_name": "Xiao",
  "last_name": "Yan",
  "email": "yesoseso@example.com",
  "phone": "088775758"
}
```

### Response Body (Success) :
**status code :** 
- Created: `201`
```json
{
  "success": true,
  "message": "Contact Created successfully",
  "data": {
    "first_name": "Xiao",
    "last_name": "Yan",
    "email": "yesoseso@example.com",
    "phone": "088775758"
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Bad Request: `400`
- Unauthorized: `401`
- Conflict: `409`
- Internal Server Error: `500`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "BadRequest/ Unauthorized/ Conflict/ Internal ..",
  "errors": []
}
```
## Get Contact
### Endpoint : 
- **HTTP Method :** `GET`
- **route path :** /api/users/contacts/:id

### Request Header
- Authorization: Bearer Token / token UUID

### Response Body (Success) :
**status code :** 
- Ok: `200`
```json
{
  "success": true,
  "message": "Contact Retrieved successfully",
  "data": {
    "first_name": "Xiao",
    "last_name": "Yan",
    "email": "yesoseso@example.com",
    "phone": "088775758"
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Unauthorized: `401`
- Not Found: `404`
- Internal Server Error: `500`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "Unauthorized/ Not Found/ Internal ..",
  "errors": []
}
```
## Update Contact
### Endpoint : 
- **HTTP Method :** `PUT`
- **route path :** /api/users/contacts/:id

### Request Header
- Authorization: Bearer Token / token UUID

### Request Body
```json
{
  "first_name": "Han",
  "last_name": "Feng",
  "email": "yesoseso@example.com",
  "phone": "088775758"
}
```

### Response Body (Success) :
**status code :** 
- Ok: `200`
```json
{
  "success": true,
  "message": "Contact Updated successfully",
  "data": {
    "first_name": "Han",
    "last_name": "Feng",
    "email": "yesoseso@example.com",
    "phone": "088775758"
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Bad Request: `400`
- Unauthorized: `401`
- Conflict: `409`
- Internal Server Error: `500`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "BadRequest/ Unauthorized/ Conflict/ Internal ..",
  "errors": []
}
```
## Remove Contact
### Endpoint : 
- **HTTP Method :** `DELETE`
- **route path :** /api/users/contacts/:id

### Request Header
- Authorization: Bearer Token / token UUID

### Response Body (Success) :
**status code :** 
- Ok: `200`
```json
{
  "success": true,
  "message": "Contact Removed successfully",
  "data": "OK"
}
```
### Response Body (Failed) :
**Status code :** 
- Unauthorized: `401`
- Internal Server Error: `500`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "BadRequest/ Unauthorized/ Conflict/ Internal ..",
  "errors": []
}
```

## Search Contact
### Endpoint : 
- **HTTP Method :** `GET`
- **route path :** /api/users/contacts

### Query Parameter
- **name**: `string`,contact first name or contact last name, *optional*
- **phone**: `string`, contact phone, *optional*
- **email**: `string`, contact email, *optional*
- **page**: `number`, *default 1*
- **size**: `number`, *default 10*

### Request Header
- Authorization: Bearer Token / token UUID

### Response Body (Success) :
**status code :** 
- Ok: `200`
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": [
    {
      "id": "UUID-Format",
      "first_name": "Xiao",
      "last_name": "Yan",
      "email": "yesoseso@example.com",
      "phone": "088775758"
    },
    {
      "id": "UUID-Format",
      "first_name": "Yao",
      "last_name": "Lao",
      "email": "yesoseso@example.com",
      "phone": "088775758"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Unauthorized: `401`
- Not Found: `404`
- Internal Server Error: `500`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "Unauthorized/ Not Found/ Internal ..",
  "errors": []
}
```