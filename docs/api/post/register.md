
# **Register a New User**  

<div class="route-container post">
    <div class="endpoint-main">
        <span class="endpoint-type">POST</span>
        <code class="endpoint-code">
                /auth/register
        </code>
    </div>
    <p class="endpoint-description">Creates a new user</p>
</div>


## **1. General Information**
- **Endpoint:** `POST /auth/register`
- **Authentication Required?** ❌ No (Public endpoint)
- **Access Restrictions:** Any authenticated or unauthenticated user can call this endpoint
- **Description:** This endpoint allows users to register a new account by providing their name, email, and password.

---

## **2. Request Details**
### **Headers**  
| Header          | Type    | Required | Description |
|---------------|---------|----------|------------|
| `Content-Type` | `string` | ✅ | Must be `application/json` |

### **Query Parameters**  
_None._

### **Request Body**  
| Field     | Type     | Required | Default | Description |
|-----------|---------|----------|---------|------------|
| `name`    | `string` | ✅ Yes | - | The account holder's name |
| `email`   | `string` | ✅ Yes | - | The email address of the account |
| `password` | `string` | ✅ Yes | - | Plaintext password (will be hashed in the backend). No validation on strength/length for now. |

---

## **3. Request Examples**
### **Valid JSON Request Body**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### **Example cURL Request**
```sh
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### **Example Axios Request**
```javascript
import axios from "axios";

const registerUser = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/register", {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123"
    });
    console.log("User Registered:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

registerUser();
```

---

## **4. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `201 Created` | User successfully registered |
| `400 Bad Request` | Email already in use |
| `500 Internal Server Error` | Unexpected error, or missing required fields |

### **Successful Response Example (`201 Created`)**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "mfaEnabled": false
}
```

### **Error Response Examples**
#### **Duplicate Email (`400 Bad Request`)**
```json
{
    "error": "Email already in use",
    "details": "E11000 duplicate key error collection: auth_module.users index: email_1 dup key: { email: \"email@example.com\" }"
}
```

#### **Missing Field (`500 Internal Server Error`)**
```json
{
    "error": "Error registering user",
    "details": "user validation failed: email: Path `email` is required."
}
```

---

## **5. Additional Notes**
### **Special Considerations**
- The password is **stored as a hashed value** for security purposes.
- The email address **must be unique** in the system.
- No **password validation rules** are currently enforced (any length/complexity is accepted).

### **Common Mistakes & How to Avoid Them**
- **Not sending JSON correctly:** Ensure the `Content-Type: application/json` header is included.
- **Trying to register with an already used email:** Check if the email is available before sending the request.
- **Missing required fields:** All fields (`name`, `email`, `password`) must be included in the request body.

