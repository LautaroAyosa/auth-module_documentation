# **Log a User In**  

<div class="route-container post">
    <div class="endpoint-main">
        <span class="endpoint-type">POST</span>
        <code class="endpoint-code">
                /auth/login
        </code>
    </div>
    <p class="endpoint-description">Authenticates a user and issues tokens for accessing protected resources.</p>
</div>

## **1. General Information**
- **Endpoint:** `POST /auth/login`
- **Authentication Required?** ❌ No (Public endpoint)
- **Access Restrictions:** Any authenticated or unauthenticated user can call this endpoint
- **Description:** This endpoint verifies a user's credentials and, if successful, issues authentication tokens. If Multi-Factor Authentication (MFA) is enabled, the user must complete an additional verification step before receiving tokens.

---

## **2. Flow**
### **User Login Flow**
1. The user enters their email and password.
2. The backend verifies the credentials.
3. If MFA is **disabled**, the backend:
   - Generates **access and refresh tokens**.
   - Sends both tokens via **HTTP-only cookies**.
4. If MFA is **enabled**, the backend:
   - Generates a **Temporary Session Token** (via Node.js `crypto`).
   - Sends this token to the frontend for MFA verification.

---

## **3. Request Details**
### **Headers**  
| Header          | Type    | Required | Description |
|---------------|---------|----------|------------|
| `Content-Type` | `string` | ✅ | Must be `application/json` |

### **Query Parameters**  
_None._

### **Request Body**  
| Field     | Type     | Required | Default | Description |
|-----------|---------|----------|---------|------------|
| `email`   | `string` | ✅ Yes | - | The email address of the user |
| `password` | `string` | ✅ Yes | - | Plaintext password (will be compared to the stored hash) |

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### **Example cURL Request**
```sh
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### **Example Axios Request**
```javascript
import axios from "axios";

const loginUser = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: "john.doe@example.com",
      password: "password123"
    }, { withCredentials: true });

    console.log("Login Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

loginUser();
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | User successfully authenticated |
| `401 Unauthorized` | Invalid credentials |
| `500 Internal Server Error` | Missing required fields or unexpected server error |

### **Successful Response Examples**
#### ✅ **User without MFA (`200 OK`)**
```json
{
    "message": "Login successful"
}
```
**Cookies Set:**
- **accessToken**  
  - `httpOnly: true`, `secure` (if `NODE_ENV === 'production'`), `sameSite: strict`  
  - **Expires in:** `15 minutes`
- **refreshToken**  
  - `httpOnly: true`, `secure` (if `NODE_ENV === 'production'`), `sameSite: strict`  
  - **Expires in:** `7 days`

#### ✅ **User with MFA (`200 OK`)**
```json
{
    "mfaRequired": true,
    "tempSessionId": "49c674de0a548db887b87fe560040c90",
    "message": "MFA verification required"
}
```

### **Error Response Examples**
#### ❌ **Invalid Email or Password (`401 Unauthorized`)**
```json
{
    "error": "Invalid credentials"
}
```

#### ❌ **Missing Field (`500 Internal Server Error`)**
```json
{
    "error": "Error logging in"
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- If **MFA is enabled**, the client **must** complete verification using the `/auth/mfa-verify` endpoint.
- Login requests automatically set **HTTP-only cookies** (`accessToken` and `refreshToken`) if authentication succeeds.
- Temporary Session Tokens **expire automatically** and are **deleted after use**.

### **Common Mistakes & How to Avoid Them**
- **Not sending JSON correctly:** Ensure the `Content-Type: application/json` header is included.
- **Forgetting `withCredentials: true` on frontend requests:** This is necessary for cookies to be set properly.
- **Trying to authenticate with an expired account:** Ensure the user's account is active.
