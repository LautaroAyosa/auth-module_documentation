# **Verify Multi-Factor Authentication (MFA) Token**  

<div class="route-container post">
    <div class="endpoint-main">
        <span class="endpoint-type">POST</span>
        <code class="endpoint-code">
                /auth/verify-mfa
        </code>
    </div>
    <p class="endpoint-description">Verifies a user's MFA token to complete the login process.</p>
</div>


## **1. General Information**
- **Endpoint:** `POST /auth/verify-mfa`
- **Authentication Required?** ❌ No
- **Access Restrictions:** _Any user can call this endpoint_
- **Description:** This endpoint verifies the MFA token provided by the user. If valid, authentication tokens are issued, completing the login process.

---

## **2. Flow**
1. The user must **first call the `/auth/login`** endpoint.
2. If MFA is enabled, the login response will return a **`tempSessionId`**.
3. The user submits the **MFA token** along with the **`tempSessionId`** to this endpoint.
4. The backend verifies:
   - If the **`tempSessionId`** is valid and not expired.
   - If the **MFA token** is correct.
5. If valid:
   - The user is authenticated.
   - **Access and refresh tokens** are issued via **HTTP-only cookies**.
6. If invalid:
   - The user receives an error response.
   - The **tempSessionId expires automatically**.

---

## **3. Request Details**
### **Headers**  
| Header          | Type    | Required | Description |
|---------------|---------|----------|------------|
| `Content-Type` | `string` | ✅ | Must be `application/json` |

### **Query Parameters**  
_None._

### **Request Body**  
| Field | Type | Required | Description |
|-------|------|----------|------------|
| `tempSessionId` | `string` | ✅ | The session ID generated during the login process (`crypto.randomBytes(16).toString('hex')`). |
| `token` | `string` | ✅ | The MFA token from the user's authentication app (usually a 6-digit code). |

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{
    "tempSessionId": "258529ed1bb19a830e38de3febe5b3d1",
    "token": "955842"
}
```

### **Example cURL Request**
```sh
curl -X POST http://localhost:3000/auth/verify-mfa \
-H "Content-Type: application/json" \
-d '{
    "tempSessionId": "258529ed1bb19a830e38de3febe5b3d1",
    "token": "955842"
}'
```

### **Example Axios Request**
```javascript
import axios from "axios";

const verifyMfa = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/verify-mfa", {
      tempSessionId: "258529ed1bb19a830e38de3febe5b3d1",
      token: "955842"
    }, { withCredentials: true });

    console.log("MFA Verification Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

verifyMfa();
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | MFA verified, user is authenticated |
| `400 Bad Request` | Invalid or expired session ID |
| `400 Bad Request` | Invalid MFA token |
| `500 Internal Server Error` | Unexpected error |

### **Successful Response Example (`200 OK`)**
```json
{
    "authenticated": true,
    "user": {
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "mfaEnabled": true
    }
}
```
**Cookies Set:**
- **accessToken**  
  - `httpOnly: true`, `secure` (if `NODE_ENV === 'production'`), `sameSite: strict`  
  - **Expires in:** `15 minutes`
- **refreshToken**  
  - `httpOnly: true`, `secure` (if `NODE_ENV === 'production'`), `sameSite: strict`  
  - **Expires in:** `7 days`

### **Error Response Examples**
#### ❌ **Invalid or Expired Temp Session ID (`400 Bad Request`)**
```json
{
    "error": "Invalid or expired session"
}
```

#### ❌ **Invalid MFA Token (`400 Bad Request`)**
```json
{
    "error": "Invalid MFA token"
}
```

#### ❌ **Unexpected Error (`500 Internal Server Error`)**
```json
{
    "error": "Error verifying MFA"
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- **TempSessionId is single-use** and **expires quickly** after creation.
- **Access and refresh tokens are only issued upon successful MFA verification**.
- This request **must include `withCredentials: true`** to store authentication cookies.

### **Common Mistakes & How to Avoid Them**
- **Using an expired `tempSessionId`**: Ensure the user submits their MFA code promptly.
- **Sending an incorrect MFA token**: Users should verify their time settings (TOTP tokens are time-sensitive).
- **Not including `withCredentials: true`**: Cookies won’t be set if this is missing.
