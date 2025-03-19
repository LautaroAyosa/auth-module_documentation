# **Recover Multi-Factor Authentication (MFA)**  

<div class="route-container post">
    <div class="endpoint-main">
        <span class="endpoint-type">POST</span>
        <code class="endpoint-code">
                /auth/recover-mfa
        </code>
    </div>
    <p class="endpoint-description">Disables MFA on the user's account if they provide a valid recovery code.</p>
</div>


## **1. General Information**
- **Endpoint:** `POST /auth/recover-mfa`
- **Authentication Required?** ❌ No (Users must be able to recover their account even if they cannot log in)
- **Access Restrictions:** _Any user can call this endpoint_
- **Description:** This endpoint allows users to disable MFA if they have lost access to their authenticator app but still have their recovery code.

---

## **2. Flow**
1. The user submits their **email** and **recovery code**.
2. The backend:
   - Finds the user by **email**.
   - Verifies if the user **has MFA enabled** and if a **recovery code exists**.
   - Compares the provided **recovery code** with the stored **hashed recovery code**.
3. If valid:
   - **MFA is disabled**.
   - The **MFA secret and recovery code are deleted**.
   - The response confirms **successful recovery**.
4. If invalid:
   - If the **email is not found**, a `404 Not Found` error is returned.
   - If the **recovery code does not match**, a `401 Unauthorized` error is returned.
   - If the **user does not have MFA enabled**, a `404 Not Found` error is returned.

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
| `email` | `string` | ✅ | The email address of the account |
| `recoveryCode` | `string` | ✅ | The one-time-use recovery code provided when MFA was enabled |

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{
  "email": "johndoe@example.com",
  "recoveryCode": "650b691dba4972dbfd0793e64f997bda"
}
```

### **Example cURL Request**
```sh
curl -X POST http://localhost:3000/auth/recover-mfa \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@example.com",
  "recoveryCode": "650b691dba4972dbfd0793e64f997bda"
}'
```

### **Example Axios Request**
```javascript
import axios from "axios";

const recoverMfa = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/recover-mfa", {
      email: "johndoe@example.com",
      recoveryCode: "650b691dba4972dbfd0793e64f997bda"
    });

    console.log("MFA Recovery Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

recoverMfa();
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | MFA successfully disabled |
| `401 Unauthorized` | Invalid recovery code |
| `404 Not Found` | User not found or MFA not enabled |
| `500 Internal Server Error` | Unexpected error |

### **Successful Response Example (`200 OK`)**
```json
{
    "message": "MFA has been removed from your account"
}
```

### **Error Response Examples**
#### ❌ **Invalid Recovery Code (`401 Unauthorized`)**
```json
{
    "error": "Invalid recovery code"
}
```

#### ❌ **User Not Found (`404 Not Found`)**
```json
{
    "error": "User not found with that email address"
}
```

#### ❌ **Recovery Code Not Found or MFA Not Enabled (`404 Not Found`)**
```json
{
    "error": "Recovery code not found or MFA not enabled"
}
```

#### ❌ **Unexpected Error (`500 Internal Server Error`)**
```json
{
    "error": "Error recovering account"
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- **Recovery codes are one-time-use only**. If the user has lost their recovery code, they must contact support for account recovery.
- **MFA must be enabled on the account** for this endpoint to work. Otherwise, the response will indicate that MFA is not enabled.
- **The recovery code should be securely stored** when MFA is first enabled.

### **Common Mistakes & How to Avoid Them**
- **Using an incorrect recovery code**: Ensure the user enters the exact recovery code provided when MFA was enabled.
- **Attempting to recover an account without MFA enabled**: This endpoint only works for accounts with MFA enabled.
- **Not sending `Content-Type: application/json`**: Requests must include this header.

