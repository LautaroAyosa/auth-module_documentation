# **Enable Multi-Factor Authentication (MFA)**  

<div class="route-container post">
    <div class="endpoint-main">
        <span class="endpoint-type">POST</span>
        <code class="endpoint-code">
                /auth/enable-mfa
        </code>
    </div>
    <p class="endpoint-description">Enables MFA for the authenticated user and provides a QR code for setup.</p>
</div>


## **1. General Information**
- **Endpoint:** `POST /auth/enable-mfa`
- **Authentication Required?** ✅ Yes (`Authorization: Bearer <accessToken>`)
- **Access Restrictions:** _Any authenticated user can call this endpoint_
- **Description:** This endpoint enables MFA for the user and generates a QR code that can be scanned in an authenticator app.

---

## **2. Flow**
1. The user must be **logged in** and send a valid `accessToken` via an **HTTP-only cookie**.
2. The server:
   - Verifies the `accessToken`.
   - Generates a **new MFA secret** for the user using `speakeasy`.
   - Generates a **recovery code** that is hashed and stored in the database.
   - Updates the user's record to **enable MFA**.
   - Creates a **QR code** from the generated secret.
3. The server responds with:
   - A **QR code** (used to set up MFA in an authenticator app).
   - A **recovery code** (used to recover access if the authenticator app is lost).

---

## **3. Request Details**
### **Headers**  
| Header          | Type    | Required | Description |
|---------------|---------|----------|------------|
| `Content-Type` | `string` | ✅ | Must be `application/json` |
| `Authorization` | `string` | ✅ | Format: `Bearer <accessToken>` |

### **Query Parameters**  
_None._

### **Request Body**  
_None required._  
- The request **only needs a valid `accessToken`**.

---

## **4. Request Examples**
### **Valid JSON Request Body**
```json
{}
```
_(Body is ignored, authentication is handled via the `Authorization` header.)_

### **Example cURL Request**
```sh
curl -X POST http://localhost:3000/auth/enable-mfa \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_access_token>"
```

### **Example Axios Request**
```javascript
import axios from "axios";

const enableMfa = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/enable-mfa", {}, {
      headers: {
        Authorization: `Bearer <your_access_token>`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    console.log("MFA Enabled:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

enableMfa();
```

---

## **5. Response Details**
### **Possible Status Codes**
| Status Code | Meaning |
|-------------|---------|
| `200 OK` | MFA successfully enabled |
| `401 Unauthorized` | No access token provided or invalid token |
| `500 Internal Server Error` | Unexpected error |

### **Successful Response Example (`200 OK`)**
```json
{
    "message": "MFA enabled",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAYAAADApo5rAAAAAklEQVR4Aewa...",
    "recoveryCode": "650b691dba4972dbfd0793e64f997bda"
}
```

#### **QR Code (`qrCode` field)**
- The `qrCode` field is a **Base64-encoded PNG image**.
- This image can be displayed in the frontend for users to scan using an authenticator app.
- **Example Usage in React/Next.js**
```jsx
import Image from "next/image";

<Image
  src={MFAResult.qrCode || ""}
  alt="MFA QR Code"
  width={200}
  height={200}
  className="border rounded shadow-sm"
/>
```

#### **Recovery Code (`recoveryCode` field)**
- This is a **one-time-use** code that allows users to access their account if they lose their authenticator device.
- The user should **store this securely**, as it will not be retrievable later.

---

### **Error Response Examples**
#### ❌ **No Access Token Provided (`401 Unauthorized`)**
```json
{
    "authenticated": false,
    "error": "No access token provided"
}
```

#### ❌ **Unexpected Error (`500 Internal Server Error`)**
```json
{
    "error": "Error enabling MFA"
}
```

---

## **6. Additional Notes**
### **Special Considerations**
- **Users should securely store their recovery code** in case they lose access to their authenticator app.
- **QR Code Setup**: The generated QR code should be scanned using an MFA app like **Google Authenticator** or **Authy**.
- The `accessToken` **must be valid** for this endpoint to work.

### **Common Mistakes & How to Avoid Them**
- **Not sending the `Authorization` header**: The request must include `Authorization: Bearer <accessToken>`.
- **Not handling the recovery code properly**: Users should be advised to save it, as it cannot be retrieved later.
- **Attempting to enable MFA multiple times**: If MFA is already enabled, the user may need to disable it first.
