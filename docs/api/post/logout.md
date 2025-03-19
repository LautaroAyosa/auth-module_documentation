# Log a User Out

<div class="route-container post">
    <div class="endpoint-main">
        <span class="endpoint-type">POST</span>
        <code class="endpoint-code">
                /auth/logout
        </code>
    </div>
    <p class="endpoint-description">Logs the user out by invalidating and removing their authentication tokens.</p>
</div>


## **1. General Information**
- **Endpoint:** `POST /auth/logout`
- **Authentication Required?** ✅ Yes (Requires a valid `refreshToken` cookie)
- **Access Restrictions:** _Any authenticated user can call this endpoint_
- **Description:** This endpoint removes the refresh token from the database and clears authentication cookies, effectively logging the user out.

---

## **2. Flow**
1. The client calls the **`POST /auth/logout`** endpoint.
2. The backend checks for a **valid refresh token** (sent via HTTP-only cookie).
3. If the token is valid:
   - The refresh token is **removed from the database**.
   - The server **clears the authentication cookies** (`accessToken` and `refreshToken`).
   - Returns a `200 OK` response.
4. If an error occurs, the server responds with a `500 Internal Server Error`.

---

## **3. Request Details**
### **Headers**  
| Header          | Type    | Required | Description |
|---------------|---------|----------|------------|
| `Content-Type` | `string` | ✅ | Must be `application/json` |
| `Cookie`       | `string` | ✅ | The `refreshToken` must be sent as an **HTTP-only cookie** |

### **Query Parameters**  
_None._

### **Request Body**  
_None required._  
- The `refreshToken` is sent automatically via **cookies** (`withCredentials: true`).

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{}
```
_(Body is ignored, since authentication relies only on cookies)_

### **Example cURL Request**
```sh
curl -X POST http://localhost:3000/auth/logout \
-H "Content-Type: application/json" \
--cookie "refreshToken=<valid_refresh_token>"
```

### **Example Axios Request**
```javascript
import axios from "axios";

const logoutUser = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/logout", {}, {
      withCredentials: true
    });

    console.log("Logout Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

logoutUser();
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | User successfully logged out |
| `500 Internal Server Error` | Unexpected error |

### **Successful Response Example (`200 OK`)**
```json
{
    "message": "Logged out successfully"
}
```
**Cookies Cleared:**
```http
Set-Cookie: accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;
Set-Cookie: refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;
```

### **Error Response Example (`500 Internal Server Error`)**
```json
{
    "error": "Error logging out"
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- The **refresh token is stored in an HTTP-only cookie**, meaning it **cannot be accessed via JavaScript**.
- This request **must include credentials** (`withCredentials: true`) to ensure the cookie is sent.
- The server explicitly clears cookies to **force logout**, even if the refresh token was already invalid.

### **Common Mistakes & How to Avoid Them**
- **Forgetting `withCredentials: true` on frontend requests:** The `refreshToken` won't be sent if this is missing.
- **Calling this endpoint without a valid session:** If the refresh token is already expired or invalid, this will silently fail, but the response will still be `200 OK`.
