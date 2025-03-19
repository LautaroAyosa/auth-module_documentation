# **Validate Session**  

<div class="route-container get">
    <div class="endpoint-main">
        <span class="endpoint-type">GET</span>
        <code class="endpoint-code">
                /auth/validate-session
        </code>
    </div>
    <p class="endpoint-description">Verifies if a user is properly authenticated</p>
</div>


## **1. General Information**
- **Endpoint:** `GET /auth/validate-session`
- **Authentication Required?** ✅ Yes (Requires a valid `accessToken`. If missing or expired, a `refreshToken` is used to generate a new `accessToken`.)
- **Access Restrictions:** _Any authenticated user can call this endpoint_
- **Description:**  
  - If the user has a **valid access token**, their session is validated, and their user data is returned.  
  - If the **access token is expired**, but a **valid refresh token** is available, a new access token is generated and returned.  
  - If both tokens are **invalid or missing**, authentication fails.

---

## **2. Flow**
1. The client sends a request, and the **backend checks for an `accessToken`**.
2. If an **`accessToken` is valid**, it:
   - Decodes the token.
   - Retrieves the **user's data** from the database.
   - Returns the **user object**.
3. If the **`accessToken` is missing or expired**, it:
   - Checks for a **valid `refreshToken`**.
   - If valid:
     - Retrieves the **user’s information**.
     - **Generates a new `accessToken`**.
     - **Stores the new `accessToken` in an HTTP-only cookie**.
     - Returns the **user object**.
   - If invalid or expired, authentication fails.
4. If authentication **fails** at any point, the server responds with an **error message**.

---

## **3. Request Details**
### **Headers**  
| Header          | Type    | Required | Description |
|---------------|---------|----------|------------|
| `Content-Type` | `string` | ✅ | Must be `application/json` |
| `Cookie`       | `string` | ✅ | Must contain `accessToken` or `refreshToken` |

### **Query Parameters**  
_None._

### **Request Body**  
_None required._  
- Authentication is handled via **cookies** (`accessToken` or `refreshToken`).

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{}
```
_(Body is ignored, authentication relies on cookies)_

### **Example cURL Request**
```sh
curl -X GET http://localhost:3000/auth/validate-session \
-H "Content-Type: application/json" \
--cookie "accessToken=<valid_access_token>"
```

### **Example Axios Request**
```javascript
import axios from "axios";

const validateSession = async () => {
  try {
    const response = await axios.get("http://localhost:3000/auth/validate-session", {
      withCredentials: true
    });

    console.log("Session Validation Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

validateSession();
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | Session successfully validated |
| `401 Unauthorized` | No access token or refresh token provided |
| `401 Unauthorized` | Invalid or expired refresh token |
| `403 Forbidden` | Other authentication failures |

### **Successful Response Example (`200 OK`)**
```json
{ 
  "authenticated": true, 
  "user": { 
    "name": "John Doe", 
    "email": "johndoe@example.com", 
    "mfaEnabled": true, 
    "role": "user"
  } 
}
```
**Cookies Set (if accessToken is refreshed):**
```http
Set-Cookie: accessToken=<new_access_token>; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=900
```

### **Error Response Examples**
#### ❌ **No Access Token Provided (`401 Unauthorized`)**
```json
{
    "error": "No access token provided"
}
```

#### ❌ **No Refresh Token Provided (`401 Unauthorized`)**
```json
{
    "authenticated": false
}
```

#### ❌ **Invalid or Expired Refresh Token (`401 Unauthorized`)**
```json
{
    "error": "Invalid or expired refresh token"
}
```

#### ❌ **Other Errors (`403 Forbidden`)**
```json
{
    "authenticated": false
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- The `validate-session` endpoint is **critical for session management** in frontend applications.
- If an **access token is expired**, a new one is **automatically generated** using the refresh token.
- **Clients must send requests with `withCredentials: true`** to ensure cookies are included.

### **Common Mistakes & How to Avoid Them**
- **Forgetting `withCredentials: true` on frontend requests**: The session will not be validated without cookies.
- **Using an expired refresh token**: Ensure tokens are refreshed **before they expire**.
- **Manually sending access tokens in headers**: This endpoint is designed to work with cookies.
