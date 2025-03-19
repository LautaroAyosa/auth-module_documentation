# API Endpoints Overview

## **Introduction**
This API provides authentication and user management functionalities, including session validation, user updates, multi-factor authentication (MFA), and password recovery. Below is a high-level overview of all available endpoints.

Each endpoint is documented on its own page with clear request and response structures, making it easy to integrate with any client application.

---

## **Endpoint Categories**
### 🔑 **Authentication Endpoints**
<a href="/documentation/docs/api/post/register" class="route-container-link">
    <div class="route-container post">
        <div class="endpoint-main">
            <span class="endpoint-type">POST</span>
            <code class="endpoint-code">
                    /auth/register
            </code>
        </div>
        <p class="endpoint-description">Creates a new user</p>
    </div>
</a>
<a href="/documentation/docs/api/post/login" class="route-container-link">
    <div class="route-container post">
        <div class="endpoint-main">
            <span class="endpoint-type">POST</span>
            <code class="endpoint-code">
                    /auth/login
            </code>
        </div>
        <p class="endpoint-description">Authenticates a user and issues tokens for accessing protected resources.</p>
    </div>
</a>
<a href="/documentation/docs/api/post/logout" class="route-container-link">
    <div class="route-container post">
        <div class="endpoint-main">
            <span class="endpoint-type">POST</span>
            <code class="endpoint-code">
                    /auth/logout
            </code>
        </div>
        <p class="endpoint-description">Logs the user out by invalidating and removing their authentication tokens.</p>
    </div>
</a>
<a href="/documentation/docs/api/get/validate-session" class="route-container-link">
    <div class="route-container get">
        <div class="endpoint-main">
            <span class="endpoint-type">GET</span>
            <code class="endpoint-code">
                    /auth/validate-session
            </code>
        </div>
        <p class="endpoint-description">Verifies if a user is properly authenticated</p>
    </div>
</a>


### 🔄 **Multi-Factor Authentication (MFA)**
<a href="/documentation/docs/api/post/enable-mfa" class="route-container-link">
    <div class="route-container post">
        <div class="endpoint-main">
            <span class="endpoint-type">POST</span>
            <code class="endpoint-code">
                    /auth/enable-mfa
            </code>
        </div>
        <p class="endpoint-description">Enables MFA for the authenticated user and provides a QR code for setup.</p>
    </div>
</a>
<a href="/documentation/docs/api/post/verify-mfa" class="route-container-link">
    <div class="route-container post">
        <div class="endpoint-main">
            <span class="endpoint-type">POST</span>
            <code class="endpoint-code">
                    /auth/verify-mfa
            </code>
        </div>
        <p class="endpoint-description">Verifies a user's MFA token to complete the login process.</p>
    </div>
</a>
<a href="/documentation/docs/api/post/recover-mfa" class="route-container-link">
    <div class="route-container post">
        <div class="endpoint-main">
            <span class="endpoint-type">POST</span>
            <code class="endpoint-code">
                    /auth/recover-mfa
            </code>
        </div>
        <p class="endpoint-description">Disables MFA on the user's account if they provide a valid recovery code.</p>
    </div>
</a>


### 🔧 **User Management**
<a href="/documentation/docs/api/put/update-user" class="route-container-link">
    <div class="route-container put">
        <div class="endpoint-main">
            <span class="endpoint-type">PUT</span>
            <code class="endpoint-code">
                    /auth/update-user
            </code>
        </div>
        <p class="endpoint-description">Allows users to update their account details.</p>
    </div>
</a>
<a href="/documentation/docs/api/put/update-email" class="route-container-link">
    <div class="route-container put">
        <div class="endpoint-main">
            <span class="endpoint-type">PUT</span>
            <code class="endpoint-code">
                    /auth/update-email
            </code>
        </div>
        <p class="endpoint-description">Finalizes the email change process</p>
    </div>
</a>

### 🔑 **Password Recovery**
<a href="/documentation/docs/api/post/request-reset-password" class="route-container-link">
    <div class="route-container post">
        <div class="endpoint-main">
            <span class="endpoint-type">POST</span>
            <code class="endpoint-code">
                    /auth/request-reset-password
            </code>
        </div>
        <p class="endpoint-description">Initiates the password reset process</p>
    </div>
</a>
<a href="/documentation/docs/api/post/reset-password" class="route-container-link">
    <div class="route-container post">
        <div class="endpoint-main">
            <span class="endpoint-type">POST</span>
            <code class="endpoint-code">
                    /auth/reset-password
            </code>
        </div>
        <p class="endpoint-description">Allows users to reset their account password</p>
    </div>
</a>

---

## **Understanding Endpoint Documentation**
Each endpoint has its own dedicated page, structured as follows:

### **1. General Information**
- **What does the endpoint do?**
- **HTTP method** (e.g., `POST`, `GET`, `PUT`, `DELETE`)
- **Route** (e.g., `/auth/login`)
- **Authentication requirements** (e.g., `accessToken`, `refreshToken`)
- **Who can access it?** (User roles, permissions, or public access)

### **2. Flow**
- A step-by-step explanation of how the endpoint works internally.
- Special considerations, like token expiration or additional security checks.

### **3. Request Details**
- **Headers**: Any required headers (e.g., `Content-Type`, `Authorization`).
- **Query Parameters**: If applicable, details on required/optional parameters.
- **Request Body**: Fields, data types, required status, and descriptions.

### **4. Request Examples**
- A **valid JSON request body**.
- **cURL command** to test the endpoint.
- **Axios example** for client-side integration.

### **5. Response Details**
- **Possible Status Codes**: Success and error codes.
- **Successful Response Example**: JSON response when the request is successful.
- **Error Response Examples**: Common errors and their JSON response formats.

### **6. Additional Notes**
- **Special Considerations**: Expiration times, retry mechanisms, or security measures.
- **Common Mistakes**: Errors developers might encounter and how to avoid them.



