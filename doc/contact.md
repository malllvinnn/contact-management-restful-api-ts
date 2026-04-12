# Contact API Spec

All endpoints require authentication: `Authorization: Bearer <token>`

---

## Create Contact

### Endpoint
- **Method:** `POST`
- **Path:** `/api/contacts`

### Request Body

| Field | Type | Required |
|---|---|---|
| first_name | string | Yes |
| last_name | string | No |
| email | string | No |
| phone | string | No |

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "phone": "08123456789"
}
```

### Response — Success `201`

```json
{
  "success": true,
  "message": "Contact Created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "phone": "08123456789"
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `400` | Validation error |
| `401` | Missing or invalid token |

---

## Get Contact

### Endpoint
- **Method:** `GET`
- **Path:** `/api/contacts/:contactId`

### Response — Success `200`

```json
{
  "success": true,
  "message": "Contact Retrieved successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "phone": "08123456789"
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `401` | Missing or invalid token |
| `404` | Contact not found or not owned by current user |

---

## Update Contact

### Endpoint
- **Method:** `PUT`
- **Path:** `/api/contacts/:contactId`

### Request Body

| Field | Type | Required |
|---|---|---|
| first_name | string | Yes |
| last_name | string | No |
| email | string | No |
| phone | string | No |

```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "janedoe@example.com",
  "phone": "08987654321"
}
```

### Response — Success `200`

```json
{
  "success": true,
  "message": "Contact Updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "janedoe@example.com",
    "phone": "08987654321"
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `400` | Validation error |
| `401` | Missing or invalid token |
| `404` | Contact not found |

---

## Remove Contact

### Endpoint
- **Method:** `DELETE`
- **Path:** `/api/contacts/:contactId`

### Response — Success `200`

```json
{
  "success": true,
  "message": "Contact Removed successfully",
  "data": "OK"
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `401` | Missing or invalid token |
| `404` | Contact not found |

---

## Search Contacts

### Endpoint
- **Method:** `GET`
- **Path:** `/api/contacts`

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| name | string | No | Filter by first or last name (partial match) |
| email | string | No | Filter by email (partial match) |
| phone | string | No | Filter by phone (partial match) |
| page | number | No | Page number, default `1` |
| size | number | No | Items per page, default `10` |

### Response — Success `200`

```json
{
  "success": true,
  "message": "Contact found",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "phone": "08123456789"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 5,
    "size": 10
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `401` | Missing or invalid token |
