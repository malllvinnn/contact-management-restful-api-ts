# User API Spec

## Register User

### Endpoint
- **Method:** `POST`
- **Path:** `/api/users`

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| username | string | Yes | Unique username |
| name | string | Yes | Display name |
| password | string | Yes | Account password |

```json
{
  "username": "john_doe",
  "name": "John Doe",
  "password": "password123"
}
```

### Response — Success `201`

```json
{
  "success": true,
  "message": "User Created successfully",
  "data": {
    "username": "john_doe",
    "name": "John Doe"
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `400` | Validation error (missing or invalid fields) |
| `409` | Username already exists |

```json
{
  "success": false,
  "message": "Username already exists",
  "errors": []
}
```

---

## Login User

### Endpoint
- **Method:** `POST`
- **Path:** `/api/users/login`

### Request Body

| Field | Type | Required |
|---|---|---|
| username | string | Yes |
| password | string | Yes |

```json
{
  "username": "john_doe",
  "password": "password123"
}
```

### Response — Success `200`

```json
{
  "success": true,
  "message": "User Login successfully",
  "data": {
    "username": "john_doe",
    "name": "John Doe",
    "token": "<JWT token>"
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `400` | Validation error |
| `401` | Invalid username or password |

```json
{
  "success": false,
  "message": "Invalid username or password",
  "errors": []
}
```

---

## Get Current User

### Endpoint
- **Method:** `GET`
- **Path:** `/api/users/current`
- **Auth:** `Authorization: Bearer <token>`

### Response — Success `200`

```json
{
  "success": true,
  "message": "User Retrieved successfully",
  "data": {
    "username": "john_doe",
    "name": "John Doe"
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `401` | Missing, invalid, or expired token |

---

## Update User

### Endpoint
- **Method:** `PATCH`
- **Path:** `/api/users/current`
- **Auth:** `Authorization: Bearer <token>`

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | No | New display name |
| password | string | No | New password |

At least one field must be provided.

```json
{
  "name": "Jane Doe",
  "password": "newpassword123"
}
```

### Response — Success `200`

```json
{
  "success": true,
  "message": "User Updated successfully",
  "data": {
    "username": "john_doe",
    "name": "Jane Doe"
  }
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `400` | Validation error |
| `401` | Missing or invalid token |

---

## Logout User

### Endpoint
- **Method:** `DELETE`
- **Path:** `/api/users/current`
- **Auth:** `Authorization: Bearer <token>`

Invalidates the current token immediately by clearing the stored JTI in the database.

### Response — Success `200`

```json
{
  "success": true,
  "message": "User Logout successfully",
  "data": "OK"
}
```

### Response — Failed

| Status | Cause |
|---|---|
| `401` | Missing or invalid token |
