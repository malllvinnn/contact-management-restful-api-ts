# Address API Spec

## Create Address
### Endpoint : 
- **HTTP Method :** `POST`
- **route path :** /api/users/contacts/:idContact/addresses

### Request Header
- Authorization: Bearer Token / token UUID

### Request Body
```json
{
  "contact_id": "UUID-Format",
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "51352"
}
```

### Response Body (Success) :
**status code :** 
- Created: `201`
```json
{
  "success": true,
  "message": "Address Created successfully",
  "data": {
    "id": "UUID-Format",
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "51352"
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Bad Request / Validation Error: `400`
- Unauthorized: `401`
- Not Found: `404`
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "Bad Request / Validation Error/ Unauthorized/ Not Found",
  "errors": []
}
```

## Get Address
### Endpoint : 
- **HTTP Method :** `GET`
- **route path :** /api/users/contacts/:idContact/addresses/:idAddress

### Request Header
- Authorization: Bearer Token / token UUID

### Response Body (Success) :
**status code :** 
- OK: `200`
```json
{
  "success": true,
  "message": "Address Retrieved successfully",
  "data": {
    "id": "UUID-Format",
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "51352"
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Unauthorized: `401`
- Not Found: `404` (contact id dan address id)
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "Unauthorized/ Not Found",
  "errors": []
}
```

## Update Address
### Endpoint : 
- **HTTP Method :** `PUT`
- **route path :** /api/users/contacts/:idContact/addresses/:idAddress

### Request Header
- Authorization: Bearer Token / token UUID

### Request Body
```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "51352"
}
```

### Response Body (Success) :
**status code :** 
- OK: `200`
```json
{
  "success": true,
  "message": "Address Updated successfully",
  "data": {
    "id": "UUID-Format",
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "51352"
  }
}
```
### Response Body (Failed) :
**Status code :** 
- Bad Request: `400`
- Unauthorized: `401`
- Not Found: `404` (contact id dan address id)
  
**Message :**
Sesuaikan dengan Status code

```json
{
  "success": false,
  "message": "BadRequest/ Unauthorized/ Not Found",
  "errors": []
}
```

## Remove Address
### Endpoint : 
- **HTTP Method :** `DELETE`
- **route path :** /api/users/contacts/:idContact/addresses/:idAddress

### Request Header
- Authorization: Bearer Token / token UUID

### Response Body (Success) :
**status code :** 
- OK: `200`
```json
{
  "success": true,
  "message": "Address Removed successfully",
  "data": "OK"
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

## List Address
### Endpoint : 
- **HTTP Method :** `GET`
- **route path :** /api/users/contacts/:idContact/addresses

### Request Header
- Authorization: Bearer Token / token UUID

### Response Body (Success) :
**status code :** 
- OK: `200`
```json
{
  "success": true,
  "message": "Addresses Retrieved successfully",
  "data": [
    {
      "id": "UUID-Format",
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "51352"
    },
    {
      "id": "UUID-Format",
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "51352"
    }
  ]
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