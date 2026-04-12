# Address API Spec

All endpoints require authentication: `Authorization: Bearer <token>`

Addresses are nested under contacts. All paths include `:contactId`.

---

## Create Address

### Endpoint
- **Method:** `POST`
- **Path:** `/api/contacts/:contactId/addresses`

### Request Body

| Field | Type | Required |
|---|---|---|
| country | string | Yes |
| postal_code | string | Yes |
| street | string | No |
| city | string | No |
| province | string | No |

```json
{
  "street": "Jl. Sudirman No. 1",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "country": "Indonesia",
  "postal_code": "10220"
}
```

### Response — Success `201`

```json
{
  "success": true,
  "message": "Address Created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "street": "Jl. Sudirman No. 1",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "10220"
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

## Get Address

### Endpoint
- **Method:** `GET`
- **Path:** `/api/contacts/:contactId/addresses/:addressId`

### Response — Success `200`

```json
{
  "success": true,
  "message": "Address Retrieved successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "street": "Jl. Sudirman No. 1",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "10220"
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `401` | Missing or invalid token |
| `404` | Contact or address not found |

---

## Update Address

### Endpoint
- **Method:** `PUT`
- **Path:** `/api/contacts/:contactId/addresses/:addressId`

### Request Body

| Field | Type | Required |
|---|---|---|
| country | string | Yes |
| postal_code | string | Yes |
| street | string | No |
| city | string | No |
| province | string | No |

```json
{
  "street": "Jl. Thamrin No. 10",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "country": "Indonesia",
  "postal_code": "10230"
}
```

### Response — Success `200`

```json
{
  "success": true,
  "message": "Address Updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "street": "Jl. Thamrin No. 10",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "10230"
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `400` | Validation error |
| `401` | Missing or invalid token |
| `404` | Contact or address not found |

---

## Remove Address

### Endpoint
- **Method:** `DELETE`
- **Path:** `/api/contacts/:contactId/addresses/:addressId`

### Response — Success `200`

```json
{
  "success": true,
  "message": "Address Removed successfully",
  "data": "OK"
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `401` | Missing or invalid token |
| `404` | Contact or address not found |

---

## List Addresses

### Endpoint
- **Method:** `GET`
- **Path:** `/api/contacts/:contactId/addresses`

### Response — Success `200`

```json
{
  "success": true,
  "message": "Addresses Retrieved successfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "street": "Jl. Sudirman No. 1",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "10220"
    },
    {
      "id": "661f9511-f30c-52e5-b827-557766551111",
      "street": "Jl. Gatot Subroto No. 5",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "12930"
    }
  ]
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `401` | Missing or invalid token |
| `404` | Contact not found |
