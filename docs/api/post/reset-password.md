# **Reset Password**  

<div class="route-container post">
    <div class="endpoint-main">
        <span class="endpoint-type">POST</span>
        <code class="endpoint-code">
                /auth/reset-password
        </code>
    </div>
    <p class="endpoint-description">Allows users to reset their account password</p>
</div>

---

## **1. General Information**
- **Endpoint:** `POST /auth/reset-password`
- **Authentication Required?** ❌ No (Users must be able to reset their password even if they are logged out)
- **Access Restrictions:** _Any user can call this endpoint_
- **Description:** This endpoint verifies a **password reset token**, updates the user's password, and deletes the used token.

---

## **2. Flow**
1. The user submits a **password reset token** (from `/auth/request-reset-password`) and a **new password**.
2. The backend:
   - Checks if the **reset token exists** and is **not expired**.
   - Hashes the **new password** and updates the user's account.
   - Deletes the **used reset token** from the database.
3. If the token is **valid**, the password is updated and a success response is returned.
4. If the token is **invalid or expired**, a `400 Bad Request` error is returned.

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
| `token` | `string` | ✅ | The password reset token generated in the previous step |
| `newPassword` | `string` | ✅ | The new password (will be hashed before storing) |

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{
  "token": "a5c4a3c1281b9d295448db3f7f17e10f4e45711bdc89a8cac1da15e7149c9b04",
  "newPassword": "iWontForgetThisOne"
}
```

### **Example cURL Request**
```sh
curl -X POST http://localhost:3000/auth/reset-password \
-H "Content-Type: application/json" \
-d '{
  "token": "a5c4a3c1281b9d295448db3f7f17e10f4e45711bdc89a8cac1da15e7149c9b04",
  "newPassword": "iWontForgetThisOne"
}'
```

### **Example Axios Request**
```javascript
import axios from "axios";

const resetPassword = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/reset-password", {
      token: "a5c4a3c1281b9d295448db3f7f17e10f4e45711bdc89a8cac1da15e7149c9b04",
      newPassword: "iWontForgetThisOne"
    });

    console.log("Password Reset Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

resetPassword();
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | Password successfully updated |
| `400 Bad Request` | Invalid or expired reset token |
| `500 Internal Server Error` | Unexpected error |

### **Successful Response Example (`200 OK`)**
```json
{
    "message": "Password reset successful"
}
```

### **Error Response Examples**
#### ❌ **Invalid or Expired Reset Token (`400 Bad Request`)**
```json
{
    "error": "Invalid or expired reset token"
}
```

#### ❌ **Unexpected Error (`500 Internal Server Error`)**
```json
{
    "error": "Reset failed"
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- **Password reset tokens expire after 1 hour**.
- Once the password is reset, the **reset token is deleted**.
- Users must request a **new password reset link** if the token expires.

### **Common Mistakes & How to Avoid Them**
- **Trying to reuse an expired reset token**: Users must request a new one if the old one has expired.
- **Not hashing passwords manually**: The backend automatically hashes the new password.
- **Forgetting to update password storage security settings**: Ensure strong password hashing is used.
