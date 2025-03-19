# **Update Email**  

<div class="route-container put">
    <div class="endpoint-main">
        <span class="endpoint-type">PUT</span>
        <code class="endpoint-code">
                /auth/update-email
        </code>
    </div>
    <p class="endpoint-description">Finalizes the email change process</p>
</div>


## **1. General Information**
- **Endpoint:** `PUT /auth/update-email`
- **Authentication Required?** ❌ No (The request is validated using an email confirmation token)
- **Access Restrictions:** _Any user can call this endpoint_
- **Description:**  
  - After a user requests an email change, they receive a **confirmation email** with a token.  
  - This endpoint **validates the token** and updates the user's email.

---

## **2. Flow**
1. The client calls **`PUT /auth/update-email/:token`** with the **email verification token** in the **URL**.
2. The backend:
   - Checks if the **token is provided**.
   - Searches for the **email verification record** using the token.
   - If the **token is expired or invalid**, it returns an error.
   - Retrieves the **new email address** associated with the token.
   - Checks if the **email is already in use**.
   - If the email is **available**, the user's email is updated.
   - If the update is **successful**, the verification token is deleted.
3. The response confirms:
   - **Email updated successfully**.
   - **Error messages** if the update fails.

---

## **3. Request Details**
### **Headers**  
| Header          | Type    | Required | Description |
|---------------|---------|----------|------------|
| `Content-Type` | `string` | ✅ | Must be `application/json` |

### **Query Parameters**  
| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| `token` | `string` | ✅ | The email verification token received in the confirmation email |

### **Request Body**  
_None required._

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{}
```
_(Body is ignored, verification is done via URL token)_

### **Example cURL Request**
```sh
curl -X PUT http://localhost:3000/auth/update-email/{token} \
-H "Content-Type: application/json"
```

### **Example Axios Request**
```javascript
import axios from "axios";

const updateEmail = async (token) => {
  try {
    const response = await axios.put(`http://localhost:3000/auth/update-email/${token}`);

    console.log("Update Email Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

updateEmail("a5c4a3c1281b9d295448db3f7f17e10f4e45711bdc89a8cac1da15e7149c9b04");
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | Email successfully updated |
| `400 Bad Request` | No token provided |
| `400 Bad Request` | Invalid or expired token |
| `400 Bad Request` | Email is already in use |
| `400 Bad Request` | Email update failed |
| `500 Internal Server Error` | Unexpected error |

### **Successful Response Example (`200 OK`)**
```json
{ 
  "message": "Email updated successfully",
  "email": "newUserEmail@example.com"
}
```

### **Error Response Examples**
#### ❌ **No Token Provided (`400 Bad Request`)**
```json
{
    "error": "Invalid request: No token provided"
}
```

#### ❌ **Invalid or Expired Token (`400 Bad Request`)**
```json
{
    "error": "Invalid or expired token"
}
```

#### ❌ **Email is Already in Use (`400 Bad Request`)**
```json
{
    "error": "Email is already in use"
}
```

#### ❌ **Email Update Failed (`400 Bad Request`)**
```json
{
    "error": "We couldn't update your email"
}
```

#### ❌ **Unexpected Error (`500 Internal Server Error`)**
```json
{
    "error": "Error updating your account's email"
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- The **email update process requires a confirmation email** sent in the previous step (`PUT /auth/update-user`).
- Tokens **expire after 6 hours**, and a new email update request must be initiated if the token is expired.
- This endpoint **only updates the email if the provided token is valid**.

### **Common Mistakes & How to Avoid Them**
- **Not using the correct token from the email**: Ensure the full token from the confirmation email is sent in the request.
- **Trying to update to an email that is already in use**: Users must select a unique email address.
- **Using an expired token**: If the token has expired, users need to **request a new email change**.
