# **Request Password Reset**  
<div class="route-container post">
    <div class="endpoint-main">
        <span class="endpoint-type">POST</span>
        <code class="endpoint-code">
                /auth/request-reset-password
        </code>
    </div>
    <p class="endpoint-description">Initiates the password reset process</p>
</div>


## **1. General Information**
- **Endpoint:** `POST /auth/request-reset-password`
- **Authentication Required?** ❌ No (Users must be able to recover their password even if they are logged out)
- **Access Restrictions:** _Any user can call this endpoint_
- **Description:** This endpoint generates a **password reset token**, stores it in the database, and emails the user a **reset link**. The user must follow the link to complete the password reset process via the [`POST /auth/reset-password`](#) endpoint.

---

## **2. Flow**
1. The user submits their **email address**.
2. The backend:
   - Checks if a **user exists** with that email.
   - **Deletes any existing password reset tokens** for the user.
   - **Generates a new token** using `crypto.randomBytes(32).toString('hex')`.
   - **Stores the token** in the database (hashed) with a **1-hour expiration**.
   - **Sends an email** to the user with a reset link:  
     ```
     https://yourapp.com/auth/reset-password/:token
     ```
3. The user **clicks the link** and proceeds to [`/auth/reset-password`](#).

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
| `email` | `string` | ✅ | The email address associated with the user account |

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{
  "email": "johndoe@example.com"
}
```

### **Example cURL Request**
```sh
curl -X POST http://localhost:3000/auth/request-reset-password \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@example.com"
}'
```

### **Example Axios Request**
```javascript
import axios from "axios";

const requestPasswordReset = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/request-reset-password", {
      email: "johndoe@example.com"
    });

    console.log("Password Reset Request Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

requestPasswordReset();
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | Reset link sent successfully |
| `404 Not Found` | No user found with that email |
| `500 Internal Server Error` | Unexpected error |

### **Successful Response Example (`200 OK`)**
```json
{
    "message": "Reset link sent"
}
```

### **Error Response Examples**
#### ❌ **User Not Found (`404 Not Found`)**
```json
{
    "error": "No user found"
}
```

#### ❌ **Unexpected Error (`500 Internal Server Error`)**
```json
{
    "error": "Request failed"
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- The **password reset token expires in 1 hour**.
- If multiple requests are made, **only the latest reset token is valid** (previous tokens are deleted).
- The email contains a reset link with the format:
  ```
  https://yourapp.com/auth/reset-password/:token
  ```
- The actual **reset process happens in `/auth/reset-password`**.

### **Common Mistakes & How to Avoid Them**
- **Entering an incorrect email address**: Users should double-check their email.
- **Not checking spam/junk folders**: Sometimes, password reset emails may end up in spam.
- **Attempting to reuse an expired token**: Users should request a new reset link if the old one expires.
