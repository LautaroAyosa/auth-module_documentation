# **Update User Information**  

<div class="route-container put">
    <div class="endpoint-main">
        <span class="endpoint-type">PUT</span>
        <code class="endpoint-code">
                /auth/update-user
        </code>
    </div>
    <p class="endpoint-description">Allows users to update their account details.</p>
</div>

---

## **1. General Information**
- **Endpoint:** `PUT /auth/update-user`
- **Authentication Required?** ✅ Yes (Currently requires `refreshToken`, but will be updated to require `accessToken` in the future.)
- **Access Restrictions:** _Any authenticated user can call this endpoint_
- **Description:**  
  - **Name and password updates** are applied immediately.  
  - **Email changes require verification**:  
    - Instead of directly updating the email, a **confirmation email** is sent to the current email address.  
    - The actual email update happens through [`PUT /auth/update-email`](#).

---

## **2. Flow**
1. The client sends a request with **at least one field to update** (`name`, `email`, or `password`).
2. The backend:
   - **Extracts user information** from the provided `refreshToken`.
   - Retrieves the **user record** from the database.
3. If **email is being updated**:
   - A **verification token** is generated and stored.
   - A **confirmation email** is sent to the **current** email address.
   - The response informs the user that verification is required.
4. If **password is being updated**:
   - The request **must include `confirmPassword`**.
   - The backend **hashes** the new password before storing it.
5. If **name is being updated**, it is updated immediately.
6. The response confirms:
   - **Account updated successfully** (if a name or password was changed).
   - **Verification email sent** (if an email change was requested).

---

## **3. Request Details**
### **Headers**  
| Header          | Type    | Required | Description |
|---------------|---------|----------|------------|
| `Content-Type` | `string` | ✅ | Must be `application/json` |
| `Cookie`       | `string` | ✅ | Must contain `refreshToken` (Will be replaced by `accessToken` in the future) |

### **Query Parameters**  
_None._

### **Request Body**  
| Field | Type | Required | Description |
|-------|------|----------|------------|
| `name` | `string` | ❌ | The new name for the user (optional) |
| `email` | `string` | ❌ | The new email (requires verification, optional) |
| `password` | `string` | ❌ | The new password (optional) |
| `confirmPassword` | `string` | ✅ (if `password` is provided) | Must match `password` |

📌 **At least one field must be provided** for the request to be valid.

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{
  "name": "A Real Name",
  "email": "email@example.com",
  "password": "newPassword",
  "confirmPassword": "newPassword"
}
```

### **Example cURL Request**
```sh
curl -X PUT http://localhost:3000/auth/update-user \
-H "Content-Type: application/json" \
--cookie "refreshToken=<valid_refresh_token>" \
-d '{
  "name": "A Real Name",
  "email": "email@example.com",
  "password": "newPassword",
  "confirmPassword": "newPassword"
}'
```

### **Example Axios Request**
```javascript
import axios from "axios";

const updateUser = async () => {
  try {
    const response = await axios.put("http://localhost:3000/auth/update-user", {
      name: "A Real Name",
      email: "email@example.com",
      password: "newPassword",
      confirmPassword: "newPassword"
    }, { withCredentials: true });

    console.log("Update User Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

updateUser();
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | Account updated successfully (or email verification required) |
| `400 Bad Request` | Missing `confirmPassword` or passwords do not match |
| `401 Unauthorized` | No refresh token provided |
| `403 Forbidden` | Invalid refresh token |
| `404 Not Found` | User not found |
| `500 Internal Server Error` | Unexpected error |

### **Successful Response Examples**
#### ✅ **Email Change Requested (`200 OK`)**
```json
{ 
  "message": "Verification email sent. Please check your inbox to confirm email change."
}
```

#### ✅ **Account Updated (`200 OK`)**
```json
{ 
  "message": "Account updated successfully", 
  "user": {
      "name": "A Real Name",
      "role": "user",
      "mfaEnabled": false
  } 
}
```

### **Error Response Examples**
#### ❌ **Confirm Password Missing (`400 Bad Request`)**
```json
{
    "error": "Confirm password is required when changing the password"
}
```

#### ❌ **Passwords Do Not Match (`400 Bad Request`)**
```json
{
    "error": "Passwords do not match"
}
```

#### ❌ **No Refresh Token (`401 Unauthorized`)**
```json
{
    "error": "Unauthorized: No refresh token provided"
}
```

#### ❌ **Invalid Refresh Token (`403 Forbidden`)**
```json
{
    "error": "Forbidden: invalid refresh token"
}
```

#### ❌ **User Not Found (`404 Not Found`)**
```json
{
    "error": "User not found"
}
```

#### ❌ **Unexpected Error (`500 Internal Server Error`)**
```json
{
    "error": "Error updating your account"
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- **Email updates require confirmation**: The actual email change happens in [`PUT /auth/update-email`](#).
- **Password updates require confirmation**: The request must include `confirmPassword` and both values must match.
- **This endpoint currently requires `refreshToken`** but will be updated to require `accessToken` instead.

### **Common Mistakes & How to Avoid Them**
- **Forgetting to include `confirmPassword` when updating the password**: Ensure both password fields are provided.
- **Expecting an instant email change**: The confirmation email **must be verified first**.
- **Using an expired or invalid refresh token**: The user should re-authenticate if their session expires.
